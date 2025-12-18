import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginLogout extends Component {
  state = {
    userName: '',
    password: '',
    errorMsg: '',
    displayErrMsg: false,
  }

  updateUserName = e => {
    this.setState({userName: e.target.value})
  }

  updatePassword = e => {
    this.setState({password: e.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      displayErrMsg: true,
      errorMsg,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {username: userName, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwtToken)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserName = () => {
    const {userName} = this.state

    return (
      <div className="main-username-cont">
        <label htmlFor="username" className="label-field">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={this.updateUserName}
          className="input-field"
          placeholder="Username"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <div className="password-main-cont">
        <label className="label-field" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={this.updatePassword}
          className="input-field"
          placeholder="Password"
        />
      </div>
    )
  }

  render() {
    const {displayErrMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-cont">
        <div className="content-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo-1"
            alt="website logo"
          />

          <form onSubmit={this.submitForm} className="login-form">
            {this.renderUserName()}
            {this.renderPassword()}

            {displayErrMsg && <p className="error-msg">{errorMsg}</p>}

            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginLogout
