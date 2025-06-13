import { useState } from "react";

type JobCategory = "Read Emails" | "Web Parsing" | "Send Emails";
type JobStatus = "start" | "running" | "completed" | "stopped";

type Job = {
  id: number;
  title: string;
  category: JobCategory;
  status: JobStatus;
  dateCreated: string;
};

export default function JobManagementForm() {
  const [jobs, setJobs] = useState<Job[]>([]);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Job Management Form (yes it's the same component)
        </h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-6">Add New Job</h2>
          <JobForm setJobs={setJobs} />
        </div>
        <JobList jobs={jobs} />
      </div>
    </div>
  );
}

function JobForm({
  setJobs,
}: {
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}) {
  const categories: JobCategory[] = [
    "Read Emails",
    "Web Parsing",
    "Send Emails",
  ];
  const [formData, setFormData] = useState({
    title: "",
    category: "" as JobCategory | "",
    status: "start" as JobStatus,
  });
  const [validationError, setValidationError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (validationError && value.trim()) {
      setValidationError("");
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.value as JobStatus,
    }));
  };

  const handleCategorySelect = (category: JobCategory) => {
    setFormData((prev) => ({
      ...prev,
      category,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setValidationError("Job title is required");
      return;
    }

    if (!formData.category) {
      setValidationError("Please select a job category");
      return;
    }

    const newJob: Job = {
      id: Date.now(),
      title: formData.title.trim(),
      category: formData.category,
      status: formData.status,
      dateCreated: new Date().toLocaleDateString(),
    };

    setJobs((prev) => [...prev, newJob]);

    setFormData({
      title: "",
      category: "",
      status: "start",
    });
    setValidationError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Job Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter the job title"
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Job Category *
        </label>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategorySelect(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                formData.category === category
                  ? "bg-blue-600 text-white border-blue-500"
                  : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
              } border`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Job Status
        </label>
        <select
          value={formData.status}
          onChange={handleStatusChange}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        >
          <option value="start">Start Process</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
          <option value="stopped">Stopped</option>
        </select>
      </div>

      {validationError && (
        <div className="text-red-400 text-sm bg-red-900/20 border border-red-600 rounded-lg p-3">
          {validationError}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
      >
        Add Job
      </button>
    </form>
  );
}

function JobList({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) {
    return null;
  }

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case "start":
        return "text-blue-400";
      case "running":
        return "text-green-400";
      case "completed":
        return "text-cyan-400";
      case "stopped":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };
  const getStatusIcon = (status: JobStatus) => {
    switch (status) {
      case "start":
        return "🚀";
      case "running":
        return "🟢";
      case "completed":
        return "✅";
      case "stopped":
        return "🔴";
      default:
        return "⚪";
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-semibold text-white mb-4">
        Created Jobs ({jobs.length})
      </h2>
      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-gray-700 rounded-lg p-4 border border-gray-600"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white">{job.title}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-gray-400 text-sm">
                    Category:{" "}
                    <span className="text-cyan-400">{job.category}</span>
                  </span>
                  <span className="text-gray-400 text-sm">
                    Created: {job.dateCreated}
                  </span>
                </div>
              </div>
              <div
                className={`flex items-center gap-2 ${getStatusColor(
                  job.status
                )}`}
              >
                <span>{getStatusIcon(job.status)}</span>
                <span className="font-medium capitalize">{job.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
