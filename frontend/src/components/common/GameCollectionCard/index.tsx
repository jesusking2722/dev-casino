import { FC } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";

export interface GameCollectionType {
  name: string;
  path?: string;
  imgSource: string;
}

const GameCollectionCard: FC<GameCollectionType> = ({
  name,
  path,
  imgSource,
}) => {
  return (
    <div className="relative rounded-lg w-[300px] h-[400px]">
      <img
        src={imgSource}
        alt={name}
        className="absolute top-0 left-0 w-full h-full rounded-lg"
      />
      <div className="absolute bottom-2 w-full px-4">
        <Link
          to={path ? path : ""}
          className="w-full flex flex-row items-center justify-center gap-4 transition-all duration-300 ease-out hover:bg-[#1F1F21] rounded-md p-2"
        >
          <span className="text-white font-sans text-[10px]">
            Watch all games
          </span>
          <Icon
            icon="heroicons:arrow-right-20-solid"
            className="w-4 h-4"
            color="white"
          />
        </Link>
      </div>
    </div>
  );
};

export default GameCollectionCard;
