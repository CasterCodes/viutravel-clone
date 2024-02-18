"use client";

import React from "react";
import {
  Phone,
  Mail,
  Facebook,
  TwitterIcon,
  Instagram,
  LinkedinIcon,
  Bed,
  Palmtree,
  CircleUserRound,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

import LoginForm from "../forms/login_form";
import AuthModal from "../modals/auth_modal";
import SignupForm from "../forms/signup_form";
import FirstLogo from "../../../public/first-logo.svg";
import Image from "next/image";

const TopNavBar = () => {
  return (
    <nav>
      <TopBar />
      <div className="bg-neutral-900 flex flex-row items-center justify-between px-24">
        <ul className="flex py-3 flex-row items-center space-x-2">
          <li>
            <Link href={"/"} className="text-4xl font-bold text-red-700">
              <Image
                src={FirstLogo}
                alt="ViuRoam First Logo"
                height={120}
                width={120}
              />
            </Link>
          </li>
          <li className="text-white border-l-2 px-2 py-2  border-stone-700 space-x-1 flex flex-row items-center hover:text-red-700">
            <Bed size={14} />
            <Link href={"/"} className="text-sm">
              Book a stay
            </Link>
          </li>
          <li className="text-white border-l-2 px-2 py-2  border-stone-700 space-x-1 flex flex-row items-center hover:text-red-700">
            <Palmtree size={14} />
            <Link href="" className="text-sm">
              Holidays
            </Link>
          </li>
        </ul>
        <aside>
          <AuthModal
            triggerButton={
              <Button className="bg-stone-800 rounded-none hover:text-red-700 hover:bg-stone-800">
                <CircleUserRound />
                <span className="text-sm font-medium inline-block ml-2">
                  Log in / Sign up
                </span>
              </Button>
            }
            loginForm={<LoginForm />}
            signupForm={<SignupForm />}
          />
        </aside>
      </div>
    </nav>
  );
};

const TopBar = () => {
  return (
    <div className="bg-stone-800 py-2 px-24 flex flex-row justify-between items-center">
      <ul className="flex flex-row items-center space-x-4">
        <li className="flex flex-row space-x-2 text-white cursor-pointer text-xs items-center hover:text-red-700">
          <Phone className="text-xs" size={14} />
          <span>+254720843306</span>
        </li>
        <li className="flex flex-row space-x-2 text-white text-xs items-center">
          <Mail className="text-xs" size={14} />
          <span>connect@viujourney.com</span>
        </li>
      </ul>
      <ul className="flex flex-row items-center space-x-4">
        <li>
          <Link className="text-white hover:text-red-700" href={"/"}>
            <Facebook size={14} />
          </Link>
        </li>
        <li>
          <Link className="text-white hover:text-red-700" href={"/"}>
            <TwitterIcon size={14} />
          </Link>
        </li>
        <li>
          <Link href={"/"} className="text-white hover:text-red-700">
            <Instagram size={14} />
          </Link>
        </li>
        <li>
          <Link href={"/"} className="text-white hover:text-red-700">
            <LinkedinIcon size={14} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TopNavBar;
