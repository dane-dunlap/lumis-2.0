
import { createClient } from '@supabase/supabase-js'
import { getAppDetails } from './getappdetails'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

export async function checkforupdates(){

//gets all apps
    let {data, error} = await supabase
    .from('apps')
    .select("*")
//creates an empty dictionary
    let appsWithNewVersions = {};
// loops through each app in db and fetches most recent app data
    for (const app of data) {
        const app_details = await getAppDetails(app.app_id)
        if (app_details.version != app.current_version){
            appsWithNewVersions[app.app_id] = app_details.version;
            await supabase
            .from('apps')
            .update({ current_version: app_details.version })
            .eq('app_id',app.app_id )
        }
        
    }

    for (const app_id in appsWithNewVersions){
        //we first need to get all the app data with the associated app ids
        let {data:app_data,error:appError} = await supabase
        .from('apps')
        .select('*')
        .eq('app_id',app_id)
        .single();

        const appTitle = app_data.app_name;
        const release_notes = app_data.release_notes;
      


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
                
               await supabase
               .from('alerts')
               .update({ sent_at: new Date().toISOString() })
               .eq('alert_id',alert.alert_id)

                

                

            } catch (error) {
                console.error("Error sending email for app_id:", app_id, error);
            }

        }
        
        
    }
    
    return appsWithNewVersions || {};



}


