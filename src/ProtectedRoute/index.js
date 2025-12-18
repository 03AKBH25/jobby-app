import {Route, Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import Header from '../Header'

const ProtectedRoute = ({component: Component, render, ...rest}) => {
  const token = Cookie.get('jwt_token')

  if (!token) {
    return <Redirect to="/login" />
  }

  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Header />
          {Component && <Component {...props} />}
          {render && render(props)}
        </>
      )}
    />
  )
}

export default ProtectedRoute
