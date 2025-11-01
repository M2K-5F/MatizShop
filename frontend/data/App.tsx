import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { ApiService } from "./services/restapi/api.service"
import { useUserStore } from "./stores/useUserStore"
import { createContext, useMemo, useRef } from "react"
import { Homepage } from "./pages/Home"
import FlightsPage from "./pages/Flights"
import { Plane } from "lucide-react"
import { Button } from "./components/ui/button"

export const getApiService = createContext<null | ApiService>(null)

export const App = () => {
    const userStore = useUserStore()
    const apiService = useMemo(() => {
        return new ApiService(userStore)
    }, [])
    const navigate = useNavigate()


    return(
        <getApiService.Provider value={apiService}>
            <nav className="border-b">
                <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div onClick={() => {navigate('/')}} className="flex items-center cursor-pointer gap-2">
                        <Plane className="w-8 h-8 text-blue-600" />
                        <span className="text-xl font-bold">AeroLine</span>
                    </div>
                    <div className="flex items-center gap-6">
                    <Button variant="ghost">О нас</Button>
                    <Button>Войти</Button>
                    </div>
                </div>
                </div>
            </nav>
            <Routes>
                <Route path="/" Component={Homepage} />
                <Route path="/flights" Component={FlightsPage} />
            </Routes>
        </getApiService.Provider>
    )
}