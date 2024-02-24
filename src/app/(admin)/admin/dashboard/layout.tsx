import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import FirstLogo from "../../../../../public/first-logo.svg";
import { getCurrentUser } from "@/lib/data/auth";
import { Button } from "@/components/ui/button";

const dashboardLinks = [
  {
    name: "Destination",
    url: "/admin/dashboard/destinations",
  },
  {
    name: "Accommodation",
    url: "/admin/dashboard/accomodation",
  },
];

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  return (
    <main className="overflow-hidden">
      <nav className="flex px-4 py-2 shadow-md fixed w-full z-50 top-0 min-h-16 bg-neutral-900 flex-row justify-between items-center  ">
        <Link
          href={"/admin/dashboard"}
          className="text-4xl font-bold text-red-700"
        >
          <Image
            src={FirstLogo}
            alt="ViuRoam First Logo"
            height={120}
            width={120}
          />
        </Link>
        <Button className="bg-stone-800 rounded-none hover:text-red-700 hover:bg-stone-800">
          <span className="text-sm flex flex-row justify-center items-center space-z-2 font-medium">
            {user?.name}
          </span>
        </Button>
      </nav>
      <section className="flex h-full flex-row space-x-3 relative mt-16 ">
        <div className="h-[calc(100vh-64px)] fixed top-16 flex-shrink-0 overflow-y-auto inset-y-0-z-50 flex flex-col justify-between shadow-sm w-56  border-r-2 border-r-neutral-100">
          <ul className="mt-4 flex flex-col space-y-2">
            {dashboardLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="text-muted-foreground inline-block w-full p-3 hover:bg-slate-400"
                  href={link.url}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button className="brounded-none w-full hover:text-red-700 hover:bg-stone-800">
            <span className="text-sm flex flex-row justify-center items-center space-z-2 font-medium">
              Logout
            </span>
          </Button>
        </div>
        <div className="p-8 md:pl-64 w-full h-full ">{children}</div>
      </section>
    </main>
  );
};

export default DashboardLayout;
