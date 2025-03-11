'use client'

import Image from "next/image"

type Props = {
    providerName: string
    games: number
    img: string
    width: number
}

export function SquareProviderLink({ providerName, games, img, width }: Props) {
    const onClick = () => {
        window.open('/games?provider=' + encodeURIComponent(providerName).replace(/%20/ig, '+'), '_blank');
    }

    return (
        <div onClick={onClick} className="bg-[#1f1f1f] bg-opacity-80 rounded-lg h-[180px] hover:bg-opacity-100 duration-300" style={{ width: '100%' }}>
            <div className="cursor-pointer size-full flex flex-col">
                <div className="basis-1/4 pb-[5px] content-center justify-content-center justify-items-center items-center brightness-105">
                    <Image alt='provider logo' src={img} width={92} height={92} className="shadow-2xl shadow-[#ffffffb9] rounded-full mt-[20px] mx-auto p-[8px] bg-black" />
                    <p className="text-white mx-auto font-bold text-center text-[18px] mt-[8px] break-words max-w-[105px]">{providerName}</p>
                    <p className="text-[#A1A1A1] mx-auto text-center text-[12px]">{games + ' игр'}</p>
                </div>
            </div>
        </div>
    )
}