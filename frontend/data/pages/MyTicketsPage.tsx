import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Plane, MapPin, Clock, Download, Share2, Eye, QrCode } from "lucide-react"
import { FlightSeat, UserTicket } from "@/interfaces/interfaces"
import { use, useEffect, useState } from "react"
import { getApiService } from "@/App"
import { Loader } from "@/components/ui/loader"




export default function MyTicketsPage() {
  const [tickets, setTikets] = useState<UserTicket[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const service = use(getApiService)

  const getStatusBadge = (departureTime: string) => {
    const now = new Date()
    const departure = new Date(departureTime)
    
    if (departure < now) {
      return { label: "Завершен", variant: "outline" as const }
    } else if ((departure.getTime() - now.getTime()) < 24 * 60 * 60 * 1000) {
      return { label: "Скоро вылет", variant: "default" as const }
    } else {
      return { label: "Предстоящий", variant: "secondary" as const }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDuration = (duration: string) => {
    const hours = parseInt(duration) / 60 / 60
    return `${hours}ч`
  }


  useEffect(() => {
    setLoading(true)
    service?.getUserFlights()
      .then((data) => {setTikets(data)})
      .finally(() => {setLoading(false)})
  }, [])


  if (loading) {return <Loader />}


  return (
    <div className="min-h-screen gradient-to-br from-slate-50 to-blue-50/30">
      <div 
        className="relative h-56 bg-cover bg-center"
        style={{ backgroundImage: "url('/airplane-tickets.jpg')" }}
      >
        <div className="absolute inset-0 bg-blue-900/50" />
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-between">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-3">
              Мои билеты
            </h1>
            <p className="text-lg text-blue-100">
              Управляйте своими бронированиями и поездками
            </p>
          </div>  
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {tickets?.length
              ?   tickets.map((ticket) => {
                    const status = getStatusBadge(ticket.flight_seat.flight.departure_time)
                    const flight = ticket.flight_seat.flight
                    const seat = ticket.flight_seat.seat
                    
                    return (
                      <Card key={ticket.id} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                <Plane className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{flight.tag}</h3>
                                <p className="text-sm text-gray-600">
                                  {flight.departure.name} → {flight.arrival.name}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={status.variant}>{status.label}</Badge>
                              <div className="text-xs text-gray-500 mt-1">
                                {formatDate(flight.departure_time)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-6">
                            <div className="text-center flex-1">
                              <div className="text-2xl font-bold text-gray-900">
                                {formatTime(flight.departure_time)}
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                {flight.departure.code}
                              </div>
                              <div className="text-xs text-gray-500">{flight.departure.name}</div>
                            </div>

                            <div className="flex-1 px-6">
                              <div className="flex items-center justify-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                  {formatDuration(flight.duration)}
                                </span>
                              </div>
                              <div className="relative">
                                <div className="h-1 bg-blue-500 rounded-full"></div>
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
                              </div>
                              <div className="text-xs text-gray-500 text-center mt-2">
                                Прямой рейс • {flight.plane.name}
                              </div>
                            </div>

                            <div className="text-center flex-1">
                              <div className="text-2xl font-bold text-gray-900">
                                {formatTime(flight.arrival_time)}
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                {flight.arrival.code}
                              </div>
                              <div className="text-xs text-gray-500">{flight.arrival.name}</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="space-y-2">
                              <div className="flex items-center gap-4 text-sm">
                                <span className="font-medium">Место: {seat.seat_name}</span>
                                <span className="text-gray-600">•</span>
                                <Badge variant={seat.seat_class === "BUSINESS" ? "default" : "secondary"}>
                                  {seat.seat_class === "BUSINESS" ? "Бизнес" : "Эконом"} класс
                                </Badge>
                                <span className="text-gray-600">•</span>
                                <span className="text-gray-600">Самолет: {flight.plane.name}</span>
                              </div>
                              <div className="text-lg font-bold text-green-600">
                                {ticket.flight_seat.price.toLocaleString()} ₽
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button variant="outline" disabled size="sm" className="gap-2">
                                <Eye className="w-4 h-4" />
                                Детали
                              </Button>
                              <Button onClick={() => {}} disabled variant="outline" size="sm" className="gap-2">
                                <Download className="w-4 h-4" />
                                PDF
                              </Button>
                              <Button size="sm" disabled className="gap-2 bg-blue-600 hover:bg-blue-700">
                                <Share2 className="w-4 h-4" />
                                Поделиться
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
              : <h1>Нет купленных билетов</h1>
            }
          </div>

          <Card className="mt-8 gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Нужна помощь с поездкой?</h4>
                  <p className="text-sm text-gray-600">
                    Обратитесь в нашу службу поддержки для получения помощи с бронированиями, 
                    изменениями рейсов или другой информацией о вашей поездке.
                  </p>
                </div>
                <Button variant="outline" className="ml-auto">
                  Связаться
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}