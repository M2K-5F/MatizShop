import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Upload, X, Car, DollarSign, Calendar } from "lucide-react";

export const AddCarPage: FC = () => {
  const [activeTab, setActiveTab] = useState<"sell" | "rent">("sell");
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    // Основная информация
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    vin: "",
    
    // Цены
    price: "",
    rentalPrice: "",
    
    // Характеристики
    type: "",
    transmission: "",
    fuel: "",
    engine: "",
    power: "",
    drive: "",
    seats: "",
    color: "",
    mileage: "",
    
    // Описание
    description: "",
    location: "",
    
    // Настройки
    availableForSale: true,
    availableForRent: false,
    isFeatured: false
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки данных на сервер
    console.log("Данные автомобиля:", formData);
    console.log("Изображения:", images);
  };

  const carTypes = [
    "sedan", "suv", "coupe", "hatchback", "wagon", "convertible", "minivan", "pickup"
  ];

  const transmissions = [
    "automatic", "manual", "robot", "variator"
  ];

  const fuelTypes = [
    "petrol", "diesel", "hybrid", "electric", "gas"
  ];

  const driveTypes = [
    "fwd", "rwd", "awd", "4wd"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full"></div>
              <span className="text-xl font-bold">AutoRent</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-sm font-medium hover:text-primary">Каталог</a>
              <a href="#" className="text-sm font-medium hover:text-primary">Панель управления</a>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Администратор</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Добавить автомобиль</h1>
            <p className="text-muted-foreground mt-2">
              Добавьте новый автомобиль для продажи или аренды
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "sell" | "rent")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="sell" className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Продажа</span>
                </TabsTrigger>
                <TabsTrigger value="rent" className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Аренда</span>
                </TabsTrigger>
              </TabsList>

              {/* Общая информация */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Car className="w-5 h-5" />
                    <span>Основная информация</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Марка *</Label>
                      <Input
                        id="brand"
                        value={formData.brand}
                        onChange={(e) => handleInputChange("brand", e.target.value)}
                        placeholder="Например: BMW"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Модель *</Label>
                      <Input
                        id="model"
                        value={formData.model}
                        onChange={(e) => handleInputChange("model", e.target.value)}
                        placeholder="Например: X5 xDrive40i"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Год выпуска *</Label>
                      <Input
                        id="year"
                        type="number"
                        value={formData.year}
                        onChange={(e) => handleInputChange("year", parseInt(e.target.value))}
                        min={1990}
                        max={new Date().getFullYear() + 1}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mileage">Пробег (км)</Label>
                      <Input
                        id="mileage"
                        value={formData.mileage}
                        onChange={(e) => handleInputChange("mileage", e.target.value)}
                        placeholder="Например: 50000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color">Цвет</Label>
                      <Input
                        id="color"
                        value={formData.color}
                        onChange={(e) => handleInputChange("color", e.target.value)}
                        placeholder="Например: Черный"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vin">VIN номер</Label>
                    <Input
                      id="vin"
                      value={formData.vin}
                      onChange={(e) => handleInputChange("vin", e.target.value)}
                      placeholder="Введите VIN номер автомобиля"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Местоположение *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Например: Москва, Центральный офис"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Характеристики */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Технические характеристики</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Тип кузова</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип кузова" />
                        </SelectTrigger>
                        <SelectContent>
                          {carTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type === "sedan" && "Седан"}
                              {type === "suv" && "Внедорожник"}
                              {type === "coupe" && "Купе"}
                              {type === "hatchback" && "Хэтчбек"}
                              {type === "wagon" && "Универсал"}
                              {type === "convertible" && "Кабриолет"}
                              {type === "minivan" && "Минивэн"}
                              {type === "pickup" && "Пикап"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="transmission">Коробка передач</Label>
                      <Select value={formData.transmission} onValueChange={(value) => handleInputChange("transmission", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите коробку передач" />
                        </SelectTrigger>
                        <SelectContent>
                          {transmissions.map(transmission => (
                            <SelectItem key={transmission} value={transmission}>
                              {transmission === "automatic" && "Автоматическая"}
                              {transmission === "manual" && "Механическая"}
                              {transmission === "robot" && "Роботизированная"}
                              {transmission === "variator" && "Вариатор"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fuel">Тип топлива</Label>
                      <Select value={formData.fuel} onValueChange={(value) => handleInputChange("fuel", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип топлива" />
                        </SelectTrigger>
                        <SelectContent>
                          {fuelTypes.map(fuel => (
                            <SelectItem key={fuel} value={fuel}>
                              {fuel === "petrol" && "Бензин"}
                              {fuel === "diesel" && "Дизель"}
                              {fuel === "hybrid" && "Гибрид"}
                              {fuel === "electric" && "Электро"}
                              {fuel === "gas" && "Газ"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="drive">Привод</Label>
                      <Select value={formData.drive} onValueChange={(value) => handleInputChange("drive", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип привода" />
                        </SelectTrigger>
                        <SelectContent>
                          {driveTypes.map(drive => (
                            <SelectItem key={drive} value={drive}>
                              {drive === "fwd" && "Передний"}
                              {drive === "rwd" && "Задний"}
                              {drive === "awd" && "Полный"}
                              {drive === "4wd" && "4WD"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="engine">Двигатель</Label>
                      <Input
                        id="engine"
                        value={formData.engine}
                        onChange={(e) => handleInputChange("engine", e.target.value)}
                        placeholder="Например: 2.0L Turbo"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="power">Мощность (л.с.)</Label>
                      <Input
                        id="power"
                        value={formData.power}
                        onChange={(e) => handleInputChange("power", e.target.value)}
                        placeholder="Например: 249"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seats">Количество мест</Label>
                      <Input
                        id="seats"
                        type="number"
                        value={formData.seats}
                        onChange={(e) => handleInputChange("seats", e.target.value)}
                        min={2}
                        max={9}
                        placeholder="Например: 5"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Цены */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Цены</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="availableForSale" className="font-semibold">
                          Доступен для продажи
                        </Label>
                        <Switch
                          checked={formData.availableForSale}
                          onCheckedChange={(checked) => handleInputChange("availableForSale", checked)}
                        />
                      </div>
                      
                      {formData.availableForSale && (
                        <div className="space-y-2">
                          <Label htmlFor="price">Цена продажи (₽) *</Label>
                          <Input
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleInputChange("price", e.target.value)}
                            placeholder="Например: 6500000"
                            required={formData.availableForSale}
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="availableForRent" className="font-semibold">
                          Доступен для аренды
                        </Label>
                        <Switch
                          checked={formData.availableForRent}
                          onCheckedChange={(checked) => handleInputChange("availableForRent", checked)}
                        />
                      </div>
                      
                      {formData.availableForRent && (
                        <div className="space-y-2">
                          <Label htmlFor="rentalPrice">Цена аренды (₽/день) *</Label>
                          <Input
                            id="rentalPrice"
                            type="number"
                            value={formData.rentalPrice}
                            onChange={(e) => handleInputChange("rentalPrice", e.target.value)}
                            placeholder="Например: 15000"
                            required={formData.availableForRent}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Изображения */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Изображения автомобиля</CardTitle>
                  <CardDescription>
                    Загрузите качественные фотографии автомобиля. Первое изображение будет основным.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <Label htmlFor="images" className="cursor-pointer">
                        <span className="font-semibold text-primary">Нажмите для загрузки</span>
                        <span className="text-muted-foreground"> или перетащите файлы</span>
                      </Label>
                      <Input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        PNG, JPG, JPEG до 10MB каждое
                      </p>
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 w-6 h-6"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Описание */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Описание</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="description">Описание автомобиля *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Опишите автомобиль, его особенности, состояние, историю обслуживания..."
                      rows={5}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Настройки */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Дополнительные настройки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="isFeatured" className="font-semibold">
                        Выделить автомобиль
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Показывать автомобиль в рекомендованных
                      </p>
                    </div>
                    <Switch
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </Tabs>

            {/* Кнопки отправки */}
            <div className="flex space-x-4">
              <Button type="button" variant="outline" className="flex-1">
                Отменить
              </Button>
              <Button type="submit" className="flex-1" size="lg">
                Добавить автомобиль
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};