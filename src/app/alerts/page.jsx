import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import AlertsList from "./alertsList";

export default async function Alerts(){
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore})

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return <AlertsList session={session} />

}