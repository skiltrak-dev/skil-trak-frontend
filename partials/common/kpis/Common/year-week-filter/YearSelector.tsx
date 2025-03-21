"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface YearSelectorProps {
  selectedMonth: Date;
  onYearChange: (year: number) => void;
}

export const YearSelector: React.FC<YearSelectorProps> = ({ selectedMonth, onYearChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const currentYear = selectedMonth.getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);


  const handleYearSelect = (year: number) => {
    onYearChange(year);
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="inline-flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none min-w-[120px]"
      >
        {selectedMonth.getFullYear()}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {dropdownOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {years.map((year) => (
            <button
              key={year}
              className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

