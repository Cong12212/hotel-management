import axios from '../service/utils/axiosCustomize';


const getAllRooms = (queryParams) => {
    return axios.get('api/rooms', {
        params: queryParams,
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE4MmNkNmQzZGMzYjJmYzEwZTJiMyIsImlhdCI6MTczNDY3MDAzNywiZXhwIjoxNzM0NzU2NDM3fQ.HMtfXuOxtVj2iQGNRIrgqXgbzlNQDlq_65OGS_xFjes`, // Thay YOUR_ACCESS_TOKEN bằng giá trị thật
        },
    });
};
const postCreateNewRoom = (queryParams) => {
    return axios.get('api/rooms', {
        params: queryParams,
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE4MmNkNmQzZGMzYjJmYzEwZTJiMyIsImlhdCI6MTczNDY3MDAzNywiZXhwIjoxNzM0NzU2NDM3fQ.HMtfXuOxtVj2iQGNRIrgqXgbzlNQDlq_65OGS_xFjes`, // Thay YOUR_ACCESS_TOKEN bằng giá trị thật
        },
    });
}
export { getAllRooms };