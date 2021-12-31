import { Link } from "react-router-dom";

const NavBar = (): JSX.Element => (
  <div className="menubox">
    <nav>
      <ul className="menu">
        <li>
          <Link to="/" className="link linkcreatenw">
            Home
          </Link>
        </li>

        <li>
          <Link to="/login" className="link linkcreatenw">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default NavBar;
