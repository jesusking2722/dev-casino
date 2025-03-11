import { VerticalSlider } from "@/components/sliders/verticalSlider"
import { PiMedalFill } from "react-icons/pi"
import Image from "next/image"

type RaffleProps = {
    image: string
    active: boolean
    caption: string
    top: Array<{
        nick: string
        billets: string
    }>
}

type TopLineProps = {
    top: {
        nick: string
        billets: string
    }
    place: number
}

function TopLine({ top, place }: TopLineProps) {
    place += 1

    return (
        <div className="flex flex-row py-[8px] px-[12px] font-semibold bg-transparent gap-[12px]">
            <div className="text-[16px] text-[#a1a1a1] w-[24px]">
                {place == 1 && <PiMedalFill className="text-[#fabe00] absolute left-[4px]" size={28} />}
                {place == 2 && <PiMedalFill className="text-[#c0c0c0] absolute left-[4px]" size={28} />}
                {place == 3 && <PiMedalFill className="text-[#b38a00] absolute left-[4px]" size={28} />}
                {place > 3 && <p className="z-50">{place + '.'}</p>}

            </div>
            <div className="text-[16px] text-white">
                {top.nick[0] + top.nick[1] + top.nick[2] + top.nick[3] + '*****'}
            </div>
            <div className="text-[18px] text-[#a1a1a1] ml-auto mr-0">
                {top.billets}
            </div>
        </div>
    )
}

function Raffle({ image, active, caption, top }: RaffleProps) {
    const topSquare = top.map((data, i) => (
        <TopLine key={i} top={data} place={i} />
    ))

    return (
        <div className="bg-[#33333380] rounded-lg p-[16px] flex flex-col lg:flex-row gap-[24px] container lg:h-[370px] mt-[12px]">
            <div className='flex flex-col relative overflow-hidden w-full h-[200px] lg:h-full lg:w-min-[580px] lg:w-[70%] bg-[#050508b3] rounded-lg pt-[16px] pb-0' style={{ filter: active ? '' : 'grayscale(100%)' }}>
                <Image
                    src={image}
                    alt="imageLeft"
                    width={320}
                    height={320}
                    className="mx-auto absolute z-0 place-self-center -top-7 lg:-top-2"
                />
                <div className="mb-0 mt-auto font-bold text-[#fabe00] backdrop-blur-sm text-center z-10 bg-black bg-opacity-45 pb-[4px] lg:pb-[16px]">
                    <p className="text-[26px] lg:text-[48px]">{active ? 'ПРОДОЛЖАЕТСЯ' : 'ЗАВЕРШЕНО'}</p>
                    <p className="text-[12px] lg:text-[14px]">{caption}</p>
                </div>
            </div>
            <div className="mx-auto lg:mr-0 lg:ml-auto flex flex-col w-full lg:w-[320px]">
                <div className="text-[#a1a1a1] text-[10px] bg-[#1c1c1c] px-[8px] py-[2px] rounded-full border mx-auto">
                    {active ? 'ПРОДОЛЖАЕТСЯ' : 'ЗАВЕРШЁН'}
                </div>
                <div className="text-white text-[16px] font-bold mx-auto mt-[16px]">
                    Таблица ТОП {top.length} игроков
                </div>
                <div className="flex flex-row text-[14px] text-[#767676] font-bold px-[5px] mt-[16px]">
                    <p>ТОП</p>
                    <p className="ml-[14px]">Игрок</p>
                    <p className="ml-auto mr-0">Билетов</p>
                </div>
                <div className="mt-[8px] rounded-lg">
                    <VerticalSlider children={topSquare} classes="rounded-lg bg-[#131315] max-h-[150px] lg:max-h-[230px]" />
                </div>
            </div>
        </div>
    )
}


export default function Raffles() {
    const data = [
        {
            image: '/vip.webp',
            active: true,
            caption: 'Врывайся в игровые миры Забирай VIP-призы',
            top: [
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
            ]
        },
        {
            image: '/vip.webp',
            active: false,
            caption: 'Врывайся в игровые миры Забирай VIP-призы',
            top: [
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
                {
                    nick: 'Pizzamocarella',
                    billets: '227'
                },
            ]
        }
    ]

    const squares = data.map((data, i) => (
        <Raffle key={i} image={data.image} active={data.active} caption={data.caption} top={data.top} />
    ))

    return (
        <div className="gap-[24px] flex flex-col mt-[42px]">
            <div>
                <p className="text-center text-white font-bold text-[40px]">Розыгрыши</p>
            </div>
            <div className="flex flex-col gap-[16px] mt-[12px]">
                {squares}
            </div>
        </div>
    )
}