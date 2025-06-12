import { useState } from "react";
import { Link } from "react-router-dom";

type Exercise = {
  id: string;
  name: string;
  path: string;
  description?: string;
};

const exercises: Exercise[] = [
  {
    id: "profile-card",
    name: "Reusable Profile Card",
    path: "/profile-card-component",
  },
  {
    id: "react-jsx",
    name: "React JSX",
    path: "/react-jsx",
  },
  {
    id: "job-board",
    name: "Job Board",
    path: "/job-board",
  },
  {
    id: "job-counter",
    name: "Job Counter",
    path: "/job-counter",
  },
  {
    id: "styled-button",
    name: "Styled Button",
    path: "/styled-button",
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
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-64 bg-slate-800 rounded shadow-lg z-20">
              {exercises.map((exercise) => (
                <Link
                  key={exercise.id}
                  to={exercise.path}
                  onClick={closeDropdown}
                  className="block px-4 py-2 text-white hover:bg-slate-700"
                >
                  {exercise.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
