import './index.css'
import {Link, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = () => {
  const history = useHistory()

  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-cont">
      {/* Logo */}
      <Link to="/" className="site-img">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo-2"
        />
      </Link>

      {/* Navigation */}
      <ul className="nav-options-cont">
        <li className="option">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="option">
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>
      </ul>

      {/* Logout */}
      <div className="logout-cont">
        <button type="button" className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
