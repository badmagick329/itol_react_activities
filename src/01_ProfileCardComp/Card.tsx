export default function Card({
  name,
  image,
  jobTitle,
  bio,
  skills,
}: {
  name: string;
  image: string;
  jobTitle: string;
  bio: React.JSX.Element;
  skills: { name: string; url: string }[];
}) {
  console.log(skills);
  return (
    <div className="bg-white/10 rounded-md p-6 max-w-lg">
      <img
        src={image}
        alt={name}
        className="w-full h-32 object-contain rounded-md"
      />
      <h2 className="text-xl font-semibold mt-4">{name}</h2>
      <p className="text-gray-400 text-sm">title: {jobTitle}</p>
      <div>{bio}</div>
      <h3 className="mt-4 text-lg font-semibold">Skills</h3>
      <ul className="list-disc list-inside">
        {skills.map((skill) => (
          <li key={skill.name}>
            <a href={skill.url} className="text-cyan-500">
              {skill.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Bio({ name, ability }: { name: string; ability: string }) {
  return (
    <p>
      {name} is an expert in
      <span className="font-semibold text-cyan-500"> {ability}</span>
    </p>
  );
}
