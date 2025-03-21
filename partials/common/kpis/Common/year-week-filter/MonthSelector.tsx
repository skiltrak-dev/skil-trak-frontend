"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface MonthSelectorProps {
  selectedMonth: Date;
  onMonthChange: (monthIndex: number) => void;
}

export const MonthSelector = ({ selectedMonth, onMonthChange }: MonthSelectorProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handleMonthSelect = (monthIndex: number) => {
    onMonthChange(monthIndex);
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="inline-flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none min-w-[160px]"
      >
        {monthNames[selectedMonth.getMonth()]}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {dropdownOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {monthNames.map((month, index) => (
            <button
              key={month}
              className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              onClick={() => handleMonthSelect(index)}
            >
              {month}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

