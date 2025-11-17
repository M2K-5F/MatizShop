import { MapPin, Plane } from "lucide-react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState, useRef, useEffect, use, JSX } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { getApiService } from "@/App"
import { City } from "@/interfaces/interfaces"


export const CitySelector = (props: {
    label: string | JSX.Element,
    onCityChange: (city: City | null) => void,
    placeholder: string
}) => {
    const [cities, setCities] = useState<City[]>([])
    const [inputValue, setInputValue] = useState("")
    const [isVisible, setVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const service = use(getApiService)
    const getCities = useDebounce((value) => {
        service?.getCitiesByQuery(value)
            .then((cities: City[]) => {setCities(cities)})
    }, 300)


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setInputValue(value)
        setVisible(true)

        props.onCityChange(null)

        if (value) {
            getCities(value)
        } else {
            setCities([])
        }
    }


    const handleSelect = (city: City) => {
        setInputValue(`${city.name}, ${city.country}`)
        setVisible(false)
        props.onCityChange(city)
    }


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (!containerRef.current?.contains(event.target as Node)) {
            setVisible(false)
        }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])


    return (
        <div className="relative" ref={containerRef}>
            <Label htmlFor="city-selector" className="flex items-center gap-2 mb-2">
                {props.label}
            </Label>
            <Input 
                placeholder={props.placeholder} 
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => {inputValue && setVisible(true)}}
                className="w-full"
            />
        
            {isVisible && inputValue  && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-48 overflow-y-auto">
                {cities.map((city) => (
                    <div
                    key={city.id}
                    className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-b-0"
                    onClick={() => handleSelect(city)}
                    >
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{city.name}</div>
                        <div className="text-sm text-gray-500 truncate">{city.country}</div>
                    </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    )
}