import { useState } from "react";
import {
  Button,
  PhoneMailSwitch,
  InputField,
  Checkbox,
} from "../../components";
import { useNavigate } from "react-router";

const Register = () => {
  const [switchMode, setSwitchMode] = useState<"phone" | "email">("phone");
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="w-[50%] rounded-lg border border-[#1F1F21] p-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="overflow-hidden">
            <img
              src="./assets/registration banner.svg"
              alt="REGISTRATION BANNER"
              className="w-[500px] h-auto mx-auto"
            />
            <div className="mt-2 flex flex-col items-center justify-center">
              <h1 className="font-semibold text-white text-4xl font-sans">
                NEW PLAYERS
              </h1>
              <h2 className="font-semibold text-[#2fbb77] text-6xl font-sans">
                200,000₴
              </h2>
              <h3 className="font-semibold text-white text-4xl">+500 Fs</h3>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-6">
                <img
                  src="./assets/logo.webp"
                  alt="LOGO"
                  className="w-14 h-14"
                />
                <h2 className="text-white font-semibold text-2xl">
                  Registration
                </h2>
              </div>
              <Button
                type="icon"
                icon="heroicons:x-mark-solid"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
            <div className="flex items-center justify-center">
              <PhoneMailSwitch active={switchMode} setActive={setSwitchMode} />
            </div>
            <div className="flex flex-col gap-4">
              {switchMode === "phone" ? (
                <InputField
                  type="text"
                  icon="heroicons:device-phone-mobile"
                  placeholder="380xxxxxxxxx"
                  value={phone}
                  onChange={setPhone}
                />
              ) : (
                <InputField
                  type="email"
                  value={email}
                  placeholder="Email"
                  icon="ic:round-mail"
                  onChange={setEmail}
                />
              )}

              <InputField
                type="password"
                value={password}
                placeholder="Password"
                icon="heroicons:lock-closed-solid"
                onChange={setPassword}
              />
              <Button type="secondary" label="Register" />
              <Checkbox
                label="I am 21 years old and I agree to the Rules"
                checked={checked}
                onChange={setChecked}
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <span className="font-semibold text-white/30 text-xs">
                or through:
              </span>
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
              <Button type="icon" iconImg="google" />
              <Button type="icon" icon="ls:apple" />
            </div>
            <div className="flex flex-col items-center justify-center gap-4 mt-14 mb-8">
              <span className="font-semibold text-white/40 text-sm">
                Do you have account ?
              </span>
              <Button type="primary" label="Log in" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
