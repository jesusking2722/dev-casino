import {Link} from "@/i18n/routing"
import Image from "next/image"
import { Cashbox } from "./cashbox"
import { Notifications } from './notifications'
import { Favorites } from "./favorites"

export default function DesktopHeader() {
    return (
        <header className="bg-black sticky top-0 z-40">
            <div className="flex flex-row h-[110px] gap-[16px] container">
                <div className="basis-2/5 content-center">
                    <Favorites />
                </div>
                <div className="basis-1/5 content-center">
                    <Link href='/' className="place-self-center">
                        <Image src='/logo.svg' alt='logo' width={228} height={64} className="place-self-center" />
                    </Link>
                </div>
                <div className="basis-2/5 flex flex-row-reverse gap-[16px]">
                    <Cashbox />
                    <Notifications />
                </div>
            </div>
        </header>
    )
}