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
import ModularJobBoard from "@/09_ModularJobBoard/ModularJobBoard";
import StatusBoard from "@/10_StatusBoard/StatusBoard";
import JobManagementForm from "@/11_JobManagementForm/JobManagementForm";
import JobManagementForm2 from "@/12_JobManagementForm2/JobManagementForm2";
import JobManagementFormReusable from "@/13_JobManagementFormReusable/JobManagementFormReusable";
import JobManagementFormDynamic from "@/14_JobManagementFormDynamic/JobManagementFormDynamic";
import EnhancedFormHandling from "@/15_EnhancedFormHandling/EnhancedFormHandling";

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
        <Route path="/modular-job-board" element={<ModularJobBoard />} />
        <Route path="/job-management-form" element={<JobManagementForm />} />
        <Route path="/status-board" element={<StatusBoard />} />
        <Route
          path="/job-management-form-styled"
          element={<JobManagementForm2 />}
        />
        <Route
          path="/job-management-form-reusable"
          element={<JobManagementFormReusable />}
        />
        <Route
          path="/job-management-form-dynamic"
          element={<JobManagementFormDynamic />}
        />
        <Route
          path="/enhanced-form-handling"
          element={<EnhancedFormHandling />}
        />
      </Routes>
    </div>
  );
}

export default App;
