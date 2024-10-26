import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { SignedIn, UserButton } from "@clerk/clerk-react";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className="flex flex-col py-[16px] px-[64px] h-[100vh]">
        <header className="flex items-center justify-between">
          <Link to="/">
            <img
              src="/medi-ai-logo-white.png"
              alt="MediAI Logo"
              className="w-[80px]"
            />
          </Link>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  );
};
