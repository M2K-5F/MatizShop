import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plane, ArrowLeft } from "lucide-react"
import { use, useEffect, useState } from "react"
import { Flight, FlightSeat, GetFlightByIdResponse, Seat } from "@/interfaces/interfaces"
import { Loader } from "@/components/ui/loader"
import { getApiService } from "@/App"
import { useSearchParams } from "react-router-dom"
import clsx from "clsx"
import { PaymentDialog } from "./PaymentDialog"


export default function SeatSelectionPage() {
  const [selectedSeat, setSelectedSeat] = useState<FlightSeat | null>(null)
  const [flightData, setFlight] = useState<GetFlightByIdResponse>()
  const apiService = use(getApiService)
  const [params] = useSearchParams()
  const flightId = Number(params.get('flight_id'))

  const getSeatColor = (seat: Seat, isSelected: boolean) => {
      if (isSelected) return "bg-blue-600 text-white hover:bg-blue-700"
      if (seat.seat_class === "BUSINESS") return "bg-purple-500 hover:bg-purple-600 text-white"
      if (seat.seat_class === 'ECONOMY') return "bg-green-500 hover:bg-green-600 text-white"
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


  useEffect(() => {
    apiService?.getFlightById(flightId)
      .then((data) => {
        setFlight(data)
      })
  }, [])
  

  if (!flightData) {
    return <Loader />
  }

  const groupedSeats: FlightSeat[][] = flightData.seats.reduce((rows: FlightSeat[][], seat, index) => {
    const rowIndex = Math.floor(index / 4)
    if (!rows[rowIndex]) {
      rows[rowIndex] = []
    }
    rows[rowIndex].push(seat)

    return rows
  }, [])



  const totalSeats = flightData.flight.plane.business_class_count + flightData.flight.plane.economy_class_count
  const occupiedSeats = totalSeats - flightData.flight.seats_left
  const occupancyPercentage = (occupiedSeats / totalSeats) * 100


  return (
    <div className="min-h-screen gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  Выбор места • {flightData.flight.plane.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span className="text-sm">Выбранное место</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="text-sm">Бизнес-класс</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Эконом-класс</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <div className={clsx(
                      "w-64 h-10 bg-gray-600 rounded-t-full", 
                      "mb-2 border-2 border-gray-700 text-white",
                      "text-center content-center"
                    )}>
                      Нос
                    </div>
                    
                    <div className="flex items-center gap-6 bg-gray-600 p-6 rounded-lg border-2 border-gray-700">
                      <div className="flex flex-col gap-3">
                        {groupedSeats.map((row, rowIndex) => (
                          <div key={rowIndex} className="flex gap-3">
                            {row.slice(0, 2).map((seat) => {
                              const isSelected = selectedSeat?.id === seat.id
                              return (
                                <button
                                  key={seat.id}
                                  onClick={() => setSelectedSeat(isSelected ? null : seat)}
                                  className={clsx(
                                    "w-10 h-10 rounded text-xs font-medium transition-all",
                                    `${getSeatColor(seat.seat, isSelected)}`,
                                    `${isSelected ? 'ring-2 ring-offset-1 ring-blue-400' : ''}`
                                  )}
                                >
                                  {seat.seat.seat_name}
                                </button>
                              )
                            })}
                          </div>
                        ))}
                      </div>

                      {/* Центр - номера рядов и проход */}
                      <div className="flex flex-col items-center gap-3">
                        {groupedSeats.map((_, rowIndex) => (
                          <div key={rowIndex} className="flex flex-col items-center">
                            <div className="w-12 h-10 flex items-center justify-center">
                              <span className="font-bold text-white text-sm">{rowIndex + 1}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Правая сторона - места C и D */}
                      <div className="flex flex-col gap-3">
                        {groupedSeats.map((row, rowIndex) => (
                          <div key={rowIndex} className="flex gap-3">
                            {/* Места C и D (правая сторона) */}
                            {row.slice(2, 4).map((seat) => {
                              const isSelected = selectedSeat?.id === seat.id
                              return (
                                <button
                                  key={seat.id}
                                  onClick={() => setSelectedSeat(isSelected ? null : seat)}
                                  className={`
                                    w-10 h-10 rounded text-xs font-medium transition-all
                                    ${getSeatColor(seat.seat, isSelected)}
                                    ${isSelected ? 'ring-2 ring-offset-1 ring-blue-400' : ''}
                                  `}
                                >
                                  {seat.seat.seat_name}
                                </button>
                              )
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Хвост самолета */}
                    <div className={clsx(
                        "w-48 h-12 bg-gray-600 rounded-b-full", 
                        "mt-2 border-2 border-gray-700 text-white",
                        "text-center content-center"
                      )}>
                      Хвост
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Информация о рейсе */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-lg">{flightData.flight.tag}</div>
                      <div className="text-sm text-gray-600">
                        {flightData.flight.departure.code} → {flightData.flight.arrival.code}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {formatDate(flightData.flight.departure_time)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Вылет</div>
                      <div className="text-lg font-semibold">{formatTime(flightData.flight.departure_time)}</div>
                      <div className="text-gray-600">{flightData.flight.departure.name}</div>
                    </div>
                    <div>
                      <div className="font-medium">Прилет</div>
                      <div className="text-lg font-semibold">{formatTime(flightData.flight.arrival_time)}</div>
                      <div className="text-gray-600">{flightData.flight.arrival.name}</div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Занятость:</span>
                      <span>{Math.round(occupancyPercentage)}%</span>
                    </div>
                    <Progress offsetValue={2} value={occupancyPercentage} className="h-2" />
                    <div className="text-xs text-gray-500 text-center mt-1">
                      {flightData.flight.seats_left} из {totalSeats} мест свободно
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Выбранное место</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedSeat ? (
                    <div className="text-center p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {selectedSeat.seat.seat_name}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {selectedSeat.seat.seat_class.toLowerCase()}-класс
                      </div>
                      <div className="text-lg font-semibold mt-2">
                        {selectedSeat.price.toLocaleString()} ₽
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                      <div className="text-gray-500">Место не выбрано</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Итого:</span>
                    <span>{selectedSeat ? selectedSeat.price.toLocaleString() + '₽' : 'Место не выбрано'}</span>
                  </div>
                  
                  <PaymentDialog selectedSeat={selectedSeat} flightData={flightData} />

                  <div className="text-xs text-gray-500 text-center">
                    Выберите место для продолжения
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}