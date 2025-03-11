import {useEffect, useState} from "react";
import AuthService from "@/utils/auth/AuthService";

type Props = {
    gameName: string
}

type GetIframeResponse = {
    success: boolean
    url: string
}

const api = new AuthService()

export function GameFrame({gameName}: Props) {

    const [url, setUrl] = useState<string>()

    useEffect(() => {
        api.fetch<GetIframeResponse>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/play/${gameName}`, {
            method: 'GET',
        }).then(res => {
            if (res && res.success) {
                setUrl(res.url)
            }
        })
    }, []);

    return (
        <div className="h-[700px] mb-[40px] bg-[#121215cc] rounded-lg p-[8px] border">
            {url ?
                <iframe allowFullScreen src={url} className="border-0 size-full rounded-md scroll-smooth"
                        style={{scrollbarWidth: 'thin'}}></iframe> : ''}
        </div>
    )
}