import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Flight } from "@/interfaces/interfaces"
import { Clock, Plane, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const CreatedFlight = ({flight, formatDate}: {flight: Flight, formatDate: Function}) => {
    const navigate = useNavigate()


    return(
        <Card key={flight.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Plane className="w-5 h-5 text-blue-600" />
                            </div>

                            <div>
                                <h3 className="font-semibold">AeroLine</h3>
                                <p className="text-sm text-gray-600">{flight.tag}</p>
                            </div>
                            
                            <Badge variant={flight.allowed_business ? "default" : "secondary"}>
                                {flight.allowed_business ? "Бизнес" : "Эконом"}
                            </Badge>
                        </div>

                        <div className="flex items-center justify-between max-w-md">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{formatDate(flight.departure_time)}</div>
                                <div className="text-sm text-gray-600">{flight.departure.city.name}</div>
                                <div className="text-xs text-gray-500">{flight.departure_time.split('T')[1]}</div>
                            </div>

                            <div className="flex-1 px-4 min-w-40">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{flight.duration}</span>
                                </div>
                                <div className="relative">
                                <div className="h-px bg-gray-300"></div>
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                                </div>
                                <div className="text-xs text-gray-500 text-center mt-1">Прямой рейс</div>
                            </div>

                            <div className="text-center">
                                <div className="text-2xl font-bold">{formatDate(flight.arrival_time)}</div>
                                <div className="text-sm text-gray-600">{flight.arrival.city.name}</div>
                                <div className="text-xs text-gray-500">{flight.arrival_time.split('T')[1]}</div>
                            </div>
                        </div>
                    </div>

                    <div className="text-right ml-6">
                        <div className="mb-2">
                            <div className="text-2xl font-bold text-blue-600" >От {flight.min_price.toLocaleString()} ₽</div>
                            <div className="text-sm text-gray-600">за пассажира</div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 justify-end">
                            <Users className="w-4 h-4" />
                            <span>Осталось {flight.seats_left} мест</span>
                        </div>
                        <Button
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => navigate(`/flight?flight_id=${flight.id}`)}
                        >
                        Выбрать
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}