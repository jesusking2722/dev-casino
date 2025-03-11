'use client'

import React from "react"

import {Link} from "@/i18n/routing"
import {UrlObject} from "node:url";

type Props = {
    href: string | UrlObject
    text: string
}

export default function FooterButtonLink({href, text}: Props) {
    return (
        <li className="lg:justify-start md:flex md:justify-center md:break-inside-avoid">
            <Link href={href}
                  className="md:w-auto relative w-full md:text-[16px]/[1.5] md:font-bold md:min-w[44px] md:h-[44px] md:p-[0_12px] md:gap-2 flex justify-center shrink-0 items-center cursor-pointer hover:bg-gray-500 rounded-[4px] transition-colors duration-300"
                  type="button" rel="">
                {text}
            </Link>
        </li>
    )
}