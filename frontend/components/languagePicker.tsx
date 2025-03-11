'use client'

import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import {FaChevronDown} from "react-icons/fa"
import {redirect, usePathname} from "@/i18n/routing"

export default function LanguagePicker(props: { inBottom: boolean }) {

    const pathname = usePathname()

    const {inBottom} = props

    const getLocales = () => {
        return [
            {code: 'en', name: 'English'},
            {code: 'ja', name: '日本語'},
            {code: 'km', name: 'ខ្មែរ'},
            {code: 'ko', name: 'Korean'},
            {code: 'lo', name: 'Lao'},
            {code: 'ms', name: 'Malay'},
            {code: 'my', name: 'Myanmar'},
            {code: 'ru', name: 'Русский'},
            {code: 'th', name: 'Thai'},
            {code: 'tw', name: 'Traditional Chinese'},
            {code: 'vi', name: 'Vietnamese'},
            {code: 'zh', name: 'Simplified Chinese'},
        ]
    }

    const onClick = (locale: string) => {
        redirect({locale: locale, href: pathname});
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Language
                    <FaChevronDown aria-hidden="true" className="-mr-1 size-5 text-gray-400"/>
                </MenuButton>
            </div>

            <MenuItems
                transition
                className={`absolute ${
                    inBottom ? 'bottom-full mb-2' : 'top-full mt-2'
                } right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in overflow-y-scroll max-h-56`}
            >
                <div className="py-1">
                    {getLocales().map((locale) => (
                        <MenuItem key={locale.code} className="cursor-pointer" onClick={() => onClick(locale.code)}>
                            <p className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                                {locale.name}
                            </p>
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}