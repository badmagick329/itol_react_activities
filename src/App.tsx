import { Routes, Route, Link } from "react-router-dom";
import "./output.css";
import ProfileCardComp from "@/01_ProfileCardComp/ProfileCardComp";
import VariableDisplay from "@/02_VariableDisplay/VariableDisplay";
import JobBoard from "@/03_JobBoard/JobBoard";

export function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-amber-900 flex justify-between">
        <Link className="bg-slate-800 p-2" to="/profile-card-component">
          Reusable Profile Card
        </Link>
        <Link className="bg-slate-800 p-2" to="/react-jsx">
          React JSX
        </Link>
        <Link className="bg-slate-800 p-2" to="/job-board">
          Job Board
        </Link>
      </nav>
      <Routes>
        <Route path="/profile-card-component" element={<ProfileCardComp />} />
        <Route path="/react-jsx" element={<VariableDisplay />} />
        <Route path="/job-board" element={<JobBoard />} />
      </Routes>
    </div>
  );
}

export default App;
