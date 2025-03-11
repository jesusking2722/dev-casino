import { animated, useSpring } from "@react-spring/web"
import Image from "next/image"
import { useState } from "react"
import { IoIosExpand } from "react-icons/io"


type Props = {
    gameName: string
}

export function Hat({ gameName }: Props) {
    const [springs, api] = useSpring(() => { })
    const [hovered, setHovered] = useState(false)
    const [liked, setLiked] = useState(false)

    const onMouseEnterToButtonEvent = () => {
        setHovered(true)
        api.start({
            from: {
                background: 'transparent',
            },
            to: {
                background: '#333333',
            },
            config: {
                duration: 300,
            }
        })
    }

    const onMouseLeaveFromButtonEvent = () => {
        setHovered(false)
        api.start({
            from: {
                background: '#333333',
            },
            to: {
                background: 'transparent',
            },
            config: {
                duration: 300,
            }
        })
    }

    const onLikeButtonClick = () => {
        setLiked(!liked)
    }

    const onExpandButtonClick = () => {
        // Handle game expansion functionality
    }


    return (
        <div className="flex flex-row mb-[8px] font-bold text-white text-[28px] px-[55px]">
            <div>
                {decodeURIComponent(gameName).replaceAll('+', ' ')}
            </div>
            <div className="ml-auto mr-0 flex flex-row">
                <div>
                    <Image alt='like button' src={liked ? '/heart-fill.svg' : '/heart.svg'} width={42} height={38} className="fill-[#fabe00] cursor-pointer duration-300 hover:scale-110 hover:bg-opacity-15 bg-[#fcc200] bg-opacity-0 rounded-full p-[6px]" onClick={onLikeButtonClick} />
                </div>
                <div>
                    <Image alt='expand button' src='/expand.svg' width={42} height={42} className="fill-[#fabe00] cursor-pointer duration-300 hover:scale-110 hover:bg-opacity-15 bg-[#fcc200] bg-opacity-0 rounded-full p-[6px]" onClick={onExpandButtonClick} />
                </div>
            </div>
        </div>
    )
}