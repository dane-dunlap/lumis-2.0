
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
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../../../@/components/ui/alert-dialog";
import { alertTitleClasses } from "@mui/material";

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



    const deleteAlert = async (alert_id)=> {

        try{
            let { error } = await supabase
            .from('alerts')
            .delete()
            .eq("alert_id",alert_id)

            const index = alerts.findIndex(alert => alert.alert_id ===alert_id)

            const newAlerts = [...alerts.slice(0,index),...alerts.slice(index + 1)]

            setAlerts(newAlerts)
        }
        catch (error)  {
            console.log(error)
        }
    }

    
    return (
        
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold tracking-tight">
            My Alerts
            </h1>
            <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-40 mt-6">
                <ul role="list" className="divide-y divide-gray-100">
                    {alerts.map((alert,index) => (
                        <li key={index} className="py-5">
                            {/* Image, Title, and Release Notes */}
                            <div className="flex flex-col sm:flex-row justify-between">
                                <div className="flex flex-col sm:flex-row items-start gap-x-4">
                                    <a href={alert.app?.app_store_url} target="_blank">
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50 mb-2 sm:mb-0" src={alert.app?.icon} alt="" />
                                    </a>
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6">{alert.app?.app_name}</p>
                                        <p className="mt-1 text-xs leading-5 text-muted-foreground max-w-[700px]">{alert.app?.current_version}</p>
                                        <p className="mt-1 text-xs leading-5 text-muted-foreground max-w-[700px]">{alert.app?.release_notes}</p>
                                    </div>
                                </div>

                                {/* Buttons: Create Alert and Check Reviews */}
                                <div className="flex flex-row gap-x-4 sm:flex-col mt-2 sm:mt-0">
                                <AlertDialog>
                                    <AlertDialogTrigger><p className="text-sm leading-6 underline">Delete Alert</p></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure you want to delete this alert?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                You will no longer receive email updates when this app releases new versions
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction variant="destructive" onClick={()=>deleteAlert(alert.alert_id)}>Delete Alert</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                    
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}