import { checkforupdates } from '@/utils/checkforupdates';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
    if (req.method === 'POST') {
        try {
            console.log("api for checking updates being hit")
            const results = await checkforupdates();
       
            // Use `new` keyword to create a new instance of NextResponse
            return new NextResponse(JSON.stringify(results), { status: 201 });
        } catch (error) {
            // Handle any errors appropriately
            console.error('Error in POST API:', error);
            return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
        }
    } else {
        // Method Not Allowed
        return new NextResponse(null, { status: 405 });
    }
}
