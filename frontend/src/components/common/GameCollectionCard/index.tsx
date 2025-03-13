import { FC } from "react";

export interface GameCollectionType {
  name: string;
  path?: string;
}

const GameCollectionCard: FC<GameCollectionType> = ({ name, path }) => {
  return (
    <div className="relative">
      <img className="absolute" />
    </div>
  );
};
