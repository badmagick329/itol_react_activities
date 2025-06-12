import { useState } from "react";

export default function JobCounterWithState() {
  const [jobCount, setJobCount] = useState(0);
  const [environment, setEnvironment] = useState("Production");

  const handleAddJob = () => {
    setJobCount((prevCount) => prevCount + 1);
  };

  const handleRemoveJob = () => {
    setJobCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  const handleResetJobs = () => {
    if (environment === "Production") {
      alert("nooo you nuked production 😩 rip");
    }
    setJobCount(0);
  };

  const toggleEnvironment = () => {
    setEnvironment((prevEnv) =>
      prevEnv === "Production" ? "UAT" : "Production"
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Advanced Job Counter</h1>
      <p className="text-lg mb-2">Current Jobs: {jobCount}</p>
      <p className="text-lg mb-2">Environment: {environment}</p>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        onClick={handleAddJob}
      >
        Add Job
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        onClick={handleRemoveJob}
      >
        Remove Job
      </button>
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
        onClick={handleResetJobs}
      >
        Reset Jobs
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={toggleEnvironment}
      >
        Toggle Environment
      </button>

      {jobCount === 0 && <p>No jobs available</p>}
      {jobCount > 0 && jobCount <= 5 && <p>Few jobs available</p>}
      {jobCount > 5 && <p>Many jobs available</p>}
    </div>
  );
}
