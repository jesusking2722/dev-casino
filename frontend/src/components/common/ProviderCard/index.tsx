import { FC } from "react";

export interface ProviderCardType {
  name: string;
  gamesCount: number;
  imgSource: string;
}

const ProviderCard: FC<ProviderCardType> = ({
  name,
  gamesCount,
  imgSource,
}) => {
  return (
    <div className="w-[200px] h-[200px] bg-[#1F1F21] rounded-lg relative cursor-pointer">
      <div className="flex flex-col justify-center items-center w-full border-b border-[#8a8a8a] h-3/4">
        <div className="flex flex-col items-center justify-center gap-2">
          <img
            src={`./assets/providers/${imgSource}`}
            alt={name}
            className="w-16 h-16 rounded-full"
          />
          <h1 className="text-white font-sans font-semibold text-base">
            {name}
          </h1>
        </div>
      </div>
      <div className="bg-[#353537] flex flex-col items-center w-full p-4 absolute bottom-0 rounded-b-lg">
        <p className="text-[#8a8a8a] font-semibold text-[10px] font-sans">
          Number of games:{" "}
          <span className="font-semibold text-xs">{gamesCount}</span>
        </p>
      </div>
    </div>
  );
};

export default ProviderCard;
