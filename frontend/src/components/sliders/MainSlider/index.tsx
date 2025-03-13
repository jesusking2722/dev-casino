import { Swiper, SwiperSlide } from "swiper/react";
import { FC } from "react";
import { Button } from "../../common";
import "./style.css";

export type MainSlideType = {
  title: string;
  subtitle: string;
  path: string;
  imgSource: string;
};

interface MainSliderProps {
  slides: MainSlideType[];
}

const MainSlider: FC<MainSliderProps> = ({ slides }) => {
  return (
    <div className="relative h-[400px] rounded-xl border border-[#1F1F21] shadow-md shadow-[#1F1F21]">
      <Swiper autoplay className="mainSwiper">
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center">
            <div className="w-full flex flex-row items-center justify-between px-20 overflow-hidden">
              <div className="flex flex-col items-start gap-4">
                <h1 className="font-semibold text-white text-4xl">
                  {slide.title}
                </h1>
                <h2 className="font-semibold text-[#2fbb77] text-6xl font-sans">
                  {slide.subtitle}
                </h2>
                <div className="w-[50%]">
                  <Button type="secondary" label="Read more" />
                </div>
              </div>
              <img
                src={slide.imgSource}
                alt="Main Logo"
                className="w-[450px] h-auto object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainSlider;
