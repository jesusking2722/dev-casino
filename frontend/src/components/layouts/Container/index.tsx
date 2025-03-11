import Sidebar from "../Sidebar";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-black flex flex-row justify-between">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="flex-grow p-4 w-[80%] mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Container;
