import React from "react";
import { AlertTriangle } from "lucide-react";

const ApiErrorState = () => {
  return (
    <p className="flex items-center gap-2 mt-10 ml-5 text-red-500 font-medium text-lg">
      <AlertTriangle className="size-6" />
      Something went wrong, please reload the page or try again later
    </p>
  );
};

export default ApiErrorState;
