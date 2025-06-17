import { useState } from "react";

export default function JobCounter() {
  let jobCount = 0;
  const [actualCount, setActualCount] = useState(0);

  const handleAddJob = () => {
    jobCount += 1;
    setActualCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Counter</h1>
      <p className="text-lg mb-2">
        Current Job Count: {jobCount} (this wont update)
      </p>
      <p className="text-lg mb-2">
        Actual Job Count: {actualCount} (this will update)
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer"
        onClick={handleAddJob}
      >
        Add Job
      </button>
    </div>
  );
}
