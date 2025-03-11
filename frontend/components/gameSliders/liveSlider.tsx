'use client'

import { useSpring, animated } from '@react-spring/web'
import { useState } from "react"
import { HorizontalSlider } from "../sliders/horizontalSlider"
import { VerticalGridSlider } from "../sliders/verticalGridSlider"
import { SquareLiveLink } from "./squareLiveLink"
import Hat from '../sliders/hat'
import React from "react"
import MediaQuery from 'react-responsive'


type Props = {
    title: string
    img: string
    cols?: number
    squareSize?: number
    fullSquareSize?: number
    classes?: string
    styles?: any
}


export function LiveSlider({ title, img, cols = 4, classes = '', styles = {} }: Props) {
    const [fullsize, setFullsize] = useState(false)
    const [springs, api] = useSpring(() => { })
    const [springsRotate, apiRotate] = useSpring(() => { })
    const [springsResizeFull, apiResizeFull] = useSpring(() => { })

    const onFullsizeClick = () => {
        if (!fullsize) {
            setFullsize(true)
            api.start({
                from: {
                    height: 440,
                },
                to: {
                    height: 600,
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
                    height: 600,
                },
                to: {
                    height: 440,
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
        { gameName: "BlackJack X 14 - Ruby", img: '/blackjack-ruby.webp', caption: 'Pragamtic Play Live' },
        { gameName: "BlackJack X 14 - Ruby", img: '/blackjack-ruby.webp', caption: 'Pragamtic Play Live' },
        { gameName: "BlackJack X 14 - Ruby", img: '/blackjack-ruby.webp', caption: 'Pragamtic Play Live' },
        { gameName: "BlackJack X 14 - Ruby", img: '/blackjack-ruby.webp', caption: 'Pragamtic Play Live' },
        { gameName: "BlackJack X 14 - Ruby", img: '/blackjack-ruby.webp', caption: 'Pragamtic Play Live' },
        { gameName: "BlackJack X 14 - Ruby", img: '/blackjack-ruby.webp', caption: 'Pragamtic Play Live' },
        { gameName: "BlackJack X 14 - Ruby", img: '/blackjack-ruby.webp', caption: 'Pragamtic Play Live' },
        { gameName: "BlackJack X 14 - Ruby", img: '/blackjack-ruby.webp', caption: 'Pragamtic Play Live' },
        { gameName: "BlackJack X 14 - Ruby", img: '/blackjack-ruby.webp', caption: 'Pragamtic Play Live' },
        { gameName: "BlackJack X 14 - Ruby", img: '/blackjack-ruby.webp', caption: 'Pragamtic Play Live' },
        { gameName: "BlackJack X 14 - Ruby", img: '/blackjack-ruby.webp', caption: 'Pragamtic Play Live' },
        { gameName: "BlackJack X 14 - Ruby", img: '/blackjack-ruby.webp', caption: 'Pragamtic Play Live' },
        { gameName: "BlackJack X 14 - Ruby", img: '/blackjack-ruby.webp', caption: 'Pragamtic Play Live' },
    ]

    if (classes == '')
        classes = 'flex flex-col mb-[64px] container mah-h-[600px] rounded-lg gap-[20px] pt-[12px] pb-[24px] pr-[24px] pl-[24px] bg-transparent'

    return (
        <animated.div style={{ ...styles, ...springs }} className={classes} >
            <Hat title={title} img={img} onClick={onFullsizeClick} fullsize={fullsize} springsRotate={springsRotate} />
            <MediaQuery minWidth={1024}>
                {
                    fullsize ? (
                        <VerticalGridSlider springsResize={springsResizeFull} cols={cols} maxW={280} styles={{ maxHeight: 550 }} squares={plugData.map((data, i) => (
                            <SquareLiveLink key={i} gameName={data.gameName} img={data.img} caption={data.caption} width={280} />
                        ))} />
                    ) : (
                        <HorizontalSlider autoplay={{ delay: 60000 }} maxW={280} loop={false} squares={plugData.map((data, i) => (
                            <SquareLiveLink key={i} gameName={data.gameName} img={data.img} caption={data.caption} width={280} />
                        ))} />
                    )
                }
            </MediaQuery>
            <MediaQuery maxWidth={1023}>
                <HorizontalSlider autoplay={{ delay: 60000 }} maxW={210} loop={false} squares={plugData.map((data, i) => (
                    <SquareLiveLink key={i} gameName={data.gameName} img={data.img} caption={data.caption} width={210} />
                ))} />
            </MediaQuery>
        </animated.div>
    )
}