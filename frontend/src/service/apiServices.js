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

const getAllBookings = async (queryParams) => {
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
const getAllCustomer = async () => {
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
}
const postAddCustomer = async (data) => {
  try {
    const response = await axios.post("api/customers", data);
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
}

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

const addBooking = async (data) => {
  try {
    const response = await axios.post("api/bookings", data);
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

const fetchMonthlyReport = async (month, year) => {
  try {
      const time = `${month}-${year}`; // Tạo format "MM-YYYY"
      const response = await axios.get(`http://localhost:4000/api/reports/general-monthly?time=${time}`);
      return {
          success: true,
          data: response.data.data, // Lấy `data` từ response
      };
  } catch (error) {
      return {
          success: false,
          error: error.response ? error.response.data : "Network error",
      };
  }
};
  


// Hàm fetch dữ liệu RoomType Monthly
const fetchRoomTypeMonthlyReport = async (month, year) => {
  try {
      // Tạo đường dẫn với tham số tháng và năm
      const time = `${month}-${year}`;
      const response = await axios.get(`http://localhost:4000/api/reports/roomtype-monthly?time=${time}`);
      return response.data; // Trả về dữ liệu từ API
  } catch (error) {
      console.error("Error fetching RoomTypeMonthlyReport:", error);
      return {
          success: false,
          error: error.message || "Failed to fetch data",
      };
  }
};
  
const fetchRoomDensityMonthlyReport = async (month, year) => {
  try {
      const response = await axios.get(
          `http://localhost:4000/api/reports/room-density-monthly?time=${month}-${year}`
      );
      return response.data;
  } catch (error) {
      console.error("Error fetching room density monthly report:", error);
      throw error;
  }
};


export {
  logIn,
  getAllRooms,
  postAddRoom,
  patchUpdateRoom,
  delDeleteRoom,
  getAllBookings,
  getInvoices,
  getAllCustomer,
  postAddCustomer,
  getAllCustomerTypes,
  updateCustomerType,
  createCustomerType,
  deleteCustomerType,
  getAllRoomTypes,
  postAddRoomType,
  patchUpdateRoomType,
  delDeleteRoomType,
  getUncompletedBookings,
  addBooking,
  addInvoice,
  fetchMonthlyReport,
  fetchRoomTypeMonthlyReport,
  fetchRoomDensityMonthlyReport
};
