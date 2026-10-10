"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative inline-block w-full text-left font-sans ${className}`}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-input bg-paper border transition-all text-left text-[14px] cursor-pointer shadow-xs ${
          isOpen
            ? "border-madder ring-1 ring-madder text-ink"
            : "border-mist hover:border-brass/70 text-ink"
        } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <span className={`block truncate ${!selectedOption && placeholder ? "text-stone" : "text-ink font-medium"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-stone shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-madder" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu Popup styled purely with Mittilok theme colors */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className="absolute z-50 mt-1.5 w-full min-w-[180px] rounded-card bg-[#fdfbf7] border border-mist/80 shadow-2xl py-1.5 overflow-auto max-h-60 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between px-3.5 py-2 text-[13px] sm:text-[14px] cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-[#faeae6] text-[#9b3d2b] font-semibold"
                    : "text-ink hover:bg-[#f5ece5] hover:text-[#9b3d2b]"
                }`}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#9b3d2b] shrink-0 ms-2" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
