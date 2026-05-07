import apiService from './apiService';

const authService = {
    login: async (username, password) => {
        try {
            const user = await apiService.create('login', { username, password });

            if (user) {
                localStorage.setItem("current-user", JSON.stringify(user));
            }
            
            return user;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem("current-user");
    },

    getCurrentUser: () => {
        const user = localStorage.getItem("current-user");
        return user ? JSON.parse(user) : null;
    }
};

export default authService;