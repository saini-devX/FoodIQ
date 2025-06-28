import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={assets.foodiq} alt="" />
      <img className="profile" src={assets.acc3} alt="" />
    </div>
  );
};

export default Navbar;
