import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Form, InputGroup, DropdownButton, Dropdown, Offcanvas } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllRoomTypes, postAddRoomType, patchUpdateRoomType, delDeleteRoomType } from '../../service/apiServices';

function RoomConfigure() {
  const [rooms, setRooms] = useState([
    { id: 1, roomId: 'A101', maxCustomers: 2, surcharge: 10.0 },
    { id: 2, roomId: 'B202', maxCustomers: 4, surcharge: 20.0 },
  ]);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditClick = (room) => {
    setEditData(room); // Set data for editing
    handleShow();
  };
  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedRoom = {
      ...editData,
      maxCustomers: parseInt(formData.get('maxCustomers'), 10),
      surcharge: parseFloat(formData.get('surcharge')),
    };

    setRooms(rooms.map((room) => (room.id === editData.id ? updatedRoom : room))); // Update the room
    handleClose();
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...rooms].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setRooms(sortedData);
  };

  return (
    <div className="pt-16 pb-8 pr-8 mt-2">
      <ToastContainer />
      <div className="flex items-center mb-3 justify-between ">
        <h2 className="font-bold text-3xl font-sans">Room Configure</h2>
        <Button variant="dark" onClick={handleModalShow}>Add RoomType</Button>
      </div>
      <div className="bg-white font-dm-sans rounded-md shadow-sm p-3">
        <div className="flex justify-between">
          <div className="d-flex">
            {/* Search Input */}

            <InputGroup>
              <input
                placeholder="Search"
                className="outline-none focus:outline-dashed focus:outline-2 focus:outline-violet-500 border border-gray-300 rounded-md p-2"
                value={search}
                onChange={handleSearch}
              />
            </InputGroup>
          </div>
          <div className="flex ">
            {/* Rows Per Page Dropdown */}
            <DropdownButton
              id="dropdownRowsPerPage"
              title={`${rowsPerPage} rows`}
              onSelect={handleRowsPerPageChange}
              variant="outline-secondary"
            >
              {[5, 10, 25, 50].map((value) => (
                <Dropdown.Item eventKey={value} key={value}>
                  {value} rows
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>

        </div>

        {/* Table displaying the rooms */}
        <div className="bg-white font-dm-sans rounded-md p-3">
          <Table className="text-center " bordered-y="true" hover>
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '5%' }} />
            </colgroup>
            <thead>
              <tr>
                <th >
                  ID
                </th>
                <th>
                  Room Type
                  <button
                    onClick={() => handleSort('name', 'asc')}
                    className="ml-1 text-l"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => handleSort('name', 'desc')}
                    className=" text-l"
                  >
                    ▼
                  </button>
                </th>
                <th >
                  Max Occupancy
                </th>
                <th >
                  Surcharge Rate
                </th>
                <th>
                  Price
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roomtypes.map((roomtype, index) => (
                <tr key={roomtype._id}>
                  <td className="align-middle py-3">{index + 1}</td>
                  <td className="align-middle py-3">{roomtype.name}</td>
                  <td className="align-middle py-3">{roomtype.maxOccupancy}</td>
                  <td className="align-middle py-3">{roomtype.surchargeRate}</td>
                  <td className="align-middle py-3">{roomtype.price}</td>
                  <td className="align-middle py-3">
                    <button
                      className="hover:text-blue-800 text-blue-500 text-xl me-2"
                      onClick={() => handleEditClick(roomtype)}
                    >
                      ✎
                    </button>
                    <button
                      className="hover:text-red-800 text-red-500 font-bold text-xl"
                      onClick={() => handleDelete(roomtype._id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="flex items-center justify-end gap-3">
            <Button variant="dark"
              disabled={currentPage === 1}
              onClick={() => handlePageChange('prev')}>
              Previous
            </Button>
            <span>Page </span>
            <input
              type="number"
              value={pageInput}
              onChange={handlePageInput}
              className="text-center px-1 py-2 text-sm rounded-md border border-gray-500 w-12"
              onKeyPress={(e) => e.key === "Enter" && handleGoToPage()}
              onBlur={handleGoToPage}
            />
            <span> of {Math.ceil(totalRooms / rowsPerPage)}</span>
            <Button variant="dark"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange('next')}>
              Next
            </Button>
          </div>
        </div>
        {/* Offcanvas for Edit */}
        <Offcanvas show={showModal} onHide={handleModalClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{editingRoomType ? 'Update RoomType' : 'Add RoomType'}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form>
              <Form.Group controlId="formTypeName">
                <Form.Label className="text-muted">
                  Type Name <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter room name"
                  name="name"
                  value={newRoomType.name}
                  onChange={handleInputChange}
                  isInvalid={!!errors.name}
                  className="mb-3"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formMaxOccupancy">
                <Form.Label className="text-muted">
                  Max Occupancy <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter max occupancy"
                  name="maxOccupancy"
                  value={newRoomType.maxOccupancy}
                  onChange={handleInputChange}
                  isInvalid={!!errors.maxOccupancy}
                  className="mb-3"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.maxOccupancy}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formSurchargeRate">
                <Form.Label className="text-muted">
                  Surcharge Rate <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Entet surcharge rate"
                  name="surchargeRate"
                  value={newRoomType.surchargeRate}
                  onChange={handleInputChange}
                  isInvalid={!!errors.surchargeRate}
                  className="mb-3"
                  step="0.1"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.surchargeRate}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPrice">
                <Form.Label className="text-muted">
                  Price <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  value={newRoomType.price}
                  onChange={handleInputChange}
                  isInvalid={!!errors.price}
                  step="100"
                  className="mb-3"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Offcanvas.Body>
          <div className="offcanvas-footer flex-row justify-between gap-8">
            <div className="flex justify-between gap-8 p-3">
              <Button variant="secondary" onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="dark" onClick={handleAddRoomType}>
                {editingRoomType ? 'Save changes' : 'Add RoomType'}
              </Button>
            </div>
          </div>
        </Offcanvas>
      </div>
    </div>
  );
}

export default RoomConfigure;
