import { cn } from "@/lib/utils";


export default function Contact() {

  return (
    <div className="flex flex-col gap-5 md:gap-12 items-end hover:cursor-image pr-0 md:pr-5 transition-opacity ease-in-out cursor-image">

        <div
          className={"mt-72 flex flex-col items-end text-right mr-2 md:mr-0 md:text-left md:flex-row md:items-end md:justify-end gap-2 overflow-x-visible animate-slideIn"}
        >
          <p className="text-xs font-semibold">bneamit@gmail.com</p>
          <a className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-normal md:font-thin transition-all 2s ease-in-out hover:opacity-50 hover:scale-105"
          href={'mailto:bneamit@gmail.com'}
 
          >
            Send Me Hi
          </a>
        </div>

        <div
          className={"flex flex-col items-end text-right mr-2 md:mr-0 md:text-left md:flex-row md:items-end md:justify-end gap-2 overflow-x-visible animate-slideIn"}
        >
          <p className="text-xs font-semibold">(+61) 0497845880</p>
          <a className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-normal md:font-thin transition-all 2s ease-in-out hover:opacity-50 hover:scale-105"
          href={'tel:+61497845880'}

          >
            Hear My Voice
          </a>
        </div>

    </div>
  );
}
