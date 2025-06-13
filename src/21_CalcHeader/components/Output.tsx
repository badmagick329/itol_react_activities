import { useState, useEffect, useCallback } from "react";
import { calculateInvestmentResults } from "../util/investments";
import { generatepdf } from "../util/generateReport";
import { InputValue } from "@/21_CalcHeader/CalcHeader";

const Output = ({ inputValue }: { inputValue: InputValue }) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const [actualResults, setActualResults] = useState<any[]>([]);

  useEffect(() => {
    const calculateAsync = async () => {
      setIsCalculating(true);
      setCalculationError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const results = calculateInvestmentResults({
          initialInvestment: +inputValue.initialInvestment,
          annualInvestment: +inputValue.annualInvestment,
          expectedReturn: +inputValue.expectedReturn,
          duration: +inputValue.duration,
        });

        setActualResults(results);
      } catch (error) {
        setCalculationError("Error calculating investment results");
        setActualResults([]);
      } finally {
        setIsCalculating(false);
      }
    };

    calculateAsync();
  }, [
    inputValue.initialInvestment,
    inputValue.annualInvestment,
    inputValue.expectedReturn,
    inputValue.duration,
  ]);

  const handleGeneratePDF = useCallback(() => {
    try {
      if (actualResults.length === 0) {
        alert("No data available to generate PDF");
        return;
      }

      const pdfData = {
        initialInvestment: inputValue.initialInvestment,
        annualInvestment: inputValue.annualInvestment,
        expectedReturn: inputValue.expectedReturn,
        duration: inputValue.duration,
        results: actualResults.map((result) => ({
          year: result.year,
          interest: result.interest,
          totalInterest: result.totalInterest,
          investedCap: result.investedCapital,
          investmentValue: result.investmentValue,
        })),
      };

      generatepdf(pdfData);
    } catch (error) {
      alert("Error generating PDF. Please try again.");
    }
  }, [actualResults, inputValue]);

  if (isCalculating) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mb-4"></div>
          <p className="text-gray-300">Calculating investment results...</p>
        </div>
      </div>
    );
  }

  if (calculationError) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-400 font-medium">{calculationError}</p>
          <p className="text-gray-400 text-sm mt-2">
            Please check your input values and try again.
          </p>
        </div>
      </div>
    );
  }

  if (!actualResults || actualResults.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <p className="text-center text-gray-400">
          No investment data to display. Please ensure all input values are
          positive.
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Investment Results</h2>
        <button
          onClick={handleGeneratePDF}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Generate PDF
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
          <thead>
            <tr className="bg-gray-600 border-b border-gray-500">
              <th className="px-4 py-3 text-left font-medium text-gray-200 text-sm">
                Year
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-200 text-sm">
                Investment Value
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-200 text-sm">
                Interest (Year)
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-200 text-sm">
                Total Interest
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-200 text-sm">
                Invested Capital
              </th>
            </tr>
          </thead>
          <tbody>
            {actualResults.map((yearData, index) => (
              <tr
                key={index}
                className={`border-b border-gray-600 hover:bg-gray-600 transition-colors ${
                  index % 2 === 0 ? "bg-gray-700" : "bg-gray-650"
                }`}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-200">
                  {yearData.year}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-200 font-medium">
                  {inputValue.currency}
                  {yearData.investmentValue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-4 py-3 text-sm text-right text-green-400 font-medium">
                  {inputValue.currency}
                  {yearData.interest.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-4 py-3 text-sm text-right text-blue-400 font-medium">
                  {inputValue.currency}
                  {yearData.totalInterest.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-300 font-medium">
                  {inputValue.currency}
                  {yearData.investedCapital.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
          <h3 className="text-sm font-medium text-green-400 mb-1">
            Final Value
          </h3>
          <p className="text-2xl font-bold text-green-300">
            {inputValue.currency}
            {actualResults[
              actualResults.length - 1
            ]?.investmentValue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
          <h3 className="text-sm font-medium text-blue-400 mb-1">
            Total Interest Earned
          </h3>
          <p className="text-2xl font-bold text-blue-300">
            {inputValue.currency}
            {actualResults[
              actualResults.length - 1
            ]?.totalInterest.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
          <h3 className="text-sm font-medium text-purple-400 mb-1">
            Total Invested
          </h3>
          <p className="text-2xl font-bold text-purple-300">
            {inputValue.currency}
            {actualResults[
              actualResults.length - 1
            ]?.investedCapital.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Output;
