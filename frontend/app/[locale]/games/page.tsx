'use client'

import Image from "next/image"
import {useState} from "react"
import {GamesSlider} from "@/components/gameSliders/gamesSlider"
import {TournamentsSlider} from "@/components/promo/tournamentsSlider"
import {ProvidersSlider} from "@/components/gameSliders/providersSlider"
import {LiveSlider} from "@/components/gameSliders/liveSlider"
import MediaQuery from "react-responsive"
import withAuth from "@/utils/auth/withAuth";


type TopButtonProps = {
    name: string
    icon: string
    category: any
    setCategory: any
}

function TopButton({name, icon, category, setCategory}: TopButtonProps) {
    return (
        <div style={(category == name) ? {backgroundColor: '#facc1511'} : {backgroundColor: '#00000000'}}
             onClick={() => setCategory(name)}
             className="hover:scale-105 click py-[12px] rounded-2xl w-[85px] lg:w-[100px] flex flex-col duration-300 cursor-pointer">
            <Image alt='icon' src={icon} width={80} height={80}
                   className="place-self-center mx-auto w-[30px] lg:w-[80px]"/>
            <p className="text-yellow-400 text-[12px] font-semibold mt-[4px] text-center">{name}</p>
        </div>
    )
}

function Slots() {
    return (
        <div className="flex flex-col">
            <GamesSlider title='Топчик' img='/rocket.svg'/>
            <GamesSlider title='Новинки' img='/bomb.svg'/>
        </div>
    )
}

function Live() {
    return (
        <div className="flex flex-col">
            <LiveSlider title='Новинки' img='/lightning.svg'/>
            <LiveSlider title='Новинки' img='/lightning.svg'/>
            <LiveSlider title='Новинки' img='/lightning.svg'/>
        </div>
    )
}

function Providers() {
    return (
        <div className="flex flex-col">
            <ProvidersSlider gamesPage={true}/>
            <ProvidersSlider/>
            <ProvidersSlider/>
        </div>
    )
}

function Games() {
    const [category, setCategory] = useState('Игровой зал')

    const topButtons = [
        {
            name: 'Игровой зал',
            icon: '/play-games.webp'
        },
        {
            name: 'Слоты',
            icon: '/slots.webp'
        },
        {
            name: 'Live',
            icon: '/live.webp'
        },
        {
            name: 'Провайдеры',
            icon: '/providers.webp'
        }
    ]

    const topButtonsJSX = topButtons.map((data, i) => (
        <TopButton key={i} name={data.name} icon={data.icon} category={category} setCategory={setCategory}/>
    ))

    return (
        <div className="mt-[24px]">
            <div className="flex flex-row gap-[4px] lg:gap-[24px] mx-auto w-fit">
                {topButtonsJSX}
            </div>

            <div className="mt-[48px]"/>

            {category == 'Игровой зал' &&
                <div className="container mx-auto">
                    <GamesSlider title='Избранное' img='/heart-fill.svg'
                                 styles={{backgroundColor: 'transparent'}}
                    />
                </div>
            }
            {category == 'Игровой зал' && <Slots/>}
            {category == 'Игровой зал' && <ProvidersSlider gamesPage={true}/>}
            {category == 'Игровой зал' && <Live/>}

            {category == 'Слоты' && <Slots/>}
            {category == 'Live' && <Live/>}
            {category == 'Провайдеры' && <Providers/>}

            <div className="mt-[24px]"/>

            <TournamentsSlider/>
        </div>
    )
}

export default Games