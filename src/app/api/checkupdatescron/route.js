import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
    if (req.method === 'GET') {
        try {
            const response = await fetch("http://localhost:3000/api/checkforupdates", {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                }
            });

            // If the status code is successful, return a success response
            if (response.ok) {
                return NextResponse.json({ status: 'success' }, { status: 200 });
            } else {
                // If there was an error with the request, return the error status code
                return NextResponse.json({ error: 'Error from checkforupdates API' }, { status: response.status });
            }
        }
        catch (error) {
            console.error("Error in cron api:", error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }
    else {
        return NextResponse.rewrite(new URL('/404', req.url));
    }
}
