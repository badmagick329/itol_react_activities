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

type JobColumnProps = {
  title: string;
  status: JobStatus;
  jobs: Job[];
  image: string;
  onMoveJob: (jobId: number, newStatus: JobStatus) => void;
};

function JobColumn({ title, status, jobs, image, onMoveJob }: JobColumnProps) {
  const filteredJobs = jobs.filter((job) => job.status === status);

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case "start":
        return {
          bg: "bg-blue-900/20 border-blue-600",
          text: "text-blue-400",
          buttonBg: "bg-blue-600 hover:bg-blue-700",
        };
      case "running":
        return {
          bg: "bg-green-900/20 border-green-600",
          text: "text-green-400",
          buttonBg: "bg-green-600 hover:bg-green-700",
        };
      case "completed":
        return {
          bg: "bg-cyan-900/20 border-cyan-600",
          text: "text-cyan-400",
          buttonBg: "bg-cyan-600 hover:bg-cyan-700",
        };
      case "stopped":
        return {
          bg: "bg-red-900/20 border-red-600",
          text: "text-red-400",
          buttonBg: "bg-red-600 hover:bg-red-700",
        };
      default:
        return {
          bg: "bg-gray-900/20 border-gray-600",
          text: "text-gray-400",
          buttonBg: "bg-gray-600 hover:bg-gray-700",
        };
    }
  };

  const getNextStatus = (currentStatus: JobStatus): JobStatus | null => {
    switch (currentStatus) {
      case "start":
        return "running";
      case "running":
        return "completed";
      case "completed":
        return null;
      case "stopped":
        return "start";
      default:
        return null;
    }
  };

  const getPrevStatus = (currentStatus: JobStatus): JobStatus | null => {
    switch (currentStatus) {
      case "running":
        return "start";
      case "completed":
        return "running";
      case "stopped":
        return null;
      case "start":
        return null;
      default:
        return null;
    }
  };

  const colors = getStatusColor(status);

  return (
    <div className={`rounded-lg p-6 border-2 ${colors.bg} min-h-[400px]`}>
      {" "}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-2xl">{image}</div>
        <div>
          <h3 className={`text-xl font-bold ${colors.text}`}>{title}</h3>
          <p className="text-gray-400 text-sm">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-gray-500 text-sm">No jobs in this status</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white text-sm">
                  {job.title}
                </h4>
                <div className="flex gap-1">
                  {getPrevStatus(job.status) && (
                    <button
                      onClick={() =>
                        onMoveJob(job.id, getPrevStatus(job.status)!)
                      }
                      className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                      title="Move backwards"
                    >
                      ←
                    </button>
                  )}
                  {getNextStatus(job.status) && (
                    <button
                      onClick={() =>
                        onMoveJob(job.id, getNextStatus(job.status)!)
                      }
                      className={`px-2 py-1 ${colors.buttonBg} text-white text-xs rounded transition-colors`}
                      title="Move forward"
                    >
                      →
                    </button>
                  )}
                  {job.status !== "stopped" && (
                    <button
                      onClick={() => onMoveJob(job.id, "stopped")}
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                      title="Stop job"
                    >
                      ⏹
                    </button>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-400 mb-2">
                <span className="inline-block px-2 py-1 bg-gray-700 rounded">
                  {job.category}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Created: {job.dateCreated}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function JobManagementFormReusable() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Daily Email Processing",
      category: "Read Emails",
      status: "start",
      dateCreated: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      title: "Website Data Extraction",
      category: "Web Parsing",
      status: "running",
      dateCreated: new Date(Date.now() - 86400000).toLocaleDateString(),
    },
    {
      id: 3,
      title: "Customer Newsletter",
      category: "Send Emails",
      status: "completed",
      dateCreated: new Date(Date.now() - 172800000).toLocaleDateString(),
    },
    {
      id: 4,
      title: "Weekly Report Emails",
      category: "Send Emails",
      status: "stopped",
      dateCreated: new Date(Date.now() - 259200000).toLocaleDateString(),
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMoveJob = (jobId: number, newStatus: JobStatus) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  const addSampleJob = () => {
    const sampleJobs = [
      {
        title: "Monthly Report Processing",
        category: "Read Emails" as JobCategory,
        status: "start" as JobStatus,
      },
      {
        title: "Product Data Scraping",
        category: "Web Parsing" as JobCategory,
        status: "start" as JobStatus,
      },
      {
        title: "Welcome Email Campaign",
        category: "Send Emails" as JobCategory,
        status: "start" as JobStatus,
      },
      {
        title: "Social Media Data Mining",
        category: "Web Parsing" as JobCategory,
        status: "start" as JobStatus,
      },
    ];

    const randomJob = sampleJobs[Math.floor(Math.random() * sampleJobs.length)];
    const newJob: Job = {
      id: Date.now(),
      title: randomJob.title,
      category: randomJob.category,
      status: randomJob.status,
      dateCreated: new Date().toLocaleDateString(),
    };

    setJobs((prev) => [...prev, newJob]);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Reusable Job Management Board
        </h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white mb-6">
                Add New Job
              </h2>
              <JobForm setJobs={setJobs} />
            </div>
            <div className="lg:w-80">
              <h3 className="text-lg font-semibold text-white mb-4">
                Controls
              </h3>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by title or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </div>
                </div>
                <button
                  onClick={addSampleJob}
                  className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium hover:cursor-pointer"
                >
                  🎲 Add Sample Job
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <JobColumn
            title="Need to Start"
            status="start"
            jobs={filteredJobs}
            image="🚀"
            onMoveJob={handleMoveJob}
          />
          <JobColumn
            title="In Progress"
            status="running"
            jobs={filteredJobs}
            image="⚡"
            onMoveJob={handleMoveJob}
          />
          <JobColumn
            title="Completed"
            status="completed"
            jobs={filteredJobs}
            image="✅"
            onMoveJob={handleMoveJob}
          />
          <JobColumn
            title="Stopped"
            status="stopped"
            jobs={filteredJobs}
            image="⏹️"
            onMoveJob={handleMoveJob}
          />
        </div>

        {jobs.length > 0 && (
          <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Job Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {jobs.filter((j) => j.status === "start").length}
                </div>
                <div className="text-sm text-gray-400">To Start</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {jobs.filter((j) => j.status === "running").length}
                </div>
                <div className="text-sm text-gray-400">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {jobs.filter((j) => j.status === "completed").length}
                </div>
                <div className="text-sm text-gray-400">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">
                  {jobs.filter((j) => j.status === "stopped").length}
                </div>
                <div className="text-sm text-gray-400">Stopped</div>
              </div>
            </div>
          </div>
        )}
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Initial Status
          </label>
          <select
            value={formData.status}
            onChange={handleStatusChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            <option value="start">Need to Start</option>
            <option value="running">In Progress</option>
            <option value="completed">Completed</option>
            <option value="stopped">Stopped</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Job Category *
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategorySelect(category)}
              className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
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

      {validationError && (
        <div className="text-red-400 text-sm bg-red-900/20 border border-red-600 rounded-lg p-3">
          {validationError}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium hover:cursor-pointer"
      >
        Add Job to Board
      </button>
    </form>
  );
}
