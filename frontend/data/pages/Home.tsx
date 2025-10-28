import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Search, Plane, Shield, Clock } from "lucide-react"

export const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <nav className="border-b">
        <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Plane className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold">AeroLine</span>
            </div>
            <div className="flex items-center gap-6">
                <Button variant="ghost">Рейсы</Button>
                <Button variant="ghost">О нас</Button>
                <Button variant="ghost">Помощь</Button>
                <Button>Войти</Button>
            </div>
            </div>
        </div>
        </nav>
      {/* Hero Section */}
      <div 
        className="relative h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/airplane-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">
              Путешествуйте с комфортом
            </h1>
            <p className="text-xl mb-8">
              Откройте для себя мир с лучшей авиакомпанией. Более 100 направлений по всему миру.
            </p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="container mx-auto px-6 -mt-12 relative z-20">
        <Card className="shadow-2xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="from" className="flex items-center gap-2 mb-2">
                  <Plane className="w-4 h-4" />
                  Откуда
                </Label>
                <Input id="from" placeholder="Город вылета" />
              </div>
              <div>
                <Label htmlFor="to" className="flex items-center gap-2 mb-2">
                  <Plane className="w-4 h-4 rotate-90" />
                  Куда
                </Label>
                <Input id="to" placeholder="Город назначения" />
              </div>
              <div>
                <Label htmlFor="date" className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4" />
                  Дата вылета
                </Label>
                <Input id="date" type="date" />
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Найти рейсы
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Безопасность</h3>
            <p className="text-gray-600">Высшие стандарты безопасности в индустрии</p>
          </div>
          <div className="text-center">
            <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Пунктуальность</h3>
            <p className="text-gray-600">95% рейсов прибывают вовремя</p>
          </div>
          <div className="text-center">
            <Plane className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Комфорт</h3>
            <p className="text-gray-600">Современный флот и удобные кресла</p>
          </div>
        </div>
      </div>
    </div>
  )
}