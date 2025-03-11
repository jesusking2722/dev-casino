'use client'

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogBackdrop } from '@headlessui/react'
import { GamesSlider } from "../gameSliders/gamesSlider"
import MediaQuery from "react-responsive"
import { RxCross2 } from "react-icons/rx"


type ModalProps = {
    setIsOpen: (foo: boolean) => void
    isOpen: boolean
}

function Modal({ setIsOpen, isOpen }: ModalProps) {
    const [isHover, setIsHover] = useState(false)

    const onClick = () => {
        if (!isHover)
            setIsOpen(false)
    }

    const hover = () => {
        setIsHover(!isHover)
    }

    return (
        <>
            <Dialog onClick={onClick} open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black opacity-90" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <div onMouseEnter={hover} onMouseLeave={hover} className="place-self-center">
                        <div className="p-[8px] bg-white bg-opacity-15 w-fit rounded-full mx-auto mb-[14px] hover:scale-110 duration-300 cursor-pointer">
                            <RxCross2 onClick={() => setIsOpen(false)} size={24} color="white" />
                        </div>
                        <GamesSlider title='Избранные игры' img='/heart-fill.svg' cols={4} fullSquareSize={170} squareSize={200} />
                    </div>
                </div>
            </Dialog>
        </>
    )
}


export function Favorites() {
    const [isOpen, setIsOpen] = useState(false)

    const onClick = () => {
        setIsOpen(true)
    }

    return (
        <>
            <div className="cursor-pointer w-fit rounded-md bg-transparent place-content-center hover:bg-[#333333] duration-300">
                <div onClick={onClick} className="flex flex-col my-auto place-content-center lg:flex-row lg:gap-[12px] lg:py-[12px] lg:px-[24px] font-bold text-white text-[10px] lg:text-[16px]">
                    <Image src='/heart-fill.svg' alt='icon' width={21} height={21} className="place-self-center mx-auto my-auto w-[28px] py-[4px] lg:py-0 lg:w-[21px]" />
                    <MediaQuery minWidth={1024}>
                        <p className="mx-auto">Избранные игры</p>
                    </MediaQuery>
                </div>
            </div>
            <Modal setIsOpen={setIsOpen} isOpen={isOpen} />
        </>
    )
}