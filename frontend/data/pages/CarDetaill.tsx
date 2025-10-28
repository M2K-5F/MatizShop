import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Star, Heart, Share2, MapPin, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Тип для автомобиля
interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  rentalPrice: number;
  image: string;
  type: string;
  transmission: string;
  fuel: string;
  seats: number;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  available: boolean;
}

export const CarDetailPage: FC = () => {
  const { carId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState("1");

  // Заглушка - в реальном приложении данные будут приходить из API
  const car: Car = {
    id: Number(carId),
    brand: "BMW",
    model: "X5 xDrive40i",
    year: 2024,
    price: 6500000,
    rentalPrice: 15000,
    image: "/car-bmw-x5.jpg",
    type: "suv",
    transmission: "automatic",
    fuel: "petrol",
    seats: 5,
    location: "Москва, Центральный офис",
    rating: 4.8,
    reviews: 127,
    description: "BMW X5 xDrive40i - это премиальный внедорожник, сочетающий в себе роскошь, производительность и передовые технологии.",
    available: true
  };

  const similarCars: Car[] = [
    {
      id: 2,
      brand: "Mercedes",
      model: "GLE 450",
      year: 2024,
      price: 6200000,
      rentalPrice: 14500,
      image: "/car-mercedes-gle.jpg",
      type: "suv",
      transmission: "automatic",
      fuel: "petrol",
      seats: 5,
      location: "Москва",
      rating: 4.7,
      reviews: 89,
      description: "",
      available: true
    },
    {
      id: 3,
      brand: "Audi",
      model: "Q7",
      year: 2023,
      price: 5800000,
      rentalPrice: 13500,
      image: "/car-audi-q7.jpg",
      type: "suv",
      transmission: "automatic",
      fuel: "diesel",
      seats: 7,
      location: "Москва",
      rating: 4.6,
      reviews: 67,
      description: "",
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Левая колонка - Изображение и описание */}
          <div>
            {/* Основное изображение */}
            <div className="aspect-[4/3] bg-muted rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-2xl mb-2">{car.brand} {car.model}</div>
                <div>Изображение автомобиля</div>
              </div>
            </div>

            {/* Информация о автомобиле */}
            <Card>
              <CardHeader>
                <CardTitle>Описание</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{car.description}</p>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Тип кузова:</span>
                    <span className="ml-2 font-medium">{car.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Коробка:</span>
                    <span className="ml-2 font-medium">
                      {car.transmission === 'automatic' ? 'Автомат' : 'Механика'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Топливо:</span>
                    <span className="ml-2 font-medium">
                      {car.fuel === 'petrol' ? 'Бензин' : car.fuel === 'diesel' ? 'Дизель' : 'Электро'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Мест:</span>
                    <span className="ml-2 font-medium">{car.seats}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Год:</span>
                    <span className="ml-2 font-medium">{car.year}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Состояние:</span>
                    <span className="ml-2 font-medium">
                      {car.available ? 'Доступен' : 'Не доступен'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Правая колонка - Информация и действия */}
          <div className="space-y-6">
            {/* Заголовок и рейтинг */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold">{car.brand} {car.model}</h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{car.rating}</span>
                      <span className="text-muted-foreground">({car.reviews} отзывов)</span>
                    </div>
                    <Badge variant="outline">{car.year} год</Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>

              <div className="flex items-center space-x-1 text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" />
                <span>{car.location}</span>
              </div>
            </div>

            {/* Карточка аренды/покупки */}
            <Card>
              <CardHeader>
                <CardTitle>Варианты получения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Аренда */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Аренда</h3>
                      <p className="text-sm text-muted-foreground">От {car.rentalPrice.toLocaleString()} ₽/день</p>
                    </div>
                    <Badge variant="secondary">Популярно</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Период аренды</span>
                    </div>
                    <Select value={rentalPeriod} onValueChange={setRentalPeriod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 день</SelectItem>
                        <SelectItem value="3">3 дня</SelectItem>
                        <SelectItem value="7">7 дней</SelectItem>
                        <SelectItem value="30">30 дней</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Итого за аренду:</span>
                    <span>{(car.rentalPrice * parseInt(rentalPeriod)).toLocaleString()} ₽</span>
                  </div>

                  <Button className="w-full" size="lg">
                    Арендовать сейчас
                  </Button>
                </div>

                <Separator />

                {/* Покупка */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Покупка</h3>
                    <p className="text-sm text-muted-foreground">Полная стоимость автомобиля</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-2xl font-bold">
                    <span>Цена:</span>
                    <span className="text-primary">{car.price.toLocaleString()} ₽</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full">
                      Рассчитать кредит
                    </Button>
                    <Button variant="outline" className="w-full">
                      Trade-in
                    </Button>
                  </div>

                  <Button variant="secondary" className="w-full" size="lg">
                    Купить сейчас
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Похожие автомобили */}
            <Card>
              <CardHeader>
                <CardTitle>Похожие автомобили</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {similarCars.map((similarCar) => (
                    <div key={similarCar.id} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                        <span className="text-xs text-center">{similarCar.brand}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{similarCar.brand} {similarCar.model}</div>
                        <div className="text-sm text-muted-foreground">
                          {similarCar.year} • {similarCar.transmission === 'automatic' ? 'Автомат' : 'Механика'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{similarCar.rentalPrice.toLocaleString()} ₽/день</div>
                        <div className="text-sm text-muted-foreground">{similarCar.price.toLocaleString()} ₽</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};