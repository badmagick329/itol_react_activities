import { useState, useCallback } from "react";
import { InputValue } from "@/21_CalcHeader/CalcHeader";

const UserInput = ({
  userInput,
  setUserInput,
  initialValues,
  currencies,
}: {
  userInput: InputValue;
  setUserInput: React.Dispatch<React.SetStateAction<InputValue>>;
  initialValues: InputValue;
  currencies: string[];
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInput = useCallback((field: string, value: number) => {
    if (isNaN(value)) {
      return `${field} must be a valid number`;
    }
    if (value <= 0) {
      return `${field} must be a positive value`;
    }
    if (field === "Expected Return" && value > 100) {
      return `${field} cannot exceed 100%`;
    }
    if (field === "Duration" && value > 50) {
      return `${field} cannot exceed 50 years`;
    }
    if (
      (field === "Initial Investment" || field === "Annual Investment") &&
      value > 10000000
    ) {
      return `${field} cannot exceed $10,000,000`;
    }
    return "";
  }, []);

  const handleChange = useCallback(
    (inputIdentifier: string, newValue: string) => {
      try {
        const numValue = parseFloat(newValue) || 0;

        setUserInput((prevUserInput) => ({
          ...prevUserInput,
          [inputIdentifier]: numValue,
        }));

        const fieldName = inputIdentifier
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        const error = validateInput(fieldName, numValue);

        setErrors((prevErrors) => ({
          ...prevErrors,
          [inputIdentifier]: error,
        }));
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [inputIdentifier]: "Invalid input format",
        }));
      }
    },
    [setUserInput, validateInput]
  );

  const handleReset = useCallback(() => {
    setUserInput(initialValues);
    setErrors({});
  }, [setUserInput, initialValues]);

  const handleCurrencyChange = (newCurrency: string) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      currency: newCurrency,
    }));
  };

  const isFormValid =
    Object.values(errors).every((error) => error === "") &&
    Object.values(userInput)
      .filter((value) => typeof value === "number")
      .every((value) => value > 0);
  return (
    <section className="max-w-lg mx-auto my-8 p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-200 mb-3">
          Currency:
        </label>
        <div className="flex gap-2 flex-wrap">
          {currencies.map((curr) => (
            <button
              key={curr}
              onClick={() => handleCurrencyChange(curr)}
              className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                userInput.currency === curr
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
              }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>{" "}
      <form>
        <div className="flex justify-between gap-6 mb-2">
          <label
            htmlFor="initialInvestment"
            className="font-bold text-gray-200"
          >
            Initial Investment
          </label>
          <div>
            <input
              type="number"
              id="initialInvestment"
              value={userInput.initialInvestment}
              onChange={(e) =>
                handleChange("initialInvestment", e.target.value)
              }
              className={`w-40 p-2 border rounded text-base bg-gray-700 text-gray-100 ${
                errors.initialInvestment ? "border-red-400" : "border-gray-600"
              } focus:outline-none focus:border-blue-500`}
            />
            {errors.initialInvestment && (
              <p className="text-red-400 text-xs mt-1">
                {errors.initialInvestment}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-6 mb-2">
          <label htmlFor="annualInvestment" className="font-bold text-gray-200">
            Annual Investment ({userInput.currency})
          </label>
          <div>
            <input
              type="number"
              id="annualInvestment"
              value={userInput.annualInvestment}
              onChange={(e) => handleChange("annualInvestment", e.target.value)}
              className={`w-40 p-2 border rounded text-base bg-gray-700 text-gray-100 ${
                errors.annualInvestment ? "border-red-400" : "border-gray-600"
              } focus:outline-none focus:border-blue-500`}
            />
            {errors.annualInvestment && (
              <p className="text-red-400 text-xs mt-1">
                {errors.annualInvestment}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-6 mb-2">
          <label htmlFor="expectedReturn" className="font-bold">
            Expected Return (%)
          </label>
          <div>
            <input
              type="number"
              id="expectedReturn"
              value={userInput.expectedReturn}
              onChange={(e) => handleChange("expectedReturn", e.target.value)}
              className={`w-40 p-2 border rounded text-base bg-gray-700 ${
                errors.expectedReturn ? "border-red-500" : "border-none"
              }`}
            />
            {errors.expectedReturn && (
              <p className="text-red-500 text-xs mt-1">
                {errors.expectedReturn}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-6 mb-4">
          <label htmlFor="duration" className="font-bold">
            Duration (years)
          </label>
          <div>
            <input
              type="number"
              id="duration"
              value={userInput.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              className={`w-40 p-2 border rounded text-base bg-gray-700 text-gray-100 ${
                errors.duration ? "border-red-400" : "border-gray-600"
              } focus:outline-none focus:border-blue-500`}
            />
            {errors.duration && (
              <p className="text-red-400 text-xs mt-1">{errors.duration}</p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          >
            Reset to Default Values
          </button>
        </div>

        {!isFormValid && (
          <div className="mt-4 p-2 bg-red-900 border border-red-700 rounded">
            <p className="text-red-300 text-sm">
              Please ensure all fields have positive values.
            </p>
          </div>
        )}
      </form>
    </section>
  );
};

export default UserInput;
