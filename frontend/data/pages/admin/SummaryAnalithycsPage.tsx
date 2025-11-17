import { getApiService, useApiService } from '@/App';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { AdminStatsResponse } from '@/interfaces/interfaces';
import { useQuery } from '@tanstack/react-query';
import { Users, Plane, Calendar, DollarSign } from 'lucide-react';
import { use, useEffect, useState } from 'react';

export default function AnalyticsDashboard() {
    const service = useApiService()

    const {data: stats = {} as AdminStatsResponse, isLoading} = useQuery({
        queryFn: () => service.getSummaryStats(),
        queryKey: ['admin', 'summary'],
        staleTime: 1000 * 60
    })


    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Пользователи</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.users_count ?? 0}</div>
                    <p className="text-xs text-muted-foreground">
                        Активные пользователи
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Рейсы</CardTitle>
                    <Plane className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.flights_count ?? 0}</div>
                    <p className="text-xs text-muted-foreground">
                        Активные рейсы
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Бронирования</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.tickets_count ?? 0}</div>
                    <p className="text-xs text-muted-foreground">
                        Купленные билеты
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Выручка</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats?.total_revenue.toLocaleString() ?? 0} ₽</div>
                    <p className="text-xs text-muted-foreground">
                        За все время
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}