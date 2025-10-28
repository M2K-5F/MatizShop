import {createRoot} from "react-dom/client"
import './data/styles/index.css'
import { Homepage } from "@/pages/Home"
import FlightsPage from "@/pages/Flights"
import MyTicketsPage from "@/pages/MyTicketsPage"
import SeatSelectionPage from "@/pages/SeatSelectPage"

createRoot(document.getElementById('root')!).render(
    <SeatSelectionPage />
)