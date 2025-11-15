import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription
} from '@/components/ui/card';

const salesData = [
    {
        name: 'Emma Johnson',
        email: 'emma.johnson@email.com',
        avatar: 'https://api.slingacademy.com/public/sample-users/1.png',
        fallback: 'EJ',
        amount: '+$2,500.00'
    },
    {
        name: 'Liam Smith',
        email: 'liam.smith@email.com',
        avatar: 'https://api.slingacademy.com/public/sample-users/2.png',
        fallback: 'LS',
        amount: '+$150.00'
    },
    {
        name: 'Ava Brown',
        email: 'ava.brown@email.com',
        avatar: 'https://api.slingacademy.com/public/sample-users/3.png',
        fallback: 'AB',
        amount: '+$450.00'
    },
    {
        name: 'Noah Wilson',
        email: 'noah.wilson@email.com',
        avatar: 'https://api.slingacademy.com/public/sample-users/4.png',
        fallback: 'NW',
        amount: '+$75.00'
    },
    {
        name: 'Sophia Taylor',
        email: 'sophia.taylor@email.com',
        avatar: 'https://api.slingacademy.com/public/sample-users/5.png',
        fallback: 'ST',
        amount: '+$320.00'
    },
    {
        name: 'Mason Anderson',
        email: 'mason.anderson@email.com',
        avatar: 'https://api.slingacademy.com/public/sample-users/6.png',
        fallback: 'MA',
        amount: '+$180.00'
    },
    {
        name: 'Isabella Thomas',
        email: 'isabella.thomas@email.com',
        avatar: 'https://api.slingacademy.com/public/sample-users/7.png',
        fallback: 'IT',
        amount: '+$90.00'
    },
    {
        name: 'Ethan Garcia',
        email: 'ethan.garcia@email.com',
        avatar: 'https://api.slingacademy.com/public/sample-users/8.png',
        fallback: 'EG',
        amount: '+$600.00'
    },
];

export function RecentSales() {
    return (
        <Card className=''>
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='space-y-8'>
                    {salesData.map((sale, index) => (
                        <div key={index} className='flex items-center'>
                            <Avatar className='h-8 w-8'>
                                <AvatarImage src={sale.avatar} alt='Avatar' />
                                <AvatarFallback>{sale.fallback}</AvatarFallback>
                            </Avatar>
                            <div className='ml-4 space-y-1'>
                                <p className='text-sm leading-none font-medium'>{sale.name}</p>
                                <p className='text-muted-foreground text-sm'>{sale.email}</p>
                            </div>
                            <div className='ml-auto font-medium'>{sale.amount}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}