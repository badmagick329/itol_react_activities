import { Routes, Route } from "react-router-dom";
import "./output.css";
import Navigation from "@/components/Navigation";
import ProfileCardComp from "@/01_ProfileCardComp/ProfileCardComp";
import VariableDisplay from "@/02_VariableDisplay/VariableDisplay";
import JobBoard from "@/03_JobBoard/JobBoard";
import StyledButton from "@/04_StyledButton/StyledButton";
import JobCounter from "@/05_JobCounter/JobCounter";
import HomePage from "@/components/HomePage";
import JobCounterWithState from "@/06_JobCounterWithState/JobCounterWithState";
import DynamicInputForm from "@/07_DynamicInputForm/DynamicInputForm";
import BotListManager from "@/08_BotListManager/BotListManager";
import ModularJobBoard from "@/09_ModularJobBoard/ModularJobBoard";
import StatusBoard from "@/10_StatusBoard/StatusBoard";
import JobManagementForm from "@/11_JobManagementForm/JobManagementForm";
import JobManagementFormReusable from "@/13_JobManagementFormReusable/JobManagementFormReusable";
import JobManagementFormDynamic from "@/14_JobManagementFormDynamic/JobManagementFormDynamic";
import EnhancedFormHandling from "@/15_EnhancedFormHandling/EnhancedFormHandling";
import MultiSelectCategories from "@/16_MultiSelectCategories/MultiSelectCategories";
import DynamicCategorySelection from "@/17_DynamicCategorySelection/DynamicCategorySelection";
import JobManager from "@/18_JobManager/JobManager";
import JobManagerDelete from "@/19_JobManagerDelete/JobManagerDelete";
import JobManagerLocalStorage from "@/20_JobManagerLocalStorage/JobManagerLocalStorage";
import CalcHeader from "@/21_CalcHeader/CalcHeader";
import PasswordGen from "@/22_PasswordGen/PasswordGen";
import MovieReviewApp from "@/23_MovieReviewApp/MovieReviewApp";

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
        <Route
          path="/multi-select-categories"
          element={<MultiSelectCategories />}
        />
        <Route
          path="/dynamic-category-selection"
          element={<DynamicCategorySelection />}
        />
        <Route path="/job-manager" element={<JobManager />} />
        <Route path="/job-manager-delete" element={<JobManagerDelete />} />
        <Route
          path="/job-manager-localstorage"
          element={<JobManagerLocalStorage />}
        />
        <Route path="/investment-calculator" element={<CalcHeader />} />
        <Route path="/password-generator" element={<PasswordGen />} />
        <Route path="/movie-review-app" element={<MovieReviewApp />} />
      </Routes>
    </div>
  );
}

export default App;
