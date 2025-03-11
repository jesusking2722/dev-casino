'use client'

import { SquareImageLink } from "@/components/gameSliders/squareImageLink"
import { HorizontalSlider } from "@/components/sliders/horizontalSlider"
import { Poster } from "./poster"
import Link from "next/link"
import MediaQuery from "react-responsive"


type TournamentProps = {
    state: string,
    name: string,
    timeout: string,
    found: string,
    img: string
}


export function Tournament({ state, name, timeout, found, img }: TournamentProps) {
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

    let slider = (
        <div className="p-[16px] lg:p-[32px]">
            <HorizontalSlider autoplay={{ delay: 4000 }} squares={squares} maxW={148} loop={true} classes="w-full lg:w-[75%]" />
        </div>
    )

    let filter = ''

    if (state == 'end') {
        slider = (<></>)
        filter = 'grayscale(1)'
    }

    return (
        <div className="flex flex-col container border rounded-lg mt-[42px]" style={{ filter: filter }}>
            <Link href={'/app/%5Blang%5D/tournaments/name'}>
                <Poster state={state} name={name} timeout={timeout} found={found} img={img} />
            </Link>
            {slider}
        </div>
    )
}