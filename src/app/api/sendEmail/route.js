const sgMail = require('@sendgrid/mail');

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req,params) {
    sgMail.setApiKey(process.env.SENDGRID_KEY);
    const data = await req.json();
    console.log("email api is being hit")
    console.log("Received data:", data);


    const msg = {
        to: data.to,
        from: 'danecooperdunlap@gmail.com',
        subject: `${data.subject} released a new version`,
        text: `Hi there,

        ${data.subject} has just released a new version. Here are the release notes:
        
        ${data.text}
        
        Best regards,
        Lumis`
        };

    try {
        await sgMail.send(msg);
        return new NextResponse(JSON.stringify({ status: "successfully sent email" }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ status: "error", message: err.toString() }), { status: 500 });
    }
}
