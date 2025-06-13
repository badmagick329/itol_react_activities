import { useState, useEffect } from "react";

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
  onDeleteJob: (jobId: number) => void;
  onEditJob: (job: Job) => void;
};

function JobColumn({
  title,
  status,
  jobs,
  image,
  onMoveJob,
  onDeleteJob,
  onEditJob,
}: JobColumnProps) {
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-opacity-30");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("bg-opacity-30");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-opacity-30");
    const jobId = parseInt(e.dataTransfer.getData("jobId"));
    if (jobId) {
      onMoveJob(jobId, status);
    }
  };

  const handleDragStart = (e: React.DragEvent, jobId: number) => {
    e.dataTransfer.setData("jobId", jobId.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const colors = getStatusColor(status);

  return (
    <div
      className={`rounded-lg p-6 border-2 ${colors.bg} min-h-[400px] transition-all`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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
            <p className="text-gray-600 text-xs mt-1">
              Drag jobs here or use buttons
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              draggable
              onDragStart={(e) => handleDragStart(e, job.id)}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-move hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white text-sm flex-1 mr-2">
                  {job.title}
                </h4>
                <div className="flex gap-1 flex-shrink-0">
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
                  <button
                    onClick={() => onEditJob(job)}
                    className="px-2 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs rounded transition-colors"
                    title="Edit job"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete "${job.title}"?`
                        )
                      ) {
                        onDeleteJob(job.id);
                      }
                    }}
                    className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                    title="Delete job"
                  >
                    🗑️
                  </button>
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

export default function EnhancedFormHandling() {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const savedJobs = localStorage.getItem("enhancedJobs");
    if (savedJobs) {
      return JSON.parse(savedJobs);
    }
    return [
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
        dateCreated: new Date(
          Date.now() - 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
      },
      {
        id: 3,
        title: "Customer Newsletter",
        category: "Send Emails",
        status: "completed",
        dateCreated: new Date(
          Date.now() - 48 * 60 * 60 * 1000
        ).toLocaleDateString(),
      },
      {
        id: 4,
        title: "Weekly Report Emails",
        category: "Send Emails",
        status: "stopped",
        dateCreated: new Date(
          Date.now() - 72 * 60 * 60 * 1000
        ).toLocaleDateString(),
      },
    ];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("enhancedJobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    localStorage.setItem("dynamicJobs", JSON.stringify(jobs));
  }, [jobs]);
  const deleteJob = (jobId: number) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
    setSuccessMessage("Job deleted successfully!");
    console.log("Job deleted:", jobId);
  };

  const updateJobStatus = (jobId: number, newStatus: JobStatus) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
    setSuccessMessage(`Job status updated to ${newStatus}!`);
    console.log("Job status updated:", { jobId, newStatus });
  };

  const addNewJob = (
    title: string,
    category: JobCategory,
    status: JobStatus = "start"
  ) => {
    const newJob: Job = {
      id: Date.now() + Math.random(),
      title: title.trim(),
      category,
      status,
      dateCreated: new Date().toLocaleDateString(),
    };
    setJobs((prev) => [...prev, newJob]);
    setSuccessMessage("Job added successfully!");
    console.log("New job added:", newJob);
    return newJob;
  };

  const editJob = (updatedJob: Job) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
    setEditingJob(null);
    setSuccessMessage("Job updated successfully!");
    console.log("Job updated:", updatedJob);
  };

  const resetForm = () => {
    setEditingJob(null);
    setSuccessMessage("Form reset!");
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
      {
        title: "Support Ticket Processing",
        category: "Read Emails" as JobCategory,
        status: "start" as JobStatus,
      },
      {
        title: "Marketing Analytics",
        category: "Web Parsing" as JobCategory,
        status: "start" as JobStatus,
      },
    ];

    const randomJob = sampleJobs[Math.floor(Math.random() * sampleJobs.length)];
    addNewJob(randomJob.title, randomJob.category, randomJob.status);
  };

  const clearAllJobs = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all jobs? This action cannot be undone."
      )
    ) {
      setJobs([]);
    }
  };

  const exportJobs = () => {
    const dataStr = JSON.stringify(jobs, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "jobs-export.json";
    link.click();
    URL.revokeObjectURL(url);
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
          Enhanced Form Handling
        </h1>
        {successMessage && (
          <div className="mb-6 bg-green-900/20 border border-green-600 text-green-400 px-4 py-3 rounded-lg text-center">
            {successMessage}
          </div>
        )}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  {editingJob ? "Edit Job" : "Add New Job"}
                </h2>
                {editingJob && (
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium text-sm"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>{" "}
              <EnhancedJobForm
                addNewJob={addNewJob}
                editJob={editJob}
                editingJob={editingJob}
                resetForm={resetForm}
              />
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
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={addSampleJob}
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-sm"
                  >
                    🎲 Add Sample Job
                  </button>
                  <button
                    onClick={exportJobs}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
                  >
                    📁 Export Jobs
                  </button>
                  <button
                    onClick={clearAllJobs}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-sm"
                  >
                    🗑️ Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <JobColumn
            title="Need to Start"
            status="start"
            jobs={filteredJobs}
            image="🚀"
            onMoveJob={updateJobStatus}
            onDeleteJob={deleteJob}
            onEditJob={setEditingJob}
          />
          <JobColumn
            title="In Progress"
            status="running"
            jobs={filteredJobs}
            image="⚡"
            onMoveJob={updateJobStatus}
            onDeleteJob={deleteJob}
            onEditJob={setEditingJob}
          />
          <JobColumn
            title="Completed"
            status="completed"
            jobs={filteredJobs}
            image="✅"
            onMoveJob={updateJobStatus}
            onDeleteJob={deleteJob}
            onEditJob={setEditingJob}
          />
          <JobColumn
            title="Stopped"
            status="stopped"
            jobs={filteredJobs}
            image="⏹️"
            onMoveJob={updateJobStatus}
            onDeleteJob={deleteJob}
            onEditJob={setEditingJob}
          />
        </div>
        {jobs.length > 0 && (
          <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Job Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Total Jobs: {jobs.length} | Filtered: {filteredJobs.length} |
                Completion Rate:{" "}
                {jobs.length > 0
                  ? Math.round(
                      (jobs.filter((j) => j.status === "completed").length /
                        jobs.length) *
                        100
                    )
                  : 0}
                %
              </p>
            </div>
          </div>
        )}
        {jobs.length === 0 && (
          <div className="mt-8 bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Jobs Yet
            </h3>
            <p className="text-gray-400 mb-4">
              Start by adding your first job or use the sample job generator
            </p>
            <button
              onClick={addSampleJob}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              🎲 Add Sample Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function EnhancedJobForm({
  addNewJob,
  editJob,
  editingJob,
  resetForm,
}: {
  addNewJob: (title: string, category: JobCategory, status?: JobStatus) => void;
  editJob: (job: Job) => void;
  editingJob: Job | null;
  resetForm: () => void;
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

  useEffect(() => {
    if (editingJob) {
      setFormData({
        title: editingJob.title,
        category: editingJob.category,
        status: editingJob.status,
      });
      setValidationError("");
    } else {
      setFormData({
        title: "",
        category: "",
        status: "start",
      });
    }
  }, [editingJob]);

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
    if (validationError && validationError.includes("category")) {
      setValidationError("");
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setValidationError(
        "Job title is required and must be at least 1 character"
      );
      return false;
    }

    if (formData.title.trim().length < 3) {
      setValidationError("Job title must be at least 3 characters long");
      return false;
    }

    if (!formData.category) {
      setValidationError("Please select a job category");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingJob) {
      const updatedJob: Job = {
        ...editingJob,
        title: formData.title.trim(),
        category: formData.category as JobCategory,
        status: formData.status,
      };
      editJob(updatedJob);
    } else {
      addNewJob(
        formData.title.trim(),
        formData.category as JobCategory,
        formData.status
      );
    }

    setFormData({
      title: "",
      category: "",
      status: "start",
    });
    setValidationError("");
  };

  const handleReset = () => {
    resetForm();
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
            Job Title * (minimum 3 characters)
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter the job title"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            minLength={3}
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

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!formData.title.trim() || !formData.category}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {editingJob ? "Update Job" : "Add Job to Board"}
        </button>

        {editingJob && (
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
