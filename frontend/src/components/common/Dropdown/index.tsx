import { Dropdown as FlowbiteDropdown } from "flowbite-react";
import { FC } from "react";
import "./style.css";

export type DropdownItemType = {
  label: string;
  onClick?: () => void;
};

interface DropdownProps {
  dropdowns: DropdownItemType[];
  label: string;
}

const Dropdown: FC<DropdownProps> = ({ dropdowns, label }) => {
  return (
    <FlowbiteDropdown
      label={label}
      style={{
        width: "100%",
        background: "black",
        border: "1px solid #353537",
        outline: 0,
        boxShadow: "none",
      }}
    >
      {dropdowns.map((dropdown, index) => (
        <FlowbiteDropdown.Item
          key={index}
          className="bg-black w-full text-white hover:bg-[#2fbb77] hover:text-black focus:bg-[#2fbb77] focus:text-black transition-all duration-300 ease-in-out"
          onClick={dropdown.onClick}
        >
          {dropdown.label}
        </FlowbiteDropdown.Item>
      ))}
    </FlowbiteDropdown>
  );
};

export default Dropdown;
