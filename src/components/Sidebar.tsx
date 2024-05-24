"use client";
import React, { use, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter, usePathname } from "next/navigation";

export default function SideBar() {
  const { ready, authenticated, logout } = usePrivy();
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    // not working, have to put the routing logic within page as the sidebar doesnt work if user is inauthenticated
    logout();
    router.push("/");
  }

  // If privy is not ready or user is not authenticated, don't render anything
  if (!ready || !authenticated || pathname === "/") {
    return null;
  }

  

  // useeffect if a visitor is not signed in then route them to the login page
  // if (!authenticated) {
    // router.push("/login");
  // }

  


  return (
    <aside className="flex  h-screen flex-col justify-between bg-red-300 px-5">
      <nav className="flex flex-col items-start gap-y-4">
        <ul>
          <li>
            <Button asChild>
              <Link href="/home">Recent</Link>
            </Button>
          </li>
          <li>Find creators</li>
          <li>Notifications</li>
          <li>
            <Button variant="ghost">Wallet</Button>
          </li>
          <li>
            <Button asChild>
              <Link href="/settings">Settings</Link>
            </Button>
          </li>
        </ul>
        <p>
          <u>Memberships</u>
        </p>
        <ul>
          <li>spacemen2202</li>
          <li>highernature</li>
          <li>earthpreservarance</li>
        </ul>
      </nav>
      <div>
        {/* <CreateAccBtn />
        <UserPanel
          name={name}
          isMember={isMember}
          handleLogout={handleLogout}
        /> */}
        <Button onClick={handleLogout}>Log out</Button>
      </div>
    </aside>
  );
}
