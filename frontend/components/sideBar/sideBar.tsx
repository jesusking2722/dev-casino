'use client'

import {useEffect, useState} from "react"
import Image from "next/image"
import {Link} from "@/i18n/routing"
import {CashboxModal} from "../header/cashbox"
import {ProfileModal} from "./profileModal"
import {SearchModal} from "./searchModal"
import MediaQuery from "react-responsive"
import {animated, useSpring} from "@react-spring/web"
import {RxHamburgerMenu} from "react-icons/rx"
import {transform} from "next/dist/build/swc/generated-native"
import {LoginModal} from "@/components/sideBar/loginDialog";
import {useTranslations} from "next-intl";
import AuthService from "@/utils/auth/AuthService";

const auth = new AuthService()

export function SideBar() {
    const [isCashBoxModalOpen, setIsCashBoxModalOpen] = useState(false)
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [menuSpring, menuSpringApi] = useSpring(() => {
    })
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const tApp = useTranslations('app')

    const openCashBoxModal = () => {
        setIsCashBoxModalOpen(true)
    }


    const openProfileModal = () => {
        setIsProfileModalOpen(true)
    }

    const openSearchModal = () => {
        setIsSearchModalOpen(true)
    }

    const openLoginModal = () => {
        setIsLoginModalOpen(true)
    }

    // Check if user is logged in on page load
    const isAuth = auth.loggedIn()

    const buttons = (
        <>
            <div onClick={isAuth ? openProfileModal : openLoginModal}
                 className="py-[8px] px-[14px] lg:px-0 w-[120px] lg:w-full place-content-center mx-auto cursor-pointer flex flex-col hover:bg-opacity-50 hover:scale-110 bg-opacity-0 duration-300 bg-[#333333] rounded-lg">
                <Image alt='open' width={45} height={45} src="/user.svg"
                       className='lg:p-[4px] place-self-center mt-auto mb-0 lg:my-auto lg:w-[45px] w-[42px] mx-auto'/>
                <p className="mx-auto text-center text-[12px] text-[#a1a1a1] font-semibold mt-[4px] mb-auto lg:my-auto lg:text-[12px]">{isAuth ? tApp('my_profile') : tApp('login')}</p>
            </div>
            <Link href='/games'
                  className="place-content-center mx-auto py-[8px] px-[14px] lg:px-0 w-[120px] lg:w-full lg:mx-auto flex flex-col hover:bg-opacity-50 hover:scale-110 bg-opacity-0 duration-300 bg-[#333333] rounded-lg">
                <Image alt='open' width={45} height={45} src="/play.svg"
                       className='p-[4px] place-self-center mt-auto mb-0 lg:my-auto lg:w-[45px] w-[42px] mx-auto'/>
                <p className="mx-auto text-center text-[12px] text-[#a1a1a1] font-semibold mt-[4px] mb-auto lg:my-auto lg:text-[12px]">{tApp('games')}</p>
            </Link>
            <div onClick={openCashBoxModal}
                 className="py-[8px] px-[14px] lg:px-0 w-[120px] lg:w-full place-content-center mx-auto lg:mx-auto cursor-pointer flex flex-col hover:bg-opacity-50 hover:scale-110 bg-opacity-0 duration-300 bg-[#333333] rounded-lg">
                <Image alt='open' width={45} height={45} src="/wallet-2.svg"
                       className='p-[4px] place-self-center mt-auto mb-0 lg:my-auto lg:w-[45px] w-[42px] mx-auto'/>
                <p className="mx-auto text-center text-[12px] text-[#a1a1a1] font-semibold mt-[4px] mb-auto lg:my-auto lg:text-[12px]">{tApp('cashbox')}</p>
            </div>
            <Link href='/promotions'
                  className="py-[8px] px-[14px] lg:px-0 w-[120px] lg:w-full place-content-center mx-auto lg:mx-auto flex flex-col hover:bg-opacity-50 hover:scale-110 bg-opacity-0 duration-300 bg-[#333333] rounded-lg">
                <Image alt='open' width={45} height={45} src="/fire.svg"
                       className='p-[4px] place-self-center mt-auto mb-0 lg:my-auto lg:w-[45px] w-[42px] mx-auto'/>
                <p className="mx-auto text-center text-[12px] text-[#a1a1a1] font-semibold mt-[4px] mb-auto lg:my-auto lg:text-[12px]">{tApp('promotions')}</p>
            </Link>
            <Link href='/bonuses'
                  className="py-[8px] px-[14px] lg:px-0 w-[120px] lg:w-full place-content-center mx-auto lg:mx-auto flex flex-col hover:bg-opacity-50 hover:scale-110 bg-opacity-0 duration-300 bg-[#333333] rounded-lg">
                <Image alt='open' width={45} height={45} src="/giftbox.svg"
                       className='p-[4px] place-self-center mt-auto mb-0 lg:my-auto lg:w-[45px] w-[42px] mx-auto'/>
                <p className="mx-auto text-center text-[12px] text-[#a1a1a1] font-semibold mt-[4px] mb-auto lg:my-auto lg:text-[12px]">{tApp('bonus')}</p>
            </Link>
            <Link href='/raffles'
                  className="py-[8px] px-[14px] lg:px-0 w-[120px] lg:w-full place-content-center mx-auto lg:mx-auto flex flex-col hover:bg-opacity-50 hover:scale-110 bg-opacity-0 duration-300 bg-[#333333] rounded-lg">
                <Image alt='open' width={45} height={45} src="/ticket.svg"
                       className='p-[4px] place-self-center mt-auto mb-0 lg:my-auto lg:w-[45px] w-[42px] mx-auto'/>
                <p className="mx-auto text-center text-[12px] text-[#a1a1a1] font-semibold mt-[4px] mb-auto lg:my-auto lg:text-[12px]">{tApp('lottery')}</p>
            </Link>
            <Link href='/tournaments'
                  className="py-[8px] px-[14px] lg:px-0 w-[120px] lg:w-full place-content-center mx-auto lg:mx-auto flex flex-col hover:bg-opacity-50 hover:scale-110 bg-opacity-0 duration-300 bg-[#333333] rounded-lg">
                <Image alt='open' width={45} height={45} src="/cup.svg"
                       className='p-[4px] place-self-center mt-auto mb-0 lg:my-auto lg:w-[45px] w-[42px] mx-auto'/>
                <p className="mx-auto text-center text-[12px] text-[#a1a1a1] font-semibold mt-[4px] mb-auto lg:my-auto lg:text-[12px]">{tApp('tournaments')}</p>
            </Link>
            <div onClick={openSearchModal}
                 className="py-[8px] px-[14px] lg:px-0 w-[120px] lg:w-full place-content-center mx-auto lg:mx-auto cursor-pointer flex flex-col hover:bg-opacity-50 hover:scale-110 bg-opacity-0 duration-300 bg-[#333333] rounded-lg">
                <Image alt='open' width={45} height={45} src="/search.svg"
                       className='p-[4px] place-self-center mt-auto mb-0 lg:my-auto lg:w-[45px] w-[42px] mx-auto'/>
                <p className="mx-auto text-center text-[12px] text-[#a1a1a1] font-semibold mt-[4px] mb-auto lg:my-auto lg:text-[12px]">{tApp('search')}</p>
            </div>
            <Link href='/info'
                  className="py-[8px] px-[14px] lg:px-0 w-[120px] lg:w-full place-content-center mx-auto lg:mx-auto flex flex-col hover:bg-opacity-50 hover:scale-110 bg-opacity-0 duration-300 bg-[#333333] rounded-lg">
                <Image alt='open' width={45} height={45} src="/info.svg"
                       className='p-[4px] place-self-center mt-auto mb-0 lg:my-auto lg:w-[45px] w-[42px] mx-auto'/>
                <p className="mx-auto text-center text-[12px] text-[#a1a1a1] font-semibold mt-[4px] mb-auto lg:my-auto lg:text-[12px]">Информация</p>
            </Link>
        </>
    )

    const toggleMenu = () => {
        if (!isMenuOpen) {
            document.body.style.overflowY = "hidden"
            menuSpringApi.start({
                from: {
                    transform: 'translate(0, -100%)',
                    opacity: 0,
                    pointerEvents: 'none'
                },
                to: {
                    transform: 'translate(0, 0)',
                    opacity: 1,
                    pointerEvents: 'auto'
                },
                config: {duration: 400}
            })
        } else {
            document.body.style.overflowY = "auto"
            menuSpringApi.start({
                to: {
                    opacity: 0,
                    pointerEvents: 'none'
                }
            })
        }

        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <MediaQuery minWidth={1024}>
                <div className="z-40 fixed rounded-lg h-full w-[85px] bg-[#050508] border top-0">
                    <div className="flex w-full flex-col mt-[66px] gap-[8px]">
                        {buttons}
                    </div>
                </div>
                <CashboxModal isOpen={isCashBoxModalOpen} setIsOpen={setIsCashBoxModalOpen}/>
                <ProfileModal isOpen={isProfileModalOpen} setIsOpen={setIsProfileModalOpen}/>
                <SearchModal isOpen={isSearchModalOpen} setIsOpen={setIsSearchModalOpen}/>
                <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen}/>
            </MediaQuery>

            <MediaQuery maxWidth={1023}>
                <div onClick={toggleMenu}
                     className="sticky hover:scale-105 p-[12px] bg-yellow-500 bg-opacity-75 brightness-110 backdrop-blur-sm w-fit rounded-full top-[95px] left-[83%] z-40">
                    <RxHamburgerMenu size={24} color=""/>
                </div>
                <animated.div onClick={toggleMenu} style={menuSpring}
                              className="pointer-events-none place-content-center opacity-0 z-30 fixed rounded-lg h-full w-full bg-gradient-to-r from-black to-[#000000dd] backdrop-blur-sm top-0">
                    <div className="flex w-[80%] h-[75%] flex-row flex-wrap mx-auto mb-auto mt-[20%]">
                        {buttons}
                    </div>
                </animated.div>
                <CashboxModal isOpen={isCashBoxModalOpen} setIsOpen={setIsCashBoxModalOpen}/>
                <ProfileModal isOpen={isProfileModalOpen} setIsOpen={setIsProfileModalOpen}/>
                <SearchModal isOpen={isSearchModalOpen} setIsOpen={setIsSearchModalOpen}/>
                <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen}/>
            </MediaQuery>
        </>
    )
}