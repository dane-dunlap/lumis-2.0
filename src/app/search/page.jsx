'use client'
import { useState,useEffect, useCallback } from "react"
import { Input } from "../../../@/components/ui/input";
import { Button } from "../../../@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from "../../../@/components/ui/label";
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
import { checkAndInsertApp } from "../../../@/utils/createApp";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { BellRing } from 'lucide-react';
import Link from 'next/link'





export default function SearchPage(){
    const supabase = createClientComponentClient()
    const [apps,setApps] = useState([]);
    const [error,setError] = useState(null);
    const [appName,setAppName] = useState();

    
  


    const handleSubmit = async (event) => {        
        event.preventDefault();
        try {
            const response = await fetch(`/api/follow_app?term=${encodeURIComponent(appName)}`)
            const data = await response.json();

            if (response.ok) {
                setApps(data);
            }
            else {
                setError(data.error);
            }
        }
        catch (err) {
            setError(err.message);

        }

    };

    const handleCreateAlert = async (app) => {
       
        
        try {
            const appData = {
                id:app.id,
                title:app.title,
                developer:app.developer,
                release_notes:app.releaseNotes,
                current_version:app.version,
                app_store_url:app.url
            }
            await checkAndInsertApp(appData)

            const { data: { user } } = await supabase.auth.getUser()

            const {data, error} = await supabase
            .from("alerts")
            .insert([{user_id:user.id,app_id:app.id}])
            .single();

            if (error) throw error;
            console.log("Alert created",data)
            fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  to: user.email,
                  subject: app.title,
                  text: app.releaseNotes,
                }),
              })
              .then(response => response.json())
              .then(data => {
                // Handle the response
              })
              .catch(error => {
                // Handle any errors
              });

            
        } catch (error) {
            setError(error.message)
        }

    }
    return (
        <div className="mt-4">

            <div className="mt-8 flex justify-center">
                <form onSubmit={handleSubmit} className="mx-4 sm:mx-10 md:mx-20 lg:mx-40 mt-6 w-full max-w-lg flex flex-col items-center gap-4">
                    
                <h1 className="text-2xl font-semibold tracking-tight">
                        Create an alert
                         </h1>
                        <p className="text-sm text-muted-foreground text-center">Create an alert for any app on the app store and get emailed the release notes every time they publish a new version of their app</p>
                        <Input
                            id="appName"
                            value={appName}
                            placeholder="Enter app name"
                            onChange={(e) => setAppName(e.target.value)}
                            className="w-full sm:w-lg shadow-sm block sm:text-sm rounded-md"
                        />
                        <Button type="submit">
                            Search
                        </Button>
                </form>
            </div>
            <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-40 mt-6">
    <ul role="list" className="divide-y divide-gray-100">
        {apps.map((app) => (
            <li key={app.app_id} className="py-5">
                {/* Image, Title, and Release Notes */}
                <div className="flex flex-col sm:flex-row justify-between">
                    <div className="flex flex-col sm:flex-row items-start gap-x-4">
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50 mb-2 sm:mb-0" src={app.icon} alt="" />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{app.title}</p>
                            <p className="mt-1 text-xs leading-5 text-gray-500 max-w-[700px]">{app.releaseNotes}</p>
                        </div>
                    </div>

                    {/* Buttons: Create Alert and Check Reviews */}
                    <div className="flex flex-row gap-x-4 sm:flex-col mt-2 sm:mt-0">

                    <AlertDialog>
                        <AlertDialogTrigger><p className="text-sm leading-6 text-gray-900 underline font-semibold">Create Alert</p></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Set up an alert for {app.title}?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You will be sent an email with release notes every time they release a new version of their app
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleCreateAlert(app)}>Create Alert</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                        <p className="text-sm leading-6 text-gray-900 underline">Check Reviews</p>


                        
                    </div>
                </div>
            </li>
        ))}
    </ul>
</div>

        </div>
                    );
}


