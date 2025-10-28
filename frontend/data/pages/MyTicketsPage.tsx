import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Plane, MapPin, Clock, Download, Share2, Eye, QrCode } from "lucide-react"

export default function MyTicketsPage() {
  const tickets = [
    {
      id: 1,
      status: "active",
      airline: "SkyWings Airlines",
      flightNumber: "SW 245",
      departure: { 
        city: "Москва (SVO)", 
        time: "08:30", 
        date: "15 дек 2024",
        terminal: "Терминал B"
      },
      arrival: { 
        city: "Стамбул (IST)", 
        time: "11:45", 
        date: "15 дек 2024",
        terminal: "Терминал 1"
      },
      duration: "3ч 15м",
      passenger: "Иван Петров",
      class: "Эконом",
      seat: "15A",
      bookingCode: "SW7X9K2",
      price: 15600
    },
    {
      id: 2,
      status: "upcoming",
      airline: "SkyWings Airlines",
      flightNumber: "SW 312",
      departure: { 
        city: "Стамбул (IST)", 
        time: "14:20", 
        date: "22 дек 2024",
        terminal: "Терминал 1"
      },
      arrival: { 
        city: "Москва (SVO)", 
        time: "17:35", 
        date: "22 дек 2024",
        terminal: "Терминал B"
      },
      duration: "3ч 15м",
      passenger: "Иван Петров",
      class: "Комфорт",
      seat: "8C",
      bookingCode: "SW4M2P8",
      price: 18900
    },
    {
      id: 3,
      status: "completed",
      airline: "SkyWings Airlines",
      flightNumber: "SW 118",
      departure: { 
        city: "Москва (SVO)", 
        time: "06:45", 
        date: "10 ноя 2024",
        terminal: "Терминал A"
      },
      arrival: { 
        city: "Сочи (AER)", 
        time: "09:15", 
        date: "10 ноя 2024",
        terminal: "Терминал 1"
      },
      duration: "2ч 30м",
      passenger: "Иван Петров",
      class: "Эконом",
      seat: "22F",
      bookingCode: "SW1R6T9",
      price: 8900
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Активный", variant: "default" as const },
      upcoming: { label: "Предстоящий", variant: "secondary" as const },
      completed: { label: "Завершен", variant: "outline" as const }
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Hero Section - Изменен градиент и добавлена иконка */}
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
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Tabs для фильтрации - Новый элемент интерфейса */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">Все билеты</TabsTrigger>
            <TabsTrigger value="active">Активные</TabsTrigger>
            <TabsTrigger value="upcoming">Предстоящие</TabsTrigger>
            <TabsTrigger value="completed">Завершенные</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="max-w-4xl mx-auto">
          {/* Статистика - Новый блок */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{tickets.length}</div>
                <div className="text-sm text-gray-600">Всего билетов</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">2</div>
                <div className="text-sm text-gray-600">Предстоящих рейса</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">1</div>
                <div className="text-sm text-gray-600">Завершенных поездок</div>
              </CardContent>
            </Card>
          </div>

          {/* Список билетов */}
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  {/* Заголовок с статусом */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Plane className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{ticket.airline}</h3>
                        <p className="text-sm text-gray-600">Рейс {ticket.flightNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(ticket.status)}
                      <div className="text-xs text-gray-500 mt-1">Код: {ticket.bookingCode}</div>
                    </div>
                  </div>

                  {/* Информация о рейсе */}
                  <div className="flex items-center justify-between mb-6">
                    {/* Вылет */}
                    <div className="text-center flex-1">
                      <div className="text-2xl font-bold text-gray-900">{ticket.departure.time}</div>
                      <div className="text-sm font-medium text-gray-700">{ticket.departure.city}</div>
                      <div className="text-xs text-gray-500">{ticket.departure.date}</div>
                      <div className="text-xs text-blue-600 mt-1">{ticket.departure.terminal}</div>
                    </div>

                    {/* Маршрут */}
                    <div className="flex-1 px-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{ticket.duration}</span>
                      </div>
                      <div className="relative">
                        <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
                      </div>
                      <div className="text-xs text-gray-500 text-center mt-2">Прямой рейс</div>
                    </div>

                    {/* Прилет */}
                    <div className="text-center flex-1">
                      <div className="text-2xl font-bold text-gray-900">{ticket.arrival.time}</div>
                      <div className="text-sm font-medium text-gray-700">{ticket.arrival.city}</div>
                      <div className="text-xs text-gray-500">{ticket.arrival.date}</div>
                      <div className="text-xs text-blue-600 mt-1">{ticket.arrival.terminal}</div>
                    </div>
                  </div>

                  {/* Детали пассажира и действия */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="space-y-1">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-medium">{ticket.passenger}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-600">{ticket.class} класс</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-600">Место {ticket.seat}</span>
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        {ticket.price.toLocaleString()} ₽
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="w-4 h-4" />
                        Детали
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        PDF
                      </Button>
                      <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Share2 className="w-4 h-4" />
                        Поделиться
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Информационный баннер - Новый элемент */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
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