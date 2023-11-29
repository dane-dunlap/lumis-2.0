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
import { useToast } from "@/components/ui/use-toast"






export default function SearchPage(){
    const supabase = createClientComponentClient()
    const [apps,setApps] = useState([]);
    const [error,setError] = useState(null);
    const [appName,setAppName] = useState();
    const { toast } = useToast()

    

    
  


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

            if (error){
                toast({title: "Error creating alert",variant:"destructive"})
                throw error;
            } 
            console.log("Alert created",data)
            toast({title: "Alert Successfully Created",description:"You will receive an email with the apps latest release notes"})
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
                <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col items-center gap-4">
                    
                        <h1 className="text-2xl font-semibold tracking-tight">
                        Create an alert
                         </h1>
                        <p className="text-sm text-muted-foreground text-center">Create an alert for any app on the app store and get emailed the release notes every time they publish a new version of their app</p>
                        <Input
                            id="appName"
                            value={appName}
                            placeholder="Search for an app"
                            onChange={(e) => setAppName(e.target.value)}
                            className="w-full sm:w-lg shadow-sm block sm:text-sm rounded-md"
                        />
                        <Button type="submit">
                            Search
                        </Button>
                </form>
            </div>
            <div className="flex justify-center">
                    <div className="mt-6 flex flex-wrap justify-center mx-9">
                        {apps.map(app => (
                            <div key={app.app_id} className="m-3">
                                <Card className="rounded-2xl w-[200px] border-none shadow-none">
                                    <CardHeader>
                                        
                                    </CardHeader>
                                    <AlertDialog>
                                        <AlertDialogTrigger><BellRing /></AlertDialogTrigger>
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
                                    <CardContent>
                                        <img
                                            className="rounded-3xl"
                                            src={app.icon}
                                        />
                                        <CardDescription className="text-sm text-foreground">{app.title}</CardDescription>
                                        <CardDescription className="text-xs text-muted-foreground">{app.developer}</CardDescription>
                                    </CardContent>
                                </Card>
                            </div>
                            
                        ))}
                    </div>
            </div>
        </div>
        );
} 