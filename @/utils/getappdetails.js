var store = require('app-store-scraper');

export async function getAppDetails(appId) {
    try {
        const result = await store.app({ id: appId });
        return result;
    } catch (error) {
        console.error('Error fetching app details:', error);
       
    }
}



