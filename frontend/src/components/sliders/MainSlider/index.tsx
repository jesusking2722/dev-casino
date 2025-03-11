import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const MainSlider = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <Swiper
      pagination={pagination}
      modules={[Pagination]}
      className="mySwiper"
    ></Swiper>
  );
};
