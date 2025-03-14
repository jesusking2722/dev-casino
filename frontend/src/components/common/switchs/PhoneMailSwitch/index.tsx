import { Icon } from "@iconify/react";

const PhoneMailSwitch = ({
  active,
  setActive,
}: {
  active: "phone" | "email";
  setActive: (value: "phone" | "email") => void;
}) => {
  return (
    <div className="flex w-fit flex-row items-center justify-center gap-2 p-2 bg-[#161616] rounded-full">
      <button
        className={`transition-all duration-300 ease-in-out px-5 py-1 font-semibold rounded-full flex flex-row items-center gap-2 text-xs
          ${
            active === "phone"
              ? "text-white bg-[#353537]"
              : "text-[#353537] bg-transparent hover:text-white"
          }`}
        onClick={() => {
          setActive("phone");
        }}
      >
        <Icon icon="heroicons:device-phone-mobile" className="w-6 h-6" />
        Phone
      </button>
      <button
        className={`transition-all duration-300 ease-in-out px-5 py-1 font-semibold rounded-full flex flex-row items-center gap-2 text-xs
          ${
            active === "email"
              ? "text-white bg-[#353537]"
              : "text-[#353537] bg-transparent hover:text-white"
          }`}
        onClick={() => {
          setActive("email");
        }}
      >
        <Icon icon="ic:round-mail" className="w-6 h-6" />
        Email
      </button>
    </div>
  );
};

export default PhoneMailSwitch;
