import React, { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import "./Verify.css";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const navigate = useNavigate();
  const { url, setCartItems } = useContext(StoreContext);

  const verifyPayment = async () => {
    try {
      const res = await axios.post(`${url}/api/order/verify`, {
        session_id,
      });

      console.log("Verification response:", res.data);

      if (res.data.success) {
        setCartItems({});
        setTimeout(() => navigate("/myorders"), 300);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Verification error:", err.message);
      navigate("/");
    }
  };

  useEffect(() => {
    if (session_id) {
      verifyPayment();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p>Verifying your payment...</p>
    </div>
  );
};

export default Verify;
