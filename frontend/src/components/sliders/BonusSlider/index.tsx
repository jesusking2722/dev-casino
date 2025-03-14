import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, BonusCard, BonusCardType } from "../../common";
import "./style.css";

interface BonusSliderProps {
  slides: BonusCardType[];
}

const BonusSlider: FC<BonusSliderProps> = ({ slides }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <img
            src="./assets/icons/fire.webp"
            alt="FIRE"
            className="w-10 h-10"
          />
          <h1 className="font-semibold text-white text-xl">
            Bonus and promotions
          </h1>
        </div>
        <Button
          type="default"
          label="All"
          icon="heroicons:chevron-right-20-solid"
          iconPosition="right"
        />
      </div>
      <div className="relative h-[300px]">
        <Swiper
          slidesPerView={3}
          spaceBetween={100}
          className="bonusSwiper grid grid-cols-6"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <BonusCard
                title={slide.title}
                subtitle={slide.subtitle}
                path={slide.path}
                date={slide.date}
                imgSource={slide.imgSource}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BonusSlider;
