'use client'
import { useState,useEffect } from "react"
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


export default function SearchPage(){
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
        } catch (error) {
            setError(error.message)
        }

    }
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit}>
                <Label htmlFor="appName">Search for an app</Label>
                <Input
                id="appName"
                value={appName}
                placeholder ="Enter app name"
                onChange={(e)=> setAppName(e.target.value)}
                className = "w-[200px]"
                />
                <Button type ="submit">Search</Button>
            </form>
        
           
            <div className="flex flex-wrap justify-start">
            {apps.map(app =>(
                <Card className="m-3 rounded-2xl w-[200px] border-none shadow-none">
                    <CardHeader>
                    </CardHeader>
                    <CardContent>
                    <img
                        className="rounded-3xl"
                        src = {app.icon}
                        />
                   
                    <CardDescription className="text-sm text-foreground">{app.title}</CardDescription>
                    <CardDescription className="text-xs text-muted-foreground">{app.developer}</CardDescription>
                    <AlertDialog>
                <AlertDialogTrigger>Set up alert</AlertDialogTrigger>
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
                    </CardContent>
                   
                </Card>
                
        
            ))}
            
            </div>
        </div>
    )

}


