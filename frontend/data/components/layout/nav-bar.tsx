import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Plane } from "lucide-react"
import { useUserStore } from "@/stores/useUserStore"
import { UserProfile } from "./user-profile"

export const NavBar = () => {
    const navigate = useNavigate()
    const userStore = useUserStore()

    return(
        <nav className="border-b">
            <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div onClick={() => {navigate('/')}} className="flex items-center cursor-pointer gap-2">
                    <Plane className="w-8 h-8 text-blue-600" />
                    <span className="text-xl font-bold">AeroLine</span>
                </div>
                <div className="flex items-center gap-6">
                <Button variant="ghost">О нас</Button>
                {userStore.user
                    ?   <UserProfile />
                    :   <Button onClick={() => {navigate('/users/auth')}}>Войти</Button>
                }
                </div>
            </div>
            </div>
        </nav>
)
}