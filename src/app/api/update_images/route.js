import { checkforupdates } from '@/utils/checkforupdates';
import { NextRequest, NextResponse } from 'next/server';
import { getAppDetails } from '@/utils/getappdetails'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

export async function POST(req) {
    if (req.method === 'POST') {
        try {
            console.log("api for updating images being hit")
            //gets all apps
            
            let {data, error} = await supabase
            .from('apps')
            .select("*")
            
     
        // loops through each app in db and fetches most recent app data
            for (const app of data) {
                try{
                    const app_details = await getAppDetails(app.app_id)
                    const icon = app_details.icon
                    console.log(app_details.icon)
                    await supabase
                    .from('apps')
                    .update({ icon: icon })
                    .eq('app_id',app.app_id )
                }

                catch (error) {
                    console.error("Error fetching app details for app_id:",app.app_id,error)
                }  

    }
            // Use `new` keyword to create a new instance of NextResponse

            return new NextResponse(JSON.stringify(results), { status: 201 });
        } catch (error) {
            // Handle any errors appropriately
            console.error('Error in POST API:', error);
            return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
        }
    } else {
        // Method Not Allowed
        return new NextResponse(null, { status: 405 });
    }
}
