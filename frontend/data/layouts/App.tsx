import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const App: FC = () => {
  const cars = [
    {
      id: 1,
      brand: "Toyota",
      model: "Camry",
      year: 2023,
      price: 35000,
      rentalPrice: 120,
      image: "/car1.jpg",
      type: "sedan",
      transmission: "automatic"
    },
    {
      id: 2,
      brand: "BMW",
      model: "X5",
      year: 2024,
      price: 65000,
      rentalPrice: 250,
      image: "/car2.jpg",
      type: "suv",
      transmission: "automatic"
    },
    {
      id: 3,
      brand: "Honda",
      model: "Civic",
      year: 2023,
      price: 28000,
      rentalPrice: 90,
      image: "/car3.jpg",
      type: "sedan",
      transmission: "manual"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full"></div>
              <span className="text-xl font-bold">AutoRent</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-sm font-medium hover:text-primary">Каталог</a>
              <a href="#" className="text-sm font-medium hover:text-primary">Аренда</a>
              <a href="#" className="text-sm font-medium hover:text-primary">Покупка</a>
              <a href="#" className="text-sm font-medium hover:text-primary">О нас</a>
              <a href="#" className="text-sm font-medium hover:text-primary">Контакты</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Войти</Button>
              <Button>Регистрация</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary to-primary/90 text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Найдите свой идеальный автомобиль
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Арендуйте или купите автомобиль мечты по лучшим ценам
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Input 
              placeholder="Марка, модель или ключевое слово..." 
              className="bg-background text-foreground"
            />
            <Button size="lg" variant="secondary">
              Найти автомобиль
            </Button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Тип кузова" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="sedan">Седан</SelectItem>
                  <SelectItem value="suv">Внедорожник</SelectItem>
                  <SelectItem value="coupe">Купе</SelectItem>
                  <SelectItem value="hatchback">Хэтчбек</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Коробка передач" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="automatic">Автомат</SelectItem>
                  <SelectItem value="manual">Механика</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Цена" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любая</SelectItem>
                  <SelectItem value="low">До 100,000 ₽</SelectItem>
                  <SelectItem value="medium">100,000 - 300,000 ₽</SelectItem>
                  <SelectItem value="high">От 300,000 ₽</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="sort">Сортировка:</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="По популярности" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По популярности</SelectItem>
                  <SelectItem value="price-low">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-high">Цена: по убыванию</SelectItem>
                  <SelectItem value="year">По году выпуска</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="rent" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="rent">Аренда автомобилей</TabsTrigger>
            <TabsTrigger value="buy">Покупка автомобилей</TabsTrigger>
          </TabsList>

          <TabsContent value="rent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <Card key={car.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <div className="text-muted-foreground">Изображение {car.brand} {car.model}</div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{car.brand} {car.model}</CardTitle>
                        <CardDescription>{car.year} год • {car.transmission === 'automatic' ? 'Автомат' : 'Механика'}</CardDescription>
                      </div>
                      <Badge variant="secondary">{car.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Стоимость аренды:</span>
                        <span className="font-semibold">{car.rentalPrice} ₽/день</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Стоимость покупки:</span>
                        <span className="font-semibold">{car.price.toLocaleString()} ₽</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="flex-1" variant="outline">
                      Подробнее
                    </Button>
                    <Button className="flex-1">
                      Арендовать
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="buy">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <Card key={car.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <div className="text-muted-foreground">Изображение {car.brand} {car.model}</div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{car.brand} {car.model}</CardTitle>
                        <CardDescription>{car.year} год • {car.transmission === 'automatic' ? 'Автомат' : 'Механика'}</CardDescription>
                      </div>
                      <Badge variant="secondary">{car.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Цена:</span>
                        <span className="font-bold text-primary">{car.price.toLocaleString()} ₽</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="flex-1" variant="outline">
                      Подробнее
                    </Button>
                    <Button className="flex-1">
                      Купить
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">AutoRent</h3>
              <p className="text-muted-foreground">
                Лучший выбор автомобилей для аренды и покупки по выгодным ценам.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Аренда авто</a></li>
                <li><a href="#" className="hover:text-foreground">Покупка авто</a></li>
                <li><a href="#" className="hover:text-foreground">Trade-in</a></li>
                <li><a href="#" className="hover:text-foreground">Страхование</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>+7 (999) 123-45-67</li>
                <li>info@autorent.ru</li>
                <li>Москва, ул. Примерная, 123</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Подписка</h4>
              <div className="flex space-x-2">
                <Input placeholder="Ваш email" />
                <Button>Подписаться</Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AutoRent. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};