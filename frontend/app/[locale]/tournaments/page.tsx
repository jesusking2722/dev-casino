import { Tournament } from "@/components/tournaments/tournament"


export default function Tournaments() {
    const plugData = [
        {
            state: 'active',
            name: 'Турнир hight flyer vs aviator',
            timeout: '14:88:99',
            found: '100 000',
            img: '/tournament-2.webp'
        },
        {
            state: 'begins',
            name: 'Турнир hight flyer vs aviator',
            timeout: '14:88:99',
            found: '100 000',
            img: '/tournament-2.webp'
        },
        {
            state: 'end',
            name: 'Турнир hight flyer vs aviator',
            timeout: '14:88:99',
            found: '100 000',
            img: '/tournament-2.webp'
        }
    ]

    const squares = plugData.map((data, i) => (
        <Tournament key={i} state={data.state} name={data.name} timeout={data.timeout} found={data.found} img={data.img} />
    ))

    return (
        <div className="gap-[36px] flex flex-col mt-[42px]">
            <div>
                <p className="text-center text-white font-bold text-[40px]">Турниры</p>
            </div>
            <div className="flex flex-col gap-[16px]">
                {squares}
            </div>
        </div>
    )
}