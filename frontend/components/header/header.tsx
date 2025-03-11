'use client'

import MediaQuery from "react-responsive"
import DesktopHeader from "./desktop"
import MobileHeader from "./mobile"
import { SideBar } from "../sideBar/sideBar"


export function Header() {
    return (
        <>
            <MediaQuery maxWidth={1023}>
                <MobileHeader />
                <SideBar />
            </MediaQuery>
            <MediaQuery minWidth={1024}>
                <DesktopHeader />
                <SideBar />
            </MediaQuery>
        </>
    )
}