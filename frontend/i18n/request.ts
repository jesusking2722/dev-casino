import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { AbstractIntlMessages } from "use-intl";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Get messages from API
  //   ${process.env.NEXT_PUBLIC_BASE_API_URL}
  const data = await fetch(`localhost:3000/api/translations/${locale}`, {
    // cache: "reload"
  });

  const messages = await data.json();

  return {
    locale,
    messages: messages,
  };
});
