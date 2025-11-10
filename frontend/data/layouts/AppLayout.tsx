import { NavBar } from "@/components/layout/nav-bar"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/stores/useUserStore"
import { Plane } from "lucide-react"
import { Outlet, useNavigate } from "react-router-dom"

export const AppLayout = () => {
    return(
        <>
            <div className="flex flex-col h-full">
                <NavBar />
                <div className="grow">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

