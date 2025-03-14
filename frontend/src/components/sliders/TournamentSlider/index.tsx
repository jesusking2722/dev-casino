import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, TournamentCardType, TournamentCard } from "../../common";
import "./style.css";

interface TournamentSliderProps {
  slides: TournamentCardType[];
}

const TournamentSlider: FC<TournamentSliderProps> = ({ slides }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <img
            src="./assets/icons/tournament.webp"
            alt="TOURNAMENT"
            className="w-10 h-10"
          />
          <h1 className="font-semibold text-white text-xl">Tournament</h1>
        </div>
        <Button
          type="default"
          label="All"
          icon="heroicons:chevron-right-20-solid"
          iconPosition="right"
        />
      </div>
      <div className="relative h-[350px]">
        <Swiper
          slidesPerView={4}
          spaceBetween={200}
          className="tournamentSwiper grid grid-cols-6"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <TournamentCard
                name={slide.name}
                date={slide.date}
                price={slide.price}
                status={slide.status}
                imgSource={slide.imgSource}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TournamentSlider;
