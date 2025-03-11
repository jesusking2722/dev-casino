'use client'

import {GameFrame} from "./gameFrame"


type Props = {
    gameName: JSX.Element[]
}


export function GameView({gameName}: Props) {
    return (
        <>
            <div className="container mt-[25px]">
                {/*<Hat gameName={gameName} />*/}
                <GameFrame gameName={gameName}/>
            </div>
            {/*<TournamentsSlider/>*/}
        </>
    )
}