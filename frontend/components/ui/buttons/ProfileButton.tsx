'use client'

type Props = {
    onClick: () => void
    children?: React.ReactNode
    isOpen: boolean
}


export function ProfileButton({onClick, children, isOpen}: Props) {
    return (
        <button onClick={onClick}
                className={`text-[#a1a1a1] ${isOpen && 'text-black bg-yellow-500 hover:bg-yellow-400'} duration-300 rounded-lg px-[12px] py-[6px]`}>{children}
        </button>
    )
}