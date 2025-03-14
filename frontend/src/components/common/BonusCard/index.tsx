import { FC } from "react";
import { formatDate } from "../../../helper";
import { Icon } from "@iconify/react";

export interface BonusCardType {
  title: string;
  subtitle: string;
  date: string | number | Date;
  imgSource: string;
  path: string;
}

const BonusCard: FC<BonusCardType> = ({
  title,
  subtitle,
  date,
  imgSource,
  path,
}) => {
  return (
    <div className="relative w-[450px] h-[300px] rounded-lg border bg-[#171718] border-[#353537] shadow-lg overflow-hidden flex flex-col items-center justify-center">
      {/* Background Image */}
      <img
        src={imgSource}
        alt={title}
        className="w-[270px] h-[270px] object-cover"
      />

      {/* Date Badge */}
      <span className="absolute top-0 left-0 py-2 px-4 bg-[#353537] text-[#8a8a8a] rounded-br-lg text-sm font-semibold">
        {formatDate(date)}
      </span>

      {/* Gradient Overlay (for better text visibility) */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full flex flex-row items-center justify-between p-4">
        <div className="flex flex-col items-start justify-center">
          <p className="text-white font-semibold text-lg font-sans">{title}</p>
          <h1 className="text-[#2fbb77] font-semibold text-2xl font-sans">
            {subtitle}
          </h1>
        </div>
        <Icon
          icon="heroicons:chevron-right-solid"
          color="white"
          className="w-6 h-6"
        />
      </div>
    </div>
  );
};

export default BonusCard;
