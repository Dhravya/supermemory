import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.svg";
import { AddIcon, ChatIcon } from "@repo/ui/icons";

import DynamicIsland from "./dynamicisland";
import { db } from "@/server/db";
import { getChatHistory } from "../actions/fetchers";

async function Header() {
  const chatThreads = await getChatHistory();

  if (!chatThreads.success || !chatThreads.data) {
    return <div>Error fetching chat threads</div>;
  }

  return (
    <div className="p-4 relative z-30 h-16 flex items-center">
      <div className="w-full flex items-center justify-between">
        <Link className="" href="/home">
          <Image
            src={Logo}
            alt="SuperMemory logo"
            className="hover:brightness-125 duration-200"
          />
        </Link>

        <div className="fixed z-30 left-1/2 -translate-x-1/2 top-5">
          <DynamicIsland />
        </div>

        <div className="flex items-center gap-2">
          <button className="flex duration-200 items-center text-[#7D8994] hover:bg-[#1F2429] text-[13px] gap-2 px-3 py-2 rounded-xl">
            <Image src={ChatIcon} alt="Chat icon" className="w-5" />
            Start new chat
          </button>

          <div className="relative group">
            <button className="flex duration-200 items-center text-[#7D8994] hover:bg-[#1F2429] text-[13px] gap-2 px-3 py-2 rounded-xl">
              History
            </button>

            <div className="absolute p-4 hidden group-hover:block right-0 w-full md:w-[400px] max-h-[70vh] overflow-auto">
              <div className="bg-[#1F2429] rounded-xl p-2 flex flex-col shadow-lg">
                {chatThreads.data.map((thread) => (
                  <Link
                    prefetch={false}
                    href={`/chat/${thread.id}`}
                    key={thread.id}
                    className="p-2 rounded-md hover:bg-secondary"
                  >
                    {thread.firstMessage}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
