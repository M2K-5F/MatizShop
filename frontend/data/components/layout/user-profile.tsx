import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    User,
    Settings, 
    CreditCard, 
    LogOut, 
    Shield,
    Plane,
} from "lucide-react"
import {User as UserShema} from '@/interfaces/interfaces'
import { useUserStore } from "@/stores/useUserStore"
import { Button } from "../ui/button"
import { use } from "react"
import { getApiService } from "@/App"


export const UserProfile = () => {
    const userStore = useUserStore()
    const apiService = use(getApiService)
    

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="avatar-fallback text-amber-100">
                            {getInitials(userStore.user!.username)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
                <DropdownMenuLabel className="p-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-blue-100">
                            <AvatarFallback className="bg-blue-500 text-white text-lg font-semibold">
                                {getInitials(userStore.user!.username)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{userStore.user!.username}</p>
                            <p className="text-xs text-gray-500 truncate">{userStore.user!.emailAddress}</p>
                            <div className="flex gap-1 mt-1">
                                {userStore.user!.roles.map((role) => (
                                    <Badge 
                                        key={role} 
                                        variant={role === 'ADMIN' ? 'destructive' : 'default'}
                                        className="text-xs"
                                    >
                                        <div className="flex items-center gap-1">
                                            {role === 'ADMIN' 
                                                ?   <Shield className="w-4 h-4" /> 
                                                :   <User className="w-4 h-4" />
                                            }
                                        {role === 'ADMIN' ? 'Админ' : 'Клиент'}
                                        </div>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem 
                className="cursor-pointer py-3"
                //   onClick={onProfileClick}
                >
                    <User className="w-4 h-4 mr-2" />
                    <span>Мой профиль</span>
                </DropdownMenuItem>

                <DropdownMenuItem 
                className="cursor-pointer py-3"
                //   onClick={onBookingsClick}
                >
                    <Plane className="w-4 h-4 mr-2" />
                    <span>Мои бронирования</span>
                </DropdownMenuItem>

                <DropdownMenuItem 
                className="cursor-pointer py-3"
                //   onClick={onSettingsClick}
                >
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Настройки</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer py-3">
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span>Способы оплаты</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem 
                className="cursor-pointer py-3 text-red-600 focus:text-red-600"
                onClick={() => {
                    apiService?.logout()
                        .then(() => {userStore.removeUser()})
                }}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Выйти</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}