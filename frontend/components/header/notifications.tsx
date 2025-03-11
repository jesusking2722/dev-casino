'use client'

import { Dialog, DialogBackdrop } from '@headlessui/react'
import { createRef, useState } from "react"
import { VerticalGridSlider } from "../sliders/verticalGridSlider"
import { useSpring, animated } from '@react-spring/web'
import Image from 'next/image'
import { RxCross2 } from 'react-icons/rx'

type ModalProps = {
    setIsOpen: (foo: boolean) => void
    isOpen: boolean
}

type SquareProps = {
    date: string
    title: string
    message: string
    readed: boolean
}


function NotificationSquare({ date, title, message, readed }: SquareProps) {
    const [removed, setRemoved] = useState(false)

    const onClick = () => {
        setRemoved(true)
    }

    return (
        <div className='mb-[2px]' style={{ display: (removed ? 'none' : 'auto') }}>
            {readed ? (
                <div className='w-[100%] px-[16px] py-[6px] rounded-lg flex flex-row gap-[16px] bg-[#333333] duration-300 cursor-pointer bg-opacity-80 hover:bg-opacity-100'>
                    <div className='size-fit my-auto rounded-full'>
                        <Image alt='icon' src='/email2.svg' width={24} height={24} />
                    </div>
                    <div className='flex flex-col overflow-y-auto w-full'>
                        <p className='text-[#7a7979] text-[9px]'>{date}</p>
                        <p className='text-white text-[14px] font-bold'>{title}</p>
                        <p className='text-[12px] text-[#afafaf] text-ellipsis'>{message}</p>
                    </div>
                    <div onClick={onClick} className='bg-[#1a1a1a] hover:bg-[#111111] duration-300 size-fit p-[8px] my-auto rounded-full mr-0 ml-auto'>
                        <Image alt='icon' src='/trash.svg' width={24} height={24} />
                    </div>
                </div>
            ) : (
                <div className='w-[100%] px-[16px] py-[6px] rounded-lg flex flex-row gap-[16px] bg-[#333333] duration-300 cursor-pointer bg-opacity-40 hover:bg-opacity-60'>
                    <div className='size-fit my-auto rounded-full'>
                        <Image alt='icon' src='/email2.svg' width={24} height={24} />
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-[#7a7979] text-[9px]'>{date}</p>
                        <p className='text-white text-[14px] font-bold'>{title}</p>
                        <p className='text-[12px] text-[#767676]'>{message}</p>
                    </div>
                    <div onClick={onClick} className='bg-[#1a1a1a] hover:bg-[#111111] duration-300 size-fit p-[8px] my-auto rounded-full mr-0 ml-auto'>
                        <Image alt='icon' src='/trash.svg' width={24} height={24} />
                    </div>
                </div>
            )}
        </div>
    )
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

    const plugData = [
        { date: '2024.11.06', title: 'титульник', message: 'некое сообщение некое сообщение некоенекое сообщение некое сообщение некоенекое сообщение некое сообщение некоенекое сообщение некое сообщение некое сообщениенекое сообщениенекое сообщениенекое сообщениенекое сообщение некое сообщение некое сообщениенекое сообщениенекое сообщениенекое сообщение', readed: true },
        { date: '2024.11.06', title: 'титульник', message: 'некое сообщение', readed: true },
        { date: '2024.11.06', title: 'титульник', message: 'некое сообщение', readed: false },
        { date: '2024.11.06', title: 'титульник', message: 'некое сообщение', readed: false },
    ]

    const squares = plugData.map((data, i) => (
        <NotificationSquare key={i} date={data.date} title={data.title} message={data.message} readed={data.readed} />
    ))

    return (
        <>
            <Dialog onClick={onClick} open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black opacity-90" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <div onMouseEnter={hover} onMouseLeave={hover} className="px-[14px] lg:px-[40px] pb-[24px] w-full lg:w-[800px] h-fit bg-[#050508] rounded-md border">
                        <div className="p-[8px] bg-white bg-opacity-15 w-fit rounded-full mr-0 ml-auto mt-[24px] hover:scale-110 duration-300 cursor-pointer">
                            <RxCross2 onClick={() => setIsOpen(false)} size={24} color="white" />
                        </div>
                        <div>
                            <p className="text-white text-center font-bold text-[24px] mt-[8px] lg:mt-[30px] mb-[30px] lg:mb-[60px]">Уведомления</p>
                        </div>
                        <div>
                            <VerticalGridSlider squares={squares} cols={1} maxW={718} />
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}


export function Notifications() {
    const [isOpen, setIsOpen] = useState(false)

    const onClick = () => {
        setIsOpen(true)
    }

    return (
        <>
            <div onClick={onClick} className="place-self-center relative cursor-pointer opacity-85 hover:opacity-100 hover:scale-105 duration-300">
                <span className="absolute flex h-2 w-2 left-[20px]">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <Image src='/email.svg' alt='icon' width={28} height={28} />
            </div>
            <Modal setIsOpen={setIsOpen} isOpen={isOpen} />
        </>
    )
}