import { animated, useSpring } from "@react-spring/web"
import { useState } from "react"
import Image from "next/image"
import { BsArrowRightShort } from "react-icons/bs"
import MediaQuery from "react-responsive"

type HatProps = {
    title: string
    img: string
    onClick: () => void
    springsRotate: any
    fullsize: boolean
}


export default function Hat({ title, img, onClick, springsRotate, fullsize }: HatProps) {
    const [springs, api] = useSpring(() => { })
    const [hovered, setHovered] = useState(false)

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

    return (
        <div className="flex flex-row">
            <div className="basis-11/12 flex flex-row place-items-center">
                <div className="flex flex-row cursor-default gap-[10px] font-bold text-white my-auto text-[18px]">
                    <Image src={img} alt='icon' width={24} height={24} />
                    {title}
                </div>
            </div>
            <MediaQuery minWidth={1024}>
            <animated.div className="flex flex-row place-self-end rounded-md text-white cursor-pointer" onMouseEnter={onMouseEnterToButtonEvent} onMouseLeave={onMouseLeaveFromButtonEvent} style={springs}>
                <div onClick={onClick} className="flex flex-row gap-[8px] place-items-center bg-opacity-0 pt-[12px] pb-[12px] pl-[24px] pr-[24px]">
                    <div className="font-semibold">{fullsize ? 'Свернуть' : 'Показать'}</div>
                    <animated.div style={springsRotate} className="justify-items-center">
                        <BsArrowRightShort width={24} height={24} />
                    </animated.div>
                </div>
            </animated.div>
            </MediaQuery>
        </div>
    )
}