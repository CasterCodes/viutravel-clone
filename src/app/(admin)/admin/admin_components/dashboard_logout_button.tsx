"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const DashboardLogoutButton = () => {
  return (
    <Button
      onClick={() => signOut()}
      className="rounded-none w-full bg-neutral-800  hover:bg-stone-800"
    >
      <span className="text-sm flex flex-row justify-center items-center space-z-2 font-medium">
        Logout
      </span>
    </Button>
  );
};

export default DashboardLogoutButton;
