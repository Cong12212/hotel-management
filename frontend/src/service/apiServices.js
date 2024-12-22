import axios from '../service/utils/axiosCustomize'; // Import axios đã customize
import {jwtDecode} from "jwt-decode"; // Sửa lại import (không có { })

// Hàm gọi API đăng nhập
const logIn = async(data)=>{
    return await axios.post('api/users/login',data)
                    .then(response=>{
            
                        const token = response.data.data.token
                        const user = jwtDecode(token)
                     
                        return {
                            data: {
                                user,
                                token
                            }
                        }
                    })
                    .catch(err=>{
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

export { logIn, getAllRooms };
