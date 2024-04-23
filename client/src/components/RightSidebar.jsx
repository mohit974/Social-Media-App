import React from "react";

export default function RightSidebar({ children }) {
  return (
    <div className="fixed top-0 right-0 w-1/4 h-screen flex flex-col overflow-y-auto">
      {children}
    </div>
  );
}
