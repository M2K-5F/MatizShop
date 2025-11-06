import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Filter, Plane, ArrowRightLeft, Clock, Users } from "lucide-react"
import { use, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getApiService } from "@/App"
import { Flight } from "@/interfaces/interfaces"
import { Loader } from "@/components/ui/loader"
import { CreatedFlight } from "./CreatedFlight"
import { Checkbox } from "@/components/ui/checkbox"
import { FlightFilter } from "./FlightsFilter"

export default function FlightsPage() {
    const [flights, setFlights] = useState<Flight[]>([])
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([])
    const [params, setParams] = useSearchParams()
    const departure = params.get('departure')
    const arrival = params.get('arrival')
    const navigate = useNavigate()
    const service = use(getApiService)
    

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }


    useEffect(() => {
        if (!arrival || !departure) {
            navigate('/')
        } else {
            service?.getFlightsByCities(departure, arrival, '')
                .then(flights => {
                    setFlights(flights)
                    setFilteredFlights(flights)
                })
        }
    }, [arrival, departure])


    if (!flights.length) return <Loader variant='success' />

    return (
        <div className="min-h-screen bg-blue-50">
            <div 
                className="relative h-64 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/flights_plane.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
                    <div className="max-w-4xl text-white">
                        <h1 className="text-4xl font-bold mb-4">
                            Рейсы в {flights[0].arrival.city.name}
                        </h1>
                        <p className="text-lg">
                            {flights[0].departure.city.name} → {flights[0].arrival.city.name} • 1 пассажир
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <FlightFilter flights={flights} callbackfn={(flights: Flight[]) => {setFilteredFlights(flights)}}  />
                    </div>

                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Найдено рейсов: {flights.length} </h2>
                                <p className="text-gray-600">Сортировка по: рекомендованным</p>
                            </div>
                            <Select defaultValue="recommended">
                                <SelectTrigger className="w-48">
                                <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="recommended">Рекомендованные</SelectItem>
                                <SelectItem value="price_asc">Сначала дешевые</SelectItem>
                                <SelectItem value="price_desc">Сначала дорогие</SelectItem>
                                <SelectItem value="duration">По времени в пути</SelectItem>
                                <SelectItem value="departure">По времени вылета</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                        {
                            filteredFlights.map((flight) => (
                                <CreatedFlight flight={flight} key={flight.id} formatDate={formatDate}/>
                            ))
                        }
                        </div>

                        <div className="text-center mt-8">
                            <Button onClick={() => {navigate('/')}} variant="outline" className="px-8">
                                На главную
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}