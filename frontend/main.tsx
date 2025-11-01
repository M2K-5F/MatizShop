import {createRoot} from "react-dom/client"
import './data/styles/index.css'
import { Homepage } from "@/pages/Home"
import FlightsPage from "@/pages/Flights"
import MyTicketsPage from "@/pages/MyTicketsPage"
import SeatSelectionPage from "@/pages/SeatSelectPage"
import { App } from "@/App"
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)