export const apiConfig = { 
    baseUrl: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com', 
    endpoints: { 
        auth: '/auth', 
        booking: '/booking' 
    } 
};