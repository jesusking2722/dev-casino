'use client'

import {useSpring, animated} from '@react-spring/web'
import {useEffect, useState} from "react"
import {HorizontalSlider} from "../sliders/horizontalSlider"
import {VerticalGridSlider} from "../sliders/verticalGridSlider"
import {SquareImageLink} from "./squareImageLink"
import Hat from '../sliders/hat'
import React from "react"
import MediaQuery from "react-responsive"
import {Category} from "@/utils/types/Category";
import AuthService from "@/utils/auth/AuthService";
import {MetaPagination} from "@/utils/types/MetaPagination";
import {Game} from "@/utils/types/Game";


type Props = {
    title?: string
    img?: string
    cols?: number
    classes?: string
    styles?: any
    category: Category
}

const api = new AuthService()

export function GamesSlider({title, img, classes = '', styles = {}, cols = 6, category}: Props) {
    const [fullsize, setFullsize] = useState(false)
    const [springs, springRef] = useSpring(() => {
    })
    const [springsRotate, apiRotate] = useSpring(() => {
    })
    const [springsResizeFull, apiResizeFull] = useSpring(() => {
    })
    const [games, setGames] = useState<Game[] | null>(null)

    const onFullsizeClick = () => {
        if (!fullsize) {
            setFullsize(true)
            springRef.start({
                from: {
                    height: 322,
                },
                to: {
                    height: 520,
                },
                config: {
                    duration: 300,
                }
            })
            apiRotate.start({
                from: {
                    transform: 'rotate(0deg)',
                },
                to: {
                    transform: 'rotate(90deg)',
                },
                config: {
                    duration: 200,
                }
            })
            apiResizeFull.start({
                from: {
                    opacity: 0,
                },
                to: {
                    opacity: 1,
                },
                config: {
                    duration: 550,
                }
            })
        } else {
            setFullsize(false)
            springRef.start({
                from: {
                    height: 520,
                },
                to: {
                    height: 322,
                },
                config: {
                    duration: 300,
                }
            })
            apiRotate.start({
                from: {
                    transform: 'rotate(90deg)',
                },
                to: {
                    transform: 'rotate(0deg)',
                },
                config: {
                    duration: 200,
                }
            })
        }
    }

    useEffect(() => {
        api.fetch<MetaPagination<Game[]>>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/games?category=${category.id}`, {
            method: 'GET',
        }).then(res => {
            setGames(res.data)
        })
    }, []);

    // const plugData = [
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    //     {gameName: "Rich piggies: bonus combo", img: '/plug.webp', gameProvider: "netagameentertainment"},
    // ]


    if (classes == '')
        classes = 'flex flex-col mb-[64px] container rounded-lg gap-[20px] pt-[12px] pb-[24px] pr-[24px] pl-[24px] bg-[#121215cc]'

    return (
        <animated.div style={{...styles, ...springs}} className={classes}>
            <Hat title={category ? category.title : title}
                 img={category ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/images/icons/${category.href}.svg` : img}
                 onClick={onFullsizeClick} fullsize={fullsize} springsRotate={springsRotate}/>
            {games ?
                <>
                    <MediaQuery maxWidth={1023}>
                        <HorizontalSlider autoplay={{delay: 60000}} maxW={130} squares={games.map((data, i) => (
                            <SquareImageLink key={i} game={data} img={`${process.env.NEXT_PUBLIC_BASE_API_URL}/images/thumbnails/${data.name}.webp`}
                                             gameProvider={data.title}
                                             width={130}/>
                        ))}/>
                    </MediaQuery>
                    <MediaQuery minWidth={1024}>
                        <div>
                            {
                                fullsize ? (
                                    <VerticalGridSlider springsResize={springsResizeFull} cols={cols} maxW={200}
                                                        squares={games.map((data, i) => (
                                                            <SquareImageLink key={i} game={data}
                                                                             img={`${process.env.NEXT_PUBLIC_BASE_API_URL}/images/thumbnails/${data.name}.webp`}
                                                                             gameProvider={data.title}
                                                                             width={185}/>
                                                        ))}/>
                                ) : (
                                    <HorizontalSlider autoplay={{delay: 60000}} maxW={185}
                                                      squares={games.map((data, i) => (
                                                          <SquareImageLink key={i} game={data}
                                                                           img={`${process.env.NEXT_PUBLIC_BASE_API_URL}/images/thumbnails/${data.name}.webp`}
                                                                           gameProvider={data.title}
                                                                           width={185}/>
                                                      ))}/>
                                )
                            }
                        </div>
                    </MediaQuery>
                </>
                : null}
        </animated.div>
    )
}