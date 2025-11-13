import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { ApiService } from "./services/restapi/api.service"
import { useUserStore } from "./stores/useUserStore"
import { createContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Homepage } from "./pages/Home"
import FlightsPage from "./pages/Flights"
import { Plane } from "lucide-react"
import { Button } from "./components/ui/button"
import { AuthLayout } from "./layouts/AuthLayout"
import { AuthPage } from "./pages/Auth"
import { AppLayout } from "./layouts/AppLayout"
import { RegistrationPage } from "./pages/Registration"
import { getPathToRedirect, isPathAvailable } from "./routes/routes"
import { Toaster } from "sonner"
import SeatSelectionPage from "./pages/SeatSelectPage"
import MyTicketsPage from "./pages/MyTicketsPage"
import clsx from "clsx"
import { Loader } from "./components/ui/loader"
import AdminLayout from "./pages/admin/AdminPage"

export const getApiService = createContext<null | ApiService>(null)

export const App = () => {
    const [loading, setLoading] = useState(true)
    const userStore = useUserStore()
    const apiService = useMemo(() => {
        return new ApiService(userStore)
    }, [])
    const navigate = useNavigate()

    
    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const current_user = await apiService.getUsersMe()
                userStore.addUser({
                    username: current_user.username,
                    phoneNumber: current_user.phone_number,
                    emailAddress: current_user.email_address,
                    roles: current_user.roles,
                    id: current_user.id,
                    created_at: current_user.created_at
                })
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    useLayoutEffect(() => {
        !isPathAvailable(userStore.status, userStore.user?.roles) && navigate(getPathToRedirect(userStore.status))
    }, [userStore.status, window.location.pathname])


    if (!isPathAvailable(userStore.status, userStore.user?.roles)) return null

    return(
        <getApiService.Provider value={apiService}>
            <Toaster position='top-center' />
            {loading
                ?   <Loader />
                :   <Routes>
                        <Route path="/users/*" Component={AuthLayout}>
                            <Route path="auth" Component={AuthPage} />
                            <Route path="reg" Component={RegistrationPage} />
                        </Route>
                        <Route path="/" Component={AppLayout}>
                            <Route index Component={Homepage} />
                            <Route path="/admin" Component={AdminLayout} />
                            <Route path="/flights" Component={FlightsPage} />
                            <Route path="/flight" Component={SeatSelectionPage} />
                            <Route path="/user/tickets" Component={MyTicketsPage} />
                        </Route>
                    </Routes>
            }
        </getApiService.Provider>
    )
}