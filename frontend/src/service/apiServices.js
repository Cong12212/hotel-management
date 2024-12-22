import axios from '../service/utils/axiosCustomize';


const getAllRooms = (queryParams) => {
    return axios.get('api/rooms', {
        params: queryParams,
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE4MmNkNmQzZGMzYjJmYzEwZTJiMyIsImlhdCI6MTczNDg2MTg2NSwiZXhwIjoxNzM0OTQ4MjY1fQ.8ocTY1VC--mOAa1JkpKmAZBFUQ7RbHpy2fgiZTMunJg`,
        },
    });
};

const getBookings = (queryParams) => {
    return axios.get('api/bookings', {
        params: queryParams,
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE4MmNkNmQzZGMzYjJmYzEwZTJiMyIsImlhdCI6MTczNDg2MTg2NSwiZXhwIjoxNzM0OTQ4MjY1fQ.8ocTY1VC--mOAa1JkpKmAZBFUQ7RbHpy2fgiZTMunJg`,
        },
    });
};

const getInvoices = (queryParams) => {
    return axios.get('api/invoices', {
        params: queryParams,
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE4MmNkNmQzZGMzYjJmYzEwZTJiMyIsImlhdCI6MTczNDg2MTg2NSwiZXhwIjoxNzM0OTQ4MjY1fQ.8ocTY1VC--mOAa1JkpKmAZBFUQ7RbHpy2fgiZTMunJg`,
        },
    });
};

const getAllCustomerTypes = () => {
    return axios.get('api/customer-types', {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE4MmNkNmQzZGMzYjJmYzEwZTJiMyIsImlhdCI6MTczNDg2MTg2NSwiZXhwIjoxNzM0OTQ4MjY1fQ.8ocTY1VC--mOAa1JkpKmAZBFUQ7RbHpy2fgiZTMunJg`,
        },
    });
};

const updateCustomerType = (id, data) => {
    return axios.patch(`api/customer-types/${id}`, data, {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE4MmNkNmQzZGMzYjJmYzEwZTJiMyIsImlhdCI6MTczNDg2MTg2NSwiZXhwIjoxNzM0OTQ4MjY1fQ.8ocTY1VC--mOAa1JkpKmAZBFUQ7RbHpy2fgiZTMunJg`,
        },
    });
};

const createCustomerType = (data) => {
    return axios.post('api/customer-types', data, {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE4MmNkNmQzZGMzYjJmYzEwZTJiMyIsImlhdCI6MTczNDg2MTg2NSwiZXhwIjoxNzM0OTQ4MjY1fQ.8ocTY1VC--mOAa1JkpKmAZBFUQ7RbHpy2fgiZTMunJg`,
        },
    });
};

const deleteCustomerType = (id) => {
    return axios.delete(`api/customer-types/${id}`, {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE4MmNkNmQzZGMzYjJmYzEwZTJiMyIsImlhdCI6MTczNDg2MTg2NSwiZXhwIjoxNzM0OTQ4MjY1fQ.8ocTY1VC--mOAa1JkpKmAZBFUQ7RbHpy2fgiZTMunJg`,
        },
    });
};

export { 
    getAllRooms,
    getBookings,
    getInvoices,
    getAllCustomerTypes,
    updateCustomerType,
    createCustomerType,
    deleteCustomerType
 };