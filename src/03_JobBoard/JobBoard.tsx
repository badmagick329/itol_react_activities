export default function JobBoard() {
  const jobCount = 5;
  const companyName = "Tech Innovations Inc.";

  const getJobMessage = (count: number): string => {
    if (count === 0) {
      return "No jobs available at the moment. Too real";
    } else if (count === 1) {
      return "We have one job opportunity!";
    } else {
      return `We have ${count} job opportunities!`;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Board</h1>
      <p className="text-lg mb-2">Company: {companyName}</p>
      <p className="text-md">{getJobMessage(jobCount)}</p>
    </div>
  );
}
