import axios from 'axios';

const API_BASE_URL = 'http://universities.hipolabs.com/search';

export const searchUniversitiesByName = async (name: string) => {
    
    const response = await axios.get(API_BASE_URL, {
        params: { name },
    });
    return response.data;
};

export const searchUniversitiesByCountry = async (country: string) => {

    const response = await axios.get(API_BASE_URL, {
        params: { country },
    });
    return response.data;
};
