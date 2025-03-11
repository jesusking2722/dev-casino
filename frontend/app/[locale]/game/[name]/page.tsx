import { GameView } from "@/components/gameView/gameView"

export default async function Page({params}: {params: Promise<{ name: string }>}) {
    const name = (await params).name

    return (
        <GameView gameName={name} />
    )
}