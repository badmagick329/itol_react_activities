import { useState } from "react";
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

  const validateInput = (field: string, value: number) => {
    if (value <= 0) {
      return `${field} must be a positive value`;
    }
    if (isNaN(value)) {
      return `${field} must be a valid number`;
    }
    return "";
  };

  const handleChange = (inputIdentifier: string, newValue: string) => {
    const numValue = +newValue;

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
  };

  const handleReset = () => {
    setUserInput(initialValues);
    setErrors({});
  };

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
    <section className="p-4 max-w-lg mx-auto my-8 rounded bg-gray-800">
      <div className="mb-4">
        <label className="block font-bold mb-2">Currency:</label>
        <div className="flex gap-2">
          {currencies.map((curr) => (
            <button
              key={curr}
              onClick={() => handleCurrencyChange(curr)}
              className={`px-3 py-1 rounded border ${
                userInput.currency === curr
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>

      <form>
        <div className="flex justify-between gap-6 mb-2">
          <label htmlFor="initialInvestment" className="font-bold">
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
              className={`w-40 p-2 border rounded text-base ${
                errors.initialInvestment ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.initialInvestment && (
              <p className="text-red-500 text-xs mt-1">
                {errors.initialInvestment}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-6 mb-2">
          <label htmlFor="annualInvestment" className="font-bold">
            Annual Investment ({userInput.currency})
          </label>
          <div>
            <input
              type="number"
              id="annualInvestment"
              value={userInput.annualInvestment}
              onChange={(e) => handleChange("annualInvestment", e.target.value)}
              className={`w-40 p-2 border rounded text-base ${
                errors.annualInvestment ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.annualInvestment && (
              <p className="text-red-500 text-xs mt-1">
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
              className={`w-40 p-2 border rounded text-base ${
                errors.expectedReturn ? "border-red-500" : "border-gray-300"
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
              className={`w-40 p-2 border rounded text-base ${
                errors.duration ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.duration && (
              <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Reset to Default Values
          </button>
        </div>

        {!isFormValid && (
          <div className="mt-4 p-2 bg-red-100 border border-red-300 rounded">
            <p className="text-red-700 text-sm">
              Please ensure all fields have positive values.
            </p>
          </div>
        )}
      </form>
    </section>
  );
};

export default UserInput;
