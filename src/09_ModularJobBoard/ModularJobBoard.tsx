import { useState } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  status: "open" | "completed" | "closed";
  description: string;
  datePosted: string;
};

type HeaderProps = {
  onToggleJobList: () => void;
  showJobList: boolean;
};

function Header({ onToggleJobList, showJobList }: HeaderProps) {
  return (
    <header className="bg-[#0274B3] text-white p-6 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
            alt="Job Board Logo"
            className="w-12 h-12 rounded-lg border-white border-2"
          />
          <div>
            <h1 className="text-3xl font-bold">LinkedOn</h1>
            <p className="text-blue-100">Not associated with LinkedIn</p>
          </div>
        </div>
        <button
          onClick={onToggleJobList}
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          {showJobList ? "Hide Jobs" : "Show Jobs"}
        </button>
      </div>
    </header>
  );
}

type JobItemProps = {
  job: Job;
  onDelete: (id: number) => void;
};

function JobItem({ job, onDelete }: JobItemProps) {
  const getStatusStyle = (status: Job["status"]) => {
    switch (status) {
      case "open":
        return "bg-green-900/30 text-green-400 border-green-600";
      case "completed":
        return "bg-blue-900/30 text-blue-400 border-blue-600";
      case "closed":
        return "bg-red-900/30 text-red-400 border-red-600";
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-600";
    }
  };

  const getStatusIcon = (status: Job["status"]) => {
    switch (status) {
      case "open":
        return "🟢";
      case "completed":
        return "✅";
      case "closed":
        return "🔴";
      default:
        return "⚪";
    }
  };
  return (
    <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-6 hover:shadow-lg hover:border-gray-600 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-white">{job.title}</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(
                job.status
              )}`}
            >
              {getStatusIcon(job.status)}{" "}
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>
          <p className="text-lg text-gray-300 font-medium">{job.company}</p>
          <div className="flex items-center gap-4 text-gray-400 mt-2">
            <span className="flex items-center gap-1">📍 {job.location}</span>
            <span className="flex items-center gap-1">💰 {job.salary}</span>
          </div>
        </div>
        <button
          onClick={() => onDelete(job.id)}
          className="ml-4 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Delete
        </button>
      </div>

      <p className="text-gray-300 mb-3">{job.description}</p>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Posted: {job.datePosted}</span>
        <span>ID: #{job.id}</span>
      </div>
    </div>
  );
}

type JobListProps = {
  jobs: Job[];
  onDeleteJob: (id: number) => void;
  searchTerm: string;
};

function JobList({ jobs, onDeleteJob, searchTerm }: JobListProps) {
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (filteredJobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {searchTerm ? "No jobs found" : "No jobs available"}
        </h3>
        <p className="text-gray-400">
          {searchTerm
            ? "Try adjusting your search terms"
            : "Add some jobs to get started!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Available Jobs ({filteredJobs.length})
        </h2>
        <div className="flex gap-2">
          {["open", "completed", "closed"].map((status) => {
            const count = filteredJobs.filter(
              (job) => job.status === status
            ).length;
            return (
              <span
                key={status}
                className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm border border-gray-600"
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}: {count}
              </span>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <JobItem key={job.id} job={job} onDelete={onDeleteJob} />
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-6 mt-12 border-t border-gray-700">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
            alt="Job Board Logo"
            className="w-8 h-8 rounded"
          />
          <span className="text-xl font-bold">LinkedOn</span>
        </div>
        <p className="text-gray-400 mb-2">
          Your gateway to amazing career opportunities
        </p>
        <div className="flex justify-center gap-6 text-sm text-gray-400">
          <span>© 2025 LinkedOn</span>
          <span>•</span>
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Service</span>
          <span>•</span>
          <span>Contact Us</span>
        </div>
      </div>
    </footer>
  );
}

type AddJobFormProps = {
  onAddJob: (job: Omit<Job, "id">) => void;
  onClose: () => void;
};

function AddJobForm({ onAddJob, onClose }: AddJobFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    status: "open" as Job["status"],
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.company && formData.location) {
      onAddJob({
        ...formData,
        datePosted: new Date().toLocaleDateString(),
      });
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Add New Job</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Company *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Salary
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g., $70,000 - $90,000"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="open">Open</option>
              <option value="completed">Completed</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              placeholder="Job description..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Job
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ModularJobBoard() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Senior React Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      status: "open",
      description:
        "We're looking for a senior React developer to join our dynamic team and build amazing user experiences.",
      datePosted: "2025-06-10",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$90,000 - $120,000",
      status: "completed",
      description:
        "Join our startup as a full-stack engineer and help us revolutionize the industry.",
      datePosted: "2025-06-08",
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "Design Studio",
      location: "New York, NY",
      salary: "$75,000 - $95,000",
      status: "closed",
      description:
        "Create beautiful and responsive web applications using modern frontend technologies.",
      datePosted: "2025-06-05",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "Cloud Solutions Inc",
      location: "Austin, TX",
      salary: "$110,000 - $140,000",
      status: "open",
      description:
        "Manage our cloud infrastructure and implement CI/CD pipelines for our development team.",
      datePosted: "2025-06-12",
    },
  ]);

  const [showJobList, setShowJobList] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleJobList = () => {
    setShowJobList(!showJobList);
  };

  const handleAddJob = (newJob: Omit<Job, "id">) => {
    const id = Math.max(...jobs.map((job) => job.id), 0) + 1;
    setJobs((prev) => [...prev, { ...newJob, id }]);
  };

  const handleDeleteJob = (id: number) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const addSampleJob = () => {
    const sampleJobs = [
      {
        title: "UX Designer",
        company: "Creative Agency",
        location: "Los Angeles, CA",
        salary: "$80,000 - $100,000",
        status: "open" as Job["status"],
        description:
          "Design intuitive and beautiful user experiences for our clients' digital products.",
        datePosted: new Date().toLocaleDateString(),
      },
      {
        title: "Backend Developer",
        company: "Enterprise Solutions",
        location: "Chicago, IL",
        salary: "$95,000 - $125,000",
        status: "open" as Job["status"],
        description:
          "Develop robust backend systems and APIs to support our enterprise applications.",
        datePosted: new Date().toLocaleDateString(),
      },
      {
        title: "Data Scientist",
        company: "Analytics Firm",
        location: "Boston, MA",
        salary: "$110,000 - $140,000",
        status: "open" as Job["status"],
        description:
          "Analyze large datasets to extract insights and drive business decisions.",
        datePosted: new Date().toLocaleDateString(),
      },
      {
        title: "Mobile App Developer",
        company: "App Innovators",
        location: "Seattle, WA",
        salary: "$100,000 - $130,000",
        status: "open" as Job["status"],
        description:
          "Build cutting-edge mobile applications for iOS and Android platforms.",
        datePosted: new Date().toLocaleDateString(),
      },
    ];

    const randomJob = sampleJobs[Math.floor(Math.random() * sampleJobs.length)];
    handleAddJob(randomJob);
  };
  return (
    <div className="min-h-screen bg-gray-900">
      <Header onToggleJobList={handleToggleJobList} showJobList={showJobList} />

      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                ➕ Add Job
              </button>
              <button
                onClick={addSampleJob}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                🎲 Quick Add
              </button>
            </div>
          </div>
        </div>

        {showJobList && (
          <JobList
            jobs={jobs}
            onDeleteJob={handleDeleteJob}
            searchTerm={searchTerm}
          />
        )}

        {showAddForm && (
          <AddJobForm
            onAddJob={handleAddJob}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
