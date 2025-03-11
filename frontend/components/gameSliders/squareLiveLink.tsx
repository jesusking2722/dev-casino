'use client'

import Image from "next/image"
import { useState } from "react"
import { useSpring, animated } from '@react-spring/web'

type Props = {
    gameName: string
    caption: string
    img: string
    width: number
}

export function SquareLiveLink({ gameName, caption, img, width }: Props) {
    const [hovered, setHovered] = useState(false)
    const [springs, api] = useSpring(() => { })

    const onMouseEnterEvent = () => {
        setHovered(true)
        api.start({
            from: {
                opacity: 0,
            },
            to: {
                opacity: 1,
            },
            config: {
                duration: 300,
            }
        })
    }

    const onMouseLeaveEvent = () => {
        api.start({
            from: {
                opacity: 1,
            },
            to: {
                opacity: 0,
            },
            config: {
                duration: 150,
            }
        })
    }

    const onDivClick = () => {

        const url = '/game/' + encodeURIComponent(gameName).replace(/%20/ig, '+')
        window.open(url, '_blank')
    }

    return (
        <div onClick={onDivClick} className="bg-[#1c1c1c] inline-block rounded-lg relative cursor-pointer" style={{ width: '100%' }} onMouseEnter={onMouseEnterEvent} onMouseLeave={onMouseLeaveEvent}>
            <animated.div className="absolute flex flex-col bg-[#050508b3] opacity-0" style={{ width: width, height: width, ...springs }}>
                <div className="content-start justify-items-center mx-auto p-[8px] my-auto">
                    <p className="text-white font-bold text-center text-[16px] break-words px-[24px]">{gameName.toUpperCase()}</p>
                    <p className="text-[#a1a1a1] text-[14px] font-semibold px-[32px] mt-[4px]">{caption}</p>
                    <Image alt='play button' src='/play-button.svg' width={44} height={44} className="fill-[#fabe00] mt-[16px] mx-auto" />
                </div>
            </animated.div>
            <Image alt={gameName} src={img} width={width} height={width} className="rounded-md" />
            <div className="bg-[#282828] pl-[24px] py-[16px] pr-[36px] text-[14px] text-white font-bold rounded-b-lg text-center">
                {gameName}
            </div>
        </div>
    )
}