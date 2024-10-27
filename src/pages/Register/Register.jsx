import React from "react";
import { SignUp } from "@clerk/clerk-react";

export const Register = () => {
  return (
    <div className="flex h-full justify-center items-center">
      <SignUp path="/register" signInUrl="/login/" />
    </div>
  );
};
