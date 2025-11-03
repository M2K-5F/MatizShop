import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {ErrorMessage} from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegistrationForm } from "@/interfaces/interfaces";
import { useForm } from "react-hook-form";



export const RegistrationPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<RegistrationForm>()


    return(
        <form onSubmit={handleSubmit((d) => console.log(d))}>
            <Card>
                <CardHeader>
                    <CardTitle>Создать аккаунт</CardTitle>
                    <CardDescription>
                        Заполните форму для создания нового аккаунта
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="first-name">Имя пользователя</Label>
                        <Input 
                        {...register('username', {
                            minLength: {
                                value: 3,
                                message: 'Имя слишком короткое'
                            },
                            required: {
                                value: true, 
                                message: 'Вы не заполнили имя'
                            }
                        })} 
                        placeholder="Иван" 
                        maxLength={128}/>
                        <ErrorMessage error={errors.username} />
                    </div>
                        
                    <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input {...register('email_address', {
                            minLength: {
                                value: 10,
                                message: 'Адрес слишком короткий'
                            },
                            required: {
                                value: true, 
                                message: 'Вы не заполнили адрес'
                            }
                        })} 
                        type="email" 
                        placeholder="example@gmail.com"
                        maxLength={64}/>
                        <ErrorMessage error={errors.email_address} />
                    </div>
                        
                    <div className="space-y-2">
                        <Label htmlFor="register-phone">Телефон</Label>
                        <Input {...register('phone_number', {
                            minLength: {
                                value: 11,
                                message: 'Некорректный номер'
                            },
                            required: {
                                value: true, 
                                message: 'Вы не указали номер телефона'
                            }
                        })}
                        placeholder="88001001010"
                        maxLength={11}/>
                        <ErrorMessage error={errors.phone_number} />
                    </div>
                        
                    <div className="space-y-2">
                        <Label htmlFor="register-password">Пароль</Label>
                        <Input {...register('password', {
                            minLength: {
                                value: 4,
                                message: 'Пароль должен быть длиннее 4 символов'
                            },
                            required: {
                                value: true, 
                                message: 'Вы не заполнили пароль'
                            }
                        })} 
                        placeholder="password"
                        maxLength={64}/>
                        <ErrorMessage error={errors.password} />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" size="lg">
                        Создать аккаунт
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}
