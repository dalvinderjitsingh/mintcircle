"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useWallets, usePrivy, useLogin } from "@privy-io/react-auth";

export default function Nav() {
  const router = useRouter();

  const { ready, authenticated } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  let completedSignup = false; // Meaning new user and havent filled name and choose wallet creation

  useEffect(() => {
    console.log("hi 1");
    if (ready && authenticated) {
      console.log("hi 2");

      // Replace this code with however you'd like to handle an authenticated yet not fully registered user
      if (!completedSignup) {
        console.log("hi 3; !completedSignup");

        // present new account modal
      }
      //   else {
      //     console.log("hi 4; success on completedSignup");
      //     // Redirect to home or dashboard if registration is complete
      //     router.push("/home");
      //   }
    }
  }, [ready, authenticated, completedSignup, router]);

//   privy callback code
  const { login } = useLogin({
    onComplete: (
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      linkedAccount,
    ) => {
      console.log(
        "Callback logs dude: " + user,
        isNewUser,
        wasAlreadyAuthenticated,
        loginMethod,
        linkedAccount,
      );
      // Any logic you'd like to execute if the user is/becomes authenticated while this
      // component is mounted
    },
    onError: (error) => {
      console.log(error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  });

  // Then call `login` in your code, which will invoke these callbacks on completion

  // oldie codeie belowie
  //   const { isConnected, address } = useAccount();

  //   useEffect(() => {
  //     const checkUser = async () => {
  //       if (isConnected) {
  //         if (address !== undefined) {
  //           const isAvailable = await isWalletAddressAvailable(address);
  //           if (isAvailable) {
  //             // wallet address exists, handle accordingly
  //             router.push("/dashboard");
  //           } else {
  //             // wallet address does not exist, handle accordingly
  //             router.push("/signup");
  //           }
  //         }
  //       }
  //     };

  //     checkUser();
  //   }, [isConnected, address, router]);

  // If privy is not ready or user is not authenticated, don't render anything
  if (ready && authenticated && completedSignup) {
    return null;
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50">
      <ul className="flex items-center justify-between bg-zinc-200 p-5">
        <li>
          <h1>MintCircle</h1>
        </li>
        <div className="flex gap-x-2.5">
          <li>
            <Button asChild>
              <Link href="/dashboard">Home</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href="/discover">Discover</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href="/marketplace">Marketplace</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href="/">Landing Page</Link>
            </Button>
          </li>
        </div>
        <div className="flex gap-x-2.5">
          <li>
            <Button disabled={disableLogin} onClick={login}>
              Log in
            </Button>
          </li>
        </div>
      </ul>
    </nav>
  );
}
