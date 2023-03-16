import React from "react";
import { Outlet } from "react-router-dom"
import TabsKasir from "./TabsKasir"

export default function Layout() {
    return (
        <div className="flex flex-row bg-neutral-100 min-w-min min-h-screen ">
            <div className="flex-1">
                <TabsKasir />
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}