import { FC } from "react";
import Button from "../Button";

export interface GameCardType {
  name: string;
  imgSource: string;
}

const GameCard: FC<GameCardType> = ({ name, imgSource }) => {
  return (
    <div className="relative w-[200px] h-[200px] rounded-lg cursor-pointer overflow-hidden group">
      {/* Background Image */}
      <img
        src={imgSource}
        alt={name}
        className="w-full h-full object-cover absolute top-0 left-0 rounded-lg"
      />

      {/* Hover Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-full flex flex-col bg-black/50 backdrop-blur-sm opacity-0 translate-y-full transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
        <div className="p-2">
          <Button
            type="icon"
            icon="heroicons:heart-solid"
            iconType="secondary"
          />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Button
            type="icon"
            icon="heroicons:paper-airplane-20-solid"
            iconType="primary"
          />
        </div>
        <h1 className="font-semibold text-white/70 font-sans text-center p-2">
          {name}
        </h1>
      </div>
    </div>
  );
};

export default GameCard;
