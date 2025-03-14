import { Icon } from "@iconify/react";
import { Button, Dropdown } from "../../common";
import type { DropdownItemType } from "../../common";
import { Link } from "react-router";

const Footer = () => {
  const languages: DropdownItemType[] = [
    { label: "English" },
    { label: "Russian" },
    { label: "Ukrainian" },
  ];

  const links = [
    { label: "Tournaments", path: "" },
    { label: "Game rules", path: "" },
    { label: "Resposible gambling", path: "" },
    { label: "Bonus Machine", path: "" },
    { label: "Terms and conditions", path: "" },
    { label: "Intellectual property", path: "" },
    { label: "Wheel of Fortune", path: "" },
    { label: "Mobile application", path: "" },
    { label: "AML Policy", path: "" },
    { label: "Support service", path: "" },
    { label: "Partners", path: "" },
    { label: "Public offer agreement", path: "" },
    { label: "Questions and answers", path: "" },
    { label: "Privacy Policy", path: "" },
    { label: "Know your customers", path: "" },
  ];

  return (
    <div className="w-full flex flex-col gap-4 py-4">
      <div className="w-full flex lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full lg:w-[30%]">
          <div className="w-full flex flex-col gap-4">
            <div>
              <h2 className="font-semibold text-xl text-white font-sans">
                DOWNLOAD THE APP
              </h2>
              <p className="font-semibold text-xl text-[#2fbb77] font-sans">
                TAKE 25FS
              </p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <Button type="primary" iconImg="playstore" label="Google Play" />
              <Button
                type="primary"
                icon="ls:apple"
                iconPosition="left"
                label="App Store"
              />
            </div>
            <div className="w-full flex flex-col gap-1 dropdown">
              <span className="text-white font-semibold text-2xl font-sans mb-2">
                Choose language
              </span>
              <Dropdown label={languages[0].label} dropdowns={languages} />
            </div>
            <div className="w-full rounded-lg flex flex-row items-center justify-between p-4 cursor-pointer bg-[#1F1F21] hover:bg-[#353537] transition-all duration-300 ease-in-out group">
              <div className="flex flex-row items-center gap-4">
                <img
                  src="./assets/icons/headphones.webp"
                  alt="HEADPHONE"
                  className="w-10 h-10"
                />
                <div className="">
                  <h2 className="font-semibold text-white text-base">
                    MyCity Support
                  </h2>
                  <p className="font-semibold text-white/60 text-sm">
                    Support service
                  </p>
                </div>
              </div>
              <Icon
                icon="heroicons:arrow-right"
                color="white"
                className="rounded-full w-10 h-10 p-2 bg-[#353537] group-hover:bg-[#4c4c4d]"
              />
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <Button type="primary" iconImg="viber" label="Viber bot" />
              <Button type="primary" iconImg="telegram" label="Telegram bot" />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[65%] grid grid-cols-3 gap-4">
          {links.map((link, index) => (
            <div className="w-full p-2">
              <Link
                key={index}
                to={link.path}
                className="inline font-semibold text-sm text-white bg-black hover:bg-[#1F1F21] transition-all duration-300 ease-in-out p-4 rounded-lg"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-4 w-full lg:w-[30%]">
          <h2 className="font-semibold text-white text-xl font-sans">
            Secure verification
          </h2>
          <div className="w-full flex flex-row items-center gap-4">
            <img
              src="./assets/logos/bankId.webp"
              alt="BANKID"
              className="w-12 h-12 rounded-lg"
            />
            <div className="mt-2">
              <p className="text-white/50 text-sm">
                At JadeJack you can undergo quick and <br />
                secure verification via the BankID system
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-[65%]">
          <h2 className="font-semibold text-white text-xl font-sans">
            Convenient transactions
          </h2>
          <div className="w-full flex flex-row items-center gap-10">
            <img
              src="./assets/logos/visaColor.svg"
              alt="VISA"
              className="w-20 h-auto"
            />
            <img
              src="./assets/logos/mastercard.svg"
              alt="MASTERCARD"
              className="w-20 h-auto"
            />
            <img
              src="./assets/logos/city-24.svg"
              alt="CITY-24"
              className="w-20 h-auto"
            />
            <img
              src="./assets/logos/easypay.svg"
              alt="EASYPAY"
              className="w-20 h-auto"
            />
            <img
              src="./assets/logos/applepay.svg"
              alt="APPLEPAY"
              className="w-20 h-auto"
            />
            <img
              src="./assets/logos/googlepay.svg"
              alt="GOOGLEPAY"
              className="w-20 h-auto"
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <p className="text-sm text-white/50">
          © 2021-2025 JadeJack. Усі права захищені. 20:14:11
        </p>
        <p className="text-sm text-white/50">
          License for the organization and conduct of casino gambling activities
          on the Internet dated 02/16/2021 (decision No. 47 dated 02/10/2021),
          issued by KRAIL LLC "GAYMDEV" Information about the overall winning
          percentage (theoretical return to player): the overall average winning
          percentage is at least 94%.
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-end gap-4">
        <h1 className="text-xl font-semibold text-white font-sans">
          Join the community
        </h1>
        <div className="flex flex-row items-center gap-4">
          <Button type="icon" icon="fa6-brands:viber" iconType="indigo" />
          <Button type="icon" icon="cib:telegram-plane" iconType="blue" />
        </div>
        <div className="mt-2 flex flex-row items-center gap-10">
          <img
            src="./assets/logos/gamcare.svg"
            alt="gamcare"
            className="w-14 h-auto"
          />
          <img
            src="./assets/logos/gamblingtherapy.svg"
            alt="gamblingtherapy"
            className="w-24 h-auto"
          />
          <img
            src="./assets/logos/gambleaware.svg"
            alt="gambleaware"
            className="w-28 h-auto"
          />
          <img
            src="./assets/logos/yo21.svg"
            alt="yo21"
            className="w-10 h-auto"
          />
          <img src="./assets/logos/pci.svg" alt="pci" className="w-24 h-auto" />
          <img src="./assets/logos/ssl.svg" alt="ssl" className="w-20 h-auto" />
          <img
            src="./assets/logos/dmca.svg"
            alt="dmca"
            className="w-32 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
