import React, { useState, useRef } from "react";

const MIN_LENGTH = 3;

export default function DynamicInputForm() {
  const [inputValue, setInputValue] = useState("");

  const [submittedItems, setSubmittedItems] = useState<string[]>([]);

  const [validationError, setValidationError] = useState("");
  const renderCount = useRef(0);

  console.log("Component rendered with inputValue:", inputValue);
  renderCount.current += 1;
  console.log("Render count:", renderCount.current);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input changed:", event.target.value);
    const value = event.target.value;
    setInputValue(value);

    if (validationError && value.length >= MIN_LENGTH) {
      setValidationError("");
    }
  };

  const handleReset = () => {
    console.log("Reset button clicked");
    setInputValue("");
    setValidationError("");
  };

  const handleSubmit = () => {
    console.log("Submit button clicked");

    if (inputValue.trim().length < MIN_LENGTH) {
      setValidationError(
        `Input must be at least ${MIN_LENGTH} characters long`
      );
      return;
    }

    if (inputValue.trim()) {
      setSubmittedItems((prev) => [...prev, inputValue.trim()]);
      setInputValue("");
      setValidationError("");
    }
  };

  const clearSubmittedItems = () => {
    setSubmittedItems([]);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Dynamic Input Form
      </h1>

      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type something..."
            className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
          />

          <div className="mt-2 text-sm text-gray-400">
            Character count: {inputValue.length}
          </div>

          {validationError && (
            <div className="mt-2 text-sm text-red-400">{validationError}</div>
          )}

          <div className="mt-4 space-x-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reset
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Current Input:</h2>
          <p className="text-cyan-400 break-words">
            {inputValue || (
              <span className="text-gray-500 italic">Nothing typed yet...</span>
            )}
          </p>
        </div>

        {submittedItems.length > 0 && (
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Submitted Items:</h2>
              <button
                onClick={clearSubmittedItems}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
              >
                Clear All
              </button>
            </div>
            <ul className="space-y-2">
              {submittedItems.map((item, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-700 rounded text-gray-300"
                >
                  {index + 1}. {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-gray-800 p-4 rounded-lg text-sm text-gray-400">
          <p>
            <strong>Re-render Demo:</strong> Check the browser console to see
            when the component re-renders!
          </p>
          <p>
            <strong>Validation:</strong> Input must be at least {MIN_LENGTH}{" "}
            characters to submit.
          </p>
        </div>
      </div>
    </div>
  );
}
