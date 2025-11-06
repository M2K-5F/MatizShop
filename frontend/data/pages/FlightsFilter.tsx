import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Flight } from "@/interfaces/interfaces"
import { Filter } from "lucide-react"
import { useEffect, useState } from "react"

export const FlightFilter = ({flights, callbackfn}: {flights: Flight[], callbackfn: (flights: Flight[]) => void}) => {
    const [minPrice, setMinPrice] = useState<string>('')
    const [maxPrice, setMaxPrice] = useState<string>('')
    const [timeFilter, setTimeFilter] = useState<('6-12' | '12-18' | '18-0' | '0-6')[]>([])
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([])
    const getPriceValue = (value: string) => {
        if (value.length) {
            if (value.startsWith('0')) {
                return value.slice(1)
            }
            else {
                return value
            }

        } else {
            return ''
        }
    }

    const getFilteredByTime = (departureTime: string) => {
        return (timeFilter.filter(time => {
            const [hourseMin, hourseMax] = time.split('-')
            if (departureTime >= hourseMin && departureTime < hourseMax) {
                return true
            }
            return false
        }).length > 0) || timeFilter.length === 0
    }

    useEffect(() => {
        setFilteredFlights(flights.filter(
            flight => {
                const departureTime = flight.departure_time.split('T')[1].split(':')[0];
                return (
                    ((flight.price >= Number(minPrice)) || minPrice === '' )&&
                    ((flight.price <= Number(maxPrice)) || maxPrice === '') &&
                    getFilteredByTime(departureTime)
                )
            }
        ))
    }, [minPrice, maxPrice, timeFilter])


    return(
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
                            <Input 
                                value={minPrice}
                                type="number"
                                placeholder="От" 
                                className="text-sm" 
                                onChange={(e) => {
                                    const value = getPriceValue(e.currentTarget.value)
                                    setMinPrice(value)
                                }}
                            />
                            <span className="text-gray-500">-</span>
                            <Input
                                type="number"
                                value={maxPrice}
                                placeholder="До" 
                                className="text-sm" 
                                onChange={(e) => {
                                    const value = getPriceValue(e.currentTarget.value)
                                    console.log(value)
                                    setMaxPrice(value)
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div>
                <Label className="text-sm font-medium mb-3 block">Время вылета</Label>
                <div className="grid grid-cols-2 gap-2">
                    {([["Утро\n06:00-12:00", '6-12'], ["День\n12:00-18:00", '12-18'], ["Вечер\n18:00-00:00", '18-0'], ["Ночь\n00:00-06:00", '0-6']] as const) .map((time, index) => (
                    <Button 
                        key={time[1]} 
                        variant={timeFilter.includes(time[1]) ? 'default' : 'outline'} 
                        className="h-auto py-2 text-xs whitespace-pre-wrap"
                        onClick={() => {
                            timeFilter.includes(time[1])
                                ? setTimeFilter(() => timeFilter.filter(v => v !== time[1]))
                                : setTimeFilter([...timeFilter, time[1]])
                        }}
                    >
                        {time}
                    </Button>
                    ))}
                </div>
                </div>

                <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                        callbackfn(filteredFlights)
                    }}
                >
                    Применить фильтры
                </Button>
            </CardContent>
        </Card>
    )
}