import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="navbarimageadd">
      <div className="navbarandabout ">
        <div className="navbar mt-2">
          <div className="navsanket mx-2 py-2" onClick={() => navigate("/")}>
            Sanket.
          </div>
          <div className="navname py-2">
            <Link className="navlinks" to="/about">
              about
            </Link>
          </div>
          <div className="navname py-2">
            {" "}
            <Link className="navlinks" to="/project">
              projects
            </Link>
          </div>
          <div className="navname py-2">
            <Link className="navlinks" to="/connect">
              connect
            </Link>
          </div>
          <div className="navname py-2 mx-3">more</div>
          <div className="navbtn mx-3 py-2">
            <a href="https://twitter.com/AtkariSanket" target="_blank">
              <img
                width={16}
                src="https://i.ibb.co/n0rrk1Y/twitter.png"
                alt="twitter"
                border="0"
              />
            </a>
            <a href="https://www.instagram.com/sanket_atkari/" target="_blank">
              <img
                width={16}
                src="https://i.ibb.co/Sf834ZK/insta.png"
                alt="insta"
                border="0"
              />
            </a>
            <hr className="verticalline" />
            <a>
              <img
                onClick={() => {
                  setShowNav(!showNav);
                }}
                width={16}
                src="https://i.ibb.co/8PZ7pLw/hamburger.png"
                alt="hamburger"
                border="0"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
