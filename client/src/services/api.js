const BASE_URL = 'http://localhost:3000/api'; 

export const fetchData = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Something went wrong');
        }

        return await response.json();
    } catch (err) {
        console.error("API Error:", err.message);
        throw err;
    }
};