import { animated } from '@react-spring/web'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules'
import { Children } from 'react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'

type Props = {
    springsResize?: any
    squares: JSX.Element[]
    spaceBetween?: number
    cols?: number
    maxW?: number
    styles?: any
}

export function VerticalGridSlider({ squares, springsResize={}, spaceBetween=8, cols=6, maxW=180, styles={} }: Props) {
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
                className="max-h-[380px]"
                style={styles}
            >
                <SwiperSlide>
                    <div style={{gridTemplateColumns: 'repeat(' + cols + ', minmax(0, 1fr))', ...springsResize}} className={`grid gap-[8px]`}>
                        {Children.map(squares, (square, i) => (
                            <div key={i} style={{maxWidth: maxW}}>{ square }</div>
                        ))}
                    </div>
                </SwiperSlide>
            </Swiper>
        </animated.div>
    )
}