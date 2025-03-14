import Sidebar from "../Sidebar";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-black flex flex-row justify-center ">
      <div>
        <Sidebar />
      </div>
      <div className="w-[70%]">
        <div className="flex-grow p-4 mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Container;
