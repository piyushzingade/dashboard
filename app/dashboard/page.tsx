import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const userId = session?.user

    if (!userId) {
        return redirect('/auth/sign-in');
    } else {
        redirect('/dashboard/overview');
    }
}