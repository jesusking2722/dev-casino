import { Button } from "../../common";

const Sidebar = () => {
  return (
    <div className="px-4 py-8 border-r border-[#1F1F21] flex flex-col gap-4 min-h-screen">
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
      />
      <Button type="icon" icon="heroicons:fire-20-solid" label="Stock" />
      <Button type="icon" icon="heroicons:gift-16-solid" label="Bonuses" />
      <Button type="icon" icon="oui:ws-search" label="Search" />
    </div>
  );
};

export default Sidebar;
