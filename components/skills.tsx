import { cn } from "@/lib/utils";

type Skl = {

    name: string;

  };
  
  export default function Skills() {
    const skl: Skl[] = [
      {
        name: "React",
      },
      {
        name: "React Native",
      },
      {
        name: "Typescript",
      },
      {
        name: "Javascript",
      },
      {
        name: "AWS",
      },
      {
        name: "Google Cloud",
      },
      {
        name: "NodeJS",
      },
      {
        name: "Rest",
      },
      {
        name: "GraphQL",
      },
      {
        name: "C#/.Net",
      },
      {
        name: "NextJS",
      },
      {
        name: "Flutter",
      },
      {
        name: "Single SPA",
      },
      {
        name: "Antora",
      },
      {
        name: "Tensor",
      },
      {
        name: "Python",
      },
      {
        name: "MySQL",
      },
      {
        name: "SQL",
      },
      {
        name: "NoSQL",
      },
      {
        name: "Agile",
      },
      {
        name: "Scrum",
      },
        
    ];
    return (
        <div className="flex flex-col gap-5 md:gap-12 items-end hover:cursor-pointer pr-0 md:pr-5 transition-opacity ease-in-out">
        {skl.map((item, index) => (
          <div
            className={cn(`${index===0 ? 'mt-60':''}`,"flex flex-col items-end mr-2 md:mr-0 text-right md:text-left md:flex-row md:items-end md:justify-end gap-2 overflow-x-visible animate-slideIn")}
            key={`skill-${index}`}
          >
            <p className="text-xl md:text-3xl lg:text-5xl xl:text-6xl font-normal md:font-thin transition-all 2s ease-in-out hover:opacity-50 hover:scale-105">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    );
  }
  