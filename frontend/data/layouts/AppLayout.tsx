import { NavBar } from "@/components/layout/nav-bar"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/stores/useUserStore"
import { Plane } from "lucide-react"
import { Outlet, useNavigate } from "react-router-dom"

export const AppLayout = () => {
    return(
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

