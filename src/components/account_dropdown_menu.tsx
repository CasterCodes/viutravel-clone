import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

const AccountDropdownMenu = () => {
  const { data } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-stone-800 rounded-none hover:text-red-700 hover:bg-stone-800">
          <span className="text-sm flex flex-row justify-center items-center space-z-2 font-medium">
            {data?.user?.name}
            <ChevronDown color="white" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Manage bookings</DropdownMenuLabel>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdownMenu;
