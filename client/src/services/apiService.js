import { fetchData } from './api';

const apiService = {
    getAll: (resource, queryParams = "") => {
        return fetchData(`/${resource}${queryParams}`);
    },

    getById: (resource, id) => {
        return fetchData(`/${resource}/${id}`);
    },
    getByUserId: (resource, id) => {
        return fetchData(`/${resource}/users/${id}`);
    },
    getByPostId: (resource, id) => {
        return fetchData(`/${resource}/post/${id}`);
    },
    create: (resource, data) => {
        console.log("creating ");

        return fetchData(`/${resource}`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    update: (resource, id, data) => {
        return fetchData(`/${resource}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    remove: (resource, id) => {
        return fetchData(`/${resource}/${id}`, {
            method: 'DELETE'
        });
    }
};

export default apiService;