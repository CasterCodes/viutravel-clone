"use client";

import React, { FC, ReactNode, JSX, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import SecondLogo from "../../../public/secondary-logo.svg";

interface AuthModalProps {
  loginForm: JSX.Element;
  signupForm: JSX.Element;
  triggerButton: ReactNode;
}

import { X } from "lucide-react";
import Image from "next/image";

const AuthModal: FC<AuthModalProps> = ({
  loginForm,
  signupForm,
  triggerButton,
}) => {
  const [authStatus, setAuthStatus] = useState<"login" | "signup">("login");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-[70vw] min-h-[80vh] top-[55%] rounded-sm p-0 shadow-none border-none">
        <div className="absolute right-2 top-2">
          <AlertDialogCancel className="h-11 w-11 rounded-full bg-neutral-900 text-white border-none hover:bg-neutral-900 hover:text-white">
            <X size={14} />
          </AlertDialogCancel>
        </div>
        <section className="flex flex-row justify-between">
          <div className="w-[50%]">
            {authStatus === "login" ? (
              loginForm
            ) : (
              <div className="bg-red-600 rounded-tl-sm rounded-bl-sm p-12 h-full w-full flex flex-col justify-center space-y-3 items-center">
                <h2 className="text-3xl text-center font-semibold text-white">
                  Already A Member?
                </h2>
                <p className="text-white">
                  Great! Sign In To Access Your Account
                </p>
                <Button
                  onClick={() => setAuthStatus("login")}
                  size={"lg"}
                  className="bg-red-600 text-white rounded-full uppercase text-base font-semibold hover:bg-red-600 hover:text-white"
                  variant={"outline"}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
          <div className=" w-[50%]   ">
            {authStatus === "signup" ? (
              signupForm
            ) : (
              <div className="bg-red-600 rounded-tr-sm rounded-br-sm p-12 h-full w-full flex flex-col justify-center items-center">
                <Image
                  src={SecondLogo}
                  height={220}
                  width={220}
                  alt="Auth ViuRoom Logo"
                />
                <h2 className="text-3xl text-center font-semibold text-white">
                  Start your jounery with us
                </h2>
                <Button
                  onClick={() => setAuthStatus("signup")}
                  size={"lg"}
                  className="bg-red-600 text-white rounded-full mt-8 uppercase text-base font-semibold hover:bg-red-600 hover:text-white"
                  variant={"outline"}
                >
                  Create account
                </Button>
              </div>
            )}
          </div>
        </section>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthModal;
