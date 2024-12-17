import React, { useState } from 'react';
import './Transaction.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Transaction = () => {
    const initialData = [
        {
          orderNo: "B-123132",
          description: "A101 checkout",
          status: "Success",
          price: "$500.00",
          total: "$500.00",
        },
        {
          orderNo: "A-535212",
          description: "B202 checkout",
          status: "Success",
          price: "$1000.00",
          total: "$1000.00",
        },
        {
          orderNo: "C-312312",
          description: "A103 checkout",
          status: "Processing",
          price: "$46.00",
          total: "$46.00",
        },
        {
          orderNo: "R-678902",
          description: "B204 checkout",
          status: "Success",
          price: "$99.90",
          total: "$99.90",
        },
        {
          orderNo: "N-764532",
          description: "A105 checkout",
          status: "Processing",
          price: "$40.25",
          total: "$40.25",
        },
        {
          orderNo: "D-121231",
          description: "B206 checkout",
          status: "Success",
          price: "$122.00",
          total: "$122.00",
        },
        {
          orderNo: "E-987654",
          description: "A107 checkout",
          status: "Success",
          price: "$250.50",
          total: "$250.50",
        },
        {
          orderNo: "F-234567",
          description: "B208 checkout",
          status: "Success",
          price: "$80.00",
          total: "$80.00",
        },
        {
          orderNo: "G-876543",
          description: "A109 checkout",
          status: "Processing",
          price: "$1200.00",
          total: "$1200.00",
        },
        {
          orderNo: "H-543210",
          description: "B210 checkout",
          status: "Processing",
          price: "$65.75",
          total: "$65.75",
        },
        {
          orderNo: "I-102938",
          description: "A111 checkout",
          status: "Success",
          price: "$25.00",
          total: "$25.00",
        },
        {
          orderNo: "J-983746",
          description: "B212 checkout",
          status: "Success",
          price: "$300.00",
          total: "$300.00",
        },
        {
          orderNo: "K-238749",
          description: "A113 checkout",
          status: "Success",
          price: "$150.25",
          total: "$150.25",
        },
        {
          orderNo: "L-785623",
          description: "B214 checkout",
          status: "Success",
          price: "$200.75",
          total: "$200.75",
        },
        {
          orderNo: "M-901283",
          description: "A115 checkout",
          status: "Processing",
          price: "$50.00",
          total: "$50.00",
        },
        {
          orderNo: "N-764532",
          description: "B216 checkout",
          status: "Processing",
          price: "$40.25",
          total: "$40.25",
        },
        {
            orderNo: "B-123132",
            description: "A101 checkout",
            status: "Success",
            price: "$500.00",
            total: "$500.00",
          },
          {
            orderNo: "A-535212",
            description: "B202 checkout",
            status: "Success",
            price: "$1000.00",
            total: "$1000.00",
          },
          {
            orderNo: "C-312312",
            description: "A103 checkout",
            status: "Processing",
            price: "$46.00",
            total: "$46.00",
          },
          {
            orderNo: "R-678902",
            description: "B204 checkout",
            status: "Success",
            price: "$99.90",
            total: "$99.90",
          },
          {
            orderNo: "N-764532",
            description: "A105 checkout",
            status: "Processing",
            price: "$40.25",
            total: "$40.25",
          },
          {
            orderNo: "D-121231",
            description: "B206 checkout",
            status: "Success",
            price: "$122.00",
            total: "$122.00",
          },
          {
            orderNo: "E-987654",
            description: "A107 checkout",
            status: "Success",
            price: "$250.50",
            total: "$250.50",
          },
          {
            orderNo: "F-234567",
            description: "B208 checkout",
            status: "Success",
            price: "$80.00",
            total: "$80.00",
          },
          {
            orderNo: "G-876543",
            description: "A109 checkout",
            status: "Processing",
            price: "$1200.00",
            total: "$1200.00",
          },
          {
            orderNo: "H-543210",
            description: "B210 checkout",
            status: "Processing",
            price: "$65.75",
            total: "$65.75",
          },
          {
            orderNo: "I-102938",
            description: "A111 checkout",
            status: "Success",
            price: "$25.00",
            total: "$25.00",
          },
          {
            orderNo: "J-983746",
            description: "B212 checkout",
            status: "Success",
            price: "$300.00",
            total: "$300.00",
          },
          {
            orderNo: "K-238749",
            description: "A113 checkout",
            status: "Success",
            price: "$150.25",
            total: "$150.25",
          },
          {
            orderNo: "L-785623",
            description: "B214 checkout",
            status: "Success",
            price: "$200.75",
            total: "$200.75",
          },
          {
            orderNo: "M-901283",
            description: "A115 checkout",
            status: "Processing",
            price: "$50.00",
            total: "$50.00",
          },
          {
            orderNo: "N-764532",
            description: "B216 checkout",
            status: "Processing",
            price: "$40.25",
            total: "$40.25",
          },
          {
            orderNo: "B-123132",
            description: "A101 checkout",
            status: "Success",
            price: "$500.00",
            total: "$500.00",
          },
          {
            orderNo: "A-535212",
            description: "B202 checkout",
            status: "Success",
            price: "$1000.00",
            total: "$1000.00",
          },
          {
            orderNo: "C-312312",
            description: "A103 checkout",
            status: "Processing",
            price: "$46.00",
            total: "$46.00",
          },
          {
            orderNo: "R-678902",
            description: "B204 checkout",
            status: "Success",
            price: "$99.90",
            total: "$99.90",
          },
          {
            orderNo: "N-764532",
            description: "A105 checkout",
            status: "Processing",
            price: "$40.25",
            total: "$40.25",
          },
          {
            orderNo: "D-121231",
            description: "B206 checkout",
            status: "Success",
            price: "$122.00",
            total: "$122.00",
          },
          {
            orderNo: "E-987654",
            description: "A107 checkout",
            status: "Success",
            price: "$250.50",
            total: "$250.50",
          },
          {
            orderNo: "F-234567",
            description: "B208 checkout",
            status: "Success",
            price: "$80.00",
            total: "$80.00",
          },
          {
            orderNo: "G-876543",
            description: "A109 checkout",
            status: "Processing",
            price: "$1200.00",
            total: "$1200.00",
          },
          {
            orderNo: "H-543210",
            description: "B210 checkout",
            status: "Processing",
            price: "$65.75",
            total: "$65.75",
          },
          {
            orderNo: "I-102938",
            description: "A111 checkout",
            status: "Success",
            price: "$25.00",
            total: "$25.00",
          },
          {
            orderNo: "J-983746",
            description: "B212 checkout",
            status: "Success",
            price: "$300.00",
            total: "$300.00",
          },
          {
            orderNo: "K-238749",
            description: "A113 checkout",
            status: "Success",
            price: "$150.25",
            total: "$150.25",
          },
          {
            orderNo: "L-785623",
            description: "B214 checkout",
            status: "Success",
            price: "$200.75",
            total: "$200.75",
          },
          {
            orderNo: "M-901283",
            description: "A115 checkout",
            status: "Processing",
            price: "$50.00",
            total: "$50.00",
          },
          {
            orderNo: "N-764532",
            description: "B216 checkout",
            status: "Processing",
            price: "$40.25",
            total: "$40.25",
          },
          {
            orderNo: "B-123132",
            description: "A101 checkout",
            status: "Success",
            price: "$500.00",
            total: "$500.00",
          },
          {
            orderNo: "A-535212",
            description: "B202 checkout",
            status: "Success",
            price: "$1000.00",
            total: "$1000.00",
          },
          {
            orderNo: "C-312312",
            description: "A103 checkout",
            status: "Processing",
            price: "$46.00",
            total: "$46.00",
          },
          {
            orderNo: "R-678902",
            description: "B204 checkout",
            status: "Success",
            price: "$99.90",
            total: "$99.90",
          },
          {
            orderNo: "N-764532",
            description: "A105 checkout",
            status: "Processing",
            price: "$40.25",
            total: "$40.25",
          },
          {
            orderNo: "D-121231",
            description: "B206 checkout",
            status: "Success",
            price: "$122.00",
            total: "$122.00",
          },
          {
            orderNo: "E-987654",
            description: "A107 checkout",
            status: "Success",
            price: "$250.50",
            total: "$250.50",
          },
          {
            orderNo: "F-234567",
            description: "B208 checkout",
            status: "Success",
            price: "$80.00",
            total: "$80.00",
          },
          {
            orderNo: "G-876543",
            description: "A109 checkout",
            status: "Processing",
            price: "$1200.00",
            total: "$1200.00",
          },
          {
            orderNo: "H-543210",
            description: "B210 checkout",
            status: "Processing",
            price: "$65.75",
            total: "$65.75",
          },
          {
            orderNo: "I-102938",
            description: "A111 checkout",
            status: "Success",
            price: "$25.00",
            total: "$25.00",
          },
          {
            orderNo: "J-983746",
            description: "B212 checkout",
            status: "Success",
            price: "$300.00",
            total: "$300.00",
          },
          {
            orderNo: "K-238749",
            description: "A113 checkout",
            status: "Success",
            price: "$150.25",
            total: "$150.25",
          },
          {
            orderNo: "L-785623",
            description: "B214 checkout",
            status: "Success",
            price: "$200.75",
            total: "$200.75",
          },
          {
            orderNo: "M-901283",
            description: "A115 checkout",
            status: "Processing",
            price: "$50.00",
            total: "$50.00",
          },
          {
            orderNo: "N-764532",
            description: "B216 checkout",
            status: "Processing",
            price: "$40.25",
            total: "$40.25",
          },
          {
            orderNo: "B-123132",
            description: "A101 checkout",
            status: "Success",
            price: "$500.00",
            total: "$500.00",
          },
          {
            orderNo: "A-535212",
            description: "B202 checkout",
            status: "Success",
            price: "$1000.00",
            total: "$1000.00",
          },
          {
            orderNo: "C-312312",
            description: "A103 checkout",
            status: "Processing",
            price: "$46.00",
            total: "$46.00",
          },
          {
            orderNo: "R-678902",
            description: "B204 checkout",
            status: "Success",
            price: "$99.90",
            total: "$99.90",
          },
          {
            orderNo: "N-764532",
            description: "A105 checkout",
            status: "Processing",
            price: "$40.25",
            total: "$40.25",
          },
          {
            orderNo: "D-121231",
            description: "B206 checkout",
            status: "Success",
            price: "$122.00",
            total: "$122.00",
          },
          {
            orderNo: "E-987654",
            description: "A107 checkout",
            status: "Success",
            price: "$250.50",
            total: "$250.50",
          },
          {
            orderNo: "F-234567",
            description: "B208 checkout",
            status: "Success",
            price: "$80.00",
            total: "$80.00",
          },
          {
            orderNo: "G-876543",
            description: "A109 checkout",
            status: "Processing",
            price: "$1200.00",
            total: "$1200.00",
          },
          {
            orderNo: "H-543210",
            description: "B210 checkout",
            status: "Processing",
            price: "$65.75",
            total: "$65.75",
          },
          {
            orderNo: "I-102938",
            description: "A111 checkout",
            status: "Success",
            price: "$25.00",
            total: "$25.00",
          },
          {
            orderNo: "J-983746",
            description: "B212 checkout",
            status: "Success",
            price: "$300.00",
            total: "$300.00",
          },
          {
            orderNo: "K-238749",
            description: "A113 checkout",
            status: "Success",
            price: "$150.25",
            total: "$150.25",
          },
          {
            orderNo: "L-785623",
            description: "B214 checkout",
            status: "Success",
            price: "$200.75",
            total: "$200.75",
          },
          {
            orderNo: "M-901283",
            description: "A115 checkout",
            status: "Processing",
            price: "$50.00",
            total: "$50.00",
          },
          {
            orderNo: "N-764532",
            description: "B216 checkout",
            status: "Processing",
            price: "$40.25",
            total: "$40.25",
          }
    ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Hàm sắp xếp dữ liệu
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  // Hàm lọc dữ liệu dựa trên tìm kiếm
  const filteredData = data.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán dữ liệu hiển thị cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container my-5">
    <p class="h2 fw-bold title">Transaction</p>
      {/* Thanh tìm kiếm */}
      <div className="search-bar mb-3">
        <label htmlFor="search" className="me-2 fw-bold">Search:</label>
        <input
          type="text"
          id="search"
          className="form-control d-inline-block w-auto"
          placeholder="Search description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Bảng dữ liệu */}
      <div className="table-responsive table-wrapper">
        <table className="table custom-table">
          <thead>
            <tr>
              <th scope="col" onClick={() => handleSort('orderNo')}>
                ORDER NO. {sortConfig.key === 'orderNo' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↑↓'}
              </th>
              <th scope="col" onClick={() => handleSort('description')}>
                BILL DESCRIPTION {sortConfig.key === 'description' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↑↓'}
              </th>
              <th scope="col" onClick={() => handleSort('status')}>
                STATUS {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↑↓'}
              </th>
              <th scope="col" onClick={() => handleSort('price')}>
                PRICE {sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↑↓'}
              </th>
              <th scope="col" onClick={() => handleSort('total')}>
                TOTAL {sortConfig.key === 'total' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↑↓'}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.orderNo}</td>
                <td>{item.description}</td>
                <td className="text-primary">{item.status}</td>
                <td>{item.price}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Phân trang */}
        <nav aria-label="Pagination">
            <ul className="pagination justify-content-center">
            {/* Nút Previous */}
            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            </li>

            {/* Trang đầu tiên */}
            <li className={`page-item ${currentPage === 1 && 'active'}`}>
            <button className="page-link" onClick={() => setCurrentPage(1)}>1</button>
            </li>

            {/* Hiển thị trang 2 và 3 nếu có */}
            {currentPage > 3 && <li className="page-item disabled"><span className="page-link">...</span></li>}

            {/* Hiển thị trang hiện tại và các trang gần đó */}
            {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
            .filter(page => page > 1 && page < totalPages) // Lọc trang hợp lệ
            .map(page => (
                <li key={page} className={`page-item ${currentPage === page && 'active'}`}>
                <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                </li>
            ))
            }

            {/* Hiển thị dấu ... nếu cần */}
            {currentPage < totalPages - 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}

            {/* Trang cuối */}
            {totalPages > 1 && (
            <li className={`page-item ${currentPage === totalPages && 'active'}`}>
                <button className="page-link" onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
            </li>
            )}

            {/* Nút Next */}
            <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </li>
            </ul>
        </nav>
      </div>
      
    </div>
  );
};

export default Transaction;
