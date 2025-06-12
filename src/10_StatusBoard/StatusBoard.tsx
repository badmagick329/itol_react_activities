import { useState } from "react";

type TicketStatus = "completed" | "in-progress" | "failed";

type Ticket = {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: "low" | "medium" | "high";
  assignee: string;
  createdAt: string;
};

type TicketInfoProps = {
  result: TicketStatus;
  image: string;
  count: number;
  tickets: Ticket[];
  onTicketClick: (tickets: Ticket[]) => void;
  onAddTicket: (status: TicketStatus) => void;
  children: React.ReactNode;
};

function TicketInfo({
  result,
  image,
  count,
  tickets,
  onTicketClick,
  onAddTicket,
  children,
}: TicketInfoProps) {
  const getStatusStyles = (status: TicketStatus) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-green-900/20 border-green-600",
          text: "text-green-400",
          icon: "✅",
          gradient: "from-green-900/30 to-green-800/20",
        };
      case "in-progress":
        return {
          bg: "bg-yellow-900/20 border-yellow-600",
          text: "text-yellow-400",
          icon: "⏳",
          gradient: "from-yellow-900/30 to-yellow-800/20",
        };
      case "failed":
        return {
          bg: "bg-red-900/20 border-red-600",
          text: "text-red-400",
          icon: "❌",
          gradient: "from-red-900/30 to-red-800/20",
        };
      default:
        return {
          bg: "bg-gray-900/20 border-gray-600",
          text: "text-gray-400",
          icon: "⚪",
          gradient: "from-gray-900/30 to-gray-800/20",
        };
    }
  };

  const styles = getStatusStyles(result);

  return (
    <div
      className={`rounded-lg border-2 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${styles.bg}`}
      onClick={() => onTicketClick(tickets)}
    >
      <div
        className={`bg-gradient-to-br ${styles.gradient} rounded-lg p-4 mb-4`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{image}</div>
            <div>
              <h3 className={`text-xl font-bold ${styles.text}`}>{children}</h3>
              <p className="text-gray-400 text-sm">
                {count} ticket{count !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className={`text-3xl ${styles.text}`}>{styles.icon}</div>
        </div>

        <div className="space-y-2 mb-4">
          {tickets.slice(0, 3).map((ticket) => (
            <div key={ticket.id} className="bg-gray-800/50 rounded p-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{ticket.title}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    ticket.priority === "high"
                      ? "bg-red-600 text-white"
                      : ticket.priority === "medium"
                      ? "bg-yellow-600 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {ticket.priority}
                </span>
              </div>
              <div className="text-gray-400 text-xs mt-1">
                {ticket.assignee}
              </div>
            </div>
          ))}
          {tickets.length > 3 && (
            <div className="text-center text-gray-400 text-sm">
              +{tickets.length - 3} more tickets
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-center">
          <button
            onClick={() => onAddTicket(result)}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

type TicketModalProps = {
  tickets: Ticket[];
  onClose: () => void;
  onUpdateStatus: (ticketId: number, newStatus: TicketStatus) => void;
  onDeleteTicket: (ticketId: number) => void;
};

function TicketModal({
  tickets,
  onClose,
  onUpdateStatus,
  onDeleteTicket,
}: TicketModalProps) {
  if (tickets.length === 0) return null;

  const status = tickets[0]?.status;
  const statusStyles = {
    completed: "text-green-400",
    "in-progress": "text-yellow-400",
    failed: "text-red-400",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${statusStyles[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}{" "}
            Tickets ({tickets.length})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {ticket.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    {ticket.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Assignee: {ticket.assignee}</span>
                    <span>Created: {ticket.createdAt}</span>
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        ticket.priority === "high"
                          ? "bg-red-600"
                          : ticket.priority === "medium"
                          ? "bg-yellow-600"
                          : "bg-green-600"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      onUpdateStatus(ticket.id, e.target.value as TicketStatus)
                    }
                    className="px-3 py-1 bg-gray-600 text-white rounded border border-gray-500 text-sm"
                  >
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                  <button
                    onClick={() => onDeleteTicket(ticket.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type AddTicketFormProps = {
  initialStatus: TicketStatus;
  onAddTicket: (ticket: Omit<Ticket, "id">) => void;
  onClose: () => void;
};

function AddTicketForm({
  initialStatus,
  onAddTicket,
  onClose,
}: AddTicketFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: initialStatus,
    priority: "medium" as Ticket["priority"],
    assignee: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.assignee) {
      onAddTicket({
        ...formData,
        createdAt: new Date().toLocaleDateString(),
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
          <h3 className="text-xl font-bold text-white">Add New Ticket</h3>
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
              Title *
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
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Describe the ticket..."
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
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Assignee *
            </label>
            <input
              type="text"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Enter assignee name"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Ticket
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

export default function StatusBoard() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      title: "Fix weird bug",
      description: "Users see some weird stuff happening",
      status: "completed",
      priority: "high",
      assignee: "Tim",
      createdAt: "2025-06-10",
    },
    {
      id: 2,
      title: "Implement better things",
      description: "Users want to see better things in the app",
      status: "in-progress",
      priority: "medium",
      assignee: "Tom",
      createdAt: "2025-06-11",
    },
    {
      id: 3,
      title: "Add database",
      description: "Users want their data to persist",
      status: "failed",
      priority: "high",
      assignee: "Jim",
      createdAt: "2025-06-09",
    },
    {
      id: 4,
      title: "Write docs",
      description: "Devs want to be able to understand the code",
      status: "completed",
      priority: "low",
      assignee: "Kim",
      createdAt: "2025-06-08",
    },
    {
      id: 5,
      title: "Optimise Things",
      description: "Users don't like 5 second delays after every action",
      status: "in-progress",
      priority: "medium",
      assignee: "Bob",
      createdAt: "2025-06-12",
    },
    {
      id: 6,
      title: "Add security",
      description: "Users dont like their passwords leaking",
      status: "failed",
      priority: "high",
      assignee: "Me",
      createdAt: "2025-06-07",
    },
  ]);

  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormStatus, setAddFormStatus] =
    useState<TicketStatus>("in-progress");

  const completedTickets = tickets.filter(
    (ticket) => ticket.status === "completed"
  );
  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "in-progress"
  );
  const failedTickets = tickets.filter((ticket) => ticket.status === "failed");

  const handleTicketClick = (tickets: Ticket[]) => {
    setSelectedTickets(tickets);
    setShowModal(true);
  };

  const handleAddTicket = (status: TicketStatus) => {
    setAddFormStatus(status);
    setShowAddForm(true);
  };

  const handleAddNewTicket = (newTicket: Omit<Ticket, "id">) => {
    const id = Math.max(...tickets.map((t) => t.id), 0) + 1;
    setTickets((prev) => [...prev, { ...newTicket, id }]);
  };

  const handleUpdateStatus = (ticketId: number, newStatus: TicketStatus) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
    setSelectedTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const handleDeleteTicket = (ticketId: number) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
    setSelectedTickets((prev) =>
      prev.filter((ticket) => ticket.id !== ticketId)
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            📊 Status Board
          </h1>
          <p className="text-gray-400 text-lg">
            Track your project tickets and their current status
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {tickets.length}
              </div>
              <div className="text-sm text-gray-400">Total Tickets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {completedTickets.length}
              </div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {inProgressTickets.length}
              </div>
              <div className="text-sm text-gray-400">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">
                {failedTickets.length}
              </div>
              <div className="text-sm text-gray-400">Failed</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TicketInfo
            result="completed"
            image="🎉"
            count={completedTickets.length}
            tickets={completedTickets}
            onTicketClick={handleTicketClick}
            onAddTicket={handleAddTicket}
          >
            Completed
          </TicketInfo>

          <TicketInfo
            result="in-progress"
            image="⚙️"
            count={inProgressTickets.length}
            tickets={inProgressTickets}
            onTicketClick={handleTicketClick}
            onAddTicket={handleAddTicket}
          >
            In Progress
          </TicketInfo>

          <TicketInfo
            result="failed"
            image="💥"
            count={failedTickets.length}
            tickets={failedTickets}
            onTicketClick={handleTicketClick}
            onAddTicket={handleAddTicket}
          >
            Failed
          </TicketInfo>
        </div>

        {showModal && (
          <TicketModal
            tickets={selectedTickets}
            onClose={() => setShowModal(false)}
            onUpdateStatus={handleUpdateStatus}
            onDeleteTicket={handleDeleteTicket}
          />
        )}

        {showAddForm && (
          <AddTicketForm
            initialStatus={addFormStatus}
            onAddTicket={handleAddNewTicket}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </div>
    </div>
  );
}
