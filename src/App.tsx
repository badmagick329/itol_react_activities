import { Routes, Route } from "react-router-dom";
import "./output.css";
import Navigation from "@/components/Navigation";
import ProfileCardComp from "@/01_ProfileCardComp/ProfileCardComp";
import VariableDisplay from "@/02_VariableDisplay/VariableDisplay";
import JobBoard from "@/03_JobBoard/JobBoard";
import JobCounter from "@/04_JobCounter/JobCounter";
import HomePage from "@/components/HomePage";
import StyledButton from "@/05_StyledButton/StyledButton";
import JobCounterWithState from "@/06_JobCounterWithState/JobCounterWithState";
import DynamicInputForm from "@/07_DynamicInputForm/DynamicInputForm";
import BotListManager from "@/08_BotListManager/BotListManager";

export function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile-card-component" element={<ProfileCardComp />} />
        <Route path="/react-jsx" element={<VariableDisplay />} />
        <Route path="/job-board" element={<JobBoard />} />
        <Route path="/job-counter" element={<JobCounter />} />
        <Route path="/styled-button" element={<StyledButton />} />
        <Route path="/advanced-job-counter" element={<JobCounterWithState />} />
        <Route path="/dynamic-input-form" element={<DynamicInputForm />} />
        <Route path="/bot-list-manager" element={<BotListManager />} />
      </Routes>
    </div>
  );
}

export default App;
