import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Form, Offcanvas, Alert } from 'react-bootstrap';
import {
  getAllRoomTypes,
  createRoomType,
  updateRoomType,
  deleteRoomType,
} from "../../service/apiServices";

function RoomConfigure() {
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const [notification, setNotification] = useState({ type: '', message: '' });

  // Fetch room types
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await getAllRoomTypes();
        if (response.data.success) {
          const formattedData = response.data.data.map((item) => ({
            id: item._id,
            name: item.name,
            maxOccupancy: item.maxOccupancy,
            surchargeRate: item.surchargeRate,
            price: item.price,
          }));
          setRooms(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch room types:", error);
      }
    };

    fetchRoomTypes();
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleAddRoom = () => {
    setEditData(null);
    handleShow();
  };

  const handleEditClick = (room) => {
    setEditData(room);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await deleteRoomType(id);
      setRooms(rooms.filter((room) => room.id !== id));
      setNotification({ type: 'success', message: 'Room type deleted successfully!' });
    } catch (error) {
      setNotification({ type: 'danger', message: 'Failed to delete room type' });
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newRoom = {
      name: formData.get("roomTypeName"),
      maxOccupancy: parseInt(formData.get("maxCustomers"), 10),
      surchargeRate: parseFloat(formData.get("surcharge")),
      price: parseFloat(formData.get("price")),
    };

    try {
      if (editData) {
        // Update existing room type
        const response = await updateRoomType(editData.id, newRoom);
        if (response.data.success) {
          setRooms((prevRooms) =>
            prevRooms.map((room) =>
              room.id === editData.id
                ? { ...room, ...newRoom }
                : room
            )
          );
          setNotification({ type: 'success', message: 'Room type updated successfully!' });
        }
      } else {
        // Create new room type
        const response = await createRoomType(newRoom);
        if (response.data.success) {
          const newRoomData = {
            id: response.data.data._id,
            ...newRoom,
          };
          setRooms((prevRooms) => [...prevRooms, newRoomData]);
          setNotification({ type: 'success', message: 'Room type added successfully!' });
        }
      }
      handleClose();
    } catch (error) {
      setNotification({ type: 'danger', message: 'Failed to save room type' });
    }
  };

  return (
    <div className="pt-16 pb-8 pr-8 mt-2">
      {notification.message && (
        <Alert
          variant={notification.type}
          onClose={() => setNotification({ type: '', message: '' })}
          dismissible
        >
          {notification.message}
        </Alert>
      )}

      <div className="flex items-center mb-3 justify-between ">
        <h2 className="font-bold text-3xl font-sans">Room Configure</h2>
        <Button 
          className="bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={handleAddRoom}
        >
          Add Room Type
        </Button>
      </div>

      <div className="bg-white font-dm-sans rounded-md shadow-sm p-3">
        <Table bordered-y="true" hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Room Type Name</th>
              <th>Max Customers</th>
              <th>Surcharge</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={room.id}>
                <td>{index + 1}</td>
                <td>{room.name}</td>
                <td>{room.maxOccupancy}</td>
                <td>{room.surchargeRate}</td>
                <td>{room.price}</td>
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
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{editData ? 'Edit Room Type' : 'Add Room Type'}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3" controlId="roomTypeName">
              <Form.Label>Room Type Name</Form.Label>
              <Form.Control
                type="text"
                name="roomTypeName"
                defaultValue={editData?.name || ''}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="maxCustomers">
              <Form.Label>Max Customers</Form.Label>
              <Form.Control
                type="number"
                name="maxCustomers"
                defaultValue={editData?.maxOccupancy || ''}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="surcharge">
              <Form.Label>Surcharge</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="surcharge"
                defaultValue={editData?.surchargeRate || ''}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                defaultValue={editData?.price || ''}
                required
              />
            </Form.Group>
            <Button variant="dark" type="submit" className="text-white">
              Save
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default RoomConfigure;
