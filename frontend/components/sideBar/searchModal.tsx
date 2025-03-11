'use client'

import { useState } from "react"
import { Dialog, DialogBackdrop } from '@headlessui/react'
import { VerticalGridSlider } from "../sliders/verticalGridSlider"
import { SquareImageLink } from "../gameSliders/squareImageLink"
import Image from "next/image"
import MediaQuery from "react-responsive"
import { RxCross2 } from "react-icons/rx"

type ModalProps = {
    setIsOpen: (foo: boolean) => void
    isOpen: boolean
}

export function SearchModal({ setIsOpen, isOpen }: ModalProps) {
    const [isHover, setIsHover] = useState(false)

    const onClick = () => {
        if (!isHover)
            setIsOpen(false)
    }

    const hover = () => {
        setIsHover(!isHover)
    }

    const plugData = [
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
        { gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment" },
    ]

    const squares = plugData.map((data, i) => (
        <SquareImageLink key={i} gameName={data.gameName} img={data.img} gameProvider={data.gameProvider} width={170} />
    ))

    return (
        <>
            <Dialog onClick={onClick} open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black opacity-90" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <div onMouseEnter={hover} onMouseLeave={hover} className="px-[12px] lg:px-[40px] pb-[14px] w-full lg:w-[800px] h-fit bg-[#050508] rounded-md border">
                        <div className="p-[8px] bg-white bg-opacity-15 w-fit rounded-full mr-0 ml-auto mt-[24px] hover:scale-110 duration-300 cursor-pointer">
                            <RxCross2 onClick={() => setIsOpen(false)} size={24} color="white" />
                        </div>
                        <div>
                            <p className="text-white text-center font-bold text-[24px] mt-[8px] lg:mt-[30px]">Поиск</p>
                        </div>
                        <div className="mt-[30px] mb-[30px] h-[42px] flex flex-row gap-[12px] w-[90%] place-self-center">
                            <Image width={24} height={24} alt='loopa' src={'/search.svg'} />
                            <input className="text-[#ebebeb] px-[24px] duration-300 placeholder:text-[#ebebeb66] placeholder:text-[14px] placeholder:font-light bg-transparent w-full border rounded-sm size-full shadow-sm outline-none focus:border-[#e5b100] sm:text-sm" placeholder="Введите название игры" type="text" name="search" />
                        </div>
                        <div>
                            <MediaQuery minWidth={1024}>
                                <VerticalGridSlider squares={squares} cols={4} />
                            </MediaQuery>
                            <MediaQuery maxWidth={1023}>
                                <VerticalGridSlider squares={squares} cols={2} />
                            </MediaQuery>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}