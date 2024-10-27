import React from "react";
import { SignIn } from "@clerk/clerk-react";

export const Login = () => {
  return (
    <div className="flex h-full justify-center items-center">
      <SignIn
        path="/login"
        signUpUrl="/register"
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
};
