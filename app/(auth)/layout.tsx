import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[100%] h-screen flex items-center justify-center bg-zinc-200">
      <div className="w-full sm:w-fit sm:max-w-md flex-grow bg-zinc-100 p-8 rounded-md flex justify-center items-center h-screen sm:h-fit">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
