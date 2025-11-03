import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { ApiService } from "./services/restapi/api.service"
import { useUserStore } from "./stores/useUserStore"
import { createContext, useEffect, useLayoutEffect, useMemo, useRef } from "react"
import { Homepage } from "./pages/Home"
import FlightsPage from "./pages/Flights"
import { Plane } from "lucide-react"
import { Button } from "./components/ui/button"
import { AuthLayout } from "./layouts/AuthLayout"
import { AuthPage } from "./pages/Auth"
import { AppLayout } from "./layouts/AppLayout"
import { RegistrationPage } from "./pages/Registration"
import { getPathToRedirect, isPathAvailable } from "./routes/routes"

export const getApiService = createContext<null | ApiService>(null)

export const App = () => {
    const userStore = useUserStore()
    const apiService = useMemo(() => {
        return new ApiService(userStore)
    }, [])
    const navigate = useNavigate()
    

    
    useEffect(() => {
        (async () => {
            const current_user = await apiService.getUsersMe()
            userStore.addUser(
                current_user
            )
        })()
    }, [])

    useLayoutEffect(() => {
        !isPathAvailable(userStore.status) && navigate(getPathToRedirect(userStore.status))
    }, [userStore.status, window.location.pathname])


    if (!isPathAvailable(userStore.status)) return null

    return(
        <getApiService.Provider value={apiService}>
            <Routes>
                <Route path="/users/*" Component={AuthLayout}>
                    <Route path="auth" Component={AuthPage} />
                    <Route path="reg" Component={RegistrationPage} />
                </Route>
                <Route path="/" Component={AppLayout}>
                    <Route index Component={Homepage} />
                    <Route path="/flights" Component={FlightsPage} />
                </Route>
            </Routes>
        </getApiService.Provider>
    )
}