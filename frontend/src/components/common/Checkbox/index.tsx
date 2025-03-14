import { FC } from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="flex items-center cursor-pointer">
        {/* Hidden native checkbox */}
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(!checked)}
          className="hidden"
        />
        {/* Custom checkbox design */}
        <div
          className={`w-6 h-6 flex items-center justify-center rounded-md border-2 
            ${
              checked
                ? "bg-[#2fbb77] border-[#2fbb77]"
                : "bg-black border-[#353537]"
            }
            transition-all duration-300 ease-in-out`}
        >
          {checked && (
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.293 5.293a1 1 0 011.414 1.414L9 13.414 6.293 10.707a1 1 0 111.414-1.414L9 11.586l7.293-7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <span className="ml-2 text-white/40 font-semibold text-xs">
          {label}
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
