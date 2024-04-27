"use client";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import { ThemeToggle } from "@/components/theme-toggle";
import VantaBackground from "@/components/vanta-background";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

async function getIpAdress() {
  const response = await fetch("https://ipapi.co/json/");
  if (response.ok) {
    const ip = await response.json();
    return ip;
  }
  return null;
}

export default function Home() {
  const { theme } = useTheme();
  const [nav, setNav] = useState("exp");
  const [ipdata, setIP] = useState<any>();
  const [state, setState] = useState("Loading");
  const year = new Date().getFullYear();

  useEffect(() => {
    async function initialSetup() {
      const ip = await getIpAdress();
      if (ip) {
        setState("Done");
        setIP(ip);
        return;
      }
      setState("Failed");
    }
    initialSetup();
  }, []);

  return (
    <main className="h-screen w-screen"> 
      <div className="fixed border border-[color:var(--border-color)] rounded-sm left-10 top-10 right-10 bottom-10 backdrop-blur-sm">
      <VantaBackground>
        <div className="p-5 lg:p-8 grid grid-cols-2 gap-1 h-full animate-fadeIn">
          <div className="container font-sans flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-6xl font-bold">Amit Saini</h1>
              <h3 className="font-semibold">Software Wizard Based in 🇦🇺</h3>
              <div className="mt-3 flex justify-start items-start gap-2">
                <a href="https://www.linkedin.com/in/meisamit" target="_blank">
                <svg
                  id="linked-in"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  stroke="currentColor"
                  fill="currentColor"
                  className="w-8 h-8 cursor-pointer hover:opacity-50"
                >
                  <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                </svg>
                </a>

                <a href="https://github.com/amitsaini0001" target="_blank">
                <svg
                  id="github"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  stroke="currentColor"
                  fill="currentColor"
                  className="w-8 h-8 cursor-pointer hover:opacity-50"
                >
                  <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
                </svg>
                </a>

                <a>
                <svg
                id="cv-download"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  className="w-8 h-8 cursor-pointer hover:opacity-50"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                </a>
              </div>
            </div>
            <div className="flex flex-col text-sm mt-10 cursor-pointer gap-y-3">
              <li
                onClick={() => setNav("exp")}
                className={cn(
                  nav === "exp" ? " text-md md:text-2xl" : "opacity-50",
                  "font-semibold hover:opacity-100 "
                )}
              >
                Experience
              </li>
              <li
                onClick={() => setNav("skills")}
                className={cn(
                  nav === "skills" ? " text-md md:text-2xl" : "opacity-50",
                  "font-semibold hover:opacity-100"
                )}
              >
                Skills
              </li>

              <li
                onClick={() => setNav("contact")}
                className={cn(
                  nav === "contact" ? " text-md md:text-2xl" : "opacity-50",
                  "font-semibold hover:opacity-100"
                )}
              >
                Contact
              </li>
              
            </div>
            <div className="text-xs md:text-md">
              <p className="font-extrabold">A little about you.</p>
              <div>
                <div className="border border-[color:var(--border-color)] p-1 md:p-2 font-semibold">
                  <p>
                    IP:{" "}
                    {state === "Loading"
                      ? " Loading.."
                      : state === "Done" && ipdata.ip
                      ? `${ipdata.ip}`
                      : "Not available"}
                  </p>
                  <p>
                    City:{" "}
                    {state === "Loading"
                      ? " Loading.."
                      : state === "Done" && ipdata.city
                      ? `${ipdata.city}`
                      : "Not available"}
                  </p>
                  <div className="flex items-center justify-start gap-1">
                    <p>
                      Country:{" "}
                      {state === "Loading"
                        ? " Loading.."
                        : state === "Done" && ipdata.country
                        ? `${ipdata.country}`
                        : "Not available"}
                    </p>{" "}
                    {ipdata && ipdata.country ? (
                      <ReactCountryFlag countryCode={ipdata.country} />
                    ) : (
                      ""
                    )}
                  </div>
                  <p>
                    Timezone:{" "}
                    {state === "Loading"
                      ? " Loading.."
                      : state === "Done" && ipdata.timezone
                      ? `${ipdata.timezone}`
                      : "Not available"}
                  </p>
                  <p>
                    Provider:{" "}
                    {state === "Loading"
                      ? " Loading.."
                      : state === "Done" && ipdata.org
                      ? `${ipdata.org}`
                      : "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container overflow-y-scroll max-h-[85vh] no-scrollbar">
            <div className="w-full h-full ">
              {nav === "exp" && <Experience/>}
              {nav === "skills" && <Skills />}
              {nav === "contact" && <Contact />}
            </div>
          </div>
        </div>
        </VantaBackground>
      </div>
      <div className="fixed bottom-10 left-3">
        <ThemeToggle />
      </div>

      <div className="font-elite fixed -rotate-90 top-20 -left-7 text-lg font-bold ">
        <h3>Amit Saini .</h3>
      </div>
      <div className="fixed bottom-3 left-0 text-xs w-full pl-10 pr-10 flex gap-1">
      <h3 className="truncate">©Copyright {year}.</h3>
      <h3 className="truncate flex-1 max-w-full text-right">Built with ❤️+☕ using ThreeJs and NextJs.</h3>
      </div>
    </main>
  );
}
