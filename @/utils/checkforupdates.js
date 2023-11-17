
import { createClient } from '@supabase/supabase-js'
import { getAppDetails } from './getappdetails'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

export async function checkforupdates(){


    let {data, error} = await supabase
    .from('apps')
    .select("*")

    let appsWithNewVersions = {};

    for (const app of data) {
        const app_details = await getAppDetails(app.app_id)
        if (app_details.version != app.current_version){
            appsWithNewVersions[app.app_id] = app_details.version;
        }
        
    }

    for (const app_id in appsWithNewVersions){
        //we first need to get all the app data with the associated app ids
        let {data:app_data,error:appError} = await supabase
        .from('apps')
        .select('app_name,release_notes')
        .eq('app_id',app_id)
        .single();

        const appTitle = app_data.app_name;
        const release_notes = app_data.release_notes;
        const current_version = app_data.current_version;
        const id = app_data.app_id
      


        //then we need to get all of the alerts associated with those apps
        let {data:alerts,error} = await supabase
        .from('alerts')
        .select("*")
        .eq("app_id",app_id)
        

        for (const alert of alerts){
            //we first need to get all the user's email that is associated with this alert
        
            let {data:profile,error} = await supabase
            .from('profiles')
            .select('email')
            .eq('id', alert.user_id)
            .single() 


            try {
                const response = await fetch(`${baseUrl}/api/sendEmail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: profile.email,
                        subject: appTitle,
                        text: release_notes,
                    }),
                });
            
                const responseData = await response.json();
                console.log("email rsponse data:", responseData);
                //update the last_sent here
                //then update the app table with the most recent release
                console.log(app_data.current_version)
                const { data:updated_version, error } = await supabase
                .from('apps')
                .update({ current_version: app_data.current_version })
                .eq('app_id',app_data.app_id )
                

            } catch (error) {
                console.error("Error sending email for app_id:", app_id, error);
            }

        }
        
    }
    

}


