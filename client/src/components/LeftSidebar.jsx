import React from "react";

export default function LeftSidebar({ children }) {
  return (
    <div className="fixed top-0 left-0 w-1/4 h-screen flex flex-col overflow-y-auto">
      {children}
    </div>
  );
}
