'use client'

import {useRef, useState} from "react"
import {Dialog, DialogBackdrop} from '@headlessui/react'
import {PhoneInput} from "react-international-phone"
import 'react-international-phone/style.css'
import InputMask from "@mona-health/react-input-mask"
import Image from "next/image"
import LanguagePicker from "../languagePicker"
import {RxCross2} from "react-icons/rx"
import {useTranslations} from "next-intl"
import {SubmitHandler, useForm} from 'react-hook-form'
import AuthService from "@/utils/auth/AuthService"
import {ProfileButton} from "@/components/ui/buttons/ProfileButton";
import ReferralModal from "@/components/sideBar/ReferralModal";

const auth = new AuthService()

type userInput = {
    username: string
    phone: string
    email: string
    avatar: string
    birthday: Date
}

type ModalProps = {
    setIsOpen: (foo: boolean) => void
    isOpen: boolean
}

enum OpenedTab {
    profile = 'profile',
    settings = 'settings',
    messages = 'messages',
    referral = 'referral'
}

export function ProfileModal({setIsOpen, isOpen}: ModalProps) {
    const data = auth.getProfile()

    const [isHover, setIsHover] = useState(false)
    const [phone, setPhone] = useState(data.phone || '')
    const inputFile = useRef(null)

    const [openedModal, setOpenedModal] = useState<OpenedTab>(OpenedTab.profile)

    const {register, handleSubmit, watch, formState: {errors}, setError} = useForm<any>()

    const tAuth = useTranslations('auth')
    const tApp = useTranslations('app')

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
                <DialogBackdrop className="fixed inset-0 bg-black opacity-90"/>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <div onMouseEnter={hover} onMouseLeave={hover}
                         className="overflow-y-scroll w-full lg:w-[800px] h-[600px] py-[12px] lg:py-[24px] px-[8px] lg:px-[24px] bg-black border rounded-lg flex flex-col">
                        <div
                            className="p-[8px] bg-white bg-opacity-15 w-fit rounded-full mr-0 ml-auto mt-[24px] hover:scale-110 duration-300 cursor-pointer">
                            <RxCross2 onClick={() => setIsOpen(false)} size={24} color="white"/>
                        </div>
                        <div className="flex flex-col">
                            <Image src='/logo.svg' alt='logo' width={185} height={52}
                                   className="place-self-center py-[12px]"/>
                            <p className="text-[24px] text-white font-bold text-center">{tApp('my_profile')}</p>
                        </div>
                        {openedModal == OpenedTab.profile &&
                            <div
                                className="mt-[28px] lg:px-[185px] grid grid-flow-col gap-[12px] grid-cols-3 items-center">
                                <div className="mx-auto cursor-pointer hover:scale-110 duration-300 flex flex-col">
                                    <Image src='/level.webp' alt='logo' width={56} height={48}
                                           className="place-self-center rounded-full bg-yellow-400 bg-opacity-20 p-[12px] w-[70px] mx-auto"/>
                                    <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px] text-center mt-[2px] mx-auto">{tApp('level')}</p>
                                </div>
                                <div onClick={() => { // @ts-ignore
                                    inputFile.current.click()
                                }} className="mx-auto cursor-pointer hover:scale-110 duration-300">
                                    <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
                                    <Image src='/user.svg' alt='logo' width={56} height={48}
                                           className="place-self-center rounded-full bg-yellow-400 bg-opacity-20 p-[12px] w-[70px] mx-auto"/>
                                    <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px] text-center mt-[2px] mx-auto">{tApp('avatar')}</p>
                                </div>
                                <div onClick={() => {
                                    window.open('/bonuses', '_blank')
                                }} className="mx-auto cursor-pointer hover:scale-110 duration-300">
                                    <Image src='/bonus-machine.webp' alt='logo' width={56} height={48}
                                           className="place-self-center rounded-full bg-yellow-400 bg-opacity-20 p-[12px] w-[70px] mx-auto"/>
                                    <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px] text-center mt-[2px] mx-auto">{tApp('bonuses')}</p>
                                </div>
                            </div>}
                        {openedModal == OpenedTab.settings &&
                            <div className="flex flex-col lg:flex-row px-[16px] gap-[32px] mt-[72px]">
                                <div className="flex flex-col gap-[16px] w-full lg:w-[50%]">
                                    <p className="text-white font-bold text-[18px] mb-[8px]">{tApp('your_data')}</p>
                                    <div className="flex flex-col">
                                        <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">{tApp('nickname')}</p>
                                        <input 
                                            defaultValue={data.username}
                                            className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                            type="text" 
                                            name="search"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">{tApp('email')}</p>
                                        <input 
                                            defaultValue={data.email}
                                            className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                            type="text" 
                                            name="search"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">{tApp('phone_number')}</p>
                                        <PhoneInput
                                            defaultCountry="ru"
                                            value={phone || ''}
                                            onChange={(phone) => setPhone(phone)}
                                            inputClassName="h-[48px] py-[14px] w-full outline-none focus:border-[#e5b100] bg-[#1c1c1c] text-[#ebebeb] rounded-lg border-[#2c2c2c] px-[24px] placeholder:text-[#666666]"
                                            className="bg-[#1c1c1c] hover:bg-[#1c1c1c] rounded-lg [&>div]:!h-[48px]"
                                            style={{
                                                '--react-international-phone-height': '48px',
                                                '--react-international-phone-border-radius': '0.5rem',
                                                '--react-international-phone-border-color': '#2c2c2c',
                                                '--react-international-phone-background-color': '#1c1c1c',
                                                '--react-international-phone-text-color': '#ebebeb',
                                                '--react-international-phone-selected-background-color': '#2c2c2c',
                                                '--react-international-phone-dropdown-background-color': '#1c1c1c',
                                                '--react-international-phone-hover-background-color': '#2c2c2c',
                                            } as React.CSSProperties}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">{tApp('date_of_birth')}</p>
                                        <input 
                                            type="date" 
                                            defaultValue={data.birthday || ''} 
                                            mask="99-99-9999"
                                            className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                            name="search"
                                        />
                                    </div>
                                    <button
                                        className="mt-[24px] w-full py-[14px] text-center cursor-pointer text-[16px] text-black font-bold bg-[#e5b100] hover:bg-[#f6c000] active:bg-[#d4a500] duration-300 rounded-lg shadow-md"
                                    >
                                        {tApp('save')}
                                    </button>
                                </div>
                                <div className="flex flex-col gap-[16px] w-full mt-[24px] lg:mt-0 lg:w-[50%]">
                                    <p className="text-white font-bold text-[18px] mb-[8px]">{tApp('change_password')}:</p>
                                    <div className="flex flex-col">
                                        <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">{tApp('old_password')}</p>
                                        <input
                                            className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                            type="password" 
                                            name="search"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">{tApp('new_password')}</p>
                                        <input
                                            className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                            type="password" 
                                            name="search"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">{tApp('repeat_new_password')}</p>
                                        <input
                                            className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                            type="password" 
                                            name="search"
                                        />
                                    </div>
                                    <button
                                        className="mt-[24px] w-full py-[14px] text-center cursor-pointer text-[16px] text-[#ebebeb] font-bold bg-[#1c1c1c] hover:bg-[#2c2c2c] border border-[#2c2c2c] duration-300 rounded-lg"
                                    >
                                        {tApp('change_password')}
                                    </button>
                                </div>
                            </div>}
                        {openedModal == OpenedTab.referral &&
                            <ReferralModal/>}
                        <div className="w-fit mx-auto mt-[48px]">
                            <button onClick={() => {
                                auth.logout()
                                setIsOpen(false)
                            }}
                                    className="mt-[12px] py-[12px] px-[24px] w-full text-center cursor-pointer text-[16px] text-white font-bold h-[44px] bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 duration-300 rounded-lg shadow-md">
                                {tApp('logout')}
                            </button>
                        </div>
                        {/* Bottom Navigation Section */}
                        <div className="mt-[24px] flex justify-around border-t border-[#333] pt-[12px]">
                            <ProfileButton onClick={() => setOpenedModal(OpenedTab.profile)}
                                           isOpen={openedModal == OpenedTab.profile}>{tApp('my_profile')}</ProfileButton>
                            <ProfileButton onClick={() => setOpenedModal(OpenedTab.settings)}
                                           isOpen={openedModal == OpenedTab.settings}>{tApp('settings')}</ProfileButton>
                            <ProfileButton onClick={() => setOpenedModal(OpenedTab.messages)}
                                           isOpen={openedModal == OpenedTab.messages}>{tApp('messages')}</ProfileButton>
                            <ProfileButton onClick={() => setOpenedModal(OpenedTab.referral)}
                                           isOpen={openedModal == OpenedTab.referral}>{tApp('referral_system')}</ProfileButton>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}