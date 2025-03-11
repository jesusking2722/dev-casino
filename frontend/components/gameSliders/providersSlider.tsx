'use client'

import { useSpring, animated } from '@react-spring/web'
import { useState } from "react"
import { HorizontalSlider } from "../sliders/horizontalSlider"
import { VerticalGridSlider } from "../sliders/verticalGridSlider"
import { SquareProviderLink } from "./squareProviderLink"
import Hat from "../sliders/hat"
import React from "react"


export function ProvidersSlider() {
    const [fullsize, setFullsize] = useState(false)
    const [springs, api] = useSpring(() => { })
    const [springsRotate, apiRotate] = useSpring(() => { })
    const [springsResizeFull, apiResizeFull] = useSpring(() => { })

    const onFullsizeClick = () => {
        if (!fullsize) {
            setFullsize(true)
            api.start({
                from: {
                    height: 322,
                },
                to: {
                    height: 520,
                },
                config: {
                    duration: 300,
                }
            })
            apiRotate.start({
                from: {
                    transform: 'rotate(0deg)',
                },
                to: {
                    transform: 'rotate(90deg)',
                },
                config: {
                    duration: 200,
                }
            })
            apiResizeFull.start({
                from: {
                    opacity: 0,
                },
                to: {
                    opacity: 1,
                },
                config: {
                    duration: 550,
                }
            })
        }
        else {
            setFullsize(false)
            api.start({
                from: {
                    height: 520,
                },
                to: {
                    height: 320,
                },
                config: {
                    duration: 300,
                }
            })
            apiRotate.start({
                from: {
                    transform: 'rotate(90deg)',
                },
                to: {
                    transform: 'rotate(0deg)',
                },
                config: {
                    duration: 200,
                }
            })
        }
    }

    const plugData = [
        { providerName: 'EGT Digital', games: 14, img: '/plug.webp' },
        { providerName: 'EGT Digital', games: 14, img: '/plug.webp' },
        { providerName: 'EGT Digital', games: 14, img: '/plug.webp' },
        { providerName: 'EGT Digital', games: 14, img: '/plug.webp' },
        { providerName: 'EGT Digital', games: 14, img: '/plug.webp' },
        { providerName: 'EGT Digital', games: 14, img: '/plug.webp' },
        { providerName: 'EGT Digital', games: 14, img: '/plug.webp' },
        { providerName: 'EGT Digital', games: 14, img: '/plug.webp' },
        { providerName: 'EGT Digital', games: 14, img: '/plug.webp' },
    ]

    const squaresWidth = fullsize? 280 : 185

    const squares = plugData.map((data, i) => (
        <SquareProviderLink width={squaresWidth} key={i} providerName={data.providerName} games={data.games} img={data.img} />
    ))

    return (
        <animated.div style={springs} className="flex flex-col mb-[64px] container mah-h-[520px] rounded-lg gap-[20px] pt-[12px] pb-[24px] pr-[24px] pl-[24px] bg-transparent">
            <Hat img="/bomb.svg" title="Провайдеры" onClick={onFullsizeClick} fullsize={fullsize} springsRotate={springsRotate} />
            <div>
                {
                    fullsize ? (
                        <VerticalGridSlider springsResize={springsResizeFull} squares={squares} maxW={squaresWidth} cols={4} />
                    ) : (
                        <HorizontalSlider autoplay={{ delay: 60000 }} squares={squares} maxW={squaresWidth} loop={false} />
                    )
                }
            </div>
        </animated.div>
    )
}