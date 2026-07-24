import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Table from 'react-bootstrap/Table';
import Loader from "../Loader";
const StockHistory = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/vendors/${id}/history`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setHistory(response.data.data);
      console.log(response.data);

    } catch (error) {
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchHistory(id);
  }, [id]);

  return (
    <div className="d-flex flex-column min-vh-100  py-4a ">
      <div className="container mt-4  p-4 rounded shadow-m address-box">
        <h2 className="mb-4">Top up  History Details</h2>


        <div className="table-container">

          <Table striped bordered className="table">

            <thead

            >

              <tr>
                <th>Product Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Stock Before</th>
                <th>Stock After</th>
                <th>Created By</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {
                history.map((item) => (

                  <tr key={item.id}>

                    <td>
                      {item.product_name}
                    </td>

                    <td>
                      {item.type}
                    </td>

                    <td>
                      {item.quantity}
                    </td>

                    <td>
                      {item.stock_before}
                    </td>

                    <td>
                      {item.stock_after}
                    </td>

                    <td>
                      {item.created_by}
                    </td>

                    <td>
                      {item.created_at}
                    </td>

                  </tr>

                ))
              }{
                loading &&
                <tr>
                  <td colSpan="7">

                    <Loader />

                  </td>
                </tr>
              }


            </tbody>


          </Table>

        </div>

      </div>
    </div>

  );
};
export default StockHistory;
