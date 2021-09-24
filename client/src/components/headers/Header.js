import React, { useContext, useState } from "react";
import Menu from "./icons/menu.svg";
import Close from "./icons/close.svg";
import Cart from "./icons/cart.svg";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart
  const [menu, setMenu] = useState(false)

  const logoutUser = async () => {
      await axios.get('/user/logout')
      localStorage.removeItem('firstLogin')
      window.location.href = '/'
      toggleMenu()
  }

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product" onClick={toggleMenu}>Create Product</Link>
        </li>
        <li>
          <Link to="/category" onClick={toggleMenu}>Category</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history" onClick={toggleMenu}>History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>Logout</Link>
        </li>
      </>
    );
  };

  const toggleMenu = () => setMenu(!menu)

  const styleMenu = {
    left: menu ? 0 : '-100%'
  }

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "E Commerce"}</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link to="/" onClick={toggleMenu}>{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login" onClick={toggleMenu}>Login | Register</Link>
          </li>
        )}
        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
