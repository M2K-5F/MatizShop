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

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [params, setParams] = useSearchParams()
  const departure = params.get('departure')
  const arrival = params.get('arrival')
  const navigate = useNavigate()
  const service = use(getApiService)

  useEffect(() => {
    if (!arrival || !departure) {
      navigate('/')
    } else {
      service?.getFlightsByCities(departure, arrival, '')
      .then(flights => setFlights(flights))
    }
  }, [arrival, departure])

  if (!flights.length) return <Loader variant='success' />

  return (
    <div className="min-h-screen bg-blue-50">
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/flights_plane.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <h1 className="text-4xl font-bold mb-4">
              Рейсы в {flights[0].arrival.airport_tag.city.name}
            </h1>
            <p className="text-lg">
              {flights[0].departure.airport_tag.city.name} → {flights[0].arrival.airport_tag.city.name} • 1 пассажир
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Фильтры
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Цена, ₽</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input placeholder="От" className="text-sm" />
                      <span className="text-gray-500">-</span>
                      <Input placeholder="До" className="text-sm" />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">Авиакомпании</Label>
                  <div className="space-y-2">
                    {["SkyWings Airlines", "SkyWings Premium", "AeroPartner"].map((airline) => (
                      <div key={airline} className="flex items-center gap-2">
                        <input type="checkbox" id={airline} className="rounded border-gray-300" />
                        <Label htmlFor={airline} className="text-sm">{airline}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">Класс</Label>
                  <div className="space-y-2">
                    {["Эконом", "Комфорт", "Бизнес", "Первый"].map((type) => (
                      <div key={type} className="flex items-center gap-2">
                        <input type="checkbox" id={type} className="rounded border-gray-300" />
                        <Label htmlFor={type} className="text-sm">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">Время вылета</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Утро\n06:00-12:00", "День\n12:00-18:00", "Вечер\n18:00-00:00", "Ночь\n00:00-06:00"].map((time) => (
                      <Button key={time} variant="outline" className="h-auto py-2 text-xs whitespace-pre-wrap">
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Применить фильтры
                </Button>
              </CardContent>
            </Card>
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

            {/* Flight List */}
            <div className="space-y-4">
              {flights.map((flight) => (
                <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      {/* Flight Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Plane className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">AeroLine</h3>
                            <p className="text-sm text-gray-600">{flight.tag}</p>
                          </div>
                          <Badge variant={flight.type === "Бизнес" ? "default" : "secondary"}>
                            {flight.type}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between max-w-md">
                          {/* Departure */}
                          <div className="text-center">
                            <div className="text-2xl font-bold">{flight.departure.time}</div>
                            <div className="text-sm text-gray-600">{flight.departure.airport_tag.city.name}</div>
                            <div className="text-xs text-gray-500">{flight.departure.date}</div>
                          </div>

                          {/* Flight Path */}
                          <div className="flex-1 px-4">
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

                          {/* Arrival */}
                          <div className="text-center">
                            <div className="text-2xl font-bold">{flight.arrival.time}</div>
                            <div className="text-sm text-gray-600">{flight.arrival.airport_tag.city.name}</div>
                            <div className="text-xs text-gray-500">{flight.arrival.date}</div>
                          </div>
                        </div>
                      </div>

                      {/* Price and Action */}
                      <div className="text-right ml-6">
                        <div className="mb-2">
                          <div className="text-2xl font-bold text-blue-600">{flight.price.toLocaleString()} ₽</div>
                          <div className="text-sm text-gray-600">за пассажира</div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 justify-end">
                          <Users className="w-4 h-4" />
                          <span>Осталось {flight.seats_count} мест</span>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Выбрать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
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