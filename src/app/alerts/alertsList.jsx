
// I need to create a react function
//Within this function I need to declare a useEffect function for fetching a users alerts
//I also need to define Use State variables for the different data points that I am looking to display for each alert
//I need to loop through each 

//from each alert a user has
//we need to grab the app name
//most recent version
//last release notes
//created at date
//app developer

'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect,useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function AlertsList({ session }){
    const supabase = createClientComponentClient()
    const user = session?.user
    const [alerts,setAlerts] = useState([]);
    console.log(user)

    useEffect(()=>{
        async function fetchAlerts(){
            if (user) {
                let { data: userAlerts, error: alertsError } = await supabase
                    .from('alerts')
                    .select("*")
                    .eq("user_id", user.id);

                    console.log(userAlerts)


                if (!alertsError && userAlerts) {
                    // Extract app IDs from alerts
                    const appIds = userAlerts.map(alert => alert.app_id);

                    // Fetch app data for all these IDs
                    let { data: appsData, error: appsError } = await supabase
                        .from('apps')
                        .select("*")
                        .in('app_id', appIds);

                        console.log(appsData)

                    if (!appsError) {
                        // Map app data to each alert
                        const combinedData = userAlerts.map(alert => ({
                            ...alert,
                            app: appsData.find(app => app.app_id === alert.app_id)
                        }));

                        setAlerts(combinedData);
                    } else {
                        console.error(appsError);
                    }
                } else {
                    console.error(alertsError);
                }
            }
        }
        fetchAlerts();
    }, [supabase]);

    return (
        <div className="flex flex-col justify-center items-center">
      
            {alerts.map((alert, index) => (
                <div key={index}>
                  
                    

                    <Card className="rounded-2xl mx-auto s:w-[400px] md:w-[800px] lg:max-w-[1000px] mt-6 p-4">
                        <CardTitle className="mt-2">
                        {alert.app?.app_name}
                        </CardTitle>
                        <CardHeader>
                        {alert.app?.current_version}          
                        </CardHeader>
                        <CardContent>
                        {alert.app?.release_notes}
                        
                        <p className="mt-2">Last Sent at: {alert.sent_at}</p>
                        </CardContent>
                        <CardFooter>
                        
                        </CardFooter>
                    </Card>



                    {/* Add more fields as needed */}
                </div>
            ))}
        </div>
    );
}