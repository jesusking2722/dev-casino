'use client'

import { HorizontalSlider } from "@/components/sliders/horizontalSlider"
import { SquareImageLink } from "@/components/gameSliders/squareImageLink"
import BackgroundVideo from 'next-video/background-video'
import { CashboxModal } from "@/components/header/cashbox"
import { useState } from "react"
import { FaGamepad } from "react-icons/fa"
import { FaMedal } from "react-icons/fa"
import { GiTrophyCup } from "react-icons/gi"
import { PiMedalFill } from "react-icons/pi"
import MediaQuery from "react-responsive"
import Image from "next/image"
import React from "react"


type LeaderLineProps = {
    place: number
    nick: string
    slotName: string
    slotX: string
    slotImg: string
    prize: string
}

function LeaderLine({ place, nick, slotName, slotX, slotImg, prize }: LeaderLineProps) {
    place += 1

    return (
        <div className="flex flex-row py-[8px] lg:py-[18px] px-[4px] lg:px-[12px] font-semibold gap-[12px] bg-transparent">
            <div className="text-[16px] text-[#a1a1a1] w-[24px] place-content-center">
                {place == 1 && <PiMedalFill className="text-[#fabe00] bottom-[20px] lg:bottom-0" size={24} />}
                {place == 2 && <PiMedalFill className="text-[#c0c0c0] bottom-[20px] lg:bottom-0" size={24} />}
                {place == 3 && <PiMedalFill className="text-[#b38a00] bottom-[20px] lg:bottom-0" size={24} />}
                {place > 3 && <p>{place + '.'}</p>}

            </div>
            <div className="text-[16px] text-white place-content-center">
                {nick[0] + nick[1] + nick[2] + nick[3] + '*****'}
            </div>
            <div className="flex flex-row">
                <div className="place-content-center">
                    <Image src={slotImg} alt={slotName} width={32} height={32} className="my-auto mr-[8px]" />
                </div>
                <div className="flex flex-col">
                    <p className="text-[14px] lg:text-[16px] text-white">{slotName}</p>
                    <p className="text-[10px] lg:text-[12px] text-red-400">{slotX}</p>
                </div>
            </div>
            <div className="text-[14] lg:text-[16px] text-yellow-500 ml-auto mr-[12px] lg:mr-[24px] place-content-center">
                {prize}
            </div>
        </div>
    )
}

export default function Page({ params }: { params: Promise<{ name: string }> }) {
    const [isCashBoxModalOpen, setIsCashBoxModalOpen] = useState(false)
    const name = React.use(params).name

    const openCashBoxModal = () => {
        setIsCashBoxModalOpen(true)
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
    ]

    const squares = plugData.map((data, i) => (
        <SquareImageLink key={i} gameName={data.gameName} img={data.img} gameProvider={data.gameProvider} width={148} />
    ))

    const plugTop = [
        {
            nick: 'Pizzamozarella',
            slotName: 'piggy piggg',
            slotX: 'x 12 108,7',
            slotImg: '/plug.webp',
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            slotName: 'piggy piggg',
            slotX: 'x 12 108,7',
            slotImg: '/plug.webp',
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            slotName: 'piggy piggg',
            slotX: 'x 12 108,7',
            slotImg: '/plug.webp',
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            slotName: 'piggy piggg',
            slotX: 'x 12 108,7',
            slotImg: '/plug.webp',
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            slotName: 'piggy piggg',
            slotX: 'x 12 108,7',
            slotImg: '/plug.webp',
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            slotName: 'piggy piggg',
            slotX: 'x 12 108,7',
            slotImg: '/plug.webp',
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            slotName: 'piggy piggg',
            slotX: 'x 12 108,7',
            slotImg: '/plug.webp',
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            slotName: 'piggy piggg',
            slotX: 'x 12 108,7',
            slotImg: '/plug.webp',
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            slotName: 'piggy piggg',
            slotX: 'x 12 108,7',
            slotImg: '/plug.webp',
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            slotName: 'piggy piggg',
            slotX: 'x 12 108,7',
            slotImg: '/plug.webp',
            prize: '150 000',
        },
    ]

    const top = plugTop.map((data, i) => (
        <LeaderLine key={i} place={i} nick={data.nick} slotName={data.slotName} slotX={data.slotX} slotImg={data.slotImg} prize={data.prize} />
    ))

    return (
        <div className="flex flex-col">
            <div className="container rounded-lg border flex flex-col mt-[42px]">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-[50%]">
                        <MediaQuery minWidth={1024}>
                            <BackgroundVideo src={'/video.mp4'} height={512} />
                        </MediaQuery>
                        <MediaQuery maxWidth={1023}>
                            <BackgroundVideo src={'/video.mp4'} height={250} />
                        </MediaQuery>
                    </div>
                    <div className="bg-[#1c1c1e] w-full lg:w-[50%] p-[16px] flex flex-col gap-[16px] place-content-center">
                        <div className="mx-auto">
                            <Image alt='icon' src={'/bomb.svg'} width={64} height={64} />
                        </div>
                        <div className="text-white text-[28px] lg:text-[40px] text-center mx-auto font-bold">
                            Дикий, дикий Pragmatic
                        </div>
                        <div className="text-[#a1a1a1] text-[14px] text-center mx-auto font-semibold text-wrap">
                            Отправляйся покорять игровые просторы Дикого Запада!<br /> Впереди — крутые приключения, призы и напряженная дуэль с Пани Удачей! Вперед, ковбой! Награда найдет смелых!
                        </div>
                        <div className="text-center mx-auto text-wrap flex flex-col">
                            <p className="text-[#a1a1a1] text-[20px] font-bold">Призовой фонд акции:</p>
                            <p className="text-yellow-500 text-[36px] font-extrabold">2 013 000₴</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#121215] text-white font-bold text-[20px] lg:text-[24px] py-[12px] text-center">
                    Игры дикого лютого
                </div>
                <div className="p-[14px] lg:p-[32px]">
                    <HorizontalSlider autoplay={{ delay: 60000 }} squares={squares} maxW={148} loop={false} />
                </div>
            </div>
            <div className="text-white text-[24px] lg:text-[32px] font-bold mx-auto text-center my-[52px] lg:my-[72px]">
                Как покорить дикий запад?
            </div>
            <div className="flex flex-row flex-wrap gap-[62px] container place-content-center">
                <div className="flex flex-col">
                    <div className="p-[20px] rounded-full bg-yellow-500 bg-opacity-30 place-content-center mx-auto mb-[12px]">
                        <FaGamepad size={40} color="#fabe00" className="mx-auto my-auto" />
                    </div>
                    <div className="text-white text-[20px] font-bold text-center">
                        Играйте на слотах Дикого Запада
                    </div>
                    <div className="text-[#a1a1a1] text-[14px] text-center w-[350px] mx-auto">
                        Ловите лучшие X-win на слотах Pragmatic
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="p-[20px] rounded-full bg-yellow-500 bg-opacity-30 place-content-center mx-auto mb-[12px]">
                        <FaMedal size={40} color="#fabe00" className="mx-auto my-auto" />
                    </div>
                    <div className="text-white text-[20px] font-bold text-center">
                        Победитель каждый день — лидер один
                    </div>
                    <div className="text-[#a1a1a1] text-[14px] text-center w-[350px] mx-auto">
                        Каждый день мы награждаем игроков призами от 400₴ до 5000₴, лучшие игроки соревнуются за главные призы
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="p-[20px] rounded-full bg-yellow-500 bg-opacity-30 place-content-center mx-auto mb-[12px]">
                        <GiTrophyCup size={40} color="#fabe00" className="mx-auto my-auto" />
                    </div>
                    <div className="text-white text-[20px] font-bold text-center">
                        Общий призовой фонд — 2 013 000₴
                    </div>
                    <div className="text-[#a1a1a1] text-[14px] text-center w-[350px] mx-auto">
                        Игрок, который словил наибольший Х-win в течении месяца, забирает 150 000₴ на реальный баланс!
                    </div>
                </div>
            </div>
            <div className="place-self-center mt-[32px]">
                <div onClick={openCashBoxModal} className="flex flex-row hover:bg-[#01c365] duration-300 gap-[6px] text-white cursor-pointer font-semibold pt-[12px] pb-[12px] px-[62px] h-[45px] bg-[#018642] rounded-md">
                    <p>Депозит</p>
                </div>
                <CashboxModal setIsOpen={setIsCashBoxModalOpen} isOpen={isCashBoxModalOpen} />
            </div>
            <div className="text-white text-[24px] lg:text-[32px] font-bold mx-auto text-center mt-[90px]">
                Рейтинг дикого запада
            </div>
            <div className="container border flex flex-col gap-[24px] lg:gap-0 lg:flex-row rounded-lg mt-[42px]">
                <div className="w-full lg:w-[50%] p-[8px] lg:p-[24px] rounded-lg rounded-r-none flex flex-col">
                    <div className="text-[16px] lg:text-[18px] text-white font-bold text-center mx-auto mb-[12px]">
                        ТОП 10 X-Win за Сегодня
                    </div>
                    <div className="flex flex-row text-[14px] text-[#767676] mx-auto w-full py-[4px]">
                        <p className="ml-[50px] lg:ml-[60px]">Игрок</p>
                        <p className="mx-auto lg:mr-auto lg:ml-[26px]">Слот ( + Х-Win)</p>
                        <p className="ml-auto mr-[35px] lg:mr-[48px]">Приз</p>
                    </div>
                    <div>
                        {top}
                    </div>
                </div>
                <div className="w-full lg:w-[50%] bg-[#1c1c1e] p-[8px] lg:p-[24px] rounded-lg rounded-t-none lg:rounded-t-lg lg:rounded-l-none flex flex-col">
                    <div className="text-[16px] lg:text-[18px] text-white font-bold text-center mx-auto mb-[12px]">
                        ТОП 10 X-Win за Месяц
                    </div>
                    <div className="flex flex-row text-[14px] text-[#767676] mx-auto w-full py-[4px]">
                        <p className="ml-[60px]">Игрок</p>
                        <p className="mr-auto ml-[26px]">Слот ( + Х-Win)</p>
                        <p className="ml-auto mr-[48px]">Приз</p>
                    </div>
                    <div className="bg-[#131315]">
                        {top}
                    </div>
                </div>
            </div>
        </div>
    )
}