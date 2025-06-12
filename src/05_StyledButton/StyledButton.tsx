export default function StyledButton() {
  let isDisabled = false;

  return (
    <div className="p-4">
      <button
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
        disabled={isDisabled}
        onClick={() => {
          if (!isDisabled) {
            alert("Button clicked!");
          }
        }}
      >
        Click Me
      </button>
    </div>
  );
}
