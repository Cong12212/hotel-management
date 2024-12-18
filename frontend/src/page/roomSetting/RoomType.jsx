import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Form, Offcanvas } from 'react-bootstrap';

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

  const handleDelete = (id) => {
    setRooms(rooms.filter((room) => room.id !== id)); // Remove the selected room
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
      <div className="flex items-center mb-3 justify-between">
        <h2 className="font-bold text-3xl font-sans">Room Configure</h2>
      </div>

      {/* Table displaying the rooms */}
      <Table striped bordered hover className="shadow-lg">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('roomId')}>
              Room ID {sortConfig.key === 'roomId' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('maxCustomers')}>
              Max Customers {sortConfig.key === 'maxCustomers' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('surcharge')}>
              Surcharge {sortConfig.key === 'surcharge' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.roomId}</td>
              <td>{room.maxCustomers}</td>
              <td>{room.surcharge}</td>
              <td>
                <button
                  className="hover:text-blue-800 text-blue-500 text-xl me-2"
                  onClick={() => handleEditClick(room)}
                >
                  ✎
                </button>
                <button
                  className="hover:text-red-800 text-red-500 font-bold text-xl"
                  onClick={() => handleDelete(room.id)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Offcanvas for Edit */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Room</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {editData && (
            <Form onSubmit={handleSave}>
              <Form.Group className="mb-3" controlId="maxCustomers">
                <Form.Label>Max Customers</Form.Label>
                <Form.Control
                  type="number"
                  name="maxCustomers"
                  defaultValue={editData.maxCustomers}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="surcharge">
                <Form.Label>Surcharge</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  name="surcharge"
                  defaultValue={editData.surcharge}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default RoomConfigure;
