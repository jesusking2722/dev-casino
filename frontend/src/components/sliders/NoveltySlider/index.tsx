import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GameCardType, GameCard, Button } from "../../common";
import "./style.css";

interface NoveltySliderProps {
  slides: GameCardType[];
}

const NoveltySlider: FC<NoveltySliderProps> = ({ slides }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <img src="./assets/icons/new.webp" alt="NEW" className="w-10 h-10" />
          <h1 className="font-semibold text-white text-xl">Novelty</h1>
        </div>
        <Button
          type="default"
          label="All"
          icon="heroicons:chevron-right-20-solid"
          iconPosition="right"
        />
      </div>
      <div className="relative h-[250px]">
        <Swiper
          slidesPerView={6}
          spaceBetween={100}
          className="noveltySwiper grid grid-cols-6"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <GameCard name={slide.name} imgSource={slide.imgSource} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NoveltySlider;
