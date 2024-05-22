"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Logo from "@/../public/logo.svg";
import { Github } from "@/utils/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
      <div className="flex w-full flex-row justify-between rounded-2xl bg-white/10 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-lg backdrop-filter">
        <Link href={"/"} className="flex items-center p-3 opacity-50">
          <Image src={Logo} alt="Supermemory logo" width={40} height={40} />
        </Link>
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-8 p-3">
          <Link href={"#use-cases"} className="text-soft-foreground-text">
            Use cases
          </Link>
          <Link href={"#features"} className="text-soft-foreground-text">
            Features
          </Link>
          <Link href={"#try"} className="text-soft-foreground-text">
            Try supermemory
          </Link>
        </div>
        <Link
          href="https://git.new/memory"
          className="m-2 flex items-center gap-3 rounded-xl bg-white/20 px-4 text-center text-white"
        >
          <Github className="h-4 w-4" />
          Open source
        </Link>
      </div>
  );
}



export const FloatingNav = () => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className="fixed top-0 z-[99999] mt-12 hidden w-full px-24 text-sm md:flex"
      >
        <Navbar />
      </motion.nav>
    </AnimatePresence>
  );
};

export default FloatingNav;
