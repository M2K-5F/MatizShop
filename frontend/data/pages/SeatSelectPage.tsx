import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plane, ArrowLeft, User, Shield, Crown } from "lucide-react"
import { useState } from "react"

export default function SeatSelectionPage() {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [passengerSeats, setPassengerSeats] = useState<{[key: string]: string}>({})

  // Модель самолета с местами
  const airplaneSections = [
    {
      name: "Бизнес-класс",
      rows: [
        {
          number: 1,
          seats: [
            { id: "1A", type: "window", available: true, price: 2500 },
            { id: "1B", type: "aisle", available: true, price: 2500 },
            { id: "1C", type: "aisle", available: false, price: 2500 },
            { id: "1D", type: "window", available: true, price: 2500 }
          ]
        },
        {
          number: 2,
          seats: [
            { id: "2A", type: "window", available: true, price: 2500 },
            { id: "2B", type: "aisle", available: true, price: 2500 },
            { id: "2C", type: "aisle", available: true, price: 2500 },
            { id: "2D", type: "window", available: true, price: 2500 }
          ]
        }
      ]
    },
    {
      name: "Эконом-класс",
      rows: [
        {
          number: 6,
          seats: [
            { id: "6A", type: "window", available: true, price: 1500 },
            { id: "6B", type: "middle", available: true, price: 1200 },
            { id: "6C", type: "aisle", available: true, price: 1500 },
            { id: "6D", type: "aisle", available: false, price: 1500 },
            { id: "6E", type: "middle", available: true, price: 1200 },
            { id: "6F", type: "window", available: true, price: 1500 }
          ]
        },
        {
          number: 7,
          seats: [
            { id: "7A", type: "window", available: true, price: 1500 },
            { id: "7B", type: "middle", available: true, price: 1200 },
            { id: "7C", type: "aisle", available: true, price: 1500 },
            { id: "7D", type: "aisle", available: true, price: 1500 },
            { id: "7E", type: "middle", available: true, price: 1200 },
            { id: "7F", type: "window", available: true, price: 1500 }
          ]
        },
        {
          number: 8,
          seats: [
            { id: "8A", type: "window", available: false, price: 1500 },
            { id: "8B", type: "middle", available: true, price: 1200 },
            { id: "8C", type: "aisle", available: true, price: 1500 },
            { id: "8D", type: "aisle", available: true, price: 1500 },
            { id: "8E", type: "middle", available: false, price: 1200 },
            { id: "8F", type: "window", available: true, price: 1500 }
          ]
        },
        {
          number: 9,
          seats: [
            { id: "9A", type: "window", available: true, price: 1500 },
            { id: "9B", type: "middle", available: true, price: 1200 },
            { id: "9C", type: "aisle", available: true, price: 1500 },
            { id: "9D", type: "aisle", available: true, price: 1500 },
            { id: "9E", type: "middle", available: true, price: 1200 },
            { id: "9F", type: "window", available: true, price: 1500 }
          ]
        },
        {
          number: 10,
          seats: [
            { id: "10A", type: "window", available: true, price: 1500 },
            { id: "10B", type: "middle", available: true, price: 1200 },
            { id: "10C", type: "aisle", available: true, price: 1500 },
            { id: "10D", type: "aisle", available: true, price: 1500 },
            { id: "10E", type: "middle", available: true, price: 1200 },
            { id: "10F", type: "window", available: true, price: 1500 }
          ]
        }
      ]
    }
  ]

  const passengers = [
    { id: 1, name: "Иван Петров", type: "Взрослый" },
    { id: 2, name: "Мария Петрова", type: "Взрослый" }
  ]

  const handleSeatSelect = (seatId: string, passengerId: number) => {
    setPassengerSeats(prev => ({
      ...prev,
      [passengerId]: seatId
    }))
    setSelectedSeat(seatId)
  }

  const getSeatColor = (type: string, available: boolean, isSelected: boolean) => {
    if (!available) return "bg-gray-300 cursor-not-allowed"
    if (isSelected) return "bg-blue-600 text-white hover:bg-blue-700"
    
    switch (type) {
      case "window": return "bg-green-500 hover:bg-green-600 text-white"
      case "aisle": return "bg-blue-500 hover:bg-blue-600 text-white"
      case "middle": return "bg-yellow-500 hover:bg-yellow-600 text-white"
      default: return "bg-gray-400 hover:bg-gray-500 text-white"
    }
  }

  const getSelectedSeatPrice = () => {
    if (!selectedSeat) return 0
    for (const section of airplaneSections) {
      for (const row of section.rows) {
        const seat = row.seats.find(s => s.id === selectedSeat)
        if (seat) return seat.price
      }
    }
    return 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Назад
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Выбор мест</h1>
                <p className="text-gray-600">Рейс SW 245 • Москва (SVO) → Стамбул (IST)</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              65% мест занято
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная область - Схема самолета */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  Схема салона Boeing 737-800
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Легенда */}
                <div className="flex items-center justify-center gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">У окна</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm">Среднее</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">У прохода</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <span className="text-sm">Занято</span>
                  </div>
                </div>

                {/* Схема самолета */}
                <div className="space-y-8">
                  {airplaneSections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-px flex-1 bg-gray-300"></div>
                        <h3 className="text-lg font-semibold text-gray-700">{section.name}</h3>
                        <div className="h-px flex-1 bg-gray-300"></div>
                      </div>

                      {/* Профиль самолета */}
                      <div className="relative bg-blue-100 rounded-2xl p-6 mb-4 border-2 border-blue-200">
                        {/* Нос самолета */}
                        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                          <div className="w-8 h-16 bg-blue-300 rounded-r-full"></div>
                        </div>
                        
                        {/* Хвост самолета */}
                        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                          <div className="w-8 h-20 bg-blue-300 rounded-l-full"></div>
                        </div>

                        {/* Ряды кресел */}
                        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${section.rows.length}, minmax(0, 1fr))` }}>
                          {section.rows.map((row) => (
                            <div key={row.number} className="text-center">
                              <div className="text-sm font-medium text-gray-600 mb-2">
                                {row.number}
                              </div>
                              <div className="flex gap-1 justify-center">
                                {row.seats.map((seat) => {
                                  const isSelected = Object.values(passengerSeats).includes(seat.id)
                                  return (
                                    <button
                                      key={seat.id}
                                      onClick={() => seat.available && setSelectedSeat(seat.id)}
                                      disabled={!seat.available}
                                      className={`
                                        w-8 h-8 rounded text-xs font-medium transition-all
                                        ${getSeatColor(seat.type, seat.available, isSelected)}
                                        ${isSelected ? 'ring-2 ring-offset-2 ring-blue-400' : ''}
                                      `}
                                    >
                                      {seat.id.slice(-1)}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Указатель направления */}
                <div className="text-center mt-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-sm text-gray-600">Нос самолета</div>
                    <div className="w-24 h-1 bg-gray-400 relative">
                      <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-gray-400 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Боковая панель - Пассажиры и выбор */}
          <div className="space-y-6">
            {/* Информация о рейсе */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">SW 245</div>
                      <div className="text-sm text-gray-600">Москва → Стамбул</div>
                    </div>
                    <Badge variant="outline">15 дек</Badge>
                  </div>
                  <Progress offsetValue={2} value={65} className="h-2" />
                  <div className="text-xs text-gray-500 text-center">65% мест занято</div>
                </div>
              </CardContent>
            </Card>

            {/* Выбор мест для пассажиров */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Пассажиры</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {passengers.map((passenger) => (
                    <div key={passenger.id} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">{passenger.name}</div>
                          <div className="text-sm text-gray-600">{passenger.type}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Выберите место</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={passengerSeats[passenger.id] || ""}
                          onChange={(e) => handleSeatSelect(e.target.value, passenger.id)}
                        >
                          <option value="">Не выбрано</option>
                          {airplaneSections.flatMap(section => 
                            section.rows.flatMap(row => 
                              row.seats
                                .filter(seat => seat.available)
                                .map(seat => (
                                  <option key={seat.id} value={seat.id}>
                                    {seat.id} ({section.name}) - {seat.price} ₽
                                  </option>
                                ))
                            )
                          )}
                        </select>
                        
                        {passengerSeats[passenger.id] && (
                          <div className="text-sm text-green-600 font-medium">
                            Место {passengerSeats[passenger.id]} выбрано
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Итоговая информация */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Базовая стоимость:</span>
                    <span>31 200 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доплата за места:</span>
                    <span className="text-green-600">
                      +{getSelectedSeatPrice() * Object.keys(passengerSeats).length} ₽
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>Итого:</span>
                    <span>{31_200 + (getSelectedSeatPrice() * Object.keys(passengerSeats).length)} ₽</span>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                    disabled={Object.keys(passengerSeats).length !== passengers.length}
                  >
                    Продолжить
                  </Button>

                  {/* Преимущества выбора мест */}
                  <div className="space-y-2 mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>Безопасность и комфорт</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Crown className="w-4 h-4 text-yellow-600" />
                      <span>Лучшие места у окна и прохода</span>
                    </div>
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