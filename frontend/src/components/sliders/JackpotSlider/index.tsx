import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GameCollectionType, Button, GameCollectionCard } from "../../common";
import "./style.css";

interface JackpotSliderProps {
  slides: GameCollectionType[];
}

const JackpotSlider: FC<JackpotSliderProps> = ({ slides }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <img
            src="./assets/icons/seven.svg"
            alt="JACKPOT"
            className="w-10 h-10"
          />
          <h1 className="font-semibold text-white text-xl">Jackpot</h1>
        </div>
        <Button
          type="default"
          label="All"
          icon="heroicons:chevron-right-20-solid"
          iconPosition="right"
        />
      </div>
      <div className="relative h-[400px]">
        <Swiper
          slidesPerView={4}
          spaceBetween={100}
          className="jackpotSwiper grid grid-cols-6"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <GameCollectionCard
                name={slide.name}
                imgSource={slide.imgSource}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default JackpotSlider;
