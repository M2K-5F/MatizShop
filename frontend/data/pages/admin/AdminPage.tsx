import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Plane, Calendar, BarChart3, Settings, MapPlus } from 'lucide-react';

import UsersTable from './Users';
import {FlightsTable} from './FlightsStats';
import AnalyticsDashboard from './Anal';
import { useSearchParams } from 'react-router-dom';
import CreateFlightSection from './CreateFlightPage';

export default function AdminLayout() {
    const [params, setParams] = useSearchParams()
    const activeTab = params.get('tab') ?? 'analytics'

    const setActiveTab = (value: string) => {
        setParams(p => {
            p.set('tab', value)
            return p
        })
    }

    return (
        <div className="h-full bg-gray-50">
            <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 h-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="analytics" className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            Аналитика
                        </TabsTrigger>
                        <TabsTrigger value="users" className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Пользователи
                        </TabsTrigger>
                        <TabsTrigger value="flights" className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Рейсы
                        </TabsTrigger>
                        <TabsTrigger value='create'>
                            <MapPlus />
                            Новый рейс
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="analytics">
                        <AnalyticsDashboard />
                    </TabsContent>

                    <TabsContent value="users">
                        <UsersTable />
                    </TabsContent>

                    <TabsContent value="flights">
                        <FlightsTable />
                    </TabsContent>

                    <TabsContent value="create">
                        <CreateFlightSection />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}