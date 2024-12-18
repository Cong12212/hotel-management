import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Form, Offcanvas } from 'react-bootstrap';

function CustomerType() {
  const [customers, setCustomers] = useState([
    { id: 1, type: 'Inland', coefficient: 1.0 },
    { id: 2, type: 'Foreign', coefficient: 1.5 },
  ]);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddCustomer = () => {
    setEditData(null);
    handleShow();
  };

  const handleEditClick = (customer) => {
    setEditData(customer);
    handleShow();
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newCustomer = {
      id: editData ? editData.id : customers.length + 1,
      type: formData.get('type'),
      coefficient: parseFloat(formData.get('coefficient')),
    };

    if (editData) {
      setCustomers(customers.map((customer) => (customer.id === editData.id ? newCustomer : customer)));
    } else {
      setCustomers([...customers, newCustomer]);
    }

    handleClose();
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...customers].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setCustomers(sortedData);
  };

  return (
    <div className="pt-16 pb-8 pr-8 mt-2">
      <div className="flex items-center mb-3 justify-between">
        <h2 className="font-bold text-3xl font-sans">Customer Configure</h2>
      </div>

      {/* Nút Add Customer bên phải */}
      <div className="d-flex justify-content-end mb-3">
        <Button
          variant="dark" // Màu đen
          onClick={handleAddCustomer}
          className="text-white" // Màu chữ trắng
        >
          Add Customer
        </Button>
      </div>

      {/* Bảng có hiệu ứng đổ bóng */}
      <Table striped bordered hover className="shadow-lg">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('type')}>
              Customer Type {sortConfig.key === 'type' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('coefficient')}>
              Coefficient {sortConfig.key === 'coefficient' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.type}</td>
              <td>{customer.coefficient}</td>
              <td>
                <button
                  className="hover:text-blue-800 text-blue-500 text-xl me-2"
                  onClick={() => handleEditClick(customer)}
                >
                  ✎
                </button>
                <button
                  className="hover:text-red-800 text-red-500 font-bold text-xl"
                  onClick={() => handleDelete(customer.id)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Offcanvas cho Add/Edit */}
      <Offcanvas show={show} onHide={handleClose} placement="end"> {/* Hiện bên phải */}
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{editData ? 'Edit Customer' : 'Add Customer'}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Customer Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                defaultValue={editData ? editData.type : ''}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="coefficient">
              <Form.Label>Coefficient</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                name="coefficient"
                defaultValue={editData ? editData.coefficient : ''}
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

export default CustomerType;
