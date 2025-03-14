import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, ProviderCard, ProviderCardType } from "../../common";
import "./style.css";

interface ProviderSliderProps {
  slides: ProviderCardType[];
}

const ProviderSlider: FC<ProviderSliderProps> = ({ slides }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <img
            src="./assets/icons/providers.webp"
            alt="PROVIDERS"
            className="w-10 h-10"
          />
          <h1 className="font-semibold text-white text-xl">Providers (69)</h1>
        </div>
        <Button
          type="default"
          label="All"
          icon="heroicons:chevron-right-20-solid"
          iconPosition="right"
        />
      </div>
      <div className="relative h-[200px]">
        <Swiper
          slidesPerView={6}
          spaceBetween={100}
          className="providerSwiper grid grid-cols-6"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <ProviderCard
                name={slide.name}
                imgSource={slide.imgSource}
                gamesCount={slide.gamesCount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="relative h-[200px]">
        <Swiper
          autoplay
          slidesPerView={6}
          spaceBetween={100}
          className="providerSwiper grid grid-cols-6"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <ProviderCard
                name={slide.name}
                imgSource={slide.imgSource}
                gamesCount={slide.gamesCount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProviderSlider;
