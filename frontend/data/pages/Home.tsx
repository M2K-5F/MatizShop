import { CitySelector } from "@/components/selectors/city-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Search, Plane, Shield, Clock } from "lucide-react"
import { use, useState } from "react"
import { useNavigate } from "react-router-dom"


interface SearchFlight {
  departure?: string
  arrival?: string
  date: string
}

export const Homepage = () => {
  const [flight, setFlight] = useState<SearchFlight>({
    departure: undefined, 
    arrival: undefined, 
    date: ''
  })
  const navigate = useNavigate()


  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-blue-50 to-white">
      <div
        className="relative bg-cover bg-center h-110"
        style={{ backgroundImage: "url('/images/homepage_plane.png" }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 px-6 h-full flex items-center">
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

      <div className="container mx-auto px-6 -mt-12 relative z-20">
        <Card className="shadow-2xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <CitySelector
                label={<><Plane className="w-4 h-4" />Откуда </>}
                placeholder="Город вылета"
                onCitySelect={(city) => setFlight({...flight, departure: city.tag})}
                onCityDrop={() => setFlight({...flight, departure: undefined})}
              />

              <div>
                <CitySelector 
                  label={<><Plane className="w-4 h-4 rotate-80" />Куда </>}
                  placeholder="Город назначения"
                onCitySelect={(city) => setFlight({...flight, arrival: city.tag})}
                onCityDrop={() => setFlight({...flight, arrival: undefined})}
                />
              </div>

              <div>
                <Label htmlFor="date" className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4" />
                  Дата вылета
                </Label>
                <Input value={flight.date} id="date" type="date" onChange={(v) => {
                    const value = v.currentTarget.value
                    setFlight({...flight, date: value})}
                  } />
              </div>

              <div className="flex items-end">
                <Button 
                  disabled={!flight.arrival || !flight.departure || !flight.date} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    navigate(`/flights?arrival=${flight.arrival}&departure=${flight.departure}&date=${flight.date}`)
                  }}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Найти рейсы
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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