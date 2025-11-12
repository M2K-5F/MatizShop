import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Flight } from "@/interfaces/interfaces"
import { Filter } from "lucide-react"
import { useEffect, useState } from "react"

type TimeRange = {start: number, end: number, label: string}

interface Filters {
    min: number | null
    max: number | null
    ranges: TimeRange[]
}

const timeRanges: TimeRange[] = [
    { start: 6, end: 12, label: 'Утро 06:00-12:00' },
    { start: 12, end: 18, label: 'День 12:00-18:00' },
    { start: 18, end: 24, label: 'Вечер 18:00-00:00' },
    { start: 0, end: 6, label: 'Ночь 00:00-06:00' }
] as const

const baseFilters = {
        min: null,
        max: null,
        ranges: []
    }


export const FlightFilter = ({flights, callbackfn}: {flights: Flight[], callbackfn: (flights: Flight[]) => void}) => {
    const [filters, setFilters] = useState<Filters>(baseFilters)
    
    const filterFlights = () => {
        const filtered = flights.filter(
            flight => {
                const departureHour = parseInt(flight.departure_time.split('T')[1].split(':')[0])
                const isPriceValid = 
                    (filters.min === null || flight.min_price >= filters.min) &&
                    (filters.max === null || flight.min_price <= filters.max) 

                const isRangeValid = 
                    filters.ranges.length === 0 || 
                    filters.ranges.some(range => 
                        range.start <= departureHour && range.end > departureHour
                    )

                return (
                    isPriceValid && isRangeValid
                )
            }
        )
        callbackfn(filtered)
    }


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
                                value={filters.min ?? ''}
                                type="number"
                                placeholder="От" 
                                className="text-sm" 
                                onChange={(e) => {
                                    const value = e.currentTarget.value
                                    setFilters((d) => ({...d, min: value ? parseInt(value) : null}))
                                }}
                            />
                            <span className="text-gray-500">-</span>
                            <Input
                                type="number"
                                value={filters.max ?? ''}
                                placeholder="До" 
                                className="text-sm" 
                                onChange={(e) => {
                                    const value = e.currentTarget.value
                                    setFilters((d) => ({...d, max: value ? parseInt(value) : null}))
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div>
                <Label className="text-sm font-medium mb-3 block">Время вылета</Label>
                <div className="grid grid-cols-2 gap-2">
                    {timeRanges.map((time, index) => (
                    <Button 
                        key={time.label} 
                        variant={filters.ranges.includes(time) ? 'default' : 'outline'} 
                        className="h-auto py-2 text-xs whitespace-pre-wrap"
                        onClick={() => {
                            filters.ranges.some(p => p.start === time.start)
                                ? setFilters((d) => ({...d, ranges: d.ranges.filter(r => r.start !== time.start)}))
                                : setFilters(d => ({...d, ranges: [...d.ranges, time]}))
                        }}
                    >
                        {time.label}
                    </Button>
                    ))}
                </div>
                </div>

                <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                        filterFlights()
                    }}
                >
                    Применить фильтры
                </Button>

                <Button
                    onClick={() => {
                        setFilters(baseFilters)
                    }}
                    className="mx-auto"
                >
                    Сбросить фильтры
                </Button>
            </CardContent>
        </Card>
    )
}