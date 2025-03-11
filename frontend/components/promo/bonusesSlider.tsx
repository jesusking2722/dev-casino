'use client'

import { BsArrowRightShort } from "react-icons/bs"
import { useSpring, animated } from '@react-spring/web'
import { useState } from "react"
import Image from "next/image"
import React from "react"
import { HorizontalSlider } from "../sliders/horizontalSlider"
import { FaClock } from "react-icons/fa"
import Link from "next/link"


function Hat() {
    const [springs, api] = useSpring(() => { })
    const [hovered, setHovered] = useState(false)

    const onMouseEnterToButtonEvent = () => {
        setHovered(true)
        api.start({
            from: {
                background: 'transparent',
            },
            to: {
                background: '#333333',
            },
            config: {
                duration: 300,
            }
        })
    }

    const onMouseLeaveFromButtonEvent = () => {
        setHovered(false)
        api.start({
            from: {
                background: '#333333',
            },
            to: {
                background: 'transparent',
            },
            config: {
                duration: 300,
            }
        })
    }

    const onClick = () => {
        window.open(`/bonuses`, '_blank')
    }


    return (
        <div className="flex flex-row">
            <div className="basis-11/12 flex flex-row place-items-center">
                <div className="flex flex-row cursor-default gap-[10px] font-bold text-white text-[20px]">
                    <Image src='/fire.webp' alt='icon' width={32} height={32} />
                    <p>Бонусы</p>
                </div>
            </div>
            <animated.div className="flex flex-row place-self-end rounded-md text-white cursor-pointer" onMouseEnter={onMouseEnterToButtonEvent} onMouseLeave={onMouseLeaveFromButtonEvent} style={springs}>
                <div onClick={onClick} className="flex flex-row gap-[8px] place-items-center bg-opacity-0 pt-[12px] pb-[12px] pl-[24px] pr-[24px]">
                    <div className="font-semibold">Все</div>
                    <div className="justify-items-center">
                        <BsArrowRightShort width={24} height={24} />
                    </div>
                </div>
            </animated.div>
        </div>
    )
}

type SquareProps = {
    img: string
    timeout: string
    name: string
    sum: string
}


function Square({ img, timeout, name, sum }: SquareProps) {
    const link = '/promotions/' + encodeURIComponent(name).replace(/%20/ig, '+')

    return (
        <Link href={link} target="_blank">
            <div className="p-[4px] pb-0 overflow-hidden rounded-md w-[250px] h-[400px] bg-[#0c0c0f] relative flex flex-col border">
                <Image src={img} alt='img' width={306} height={306} className="absolute z-0 place-self-center top-12" />
                <div className="p-[8px] z-1 opacity-95 flex flex-row justify-self-center">
                    <div className="mr-0 ml-auto">
                        <p className="bg-[#fcc20066] p-[8px] pr-[16px] font-bold text-[#fabe00] text-[14px] text-center rounded-md flex flex-row">
                            <FaClock size={21} />
                            <span className="ml-[6px]">{timeout}</span>
                        </p>
                    </div>
                </div>
                <div className="p-[16px] z-10 bg-black opacity-95 mb-0 mt-auto">
                    <p className="mb-[4px] text-white text-[16px] text-center font-bold">{name.toUpperCase()}</p>
                    <p className="text-center text-[#fabe00] text-[20px] font-bold">{sum + '₽'}</p>
                </div>
            </div>
        </Link>
    )
}


export function BonusesSlider() {
    const plugData = [
        { img: '/promo.webp', active: true, timeout: '1д 14:88:66', name: 'игра галактики', sum: '322 000' },
        { img: '/promo.webp', active: true, timeout: '1д 14:88:66', name: 'игра галактики', sum: '322 000' },
        { img: '/promo.webp', active: true, timeout: '1д 14:88:66', name: 'игра галактики', sum: '322 000' },
        { img: '/promo.webp', active: true, timeout: '1д 14:88:66', name: 'игра галактики', sum: '322 000' },
        { img: '/promo.webp', active: true, timeout: '1д 14:88:66', name: 'игра галактики', sum: '322 000' },
        { img: '/promo.webp', active: true, timeout: '1д 14:88:66', name: 'игра галактики', sum: '322 000' },
    ]

    const squares = plugData.map((data, i) => (
        <Square key={i} img={data.img} timeout={data.timeout} name={data.name} sum={data.sum} />
    ))

    return (
        <div className="flex flex-col mb-[64px] container mah-h-[520px] rounded-lg gap-[20px] pt-[12px] pb-[24px] pr-[24px] pl-[24px] bg-[#121215cc]">
            <Hat />
            <HorizontalSlider autoplay={{ delay: 60000 }} squares={squares} maxW={250} loop={false} spaceBetween={16} />
        </div>
    )
}