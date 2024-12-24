import axios from "../service/utils/axiosCustomize"; // Import axios đã customize
import { jwtDecode } from "jwt-decode"; // Sửa lại import

// Hàm gọi API đăng nhập
const logIn = async (data) => {
  return await axios
    .post("api/users/login", data)
    .then((response) => {
      const token = response.data.data.token;
      const user = jwtDecode(token);
      return {
        data: {
          user,
          token,
        },
      };
    })
    .catch((err) => {
      return {
        data: null,
        err,
      };
    });
};

// Hàm gọi API lấy tất cả phòng
const getAllRooms = async (queryParams) => {
  try {
    const response = await axios.get("api/rooms", {
      params: queryParams,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : "Network error",
    };
  }
};

const postAddRoom = async (data) => {
  try {
    const response = await axios.post("api/rooms", data);
    console.log(response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : "Network error",
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
      error: error.response ? error.response.data : "Network error",
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
      error: error.response ? error.response.data : "Network error",
    };
  }
};

const getBookings = async (queryParams) => {
  try {
    const response = await axios.get("api/bookings", {
      params: queryParams,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : "Network error",
    };
  }
};

// Hàm gọi API lấy danh sách hóa đơn
const getInvoices = async (queryParams) => {
  try {
    const response = await axios.get("api/invoices", {
      params: queryParams,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : "Network error",
    };
  }
};

// Hàm gọi API lấy tất cả loại khách hàng
const getAllCustomerTypes = async () => {
  try {
    const response = await axios.get("api/customer-types");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : "Network error",
    };
  }
};

// Hàm gọi API cập nhật loại khách hàng
const updateCustomerType = async (id, data) => {
  try {
    const response = await axios.patch(`api/customer-types/${id}`, data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : "Network error",
    };
  }
};
// Hàm gọi API tạo loại khách hàng mới
const createCustomerType = async (data) => {
  try {
    const response = await axios.post("api/customer-types", data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : "Network error",
    };
  }
};

// Hàm gọi API xóa loại khách hàng
const deleteCustomerType = async (id) => {
  try {
    const response = await axios.delete(`api/customer-types/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : "Network error",
    };
  }
};

// Hàm gọi API lấy danh sách room types
const getAllRoomTypes = async (queryParams) => {
  try {
    const response = await axios.get("api/room-types", {
      params: queryParams,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : "Network error",
    };
  }
};

// Hàm gọi API tạo room type
const postAddRoomType = async (data) => {
  try {
    const response = await axios.post("api/room-types", data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : "Network error",
    };
  }
};

// Hàm gọi API cập nhật room type
const patchUpdateRoomType = async (id, data) => {
  try {
    const response = await axios.patch(`api/room-types/${id}`, data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : "Network error",
    };
  }
};

// Hàm gọi API xóa room type
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
      error: error.response ? error.response.data : "Network error",
    };
  }
};

// Hàm gọi API lấy danh sách đặt phòng chưa hoàn thành
const getUncompletedBookings = async () => {
  try {
    const response = await axios.get("api/bookings/uncompleted");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : "Network error",
    };
  }
};

// Hàm gọi API tạo hóa đơn
const addInvoice = async (data) => {
  try {
    const response = await axios.post("api/invoices", data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : "Network error",
    };
  }
};

export {
  logIn,
  getAllRooms,
  postAddRoom,
  patchUpdateRoom,
  delDeleteRoom,
  getBookings,
  getInvoices,
  getAllCustomerTypes,
  updateCustomerType,
  createCustomerType,
  deleteCustomerType,
  getAllRoomTypes,
  postAddRoomType,
  patchUpdateRoomType,
  delDeleteRoomType,
  getUncompletedBookings,
  addInvoice,
};
