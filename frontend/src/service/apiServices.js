import axios from '../service/utils/axiosCustomize'; // Import axios đã customize
import { jwtDecode } from "jwt-decode"; // Sửa lại import (không có { })

// Hàm gọi API đăng nhập
const logIn = async (data) => {
    return await axios.post('api/users/login', data)
        .then(response => {

            const token = response.data.data.token
            const user = jwtDecode(token)

            return {
                data: {
                    user,
                    token
                }
            }
        })
        .catch(err => {
            return {
                data: null,
                err
            }
        })
}

// Hàm gọi API lấy tất cả phòng
const getAllRooms = async (queryParams) => {
    try {
        const response = await axios.get('api/rooms', {
            params: queryParams,
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.response ? error.response.data : 'Network error',
        };
    }
};

const postAddRoom = async (data) => {
    try {
        const response = await axios.post('api/rooms', data);
        console.log(response.data);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.response ? error.response.data : 'Network error',
        };
    }
};

const patchUpdateRoom = async (data) => {
    try {
        const response = await axios.patch(`api/rooms/${data.id}`, data);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.response ? error.response.data : 'Network error',
        };
    }
};
const delDeleteRoom = async (id) => {
    try {
        const response = await axios.delete(`api/rooms/${id}`);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.response ? error.response.data : 'Network error',
        };
    }
}
const getAllRoomTypes = async (queryParams) => {
    try {
        const response = await axios.get('api/room-types', {
            params: queryParams,
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.response ? error.response.data : 'Network error',
        };
    }
}
const postAddRoomType = async (data) => {
    try {
        const response = await axios.post('api/room-types', data);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.response ? error.response.data : 'Network error',
        };
    }
}
const patchUpdateRoomType = async (data) => {
    try {
        const response = await axios.patch(`api/room-types/${data.id}`, data);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.response ? error.response.data : 'Network error',
        };
    }
}
const delDeleteRoomType = async (id) => {
    try {
        const response = await axios.delete(`api/room-types/${id}`);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.response ? error.response.data : 'Network error',
        };
    }
}

export {
    logIn,
    getAllRooms,
    postAddRoom,
    patchUpdateRoom,
    delDeleteRoom,
    getAllRoomTypes,
    postAddRoomType,
    patchUpdateRoomType,
    delDeleteRoomType
};
