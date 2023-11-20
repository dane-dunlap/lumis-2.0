
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
import { useEffect } from "react"

export default function alertsList(){
    const supabase = createClientComponentClient()
    const user = session?.user
    
    async function fetchAlerts(){
        useEffect(() => {
            let {data:alerts,error}= supabase
            .from('alerts')
            .select("*")
            .eq("user_id",user.id)

            for (const alert of alerts){
                let {data:app,error} = supabase
                .from('apps')
                .select("*")
                .eq()

            }

        })

    }

}