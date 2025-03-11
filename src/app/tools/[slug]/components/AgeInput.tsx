"use client";

import { useState } from "react";

interface AgeInputProps {
  age: string;
  setAge: (value: string) => void;
}

export default function AgeInput({ age, setAge }: AgeInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type="number"
        value={age}
        onChange={(e) => {
          const rawValue = e.target.value;
          if (rawValue === "" || (/^\d{1,3}$/.test(rawValue) && +rawValue <= 120)) {
            setAge(rawValue); // Se envía la edad sin normalizar
          }
        }}
        placeholder="Enter your age (0 - 120)"
        className={`mt-1 p-3 border w-full rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none transition-all ${
          isFocused ? "border-blue-500 shadow-md" : "border-gray-300 dark:border-gray-600"
        }`}
        min="0"
        max="120"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}