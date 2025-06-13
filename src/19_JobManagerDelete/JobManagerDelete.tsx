import { useState } from "react";

type JobStatus = "Need to Complete" | "In Progress" | "Completed";
type JobCategory = "Read Emails" | "Send Emails" | "Web Parsing";

type Job = {
  id: number;
  activity: string;
  categories: JobCategory[];
  status: JobStatus;
};

function JobCard({
  job,
  deleteJob,
}: {
  job: Job;
  deleteJob: (jobId: number) => void;
}) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600 mb-3">
      <h3 className="font-semibold text-white mb-2">{job.activity}</h3>
      <div className="flex flex-wrap gap-1 mb-2">
        {job.categories.map((category, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-600 text-blue-100 text-xs rounded"
          >
            {category}
          </span>
        ))}
      </div>
      <button
        onClick={() => deleteJob(job.id)}
        className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
      >
        Delete
      </button>
    </div>
  );
}

function JobColumn({
  title,
  status,
  jobs,
  deleteJob,
}: {
  title: string;
  status: JobStatus;
  jobs: Job[];
  deleteJob: (jobId: number) => void;
}) {
  const filteredJobs = jobs.filter((job) => job.status === status);

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 min-h-96">
      <h2 className="text-lg font-bold text-white mb-4">{title}</h2>
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} deleteJob={deleteJob} />
      ))}
    </div>
  );
}

export default function JobManager() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [activity, setActivity] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<JobCategory[]>(
    []
  );
  const [status, setStatus] = useState<JobStatus>("Need to Complete");

  const availableCategories: JobCategory[] = [
    "Read Emails",
    "Send Emails",
    "Web Parsing",
  ];

  const deleteJob = (jobId: number) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  const resetForm = () => {
    setActivity("");
    setSelectedCategories([]);
    setStatus("Need to Complete");
  };

  const handleCategoryChange = (category: JobCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activity.trim() && selectedCategories.length > 0) {
      const newJob: Job = {
        id: Date.now(),
        activity: activity.trim(),
        categories: [...selectedCategories],
        status: status,
      };

      setJobs((prev) => [...prev, newJob]);
      resetForm();
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Job Manager
        </h1>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Add New Job</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Activity
              </label>
              <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="Enter job activity..."
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Categories (Select multiple)
              </label>
              <div className="space-y-2">
                {availableCategories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-300">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as JobStatus)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                <option value="Need to Complete">Need to Complete</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Add Job
            </button>
          </form>
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <JobColumn
            title="Need to Complete"
            status="Need to Complete"
            jobs={jobs}
            deleteJob={deleteJob}
          />
          <JobColumn
            title="In Progress"
            status="In Progress"
            jobs={jobs}
            deleteJob={deleteJob}
          />
          <JobColumn
            title="Completed"
            status="Completed"
            jobs={jobs}
            deleteJob={deleteJob}
          />
        </div>
      </div>
    </div>
  );
}
