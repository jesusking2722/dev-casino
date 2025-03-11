import Link from "next/link"
import Image from "next/image"
import { Cashbox } from "./cashbox"
import { Notifications } from './notifications'
import { Favorites } from "./favorites"

export default function MobileHeader() {
    return (
        <header className="bg-black sticky top-0 z-30">
            <div className="flex flex-row py-[18px] gap-[16px] container">
                <div className="mx-auto content-center">
                    <Link href='/' className="place-self-center">
                        <Image src='/logo.svg' alt='logo' width={120} height={64} className="place-self-center" />
                    </Link>
                </div>
                <div className="flex flex-row mx-auto gap-[8px]">
                    <Favorites />
                    <Notifications />
                    <Cashbox />
                </div>
            </div>
        </header>
    )
}