import { use, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';
import { User } from '@/interfaces/interfaces';
import { getApiService, useApiService } from '@/App';
import { Loader } from '@/components/ui/loader';
import {useQuery} from '@tanstack/react-query'

export default function UsersTable() {
    const service = useApiService()

    const {data: stats = [], isLoading} = useQuery({
        queryFn: () => service.getAdminsStats(),
        queryKey: ['admins'],
        staleTime: 1000 * 60,
    })


    if (isLoading) {
        return <Loader />
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Пользователи</CardTitle>
                        <CardDescription>
                            Управление пользователями системы
                        </CardDescription>
                    </div>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить админа
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Имя пользователя</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Телефон</TableHead>
                        <TableHead>Роли</TableHead>
                        <TableHead>Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {stats.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell className="font-medium">{user.username}</TableCell>
                                <TableCell>{user.email_address}</TableCell>
                                <TableCell>{user.phone_number}</TableCell>
                                <TableCell>
                                {user.roles.map((role) => (
                                    <Badge key={role} variant="secondary" className="mr-1">
                                        {role}
                                    </Badge>
                                ))}
                                </TableCell>

                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}