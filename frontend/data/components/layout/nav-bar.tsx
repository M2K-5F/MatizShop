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
                <div className="flex flex-row">
                    <div onClick={() => {navigate('/')}} className="flex items-center cursor-pointer gap-2">
                        <Plane className="w-8 h-8 text-blue-600" />
                        <span className="text-xl font-bold">AeroLine</span>
                    </div>
                    {window.location.pathname === '/admin' &&
                        <span className="pt-1 content-center mx-2 font-bold text-red-600">ADMIN-PANEL</span>
                    }
                </div>
                <div className="flex items-center gap-6">
                {userStore.user?.roles.includes('ADMIN')
                    ?   window.location.pathname === '/admin'
                        ?   <></>
                        :   <Button variant={'destructive'} onClick={() => {navigate('/admin')}}>Админ-Панель</Button>
                    :   <Button variant="ghost">О нас</Button>
                }
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