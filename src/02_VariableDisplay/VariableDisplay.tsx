export default function VariableDisplay() {
  const stringVar = "I am string";
  const numberVar = 42;
  const booleanVar = true;
  const arrayVar = ["I", "am", "array"];
  const objectVar = {
    name: "Tim",
    age: 30,
    profession: "Developer",
  };

  if (Math.random() > 0.5) {
    objectVar.profession = "Designer";
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Variable Display</h1>
      <p>String Variable: {stringVar}</p>
      <p>Number Variable: {numberVar}</p>
      <p>Boolean Variable: {booleanVar ? "True" : "False"}</p>
      <p>Array Variable: {arrayVar.join(", ")}</p>
      <p>
        Object Variable: Name - {objectVar.name}, Age - {objectVar.age},
        Profession - {objectVar.profession}
      </p>
    </div>
  );
}
