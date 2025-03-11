import { Tournament } from "@/components/tournaments/tournament"
import Image from "next/image"
import React from "react"

function LeaderLine({ place, nick, balls, prize }: LeaderLineProps) {
    place += 1

    return (
        <div className="flex flex-row py-[18px] px-[12px] font-semibold gap-[12px] bg-transparent">
            <div className="text-[16px] text-[#a1a1a1] w-[24px] place-content-center">
                <p>{place + '.'}</p>
            </div>
            <div className="text-[16px] text-white place-content-center">
                {nick[0] + nick[1] + nick[2] + nick[3] + '*****'}
            </div>
            <p className="text-[16px] text-white">{balls}</p>
            <div className="text-[16px] text-yellow-500 ml-auto mr-[24px] place-content-center">
                {prize}
            </div>
        </div>
    )
}

export default function Page({ params }: { params: Promise<{ name: string }> }) {
    const name = React.use(params).name

    const plugTop = [
        {
            nick: 'Pizzamozarella',
            balls: 1488227,
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            balls: 1488227,
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            balls: 1488227,
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            balls: 1488227,
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            balls: 1488227,
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            balls: 1488227,
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            balls: 1488227,
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            balls: 1488227,
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            balls: 1488227,
            prize: '150 000',
        },
        {
            nick: 'Pizzamozarella',
            balls: 1488227,
            prize: '150 000',
        },
    ]

    const top = plugTop.map((data, i) => (
        <LeaderLine key={i} place={i} nick={data.nick} balls={data.balls} prize={data.prize} />
    ))

    return (
        <div className="flex flex-col gap-[36px] mt-[42px]">
            <Tournament state='active' name='namenamename' timeout='14:88' found='148 800' img='/tournament-2.webp' />

            <div className="container flex flex-col lg:flex-row rounded-lg mt-[42px]">
                <div className="w-full lg:w-[50%] p-[24px] rounded-lg rounded-r-none flex flex-col">
                    <div className="text-[24px] g:text-[18px] text-white font-bold text-center mx-auto mb-[12px]">
                        Призовой фонд
                    </div>
                    <div className="text-[32px] lg:text-[104px] text-yellow-500 font-extrabold mx-auto text-center drop-shadow-[0_26px_62px_rgba(222,181,44,1)]">
                        100 000
                    </div>
                    <div className="mb-0 mt-[12px] grid grid-flow-col grid-cols-3">
                        <div className="border h-[150px] w-full font-bold rounded-md text-[#919191] text-[18px] lg:text-[24px] mx-auto my-auto text-center p-[12px] place-content-center">
                            <div className="mx-auto">
                                <Image className="mx-auto" src='/place-2.webp' width={100} height={130} alt="place" />
                            </div>
                            <div className="content-end mt-auto mb-0 mx-auto">
                                20 000
                            </div>
                        </div>
                        <div className="border h-[200px] w-full font-bold rounded-md text-yellow-500 text-[24px] lg:text-[28px] mx-auto my-auto text-center p-[12px] place-content-center">
                            <div className="mx-auto">
                                <Image className="mx-auto shadow-2xl drop-shadow-[0_15px_45px_rgba(222,181,44,0.75)]" src='/place-1.webp' width={140} height={140} alt="place" />
                            </div>
                            <div className="content-end mt-auto mb-0 mx-auto">
                                50 000
                            </div>
                        </div>
                        <div className="border h-[150px] w-full font-bold rounded-md text-[#919191] text-[18px] lg:text-[24px] mx-auto my-auto text-center p-[12px] place-content-center">
                            <div className="mx-auto">
                                <Image className="mx-auto" src='/place-3.webp' width={100} height={130} alt="place" />
                            </div>
                            <div className="content-end mt-auto mb-0 mx-auto">
                                10 000
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1c1c1e] border mt-[14px] w-full p-[8px] lg:p-[18px] rounded-lg text-gray-300 font-bold mb-0 my-auto mx-auto text-center text-[18px] lg:text-[24px]">
                        Пора ловить свой ШАНС в турнире
                    </div>
                </div>
                <div className="border w-full lg:w-[50%] h-[300px] lg:h-[530px] bg-[#1c1c1e] p-[8px] lg:p-[24px] rounded-lg flex flex-col">
                    <div className="text-[18px] text-white font-bold text-center mx-auto mb-[12px]">
                        ТОП 10 X-Win за Месяц
                    </div>
                    <div className="flex flex-row text-[14px] text-[#767676] mx-auto w-full py-[4px]">
                        <p className="ml-[60px]">Игрок</p>
                        <p className="mr-auto ml-[38px]">Баллы</p>
                        <p className="ml-auto mr-[54px]">Приз</p>
                    </div>
                    <div className="bg-[#131315] h-[400px] overflow-y-scroll">
                        {top}
                    </div>
                </div>
            </div>
        </div>
    )
}