import './App.css'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './Home'
import LoginLogout from './LoginLogout'
import ProtectedRoute from './ProtectedRoute'
import JobsPage from './JobsPage'
import FailureView from './FailureView'
import JobsDetail from './JobsDetail'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginLogout} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/jobs"
        render={props => (
          <JobsPage
            {...props}
            employmentTypesList={employmentTypesList}
            salaryRangeList={salaryRangesList}
          />
        )}
      />
      <ProtectedRoute exact path="/jobs/:id" component={JobsDetail} />
      <Route path="/not-found" component={FailureView} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
