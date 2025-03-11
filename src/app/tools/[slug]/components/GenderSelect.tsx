"use client";

import { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface GenderSelectProps {
  gender: string;
  setGender: (value: string) => void;
}

export default function GenderSelect({ gender, setGender }: GenderSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getLabel = (value: string) => {
    if (value === "male") return "Male";
    if (value === "female") return "Female";
    return "Select Gender";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none transition-all
          border-gray-300 dark:border-gray-600 hover:border-blue-500"
        >
          <span>{getLabel(gender)}</span>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="start" 
        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg py-2"
      >
        <DropdownMenuItem 
          onClick={() => setGender("male")} 
          className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          Male
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setGender("female")} 
          className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          Female
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}