import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { options } from '../api/auth/[...nextauth]/options'
export const dynamic = "force-dynamic"

export default async function Profile() {
    //get profile data here??? TODO
    const session = await getServerSession(options);
    if (!session) redirect('/login');
    console.log(session.user)
    redirect('/profile/listings')
}