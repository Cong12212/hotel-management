import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Form, Offcanvas, Alert } from 'react-bootstrap';
import { getAllCustomerTypes, createCustomerType, updateCustomerType, deleteCustomerType } from "../../service/apiServices";

function CustomerType() {
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const fetchCustomerTypes = async () => {
      try {
        const response = await getAllCustomerTypes();
        if (response.data.success) {
          const formattedData = response.data.data.map((item) => ({
            id: item._id,
            type: item.name,
            coefficient: item.coefficient,
          }));
          setCustomers(formattedData);
        }
      } catch (error) {
        console.error('Failed to fetch customer types:', error);
      }
    };

    fetchCustomerTypes();
  }, []);

  const handleClose = () => {
    setShow(false);
    setError(null);
  };

  const handleShow = () => setShow(true);

  const handleAddCustomer = () => {
    setEditData(null);
    handleShow();
  };

  const handleEditClick = (customer) => {
    setEditData(customer);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomerType(id);
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete customer type');
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newCustomer = {
      name: formData.get('type'),
      coefficient: parseFloat(formData.get('coefficient')),
    };
  
    try {
      if (editData) {
        // Update existing customer type
        const response = await updateCustomerType(editData.id, newCustomer);
        if (response.data.success) {
          setCustomers(customers.map((customer) =>
            customer.id === editData.id
              ? { ...customer, ...response.data.data }
              : customer
          ));
        }
      } else {
        // Create new customer type
        const response = await createCustomerType(newCustomer);
        if (response.data.success) {
          // Map the response to match the expected structure
          const newCustomerData = {
            id: response.data.data._id,
            type: response.data.data.name, // Ensure "type" is correctly mapped
            coefficient: response.data.data.coefficient,
          };
          setCustomers([...customers, newCustomerData]);
        }
      }
      handleClose();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save customer type');
    }
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
        <Button
          variant="dark"
          onClick={handleAddCustomer}
          className="text-white">
          Add Customer
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="bg-white font-dm-sans rounded-md shadow-sm p-3">
        <Table bordered-y="true" hover>
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
            {customers.map((customer, index) => (
              <tr key={customer.id}>
                <td>{index + 1}</td>
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
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end">
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
