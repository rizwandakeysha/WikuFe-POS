import React from "react";
import { Outlet } from "react-router-dom"
import Sidebar from "./SidebarManager";

export default function Layout() {
    return (
        <div className="flex flex-row bg-neutral-100 min-w-min min-h-screen ">
            <Sidebar />
            <div className="flex-1">
                <div> <Outlet /> </div>
            </div>
        </div>
    )
}