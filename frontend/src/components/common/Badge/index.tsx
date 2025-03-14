import { formatUpercaseLetter } from "../../../helper";

const Badge = ({
  label,
  type,
}: {
  label: string;
  type: "default" | "primary";
}) => {
  return (
    <div
      className={`px-2 rounded-full border ${
        type === "default"
          ? "bg-[#1F1F21] border-[#8a8a8a]"
          : type === "primary"
          ? "bg-white border-white"
          : ""
      }`}
    >
      <span
        className={`${
          type === "default"
            ? "text-[#8a8a8a]"
            : type === "primary"
            ? "text-black"
            : ""
        } text-[10px] font-semibold`}
      >
        {formatUpercaseLetter(label)}
      </span>
    </div>
  );
};

export default Badge;
