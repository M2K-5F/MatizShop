import { use, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ParkingSquareOffIcon, Plane, Tag } from 'lucide-react';
import { CitySelector } from '@/components/selectors/city-selector';
import { Airport, City, CreateFlightForm } from '@/interfaces/interfaces';
import { getApiService, useApiService } from '@/App';
import { Loader } from '@/components/ui/loader';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';




export default function CreateFlightSection() {
    const [formData, setFormData] = useState<CreateFlightForm>(baseFormStats)
    const navigate = useNavigate()
    const service = useApiService()
    const client = useQueryClient()

    const {data: arrivalAirports = []} = useQuery({
        queryKey: ['airports', 'arrival', formData.arrival_airport_id],
        queryFn() {
            return service.getAirportsByTag(formData.arrival_city!.tag)
        },
        enabled: !!formData.arrival_city,
        staleTime: 1000 * 60 * 5,
    })

    
    const {data: departureAirports = []} = useQuery({
        queryKey: ['airports', 'departure', formData.departure_airport_id],
        queryFn() {
            return service.getAirportsByTag(formData.departure_city!.tag)
        },
        enabled: !!formData.departure_city,
        staleTime: 1000 * 60 * 5,
    })

    const {isPending, mutate} = useMutation({
        mutationFn(formData: CreateFlightForm) {
            return service.createFlight(formData)
        },
        onSuccess() {
            client.invalidateQueries({
                queryKey: ['flights']
            })
            navigate('/admin?tab=flights')
        },
    })


    const handleDepartureCitySelect = async (city: City | null) => {
        setFormData(prev => ({
            ...prev,
            departure_city: city,
            departure_airport_id: null
        }))
    }

    const handleArrivalCitySelect = async (city: City | null) => {
        setFormData(prev => ({
            ...prev,
            arrival_city: city,
            arrival_airport_id: null
        }))
    }

    const handleInputChange = (field: keyof CreateFlightForm, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }



    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Plane className="w-6 h-6" />
                    Создание нового рейса
                </CardTitle>
                <CardDescription>
                    Заполните информацию о новом рейсе
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="flight-tag">Код рейса</Label>
                        <Input
                            id="flight-tag"
                            placeholder="WS228"
                            value={formData.tag}
                            onChange={(e) => handleInputChange('tag', calculateTag(e.target.value))}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="min-price">Минимальная цена</Label>
                        <Input
                            id="min-price"
                            placeholder="15000"
                            value={formData.min_price}
                            onChange={(e) => handleInputChange('min_price', calculatePrice(e.target.value))}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CitySelector
                        label="Город вылета"
                        onCityChange={handleDepartureCitySelect}
                        placeholder="Выберите город вылета"
                    />

                    <CitySelector
                        label="Город прибытия"
                        onCityChange={handleArrivalCitySelect}
                        placeholder="Выберите город прибытия"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {departureAirports.length > 0 && (
                        <div className="space-y-2 col-start-1">
                        <Label>Аэропорт вылета</Label>
                        <Select
                            value={formData.departure_airport_id?.toString() || ''}
                            onValueChange={(value) => handleInputChange('departure_airport_id', parseInt(value))}
                        >
                            <SelectTrigger>
                            <SelectValue placeholder="Выберите аэропорт" />
                            </SelectTrigger>
                            <SelectContent>
                            {departureAirports.map((airport) => (
                                <SelectItem key={airport.id} value={airport.id.toString()}>
                                    {airport.name} ({airport.code})
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        </div>
                    )}

                    {arrivalAirports.length > 0 && (
                        <div className="col-start-2 space-y-2">
                        <Label>Аэропорт прибытия</Label>
                        <Select
                            value={formData.arrival_airport_id?.toString() || ''}
                            onValueChange={(value) => handleInputChange('arrival_airport_id', parseInt(value))}
                        >
                            <SelectTrigger>
                            <SelectValue placeholder="Выберите аэропорт" />
                            </SelectTrigger>
                            <SelectContent>
                            {arrivalAirports.map((airport) => (
                                <SelectItem key={airport.id} value={airport.id.toString()}>
                                {airport.name} ({airport.code})
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="departure-time">Время вылета</Label>
                        <Input
                            id="departure-time"
                            type="datetime-local"
                            value={formData.departure_time}
                            onChange={(e) => handleInputChange('departure_time', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="arrival-time">Время прибытия</Label>
                        <Input
                            id="arrival-time"
                            type="datetime-local"
                            value={formData.arrival_time}
                            onChange={(e) => handleInputChange('arrival_time', e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="plane">Самолет</Label>
                        <Select
                            value={formData.plane_id.toString()}
                            onValueChange={(value) => handleInputChange('plane_id', parseInt(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите самолет" />
                            </SelectTrigger>

                            <SelectContent>
                                {defaultPlanes.map((plane) => (
                                    <SelectItem key={plane.id} value={plane.id.toString()}>
                                        {plane.name} ({plane.business_class_count + plane.economy_class_count} мест)
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-2 pt-6">
                        <Switch
                            checked={formData.allowed_business}
                            onCheckedChange={(checked) => handleInputChange('allowed_business', checked)}
                        />
                        <Label htmlFor="business-class">Доступен бизнес-класс</Label>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button 
                        onClick={() => mutate(formData)} 
                        disabled={isPending}
                        className="min-w-32"
                    >
                        {isPending ? <Loader /> : 'Создать рейс'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}


const baseFormStats = {
    tag: '',
    departure_city: null,
    arrival_city: null,
    departure_airport_id: null,
    arrival_airport_id: null,
    departure_time: '',
    arrival_time: '',
    plane_id: 1, 
    min_price: '',
    allowed_business: true
}

const defaultPlanes = [
    { name: "MC-21", economy_class_count: 40, business_class_count: 12, id: 1 }
]

const validateForm = (formData: CreateFlightForm): boolean => {
    if (!formData.tag.trim()) {
        toast.error('Введите код рейса')
        return false
    }
    if (!formData.departure_city) {
        toast.error('Выберите город вылета')
        return false
    }
    if (!formData.arrival_city) {
        toast.error('Выберите город прибытия')
        return false
    }
    if (!formData.departure_airport_id) {
        toast.error('Выберите аэропорт вылета')
        return false
    }
    if (!formData.arrival_airport_id) {
        toast.error('Выберите аэропорт прибытия')
        return false
    }
    if (!formData.departure_time) {
        toast.error('Введите время вылета')
        return false
    }
    if (!formData.arrival_time) {
        toast.error('Введите время прибытия')
        return false
    }
    if (!formData.min_price.length) {
        toast.error('Цена должна быть больше 0')
        return false
    }

    return true
}

const calculateTag = (tag: string) => {
    tag = tag
        .replace(/\D/g, '')
        .slice(0, 3)

    tag = 'SW' + tag
    return tag
}

const calculatePrice = (price: string) => {
    price = price
            .replace(/\D/g, '')
            .slice(0, 6)

    return price
    }
