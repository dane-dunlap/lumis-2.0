import { NextRequest, NextResponse } from 'next/server';


export async function GET(req) {
    if (req.method === 'GET') {
        try {
            const url = 'http://localhost:3000/api/checkforupdates';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Log the raw response for debugging
            const rawResponse = await response.text();
            console.log("Raw response from checkforupdates:", rawResponse);

            if (response.ok && rawResponse) {
                const responseData = JSON.parse(rawResponse);
                return new NextResponse(JSON.stringify(responseData), { status: response.status });
            } else {
                return new NextResponse(JSON.stringify({ error: 'Invalid response from checkforupdates' }), { status: 500 });
            }
        } catch (error) {
            console.error('Error in GET API:', error);
            return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
        }
    } else {
        return new NextResponse(null, { status: 405 });
    }
}
