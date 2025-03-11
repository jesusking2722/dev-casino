'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Autoplay } from 'swiper/modules'
import MediaQuery from 'react-responsive'
import 'swiper/css'
import 'swiper/css/scrollbar'


type SlideProps = {
    link: string,
    img: string,
    whiteText: string,
    yellowText: string
}

function Slide({ link, img, whiteText, yellowText }: SlideProps) {
    return (
        <>
            <MediaQuery minWidth={1024}>
                <Link href={link}>
                    <div className='flex flex-row justify-center items-center h-[350px]'>
                        <div className='basis-1/2 flex flex-col pl-[32px]'>
                            <div className='basis-full'>
                                <p className='text-white font-bold text-[32px]'>{whiteText}</p>
                                <p className='text-[#fabe00] font-bold text-[48px]'>{yellowText}</p>
                                <button className='bg-[#fabe00] w-[120px] h-[45px] rounded-full font-bold mt-[12px]'>Подробнее</button>
                            </div>
                        </div>
                        <div className='basis-1/2'>
                            <Image alt='promo image' src={img} width={512} height={512} className='place-self-center' />
                        </div>
                    </div>
                </Link>
            </MediaQuery>

            <MediaQuery maxWidth={1023}>
                <Link href={link}>
                    <div className='h-[300px] relative overflow-clip'>
                        <Image alt='promo image' src={img} width={320} height={320} className='place-self-center' />
                        <div className='flex flex-col px-[16px] absolute bottom-0 w-full backdrop-blur-sm bg-gradient-to-t from-black to-[#00000077]'>
                            <p className='text-white font-bold text-[32px] mx-auto'>{whiteText}</p>
                            <div className='flex flex-row'>
                                <p className='text-[#fabe00] mr-[12px] ml-auto my-auto font-bold text-[42px]'>{yellowText}</p>
                                <button className='bg-[#fabe00] ml-[12px] mr-auto my-auto w-[120px] h-[45px] rounded-full font-bold'>Подробнее</button>
                            </div>
                        </div>
                    </div>
                </Link>
            </MediaQuery>
        </>
    )
}

export function PromoSlider() {
    return (
        <div className="border container rounded-xl mb-[64px]">
            <Swiper
                scrollbar={{
                    hide: true,
                }}
                modules={[Scrollbar, Autoplay]}
                className="place-self-center"
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: true,
                }}
            >
                <SwiperSlide>
                    <Slide link='/' yellowText='ЗАЛЕТАЙ' whiteText='БЛЕК-ДЖЕК И ...' img='/promo.webp' />
                </SwiperSlide>
                
            </Swiper>
        </div>
    );
}
