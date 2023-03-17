import React from "react";
import { Outlet } from "react-router-dom"
import SidebarKasir from "./SidebarKasir"
import TabsKasir from "./TabsKasir";

export default function Layout() {
    return (
        <div className="flex flex-row bg-neutral-100 h-screen ">
            <TabsKasir />
            <div className="flex-1 overflow-y-auto my- min-h-screen ">
                <Outlet />
            </div>
            {/* <SidebarKasir /> */}
        </div>
        // <div className="flex flex-row bg-neutral-100 min-w-min min-h-screen ">
        //     <div className="flex-1">
        //         <SIdebarKasir />
        //         <div>
        //             <Outlet />
        //         </div>
        //     </div>
        // </div>
    )
}