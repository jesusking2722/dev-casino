import Image from "next/image"
import { FaClock } from "react-icons/fa"
import MediaQuery from "react-responsive"

type Props = {
    state: string,
    name: string,
    timeout: string,
    found: string,
    img: string
}

export function Poster({ state, name, timeout, found, img }: Props) {
    let buttonText = ''
    let buttonBg = ''
    let buttonTextColor = ''
    let captionText = ''
    let yellowText = ''

    let clockButton = (
        <p className="bg-[#fcc20033] my-auto ml-[14px] size-fit p-[8px] pr-[16px] font-bold text-[#fabe00] text-[14px] text-center rounded-md flex flex-row">
            <FaClock size={21} />
            <span className="ml-[6px]">{timeout}</span>
        </p>
    )

    if (state == 'active') {
        buttonText = 'Принять участие'
        captionText = 'АКТИВНЫЙ'
        buttonBg = '#fabe00'
        buttonTextColor = 'black'
        yellowText = found
    }
    else if (state == 'end') {
        buttonText = 'Смотреть результаты'
        captionText = 'ЗАВЕРШЁННЫЙ'
        buttonBg = '#333333'
        buttonTextColor = 'white'
        clockButton = (<></>)
        yellowText = 'ЗАВЕРШЁН'
    }
    else if (state == 'begins') {
        buttonText = 'Подробнее'
        captionText = 'ПРЕДСТОЯЩИЙ'
        buttonBg = '#333333'
        buttonTextColor = 'white'
        yellowText = 'СКОРО'
        clockButton = (
            <p className="bg-[#171719] my-auto ml-[14px] size-fit p-[8px] pr-[16px] font-bold text-[#c0c0c0] text-[14px] text-center rounded-md flex flex-row">
                <FaClock size={21} />
                <span className="ml-[6px]">{'До начала ' + timeout}</span>
            </p>
        )
    }

    return (
        <div className="w-full border flex flex-col lg:flex-row overflow-clip h-[350px]">
            <MediaQuery maxWidth={1023}>
                <div className="relative w-full h-0 mb-auto mx-auto z-0">
                    <Image src={img} alt='poster' width={512} height={512} className="mx-auto my-auto top-[-72px] lg:top-0 absolute w-[100%]" />
                </div>
            </MediaQuery>
            <div className="p-[16px] w-full lg:w-fit lg:pl-[48px] mt-auto mb-0 lg:my-auto mx-auto flex flex-col z-10 from-black to-[#00000044] bg-gradient-to-tr rounded-lg">
                <p className="bg-white text-black text-[10px] px-[8px] py-[2px] rounded-full font-semibold w-fit mb-[12px]">{captionText}</p>
                <p className="text-white text-[18px] lg:text-[32px] font-bold">{name.toUpperCase()}</p>
                <p className="text-[32px] lg:text-[48px] text-yellow-400 font-extrabold mt-[-14px]">{yellowText}</p>
                <div className="flex flex-row mt-[4px] lg:mt-[12px]">
                    <div style={{ backgroundColor: buttonBg, color: buttonTextColor }} className="place-content-center my-auto w-fit px-[12px] py-[12px] lg:px-[46px] lg:py-[12px] text-center cursor-pointer text-[14px] lg:text-[16px] font-bold hover:scale-105 duration-300 rounded-lg">
                        {buttonText}
                    </div>
                    {clockButton}
                </div>
            </div>
            <MediaQuery minWidth={1024}>
                <div className="relative w-[50%] h-0 mb-auto mx-auto">
                    <Image src={img} alt='poster' width={512} height={512} className="mx-auto my-auto absolute w-[100%]" />
                </div>
            </MediaQuery>
        </div>
    )
}