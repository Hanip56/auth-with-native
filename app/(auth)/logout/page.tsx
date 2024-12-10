"use client";

import { signOut } from "next-auth/react";
import React, { useEffect } from "react";

const LogoutPage = () => {
  useEffect(() => {
    signOut();
  }, []);

  return <div></div>;
};

export default LogoutPage;
