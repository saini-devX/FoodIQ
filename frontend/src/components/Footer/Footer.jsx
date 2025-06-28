import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.foodiq} alt="" />
          <p>
            {" "}
            From street food to classic favourites, hum laye hain ek full-on
            swaad bhara menu. Har dish carefully crafted hai, top ingredients
            aur expert touch ke saath. Cravings ho ya comfort, we deliver taste
            that feels like home.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>7901714256</li>
            <li>saini.devX@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright {new Date().getFullYear()} &copy; Tomato.com - All Right
        Reserved
      </p>
    </div>
  );
};

export default Footer;
