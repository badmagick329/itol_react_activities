import { useState } from "react";

function CategorySelector() {
  const categoryStyles = {
    readEmails: { backgroundColor: "orange" },
    sendEmails: { backgroundColor: "yellow" },
    webParsing: { backgroundColor: "blue" },
    default: { backgroundColor: "white" },
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const validateCategory = (): boolean => {
    return selectedCategory !== null;
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleReset = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-semibold text-white mb-4">
        Category Selector
      </h2>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleCategorySelect("readEmails")}
          style={{
            backgroundColor:
              selectedCategory === "readEmails"
                ? categoryStyles.readEmails.backgroundColor
                : categoryStyles.default.backgroundColor,
            color: selectedCategory === "readEmails" ? "white" : "black",
            transition: "background-color 0.3s ease",
          }}
          className="px-4 py-2 rounded border"
        >
          Read Emails
        </button>

        <button
          onClick={() => handleCategorySelect("sendEmails")}
          style={{
            backgroundColor:
              selectedCategory === "sendEmails"
                ? categoryStyles.sendEmails.backgroundColor
                : categoryStyles.default.backgroundColor,
            color: selectedCategory === "sendEmails" ? "black" : "black",
            transition: "background-color 0.3s ease",
          }}
          className="px-4 py-2 rounded border"
        >
          Send Emails
        </button>

        <button
          onClick={() => handleCategorySelect("webParsing")}
          style={{
            backgroundColor:
              selectedCategory === "webParsing"
                ? categoryStyles.webParsing.backgroundColor
                : categoryStyles.default.backgroundColor,
            color: selectedCategory === "webParsing" ? "white" : "black",
            transition: "background-color 0.3s ease",
          }}
          className="px-4 py-2 rounded border"
        >
          Web Parsing
        </button>
      </div>

      <div className="mb-4">
        <p className="text-white">
          Category selected: {validateCategory() ? selectedCategory : "None"}
        </p>
        <p
          className={`text-sm ${
            validateCategory() ? "text-green-400" : "text-red-400"
          }`}
        >
          Validation: {validateCategory() ? "Valid" : "No category selected"}
        </p>
      </div>

      <button
        onClick={handleReset}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
      >
        Reset Selection
      </button>
    </div>
  );
}

function CategoryButton({
  category,
  label,
  isSelected,
  onSelect,
  style,
}: {
  category: string;
  label: string;
  isSelected: boolean;
  onSelect: (category: string) => void;
  style: { backgroundColor: string };
}) {
  return (
    <button
      onClick={() => onSelect(category)}
      style={{
        backgroundColor: isSelected ? style.backgroundColor : "white",
        color:
          isSelected && style.backgroundColor === "yellow"
            ? "black"
            : isSelected
            ? "white"
            : "black",
        transition: "background-color 0.3s ease",
      }}
      className="px-4 py-2 rounded border"
    >
      {label}
    </button>
  );
}

export default function DynamicCategorySelection() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Dynamic Category Selection
        </h1>

        <CategorySelector />
      </div>
    </div>
  );
}
