'use client'

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogBackdrop } from '@headlessui/react'
import {useTranslations} from "next-intl";

type ModalProps = {
    setIsOpen: (foo: boolean) => void
    isOpen: boolean
}

export function CashboxModal({ setIsOpen, isOpen }: ModalProps) {
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
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <div onMouseEnter={hover} onMouseLeave={hover} className="size-fit bg-white">
                        CASHBOX MODAL
                    </div>
                </div>
            </Dialog>
        </>
    )
}


export function Cashbox() {
    const [isOpen, setIsOpen] = useState(false)

    const t = useTranslations('app')

    const onClick = () => {
        setIsOpen(true)
    }

    return (
        <div className="place-self-center">
            <div onClick={onClick} className="flex flex-row hover:bg-[#01c365] duration-300 gap-[6px] text-white text-[12px] lg:text-[15px] cursor-pointer font-semibold py-[8px] px-[8px] lg:py-[12px] lg:px-[18px] lg:h-[45px] bg-[#018642] rounded-md">
                <Image src='/wallet.svg' alt='icon' width={21} height={21} className="w-[18px] lg:w-[21px]" />
                <p>{t('cashbox')}</p>
            </div>
            <CashboxModal setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
    )
}