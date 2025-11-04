import { getApiService } from "@/App"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ErrorMessage } from "@/components/ui/error-message"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthForm } from "@/interfaces/interfaces"
import { useUserStore } from "@/stores/useUserStore"
import { use } from "react"
import { Controller, useForm } from "react-hook-form"
import { useParams, useSearchParams } from "react-router-dom"
import { toast } from "sonner"



export const AuthPage = () => {
    const [params, setParams] = useSearchParams()
    const {register, handleSubmit, formState: {errors}, control} = useForm<AuthForm>({
        defaultValues: {
            phone_number: params.get('pn') || '',
            password: params.get('pwd') || ''
        }})
    const userStore = useUserStore()
    const apiService = use(getApiService)

    const handleAuth = (authData: AuthForm) => {
        apiService?.login(authData)
            .then(user => {
                userStore.addUser({
                    username: user.username,
                    phoneNumber: user.phone_number,
                    emailAddress: user.email_address,
                    roles: user.roles,
                    id: user.id,
                    created_at: user.created_at
                })
            })
            .catch(value => {
                switch (value.body) {
                    case ('uncorrect password'): 
                        toast('Неверный пароль')
                        break
                    
                    case 'uncorrect phone':
                        toast('Номер телефона неверен')
                        break
                }
            })
    }


    return(
        <form onSubmit={handleSubmit(handleAuth)}>
            <Card>
                <CardHeader>
                    <CardTitle>Вход в аккаунт</CardTitle>
                    <CardDescription>
                        Введите свои данные для входа в систему
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="login-email">Номер телефона</Label>
                        <Input {...register('phone_number', {
                            required: {
                                value: true,
                                message: 'Вы не ввели номер телефона'
                            },
                            minLength: {
                                value: 11,
                                message: 'Слишком короткий номер'
                            }
                        })}
                        maxLength={11}
                        placeholder="88001001010"/>
                        <ErrorMessage error={errors.phone_number} /> 
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="login-password">Пароль</Label>
                            <Button variant="link" className="p-0 h-auto text-sm">
                            Забыли пароль?
                            </Button>
                        </div>
                        <Input {...register('password', {
                            required: {
                                value: true,
                                message: 'Вы не ввели пароль'
                            }, 
                            minLength: {
                                value: 3,
                                message: "Пароль слишком короткий"
                            }
                        })}
                        maxLength={64}
                        placeholder="password"/>
                        <ErrorMessage error={errors.password} />
                    </div>

                    <div className="flex justify-center gap-2a items-center space-x-2">
                        <Controller
                            name="remember"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                        <Label
                            htmlFor="remember-me"
                            className="text-sm font-medium leading-none"
                        >
                            Запомнить меня
                        </Label>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" size="lg">
                        Войти
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}