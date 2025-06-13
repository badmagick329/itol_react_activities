import Header from "@/21_CalcHeader/components/Header";

export default function CalcHeader() {
  return (
    <div className="min-h-screen bg-gray-600">
      <Header title="Investment Calculator" />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/60 rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic debitis
            beatae, ullam autem incidunt totam eligendi sint numquam, dolorum
            consequuntur cum, aliquid cumque omnis nam nulla ratione consectetur
            illum deserunt.
          </p>
        </div>
      </div>
    </div>
  );
}
