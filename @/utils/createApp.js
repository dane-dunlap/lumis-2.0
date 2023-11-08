import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()


export async function checkAndInsertApp(appdata) {
    console.log("Function starting");

    try {
        let { data: apps, error: selectError } = await supabase
            .from('apps')
            .select("*")
            .eq('app_id', appdata.id);
    
        console.log('Apps:', apps);

        if (apps.length === 0 && !selectError) {
            let { data: insertData, error: insertError } = await supabase
                .from('apps')
                .insert([{ app_id: appdata.id,
                     app_name: appdata.title,
                     developer:appdata.developer,
                     release_notes:appdata.release_notes,
                    current_version:appdata.current_version,
                app_store_url:appdata.app_store_url }])
                .single();
            
            console.log('Insert data:', insertData);
            if (insertError) {
                console.error('Insert error:', insertError);
                throw insertError; // Throw the error to be caught by the caller
            }
            return insertData;
        } else {
            // If apps is not empty, then the app already exists
            console.log('App already exists in the database.');
            return apps[0]; // Return the existing app
        }
    } catch (error) {
        console.error('Supabase error:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}
