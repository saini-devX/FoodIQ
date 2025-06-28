import React, { useEffect } from "react";
import "./Order.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [foodList, setFoodList] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log("Orders data:", response.data.data);
    } else {
      toast.error("Error");
    }
  };

  // Fetch food list to get product names
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response.data.success) {
        setFoodList(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching food list:", error);
    }
  };

  // Function to get product name from food list using the _id
  const getProductName = (productId) => {
    const product = foodList.find((item) => item._id === productId);
    return product ? product.name : "Unknown Product";
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
    fetchFoodList();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  const itemName = getProductName(item._id);

                  if (index === order.items.length - 1) {
                    return itemName + " x " + item.quantity;
                  } else {
                    return itemName + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">Customer ID: {order.userId}</p>
              <div className="order-item-address">
                <p>{order.address.street}</p>
                <p>{order.address.city}</p>
              </div>
              <p className="order-item-phone">
                Date: {new Date(order.date).toLocaleDateString()} | Payment:{" "}
                {order.payment ? "✅ Paid" : "❌ Pending"}
              </p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>₹ {order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
