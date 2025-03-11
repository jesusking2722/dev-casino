import Link from "next/link"
import { FaClock } from "react-icons/fa"
import Image from "next/image"

type SquareProps = {
    img: string
    timeout: string
    name: string
    sum: string
}

function Square({ img, timeout, name, sum }: SquareProps) {
    const link = '/promotions/' + encodeURIComponent(name).replace(/%20/ig, '+')

    return (
        <Link href={link} target="_blank" className="mx-auto w-full lg:w-fit">
            <div className="p-[4px] pb-0 rounded-md w-full lg:w-[590px] overflow-hidden h-[330px] lg:h-[400px] bg-[#0c0c0f] relative flex flex-col border">
                <Image src={img} alt='img' width={512} height={512} className="absolute z-0 place-self-center -top-[60px]" />
                <div className="p-[8px] z-1 opacity-95 flex flex-row justify-self-center">
                    <div className="mr-0 ml-auto">
                        <p className="bg-[#fcc20066] p-[8px] pr-[16px] font-bold text-[#fabe00] text-[14px] text-center rounded-md flex flex-row">
                            <FaClock size={21} />
                            <span className="ml-[6px]">{timeout}</span>
                        </p>
                    </div>
                </div>
                <div className="px-[12px] lg:px-[24px] py-[12px] z-10 bg-black bg-opacity-85 backdrop-blur-sm mb-0 mt-auto">
                    <div className="flex flex-row">
                        <div>
                            <p className="text-white text-center mx-auto text-[14px] lg:text-[16px] font-bold">{name.toUpperCase()}</p>
                            <p className=" text-[#fabe00] text-center mx-auto text-[32px] lg:text-[36px] font-bold">{sum + '₽'}</p>
                        </div>
                        <div className="ml-auto mr-0 mt-auto mb-auto">
                            <div className="hover:bg-opacity-100 bg-opacity-85 duration-300 cursor-pointer py-[6px] lg:py-[10px] px-[18px] bg-[#f5bb08] rounded-md">
                                <p className="text-black font-semibold">Подробнее</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}


export default function Promotions() {
    const plugData = [
        { img: '/promo.webp', timeout: '14:88:00', name: 'Дикий, дикий лютый', sum: '2 013 000' },
        { img: '/promo.webp', timeout: '14:88:00', name: 'Дикий, дикий лютый', sum: '2 013 000' },
        { img: '/promo.webp', timeout: '14:88:00', name: 'Дикий, дикий лютый', sum: '2 013 000' },
        { img: '/promo.webp', timeout: '14:88:00', name: 'Дикий, дикий лютый', sum: '2 013 000' },
        { img: '/promo.webp', timeout: '14:88:00', name: 'Дикий, дикий лютый', sum: '2 013 000' },
    ]

    const squares = plugData.map((data, i) => (
        <Square key={i} img={data.img} timeout={data.timeout} name={data.name} sum={data.sum} />
    ))

    return (
        <div className="container gap-[24px] flex flex-col mt-[60px]">
            <div>
                <p className="text-center text-white font-bold text-[40px]">Акции</p>
            </div>
            <div className="flex flex-row flex-wrap gap-[16px] mx-auto">
                {squares}
            </div>
        </div>
    )
}