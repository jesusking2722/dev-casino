import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(ru|en|ja|km|ko|lo|ms|my|th|tw|vi|zh)/:path*']
};