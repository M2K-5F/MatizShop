import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router-dom";

export const ApplicationPage: FC = () => {
  const { carId, type } = useParams();
  const isRental = type === 'rent';

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const car = {
    id: Number(carId),
    brand: "BMW",
    model: "X5",
    price: 6500000,
    rentalPrice: 15000
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Отправка заявки
    console.log("Заявка:", { carId, type, ...formData });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>
              {isRental ? 'Арендовать' : 'Купить'} {car.brand} {car.model}
            </CardTitle>
            <CardDescription>
              {isRental ? `Аренда: ${car.rentalPrice.toLocaleString()} ₽/день` : `Цена: ${car.price.toLocaleString()} ₽`}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Ваше имя"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  {isRental ? 'Даты и срок аренды' : 'Дополнительная информация'}
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder={
                    isRental 
                      ? "Укажите желаемые даты аренды..." 
                      : "Ваши вопросы или пожелания..."
                  }
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                Отправить заявку
              </Button>
            </form>
          </CardContent>
        </Card>

        <Button 
          variant="ghost" 
          className="w-full mt-4"
        >
          Назад к автомобилю
        </Button>
      </div>
    </div>
  );
};