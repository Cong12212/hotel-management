import axios from '../service/utils/axiosCustomize';


const getAllRooms = (limit) => {
    return axios.get('api/rooms?page=1&limit=5', {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE4MmNkNmQzZGMzYjJmYzEwZTJiMyIsImlhdCI6MTczNDU4MDAyNywiZXhwIjoxNzM0NjY2NDI3fQ.x4TSXt0p9HHNdo-qq8IJYLGi6jwOdtYkhvctL9wxh38`, // Thay YOUR_ACCESS_TOKEN bằng giá trị thật
        },
    });
};
// const postCreateNewRoom = () => {}
export { getAllRooms };