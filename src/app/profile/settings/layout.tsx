import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, CircleUserRound, LucideIcon, Settings } from "lucide-react";
import { ReactNode } from "react";

const settingsLink: { name: string; Icon: LucideIcon }[] = [
  {
    name: "About you",
    Icon: CircleUserRound,
  },
  {
    name: "The way you Travel",
    Icon: Briefcase,
  },
  {
    name: "Password",
    Icon: Settings,
  },
];

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-8 md:px-24">
      <div className="shadow-md p-4 mt-4">
        <h2 className="text-semibold text-neutral-900 text-3xl">Settings</h2>
      </div>
      <section className="flex flex-col space-y-8 mt-4 md:flex-row md:space-x-12">
        <div>
          <Card className="rounded-sm">
            <CardContent className="p-0 rounded-sm">
              {settingsLink.map(({ name, Icon }) => (
                <nav key={name}>
                  <div className="p-2 flex flex-row space-x-2 items-center">
                    <span>{<Icon size={18} />}</span>
                    <span className="text-base">{name}</span>
                  </div>
                  <Separator />
                </nav>
              ))}
            </CardContent>
          </Card>
        </div>
        <aside className="flex-1">{children}</aside>
      </section>
    </div>
  );
};

export default SettingsLayout;
