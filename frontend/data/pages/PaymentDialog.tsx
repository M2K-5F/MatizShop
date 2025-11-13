// components/PaymentDialog.tsx
import { ChangeEvent, Dispatch, SetStateAction, use, useLayoutEffect, useState } from "react"
import { Flight, FlightSeat, GetFlightByIdResponse } from "@/interfaces/interfaces"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CreditCard, User, Shield, Check, LucideLoader2 } from "lucide-react"
import { set, useForm, UseFormReturn } from "react-hook-form"
import { ErrorMessage } from "@/components/ui/error-message"
import { getApiService } from "@/App"

interface PaymentDialogProps {
    selectedSeat: FlightSeat | null
    flightData: GetFlightByIdResponse,
    successCallback: () => void
}

interface CardForm {
    cardNumber: string
    cvc: string
    cardHolder: string
    expiry: string
}


export function PaymentDialog({
    selectedSeat, 
    flightData,
    successCallback
}: PaymentDialogProps) {
    const [open, setOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const service = use(getApiService)

    const handlePurchase = async () => {
        if (!selectedSeat) return
        
        setIsProcessing(true)
        
        try {
            await service?.buyTicket(selectedSeat.seat.id)
            

            setIsSuccess(true)
            setOpen(false)
            setIsProcessing(false)

            setTimeout(() => {
                setIsSuccess(false)
                successCallback()
            }, 3000)

        } catch (error) {
            setIsProcessing(false)
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
                    disabled={!selectedSeat}
                    onClick={() => {
                        setOpen(true)
                    }}
                >
                    Продолжить
                </Button>
            </DialogTrigger>
            
            <PaymentDialogContent 
                selectedSeat={selectedSeat} 
                flightData={flightData} 
                isProcessing={isProcessing} 
                handlePurchase={handlePurchase} 
                setOpen={setOpen}
                open={open}
            />
            <SuccessDialog isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        </Dialog>
    )
}

const PaymentDialogContent = ({
    selectedSeat, flightData, 
    isProcessing, handlePurchase, 
    setOpen, open
}: {
    selectedSeat: FlightSeat | null
    flightData: GetFlightByIdResponse
    isProcessing: boolean
    handlePurchase: () => {},
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
}) => {
    const [paymentMethod, setPaymentMethod] = useState("card")
    const cardForm = useForm<CardForm>({defaultValues: {
        cvc: "",
        cardHolder: "",
        cardNumber: "",
        expiry: "",
    }})

    const handleSubmit = cardForm.handleSubmit(() => {handlePurchase()})


    useLayoutEffect(() => {
        if (open) {
            setPaymentMethod('card')
            cardForm.reset()
        }
    }, [open])


    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Оплата билета
                </DialogTitle>

                <DialogDescription>
                    Завершите покупку выбранного места
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="font-semibold">{flightData.flight.tag}</div>
                                <div className="text-sm text-gray-600">
                                    {flightData.flight.departure.code} → {flightData.flight.arrival.code}
                                </div>
                            </div>
                            <Badge variant="secondary">
                                {selectedSeat?.seat.seat_class === "BUSINESS" ? "Бизнес" : "Эконом"}
                            </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-gray-600">Место</div>
                                <div className="font-semibold">{selectedSeat?.seat.seat_name}</div>
                            </div>
                            <div>
                                <div className="text-gray-600">Стоимость</div>
                                <div className="font-semibold text-green-600">
                                    {selectedSeat?.price.toLocaleString()} ₽
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <Label>Способ оплаты</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                Банковская карта
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="wallet" id="wallet" />
                                <Label htmlFor="wallet" className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Электронный кошелек
                                </Label>
                        </div>
                    </RadioGroup>
                </div>

                {paymentMethod === "card" 
                    ?   <>
                            <form onSubmit={handleSubmit}>
                                <BankCardForm form={cardForm} />
                                <div className="flex items-center gap-2 mt-2 mb-4 text-sm text-gray-600">
                                    <Shield className="w-4 h-4" />
                                    <span>Все данные защищены и передаются по защищенному соединению</span>
                                </div>

                                <DialogFooter className="flex gap-2">
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setOpen(false)}
                                        disabled={isProcessing}
                                    >
                                        Отмена
                                    </Button>

                                    <Button 
                                        disabled={isProcessing}
                                        className="flex-1"
                                        type="submit"
                                    >
                                        {isProcessing 
                                            ?   <>
                                                    <LucideLoader2 className=" animate-spin w-4 h-4 mr-2 rotate-360 transition-all" />
                                                    Обработка...
                                                </>
                                            :   `Оплатить ${selectedSeat?.price.toLocaleString()} ₽`
                                        }
                                    </Button>
                                </DialogFooter>
                            </form>
                        </>
                    :   <DialogFooter className="flex gap-2">
                            <Button 
                                variant="outline" 
                                onClick={() => setOpen(false)}
                                disabled={isProcessing}
                            >
                                Отмена
                            </Button>

                            <Button 
                                onClick={handlePurchase}
                                disabled={isProcessing}
                                className="flex-1"
                                type="submit"
                            >
                                {isProcessing 
                                    ?   <>
                                            <LucideLoader2 className=" animate-spin w-4 h-4 mr-2 rotate-360 transition-all" />
                                            Обработка...
                                        </>
                                    :   `Оплатить ${selectedSeat?.price.toLocaleString()} ₽`
                                }
                            </Button>
                        </DialogFooter>
                }
            </div>
        </DialogContent>
    )
}


const SuccessDialog = ({
    isSuccess, setIsSuccess
}: {
    isSuccess: boolean,
    setIsSuccess: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
            <DialogContent>
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-green-600 mb-2">
                        Оплата прошла успешно!
                    </DialogTitle>
                    <DialogDescription className="text-lg">
                        Ваш билет забронирован. Посадочный талон отправлен на вашу почту.
                    </DialogDescription>
                </div>
            </DialogContent>
        </Dialog>
    )
}


const BankCardForm = ({form}: {form: UseFormReturn<CardForm>}) => {
    const requiredField = {value: true, message: 'Это поле обязательно'}


    const expireInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
            .replace(/\D/g, '')
            .slice(0,4)
            .replace(/(\d{2})(?=\d)/g, '$1/')
        
        form.setValue('expiry', value)
    }


    const cardNumberInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
            .replace(/\D/g, "")
            .slice(0, 16)
            .replace(/(\d{4})(?=\d)/g, '$1 ')
        
        form.setValue('cardNumber', value)
    }


    const cvcHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
            .replace(/\D/, '')
            .slice(0, 3)

            form.setValue('cvc', value)
    }


    const cardholderHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
            .replace(/[а-яёА-ЯЁ]/g, '') 
            .replace(/\d/g, '')
            .replace(/\s+/g, ' ')
            .replace(/^(\S+)\s+(\S+).*$/, '$1 $2')
            .toLocaleUpperCase()
        
        form.setValue('cardHolder', value)
    }



    return(
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="cardNumber">Номер карты</Label>
                    <Input 
                        {...form.register('cardNumber', {
                            required: requiredField,
                            minLength: {
                                value: 16 + 3,
                                message: "Слишком короткий номер"
                            },
                            onChange: cardNumberInputHandler
                        })} 
                        placeholder="1234 5678 9012 3456"
                        maxLength={16 + 3}
                    />
                    <ErrorMessage error={form.formState.errors.cardNumber} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input  
                        {...form.register('cvc', {
                            required: requiredField, 
                            minLength: {
                                value: 3,
                                message: "Слишком короткий cvc"
                            },
                            onChange: cvcHandler
                        })}
                        placeholder="123" 
                        maxLength={3}
                    />
                    <ErrorMessage error={form.formState.errors.cvc} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="expiry">Срок действия</Label>
                    <Input  
                        {...form.register('expiry', {
                            required: requiredField,
                            onChange: expireInputHandler,
                            minLength: {
                                value: 5,
                                message: "Слишком короткое значение"
                            },
                        })}
                        placeholder="ММ/ГГ" 
                    />
                    <ErrorMessage error={form.formState.errors.expiry} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cardholder">Инициалы держателя</Label>
                    <Input {
                        ...form.register('cardHolder', {
                            required: requiredField,
                            onChange: cardholderHandler,
                            minLength: {
                                value: 3,
                                message: "Слишком короткие инициалы"
                            },
                        })} 
                        placeholder="IVAN IVANOV" 
                    />
                    <ErrorMessage error={form.formState.errors.cardHolder} />
                </div>
            </div>
        </div>
    )
}