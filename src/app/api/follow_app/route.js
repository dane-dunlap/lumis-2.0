

var store = require('app-store-scraper');


import { NextRequest, NextResponse } from 'next/server'
 
export async function GET(request,params) {
    const {searchParams} = new URL(request.url);
    const term = searchParams.get('term');
    console.log(term)

    const results = await store.search({
        term: term,
        num: 10,
        page: 1
    })
    
    return NextResponse.json(results,{status:201})
}
