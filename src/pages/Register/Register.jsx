import React from "react";
import { SignUp } from "@clerk/clerk-react";

export const Register = () => {
  return <SignUp path="/register" />;
};
