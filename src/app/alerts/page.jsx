import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import alertsList from "./alertsList";

export default async function Alerts(){
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore})

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return <alertsList session={session} />

}