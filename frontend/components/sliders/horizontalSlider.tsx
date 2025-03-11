import { Swiper, SwiperSlide } from 'swiper/react'
import { animated } from '@react-spring/web'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'
import { Scrollbar, Navigation, Autoplay, FreeMode } from "swiper/modules"
import { Children } from "react"

type Props = {
  autoplay: any
  squares: JSX.Element[]
  maxW?: number
  loop?: boolean
  spaceBetween?: number
  classes?: string
  maxH?: number
}

export function HorizontalSlider({ autoplay, squares, maxW=185, loop=true, spaceBetween=8, classes='' }: Props) {
  // console.log(maxW)
  return (
    <animated.div>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={spaceBetween}
        freeMode={true}
        scrollbar={{ hide: true }}
        navigation={true}
        modules={[FreeMode, Scrollbar, Navigation, Autoplay]}
        className={"place-self-center " + classes}
        autoplay={autoplay}
        loop={loop}
      >
        {Children.map(squares, (square, i) => (
          <SwiperSlide style={{maxWidth: maxW, marginRight: spaceBetween}}>
            {square}
          </SwiperSlide>
        ))}
      </Swiper>
    </animated.div>
  )
}