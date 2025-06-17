import { useState } from "react";
import { Link } from "react-router-dom";

type Exercise = {
  id: string;
  name: string;
  path: string;
};

const exercises: Exercise[] = [
  {
    id: "profile-card",
    name: "M2A1 Reusable Profile Card",
    path: "/profile-card-component",
  },
  {
    id: "react-jsx",
    name: "M2A2 React JSX",
    path: "/react-jsx",
  },
  {
    id: "job-board",
    name: "M2A3 Job Board",
    path: "/job-board",
  },
  {
    id: "styled-button",
    name: "M3A1 Styled Button",
    path: "/styled-button",
  },
  {
    id: "job-counter",
    name: "M3A2 Job Counter",
    path: "/job-counter",
  },
  {
    id: "advanced-job-counter",
    name: "M3A3 Advanced Job Counter",
    path: "/advanced-job-counter",
  },
  {
    id: "dynamic-input-form",
    name: "M3A4 Dynamic Input Form",
    path: "/dynamic-input-form",
  },
  {
    id: "bot-list-manager",
    name: "M3A5_M4A1 Bot List Manager",
    path: "/bot-list-manager",
  },
  {
    id: "modular-job-board",
    name: "M4A2-3 Modular Job Board",
    path: "/modular-job-board",
  },
  {
    id: "status-board",
    name: "M4A4 Status Board",
    path: "/status-board",
  },
  {
    id: "job-management-form",
    name: "M5A1-2 Job Management Form",
    path: "/job-management-form",
  },
  {
    id: "job-management-form-reusable",
    name: "M5A3 Job Management Form Reusable",
    path: "/job-management-form-reusable",
  },
  {
    id: "job-management-form-dynamic",
    name: "M5A4 Job Management Form Dynamic",
    path: "/job-management-form-dynamic",
  },
  {
    id: "enhanced-form-handling",
    name: "M5A5 Enhanced Form Handling",
    path: "/enhanced-form-handling",
  },
  {
    id: "multi-select-categories",
    name: "M6A1 Multi-Select Categories",
    path: "/multi-select-categories",
  },
  {
    id: "dynamic-category-selection",
    name: "M6A2 Dynamic Category Selection",
    path: "/dynamic-category-selection",
  },
  {
    id: "job-manager",
    name: "M6A3 Job Manager",
    path: "/job-manager",
  },
  {
    id: "job-manager-delete",
    name: "M6A4 Job Manager Delete",
    path: "/job-manager-delete",
  },
  {
    id: "job-manager-localstorage",
    name: "M6A5 Job Manager LocalStorage",
    path: "/job-manager-localstorage",
  },
  {
    id: "investment-calculator",
    name: "M6A6-M7 Investment Calculator",
    path: "/investment-calculator",
  },
  {
    id: "password-generator",
    name: "M8 Password Generator",
    path: "/password-generator",
  },
  {
    id: "movie-review-app",
    name: "M9 Movie Review App",
    path: "/movie-review-app",
  },
];

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-amber-900 p-4">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-white hover:text-cyan-500"
          onClick={closeDropdown}
        >
          React Exercises
        </Link>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-slate-800 text-white px-3 py-2 rounded hover:bg-slate-700"
          >
            Exercises ▼
          </button>{" "}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-[480px] bg-slate-800 rounded shadow-lg z-20 max-h-80 overflow-y-auto">
              {exercises.map((exercise) => {
                const prefix = exercise.name.split(" ", 1)[0];
                const rest = exercise.name.slice(prefix.length).trim();
                return (
                  <Link
                    key={exercise.id}
                    to={exercise.path}
                    onClick={closeDropdown}
                    className="block px-4 py-2 text-white hover:bg-slate-700 w-[480px]"
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold">{prefix}</span>
                      <span className="text-white/60">{rest}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
