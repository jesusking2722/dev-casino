import { FC } from "react";
import Badge from "../Badge";
import { formatDate } from "../../../helper";
import { Icon } from "@iconify/react";

export interface TournamentCardType {
  name?: string;
  price?: string;
  date?: string | number | Date;
  imgSource: string;
  status: "active" | "completed";
}

const TournamentCard: FC<TournamentCardType> = ({
  name,
  price,
  date,
  imgSource,
  status,
}) => {
  return (
    <div className="relative w-[350px] h-[350px] rounded-lg border border-[#1F1F21] flex flex-col items-center justify-center">
      <img src={imgSource} alt={name} className="w-[300px] h-[300px]" />
      <div className="absolute w-full flex flex-row items-start justify-between top-0 p-2">
        <Badge
          label={status}
          type={status === "active" ? "primary" : "default"}
        />
        {status === "active" && date && (
          <div className="flex flex-row items-center gap-2 p-2 bg-black/50 rounded-lg backdrop-blur-sm">
            <Icon
              icon="heroicons:clock-16-solid"
              className="w-6 h-6"
              color="#2fbb77"
            />
            <span className="font-semibold text-xs font-sans text-[#2fbb77]">
              {formatDate(date)}
            </span>
          </div>
        )}
      </div>
      <div className="absolute bottom-1 w-full flex flex-col items-center justify-center p-2 bg-black/50 backdrop-blur-sm rounded-b-lg">
        <h1 className="font-semibold text-white text-lg">{name}</h1>
        <p
          className={`font-semibold text-2xl ${
            status === "active" ? "text-[#2fbb77]" : "text-[#8a8a8a]"
          }`}
        >
          {status === "active" ? price : "COMPLETED"}
        </p>
      </div>
    </div>
  );
};

export default TournamentCard;
