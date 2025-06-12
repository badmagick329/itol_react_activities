import { useState } from "react";

type Bot = {
  id: number;
  name: string;
  status: "Running" | "Completed" | "Stopped";
  task: string;
};

export default function BotListManager() {
  const [bots, setBots] = useState<Bot[]>([
    {
      id: 1,
      name: "Email Extractor",
      status: "Running",
      task: "Extracting emails",
    },
    {
      id: 2,
      name: "Notification Sender",
      status: "Completed",
      task: "Sending notifications",
    },
    { id: 3, name: "Data Analyzer", status: "Stopped", task: "Analyzing data" },
  ]);

  const [newBotName, setNewBotName] = useState("");
  const [newBotTask, setNewBotTask] = useState("");
  const [filter, setFilter] = useState<
    "All" | "Running" | "Completed" | "Stopped"
  >("All");

  const triggerJob = (id: number) => {
    setBots((prevBots) =>
      prevBots.map((bot) => {
        if (bot.id === id) {
          let newStatus: Bot["status"];
          switch (bot.status) {
            case "Stopped":
              newStatus = "Running";
              break;
            case "Running":
              newStatus = "Completed";
              break;
            case "Completed":
              newStatus = "Stopped";
              break;
            default:
              newStatus = "Stopped";
          }
          return { ...bot, status: newStatus };
        }
        return bot;
      })
    );
  };

  const deleteBot = (id: number) => {
    setBots((prevBots) => prevBots.filter((bot) => bot.id !== id));
  };

  const addBot = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBotName.trim() && newBotTask.trim()) {
      const newBot: Bot = {
        id: Math.max(...bots.map((b) => b.id), 0) + 1,
        name: newBotName.trim(),
        status: "Stopped",
        task: newBotTask.trim(),
      };
      setBots((prevBots) => [...prevBots, newBot]);
      setNewBotName("");
      setNewBotTask("");
    }
  };

  const filteredBots =
    filter === "All" ? bots : bots.filter((bot) => bot.status === filter);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Bot List Manager
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Add New Bot</h2>
        <form onSubmit={addBot} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Bot Name"
            value={newBotName}
            onChange={(e) => setNewBotName(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Bot Task"
            value={newBotTask}
            onChange={(e) => setNewBotTask(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Add Bot
          </button>
        </form>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-3">
          Filter by Status:
        </h3>
        <div className="flex flex-wrap gap-2">
          {["All", "Running", "Completed", "Stopped"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as typeof filter)}
              className={`px-4 py-2 rounded transition-colors ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredBots.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No bots found{filter !== "All" ? ` with status "${filter}"` : ""}.
          </div>
        ) : (
          filteredBots.map((bot) => (
            <div
              key={bot.id}
              className={`bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors ${getStatusBgColor(
                bot.status
              )}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-400">ID: {bot.id}</span>
                    <h3 className="text-xl font-semibold text-white">
                      {bot.name}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-2">{bot.task}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Status:</span>
                    <span
                      className={`font-medium ${getStatusColor(bot.status)}`}
                    >
                      {bot.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => triggerJob(bot.id)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                  >
                    Trigger Job
                  </button>
                  <button
                    onClick={() => deleteBot(bot.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-2">Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">{bots.length}</div>
            <div className="text-sm text-gray-400">Total Bots</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              {bots.filter((b) => b.status === "Running").length}
            </div>
            <div className="text-sm text-gray-400">Running</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {bots.filter((b) => b.status === "Completed").length}
            </div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">
              {bots.filter((b) => b.status === "Stopped").length}
            </div>
            <div className="text-sm text-gray-400">Stopped</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const getStatusColor = (status: Bot["status"]) => {
  switch (status) {
    case "Running":
      return "text-green-400";
    case "Completed":
      return "text-blue-400";
    case "Stopped":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
};

const getStatusBgColor = (status: Bot["status"]) => {
  switch (status) {
    case "Running":
      return "bg-green-900/30";
    case "Completed":
      return "bg-blue-900/30";
    case "Stopped":
      return "bg-red-900/30";
    default:
      return "bg-gray-900/30";
  }
};
