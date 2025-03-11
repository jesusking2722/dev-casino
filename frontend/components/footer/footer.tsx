import LanguagePicker from "../languagePicker"
import Image from "next/image"
import {Link} from "@/i18n/routing";
import FooterButtonLink from "@/components/ui/buttons/FooterButtonLink";


export function Footer() {
    return (
        <footer className="bg-black w-[100%] mt-[52px] pb-[42px] lg:pt-[80px] lg:mt-[120px] lg:pb-[20px]">
            <div className="container">
                <div className="flex flex-col gap-[46px]">
                    <div className="flex flex-col">
                        <div
                            className="mb-8 flex flex-row gap-[8px] xl:grid-cols-[236px_1fr] lg:grid lg:gap-[16px] lg:grid_cols-[156px_1fr]">
                            <div className="flex flex-col justify-center items-center">
                                <LanguagePicker inBottom={true}/>
                            </div>
                            <ul className="md:block md:gap-x-[16px] md:gap-y-[0px] md:p-0 lg:columns-3">
                                <FooterButtonLink href={'/tournaments'} text="Турниры"/>
                                <FooterButtonLink href={'/promotions/bonus-machine'} text="Бонус Машина"/>
                                <FooterButtonLink href={'/promotions/wheel-of-fortune'} text="Колесо Фортуны"/>
                                <FooterButtonLink href={'/support'} text="Служба поддержки"/>
                                <FooterButtonLink href={'/faq'} text="Вопросы-ответы"/>
                                <FooterButtonLink href={'/game-rules'} text="Правила игры"/>
                                <FooterButtonLink href={'/les'} text="Правила и условия"/>
                                <FooterButtonLink href={'/casino-app'} text="Мобильное приложение"/>
                                <FooterButtonLink href={'/referral'} text="Реферальная программа"/>
                                <FooterButtonLink href={'/privacy-policy'} text="Политика конфиденциальности"/>
                                <FooterButtonLink href={'/responsible-gaming'} text="Ответственная игра"/>
                                <FooterButtonLink href={'/intellectual-property'} text="Интелектуальная собственность"/>
                                <FooterButtonLink href={'/promotions/amlpolicy'} text="AML Policy"/>
                                <FooterButtonLink href={'/docs/publicOffer_UA_ENG.pdf'}
                                                  text="Договор публичной оферты"/>
                                <FooterButtonLink href={'/know-your-customer'} text="Знай своего клиента"/>
                            </ul>
                        </div>
                        {/*<div className="place-self-center mb-[16px]">*/}
                        {/*    <Image src='/logo.svg' alt='logo' width={228} height={64} className="place-self-center" />*/}
                        {/*</div>*/}
                        <div className="text-white text-[20px] font-bold text-center">
                            Удобные транзакции
                        </div>
                        <div
                            className="grid grid-flow-col grid-cols-3 grid-rows-2 lg:grid-cols-6 lg:grid-rows-1 place-self-center mt-[16px] gap-[8px]">
                            <Image alt='icon' src='/visaColor.svg' width={100} height={80}/>
                            <Image alt='icon' src='/visaColor.svg' width={100} height={80}/>
                            <Image alt='icon' src='/visaColor.svg' width={100} height={80}/>
                            <Image alt='icon' src='/visaColor.svg' width={100} height={80}/>
                            <Image alt='icon' src='/visaColor.svg' width={100} height={80}/>
                            <Image alt='icon' src='/visaColor.svg' width={100} height={80}/>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex flex-col gap-[4px] container">
                            <p className="text-[#767676] text-[14px]">© 2021-2024 Slots City. Все права защищены.</p>
                            <p className="text-[#767676] text-[14px]">Лицензия на осуществление деятельности по
                                организации и проведению азартных игр казино в сети Интернет от 16.02.2021 (решение № 47
                                от 10.02.2021), выдана КРАИЛ ООО «ГЕЙМДЕВ»</p>
                            <p className="text-[#767676] text-[14px]">Информация об общем проценте выигрыша
                                (теоретическое возвращение игроку): общий средний процент выигрыша составляет не менее
                                94%.</p>
                        </div>
                        <div className="mx-auto my-auto">
                            <LanguagePicker inBottom={true}/>
                        </div>
                    </div>
                    <div
                        className="grid grid-flow-col w-[100%] grid-cols-4 grid-rows-2 lg:grid-cols-8 lg:grid-rows-1 place-self-center mt-[12px] lg:mt-[32px] gap-[8px]">
                        <Image alt='icon' src='/ssl.svg' width={100} height={80}/>
                        <Image alt='icon' src='/ssl.svg' width={100} height={80}/>
                        <Image alt='icon' src='/ssl.svg' width={100} height={80}/>
                        <Image alt='icon' src='/ssl.svg' width={100} height={80}/>
                        <Image alt='icon' src='/ssl.svg' width={100} height={80}/>
                        <Image alt='icon' src='/ssl.svg' width={100} height={80}/>
                        <Image alt='icon' src='/ssl.svg' width={100} height={80}/>
                        <Image alt='icon' src='/ssl.svg' width={100} height={80}/>
                    </div>
                </div>
            </div>
        </footer>
    )
}