/*
* {
            "id": 1351,
            "name": "RouletteClassicPT",
            "title": "Roulette Classic",
            "category": [],
            "device": 2,
            "denomination": "1.00",
            "view": 1,
            "label": null,
            "jpg": ""
        },
* */

export type Game = {
    id: number
    name: string
    title: string
    category: number[]
    device: number
    denomination: string
    view: number
    label: string | null
    jpg: string
}