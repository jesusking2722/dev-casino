'use client'

import Image from "next/image"
import {useState} from "react"
import {useSpring, animated} from '@react-spring/web'
import {getLocaleFromLocation, redirect} from "@/i18n/routing";
import {Game} from "@/utils/types/Game";
import AuthService from "@/utils/auth/AuthService";
import {LoginModal} from "@/components/sideBar/loginDialog";

type Props = {
    game: Game
    img: string
    width: number
    gameProvider: string
}

const auth = new AuthService()

export function SquareImageLink({game, img, width, gameProvider}: Props) {
    const [hovered, setHovered] = useState(false)
    const [liked, setLiked] = useState(false)
    const [isLoginOpened, setIsLoginOpened] = useState<boolean>(false)
    const [heartHovered, setHeartHovered] = useState(false)
    const [springs, api] = useSpring(() => {
    })

    const onMouseEnterEvent = () => {
        setHovered(true)
        api.start({
            from: {
                opacity: 0,
            },
            to: {
                opacity: 1,
            },
            config: {
                duration: 300,
            }
        })
    }

    const onMouseLeaveEvent = () => {
        api.start({
            from: {
                opacity: 1,
            },
            to: {
                opacity: 0,
            },
            config: {
                duration: 150,
            }
        })
    }

    const onLikeButtonClick = () => {
        setLiked(!liked)
    }

    const onDivClick = () => {
        if (auth.loggedIn()) {
            if (!heartHovered) {
                const url = '/game/' + encodeURIComponent(game.name).replace(/%20/ig, '+')
                return redirect({locale: getLocaleFromLocation(), href: url})
            }
        } else {
            setIsLoginOpened(true)
        }
    }

    const hoverHeart = () => {
        setHeartHovered(!heartHovered)
    }

    return (
        <div className="mx-auto inline-block rounded-md relative" style={{width: '100%'}}
             onMouseEnter={onMouseEnterEvent} onMouseLeave={onMouseLeaveEvent}>
            <div onClick={onDivClick} className="cursor-pointer">
                <animated.div className="absolute size-full flex flex-col bg-[#050508b3] opacity-0" style={springs}>
                    <div className="basis-1/4 p-[8px] content-start justify-items-left">
                        <Image onMouseEnter={hoverHeart} onMouseLeave={hoverHeart} alt='like button'
                               src={liked ? '/heart-fill.svg' : '/heart.svg'} width={18} height={16}
                               className="fill-[#fabe00] duration-300" onClick={onLikeButtonClick}/>
                    </div>
                    <div className="basis-1/4 pb-[5px] content-start justify-items-center mx-auto">
                        <p className="text-white font-bold text-center text-[10px] break-words max-w-[105px]">{game.name.toUpperCase()}</p>
                    </div>
                    <div className="basis-1/4 content-start justify-items-center mx-auto">
                        <Image alt='play button' src='/play-button.svg' width={32} height={32}
                               className="fill-[#fabe00]"/>
                    </div>
                    <div className="basis-1/4 content-end mb-0 mt-auto">
                        <p className="text-[#A1A1A1] bg-[#05050860] font-bold text-center text-[10px] pb-[5px] pt-[2px]">{gameProvider.toUpperCase()}</p>
                    </div>
                </animated.div>
                <Image alt={game.name} src={img} width={width} height={width} className="rounded-md"/>
            </div>
            <LoginModal setIsOpen={setIsLoginOpened} isOpen={isLoginOpened}/>
        </div>
    )
}