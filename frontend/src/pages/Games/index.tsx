import { LogoButton } from "../../components";

const Games = () => {
  return (
    <div className="py-10 flex flex-col gap-20">
      <div className="flex flex-row items-center justify-center gap-4">
        <LogoButton label="Game room" imgSource="./assets/icons/Game.webp" />
        <LogoButton
          label="Game room"
          imgSource="./assets/icons/3D Icons-3.webp"
        />
        <LogoButton
          label="Game room"
          imgSource="./assets/icons/3D Icons-2.webp"
        />
        <LogoButton
          label="Game room"
          imgSource="./assets/icons/3D Icons-1.webp"
        />
        <LogoButton
          label="Game room"
          imgSource="./assets/icons/3D Icons-4.webp"
        />
      </div>
    </div>
  );
};

export default Games;
