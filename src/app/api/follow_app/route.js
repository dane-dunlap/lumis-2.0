

var store = require('app-store-scraper');


import { NextResponse } from 'next/server'
 
export async function GET() {
    const results = await store.search({
        term: 'Stake',
        num: 10,
        page: 1
    })
    
    return NextResponse.json(results,{status:201})
}
