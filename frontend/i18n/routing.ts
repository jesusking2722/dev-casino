import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import {getLocale} from "next-intl/server";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["en", "ja", "km", "ko", "lo", "ms", "my", "ru", "th", "tw", "vi", "zh"],

    // Used when no locale matches
    defaultLocale: 'ru'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
    createNavigation(routing);

export const getLocaleFromLocation = () => {
    return window.location.href.split('/')[3];
}

export const redirectInHOC = async (href: string) => {
    const locale = await getLocale()

    return redirect({href: href, locale: locale})
}