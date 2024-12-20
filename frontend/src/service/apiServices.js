import axios from '../service/utils/axiosCustomize';


const getAllRooms = (queryParams) => {
    return axios.get('api/rooms', {
        params: queryParams,
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE4MmNkNmQzZGMzYjJmYzEwZTJiMyIsImlhdCI6MTczNDY4ODMwMCwiZXhwIjoxNzM0Nzc0NzAwfQ.wTbsk9HPxljPVSrlByTLhEvGjq6VcZr4cZJVmQBWR7Y`,
        },
    });
};

const getBookings = (queryParams) => {
    return axios.get('api/bookings', {
        params: queryParams,
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE4MmNkNmQzZGMzYjJmYzEwZTJiMyIsImlhdCI6MTczNDY4ODMwMCwiZXhwIjoxNzM0Nzc0NzAwfQ.wTbsk9HPxljPVSrlByTLhEvGjq6VcZr4cZJVmQBWR7Y`,
        },
    });
};

const getInvoices = (queryParams) => {
    return axios.get('api/invoices', {
        params: queryParams,
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE4MmNkNmQzZGMzYjJmYzEwZTJiMyIsImlhdCI6MTczNDY4ODMwMCwiZXhwIjoxNzM0Nzc0NzAwfQ.wTbsk9HPxljPVSrlByTLhEvGjq6VcZr4cZJVmQBWR7Y`,
        },
    });
};


export { 
    getAllRooms,
    getBookings,
    getInvoices
 };