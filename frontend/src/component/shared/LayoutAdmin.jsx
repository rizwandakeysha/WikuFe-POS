import React from "react";
import { Outlet } from "react-router-dom"
import Sidebar from "./SidebarAdmin";

export default function Layout() {
    return (
        <div className="flex flex-row bg-neutral-100 h-screen ">
            <Sidebar />
            <div className="flex-1 overflow-y-auto min-h-screen">
                <Outlet />
            </div>
        </div>
    )
}