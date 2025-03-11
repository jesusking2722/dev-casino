'use client'

import {GamesSlider} from "@/components/gameSliders/gamesSlider"
import {PromoSlider} from "@/components/promo/promoSlider"
import {PromoPoster} from "@/components/promo/promoPoster"
import {TournamentsSlider} from "@/components/promo/tournamentsSlider"
import {BonusesSlider} from "@/components/promo/bonusesSlider"
import {ProvidersSlider} from "@/components/gameSliders/providersSlider"

import {Category} from "@/utils/types/Category";
import AuthService from "@/utils/auth/AuthService";
import {MetaPagination} from "@/utils/types/MetaPagination";
import {useEffect, useState} from "react";

const api = new AuthService()

export default function Home() {

    const top_categories = ['all', 'slots', 'jackpot', 'roulette', 'card', 'arcade', 'keno'];

    const [categories, setCategories] = useState<MetaPagination<Category[]> | null>(null)
    const [topCategories, setTopCategories] = useState<Category[] | null>(null)

    useEffect(() => {
        api.fetch<MetaPagination<Category[]>>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/category`, {
            method: 'POST',
            body: JSON.stringify({
                skip_empty: true
            })
        }).then(res => {
            setCategories(res)
        })
    }, [])

    useEffect(() => {
        if (categories && categories.data) {
            const top = categories.data.filter((cat) => {
                if (top_categories.includes(cat.href)) {
                    return cat
                }
            })

            setTopCategories(top)
        }
    }, [categories]);

    return (
        <>
            <PromoSlider/>
            {categories && topCategories ? <GamesSlider category={topCategories[0]}/> : null}
            <PromoPoster/>
            {categories && topCategories ? <GamesSlider category={topCategories[1]}/> : null}
            <ProvidersSlider/>
            {categories && topCategories ? <GamesSlider category={topCategories[2]}/> : null}
            {categories && topCategories ? <GamesSlider category={topCategories[3]}/> : null}
            <BonusesSlider/>
            <TournamentsSlider/>
        </>
    )
}
