import Sidebar from "../Sidebar";
import { useLocation } from "react-router";

const Container = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  if (pathname.includes("register") || pathname.includes("login")) {
    return <></>;
  }

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
