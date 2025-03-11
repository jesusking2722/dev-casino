import { Button } from "../../common";

const Header = () => {
  return (
    <header className="w-full p-2">
      <nav className="flex flex-row items-center justify-between">
        <Button
          type="default"
          label="200 000₴ + 500FS"
          icon="heroicons:gift-20-solid"
        />
        <img src="./assets/logo.webp" alt="LOGO" className="w-[100px] h-auto" />
        <div className="flex flex-row items-center gap-4">
          <Button type="icon" icon="ls:apple" />
          <Button type="icon" iconImg="google" />
          <span className="text-white font-semibold text-sm">Or</span>
          <Button type="primary" label="Login" />
          <Button type="secondary" label="Registration" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
