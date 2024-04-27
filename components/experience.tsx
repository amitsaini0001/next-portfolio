import { cn } from "@/lib/utils";

type Exp = {
  time: string;
  name: string;
  url: string;
};

export default function Experience() {
  const exp: Exp[] = [
    {
      time: "2023-Current, Senior Engineer",
      name: "Shell Energy",
      url: "https://shellenergy.com.au",
    },
    {
      time: "2023-Current, Founder",
      name: "Yabber",
      url: "https://yabber.ai",
    },
    {
      time: "2022-2022, Tech Lead",
      name: "Petcircle",
      url: "https://petcircle.com.au",
    },
    {
      time: "2020-2022, Tech Lead",
      name: "Tiny Tech",
      url: "https://tiny.cloud",
    },
    {
      time: "2018-2020, System Engineer",
      name: "Sita",
      url: "https://sita.aero",
    }
  ];
  return (
    <div className="flex flex-col gap-5 md:gap-12 items-end hover:cursor-image pr-0 md:pr-5 transition-opacity ease-in-out cursor-image">
      {exp.map((item, index) => (
        <a
          className={cn(`${index===0 ? 'mt-60':''}`,"flex flex-col items-end text-right mr-2 md:mr-0 md:text-left md:flex-row md:items-end md:justify-end gap-2 overflow-x-visible animate-slideIn")}
          key={`expereince-${index}`}
          href={item.url}
          target="_blank"
        >
          <p className="text-xs font-semibold">{item.time}</p>
          <p className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-normal md:font-thin transition-all 2s ease-in-out hover:opacity-50 hover:scale-105">
            {item.name}
          </p>
        </a>
      ))}
    </div>
  );
}
