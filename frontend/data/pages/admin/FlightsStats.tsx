import { use, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Plane, Clock, MapPin } from 'lucide-react';
import { Flight } from '@/interfaces/interfaces';
import { getApiService, useApiService } from '@/App';
import { Loader } from '@/components/ui/loader';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';



export function FlightsTable() {
    const service = useApiService()
    const navigate = useNavigate()

    const {data: flights = [], isLoading} = useQuery({
        queryKey: ['flights'],
        queryFn: () => service.getFlightsStats(),
        staleTime: 1000 * 60 * 5,
    })


    if (isLoading) {
        return <Loader />
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Рейсы</CardTitle>
                        <CardDescription>
                            Управление рейсами и расписанием
                        </CardDescription>
                    </div>
                    <Button onClick={() => {navigate('/admin?tab=create')}}>
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить рейс
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Код рейса</TableHead>
                            <TableHead>Маршрут</TableHead>
                            <TableHead>Вылет</TableHead>
                            <TableHead>Прибытие</TableHead>
                            <TableHead>Самолет</TableHead>
                            <TableHead>Свободно мест</TableHead>
                            <TableHead>Цена от</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {flights.map((flight) => {
                            const departure = formatDateTime(flight.departure_time)
                            const arrival = formatDateTime(flight.arrival_time)
                            const status = getFlightStatus(flight.departure_time, flight.seats_left)
                            const route = getRouteInfo(flight)
                            
                            return (
                                <TableRow key={flight.id}>
                                    <TableCell className="font-mono font-medium">
                                        {flight.tag}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-muted-foreground" />
                                            <div>
                                                <div className="font-medium">{route.fullRoute}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {route.from} → {route.to}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{departure.date}</div>
                                            <div className="text-sm text-muted-foreground">
                                                <Clock className="w-3 h-3 inline mr-1" />
                                                {departure.time}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{arrival.date}</div>
                                            <div className="text-sm text-muted-foreground">
                                                <Clock className="w-3 h-3 inline mr-1" />
                                                {arrival.time}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Plane className="w-4 h-4 text-muted-foreground" />
                                            <span>{flight.plane.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant={
                                                flight.seats_left > 10 ? "default" : 
                                                flight.seats_left > 0 ? "outline" : "destructive"
                                            }
                                        >
                                            {flight.seats_left} мест
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {flight.min_price.toLocaleString() + ' ₽'}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={status.variant}>
                                            {status.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => {}}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                
                {flights.length === 0 && !isLoading && (
                    <div className="text-center py-8 text-muted-foreground">
                        Нет доступных рейсов
                    </div>
                )}
            </CardContent>
        </Card>
    )
}


const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return {
        date: date.toLocaleDateString('ru-RU'),
        time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }
}

const getFlightStatus = (departureTime: string, seatsLeft: number) => {
    const now = new Date()
    const departure = new Date(departureTime)
    
    if (departure < now) {
        return { status: 'Вылетел', variant: 'secondary' as const }
    }
    if (seatsLeft === 0) {
        return { status: 'Места заняты', variant: 'destructive' as const }
    }
    if (seatsLeft < 10) {
        return { status: 'Мало мест', variant: 'outline' as const }
    }
    return { status: 'По расписанию', variant: 'default' as const }
}

const getRouteInfo = (flight: Flight) => {
    return {
        from: `${flight.departure.city.tag} (${flight.departure.code})`,
        to: `${flight.arrival.city.tag} (${flight.arrival.code})`,
        fullRoute: `${flight.departure.city.name} → ${flight.arrival.city.name}`
    }
}