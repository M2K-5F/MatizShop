import {createRoot} from "react-dom/client"
import './data/styles/index.css'
import { CarDetailPage } from "@/pages/CarDetaill"

createRoot(document.getElementById('root')!).render(
    <CarDetailPage />
)