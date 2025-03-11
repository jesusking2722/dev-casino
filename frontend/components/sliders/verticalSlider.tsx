'use client'

import { animated } from '@react-spring/web'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'

type Props = {
    springsResize?: any
    classes?: string
    children: JSX.Element
}

export function VerticalSlider({ children, springsResize={}, classes='' }: Props) {
    return (
        <animated.div style={springsResize}>
            <Swiper
                direction={'vertical'}
                slidesPerView={'auto'}
                spaceBetween={8}
                freeMode={true}
                scrollbar={true}
                mousewheel={true}
                modules={[FreeMode, Scrollbar, Mousewheel]}
                className={`scroll-smooth` + classes}
            >
                <SwiperSlide>
                        {children}
                </SwiperSlide>
            </Swiper>
        </animated.div>
    )
}