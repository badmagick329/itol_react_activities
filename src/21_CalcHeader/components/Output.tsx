import { calculateInvestmentResults } from "../util/investments";
import { InputValue } from "@/21_CalcHeader/CalcHeader";

const Output = ({ inputValue }: { inputValue: InputValue }) => {
  const resultData = calculateInvestmentResults({
    initialInvestment: +inputValue.initialInvestment,
    annualInvestment: +inputValue.annualInvestment,
    expectedReturn: +inputValue.expectedReturn,
    duration: +inputValue.duration,
  });

  if (!resultData || resultData.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-800 rounded-lg shadow-md">
        <p className="text-center text-gray-500">
          No investment data to display.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Investment Results
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-400 rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-slate-600 text-white">
              <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-4 text-right font-semibold text-sm uppercase tracking-wider">
                Investment Value
              </th>
              <th className="px-6 py-4 text-right font-semibold text-sm uppercase tracking-wider">
                Interest (Year)
              </th>
              <th className="px-6 py-4 text-right font-semibold text-sm uppercase tracking-wider">
                Total Interest
              </th>
              <th className="px-6 py-4 text-right font-semibold text-sm uppercase tracking-wider">
                Invested Capital
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {resultData.map((yearData, index) => (
              <tr
                key={index}
                className={`
                  transition-colors duration-200 hover:bg-gray-200
                  ${index % 2 === 0 ? "bg-gray-100 " : "bg-gray-200 "}
                `}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {yearData.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-medium">
                  {inputValue.currency}
                  {yearData.investmentValue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 font-medium">
                  {inputValue.currency}
                  {yearData.interest.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-600 font-medium">
                  {inputValue.currency}
                  {yearData.totalInterest.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700 font-medium">
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
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-sm font-medium text-green-800 mb-1">
            Final Value
          </h3>
          <p className="text-2xl font-bold text-green-900">
            {inputValue.currency}
            {resultData[resultData.length - 1]?.investmentValue.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-800 mb-1">
            Total Interest Earned
          </h3>
          <p className="text-2xl font-bold text-blue-900">
            {inputValue.currency}
            {resultData[resultData.length - 1]?.totalInterest.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="text-sm font-medium text-purple-800 mb-1">
            Total Invested
          </h3>
          <p className="text-2xl font-bold text-purple-900">
            {inputValue.currency}
            {resultData[resultData.length - 1]?.investedCapital.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Output;
