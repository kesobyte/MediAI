import React from "react";
import { SignIn } from "@clerk/clerk-react";

export const Login = () => {
  return (
    <div className="">
      <SignIn path="/login" />
    </div>
  );
};
