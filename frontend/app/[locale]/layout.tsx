import type { Metadata } from "next";
import "@/assets/globals.css";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "JADEJACK",
  description: "Best gambling ever",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    // <Providers>
    <NextIntlClientProvider messages={messages} locale={locale}>
      <html lang={locale} className="scroll-smooth">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Itim&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className="antialiased bg-[#050508]"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <Header />
          <div className="z-0">{children}</div>
          <Footer />
        </body>
      </html>
    </NextIntlClientProvider>
    // </Providers>
  );
}
