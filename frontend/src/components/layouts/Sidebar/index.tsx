import { Button } from "../../common";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-8 border-r border-[#1F1F21] flex flex-col gap-4 min-h-screen fixed left-0 top-0">
      <Button
        type="icon"
        icon="heroicons:bars-3-solid"
        iconType="primary"
        label="Menu"
      />
      <Button
        type="icon"
        icon="heroicons:paper-airplane-20-solid"
        label="Games"
        onClick={() => {
          navigate("/games");
        }}
      />
      <Button type="icon" icon="heroicons:fire-20-solid" label="Stock" />
      <Button type="icon" icon="heroicons:gift-16-solid" label="Bonuses" />
      <Button type="icon" icon="oui:ws-search" label="Search" />
    </div>
  );
};

export default Sidebar;
