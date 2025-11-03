import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Plane } from "lucide-react"
import { createContext, Dispatch, FC, SetStateAction, useLayoutEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const ValueContext = createContext<Dispatch<SetStateAction<"auth" | "reg">> | undefined>(undefined)

export const AuthLayout: FC = () => {
    const [value, setValue] = useState<'auth' | 'reg' | string>(window.location.pathname.endsWith('reg')? 'reg' : 'auth')
    const navigate = useNavigate()
    

    useLayoutEffect(() => {
        navigate(`/users/${value === 'auth' ? "auth": "reg"}`)
    }, [value])


    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Plane className="w-8 h-8 text-blue-600" />
                        <span className="text-xl font-bold">AeroLine</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Добро пожаловать
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Войдите в свой аккаунт или создайте новый
                    </p>
                </div>
                <Tabs value={value} onValueChange={(v) => setValue(v)}>
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="auth">Вход</TabsTrigger>
                        <TabsTrigger value="reg">Регистрация</TabsTrigger>
                    </TabsList>
                </Tabs>

                <Outlet />

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    <p>© 2025 AeroLine. Все права защищены.</p>
                </div>
            </div>
        </div>
    )
}