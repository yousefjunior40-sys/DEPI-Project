import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo-2.png";
import "./header.css"
function Header() {
  return (
    <header className="Header">
    <div className="container">

      <div className="logo">
        <img src={logo} alt="Truckspot"/>
        <span>TruckSp
            <svg xmlns="http://www.w3.org/2000/svg" 
            width="20" height="20" viewBox="0 0 24 24" fill="none" 
            stroke="#e2743e" stroke-width="2" stroke-linecap="round" 
            stroke-linejoin="round" class="lucide lucide-map-pin h-5 w-5 text-accent inline -mx-0.5 relative -top-px"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
            <circle cx="12" cy="10" r="3"></circle></svg>
            t</span>
      </div>

      <div className="navlinks">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/food-trucks">Food Trucks</NavLink>
      </div>

      <div className="btns">
        {/* Admin panel btn */}
        <Link to="/admin">
          <svg xmlns="http://www.w3.org/2000/svg" 
            width="20" height="20" viewBox="0 0 24 24" 
            fill="none" stroke="#454444" strokeWidth="2" 
            strokeLinecap="round" strokeLinejoin="round"
            className="lucide lucide-layout-dashboard h-5 w-5">
            <rect width="7" height="9" x="3" y="3" rx="1"></rect>
            <rect width="7" height="5" x="14" y="3" rx="1"></rect>
            <rect width="7" height="9" x="14" y="12" rx="1"></rect>
            <rect width="7" height="5" x="3" y="16" rx="1"></rect>
          </svg>
        </Link>

        {/* Cart btn */}
        <Link to="/cart">
          <svg xmlns="http://www.w3.org/2000/svg" 
            width="20" height="20" viewBox="0 0 24 24" 
            fill="none" stroke="#454444" strokeWidth="2" 
            strokeLinecap="round" strokeLinejoin="round" 
            className="lucide lucide-shopping-cart h-5 w-5">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
        </Link>

        {/* Profile btn */}
        <Link to="/profile">
          <svg xmlns="http://www.w3.org/2000/svg" 
            width="20" height="20" viewBox="0 0 24 24" fill="none" 
            stroke="#454444" strokeWidth="2" strokeLinecap="round" 
            strokeLinejoin="round" className="lucide lucide-user h-5 w-5">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Link>

        <button>Sign In</button>
        <button>Sign Up</button>
      </div>
      </div>
    </header>
  )
}

export default Header;