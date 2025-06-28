import React, { useEffect } from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        {/* <h2>Order your favourite food here</h2> */}
        <h2>Har plate mein ghar ka swaad</h2>
        <p>
          From street food to classic favourites, hum laye hain ek full-on swaad
          bhara menu. Har dish carefully crafted hai, top ingredients aur expert
          touch ke saath. Cravings ho ya comfort, we deliver taste that feels
          like home.
        </p>

        <a href="#explore-menu">
          <button id="btn">View Menu</button>
        </a>
      </div>
    </div>
  );
};

export default Header;
