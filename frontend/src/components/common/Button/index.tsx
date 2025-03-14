import { FC } from "react";
import { Icon } from "@iconify/react";

interface ButtonProps {
  type: "default" | "icon" | "primary" | "secondary" | "";
  label?: string;
  icon?: string;
  iconType?: "primary" | "secondary" | "indigo" | "blue";
  iconImg?: string;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  type,
  label,
  iconType,
  icon,
  iconImg,
  iconPosition,
  disabled,
  loading,
  onClick,
}) => {
  if (type === "icon") {
    if (iconType === "secondary" && icon) {
      return (
        <Icon
          icon={icon}
          className="hover:text-[#2fbb77] text-[#1F1F21] w-6 h-6 transition-all duration-300 ease-in-out"
          onClick={onClick}
        />
      );
    }
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <button
          className={`flex flex-col p-3 rounded-full items-center justify-center transition-all duration-300 ease-in-out shadow-md shadow-[#1F1F21] ${
            iconType === "primary"
              ? "bg-[#2fbb77] hover:bg-[#34CF84]"
              : iconType === "indigo"
              ? "bg-[#7D3DAF] hover:bg-[#B56AF1]"
              : iconType === "blue"
              ? "bg-[#2AABEE] hover:bg-[#57C6FF]"
              : "bg-[#1F1F21] hover:bg-[#353537]"
          }`}
        >
          {icon && (
            <Icon
              icon={icon}
              className="w-6 h-6"
              color={iconType === "primary" ? "black" : "white"}
            />
          )}
          {iconImg && (
            <img
              src={`./assets/icons/${iconImg}.svg`}
              alt="Icon"
              className="w-6 h-6"
            />
          )}
        </button>
        {label && (
          <span
            className={`text-xs font-semibold ${
              iconType === "primary" ? "text-white" : "text-white/30"
            }`}
          >
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      className={`flex flex-row py-3 px-7 items-center justify-center gap-2 transition-all duration-300 ease-in-out rounded-lg text-sm text-white font-semibold ${
        type === "primary"
          ? " bg-[#1F1F21] hover:bg-[#353537]"
          : type === "default"
          ? "bg-black hover:bg-[#1F1F21]"
          : type === "secondary"
          ? "bg-[#2fbb77] hover:bg-[#34CF84]"
          : ""
      }`}
    >
      {iconImg && (
        <img
          src={`./assets/icons/${iconImg}.svg`}
          alt="Icon"
          className="w-8 h-8"
        />
      )}
      {iconPosition === "left" && icon && (
        <Icon icon={icon} className="w-8 h-8" color="#2fbb77" />
      )}
      {label}
      {iconPosition === "right" && icon && (
        <Icon icon={icon} className="w-8 h-8" color="#2fbb77" />
      )}
    </button>
  );
};

export default Button;
