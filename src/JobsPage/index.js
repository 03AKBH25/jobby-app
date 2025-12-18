import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobsInfoPage from '../JobsInfoPage'
import UserInfo from '../UserInfo'
import NotFound from '../NotFound'
import SomethingWentWrong from '../SomethingWentWrong'

const apiStatus = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

class JobsPage extends Component {
  state = {
    activeEtypeList: '',
    activeSRangeList: '',
    searchText: '',
    jobsApiStatus: apiStatus.INITIAL,
    userApiStatus: apiStatus.INITIAL,
    jobsList: [],
    userInfo: [],
  }

  componentDidMount() {
    const jwtToken = Cookies.get('jwt_token')
    const {history} = this.props

    if (!jwtToken) {
      history.replace('/login')
      return
    }

    this.getJobsInfo()
    this.getUserInfo()
  }

  getJobsInfo = async () => {
    const {activeEtypeList, activeSRangeList, searchText} = this.state
    this.setState({
      jobsApiStatus: apiStatus.LOADING,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEtypeList}&minimum_package=${activeSRangeList}&search=${searchText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDesc: job.job_description,
        location: job.location,
        totalSalary: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        jobsApiStatus: apiStatus.SUCCESS,
      })
    } else {
      this.setState({
        jobsApiStatus: apiStatus.FAILURE,
      })
    }
  }

  getUserInfo = async () => {
    this.setState({
      userApiStatus: apiStatus.LOADING,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImg: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }

      this.setState({
        userInfo: updatedData,
        userApiStatus: apiStatus.SUCCESS,
      })
    } else {
      this.setState({
        userApiStatus: apiStatus.FAILURE,
      })
    }
  }

  updateSearchText = e => {
    this.setState({searchText: e.target.value})
  }

  renderSearchField = () => {
    const {searchText} = this.state
    return (
      <div className="input-search-container">
        <input
          value={searchText}
          type="search"
          id="user-search"
          className="search-field-aniket"
          onChange={this.updateSearchText}
          placeholder="Search"
        />
        <div className="icon-container-aniket">
          <img
            src="https://www.svgrepo.com/show/532555/search.svg"
            className="search-aniket"
            onClick={this.getJobsInfo}
            alt="magnify"
          />
        </div>
      </div>
    )
  }

  onSelectEmp = event => {
    const empTypeId = event.target.value
    this.setState({activeEtypeList: empTypeId}, this.getJobsInfo)
  }

  onSelectSalary = event => {
    const salaryId = event.target.value
    this.setState({activeSRangeList: salaryId}, this.getJobsInfo)
  }

  renderJobsSection = () => {
    const {jobsApiStatus, jobsList} = this.state

    switch (jobsApiStatus) {
      case apiStatus.LOADING:
        return (
          <div className="products-loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        )

      case apiStatus.SUCCESS:
        // SCENARIO 1: filters applied, no jobs
        if (jobsList.length === 0) {
          return <NotFound />
        }

        return (
          <ul className="jobs-list">
            {jobsList.map(job => (
              <li key={job.id}>
                <JobsInfoPage jobInfo={job} />
              </li>
            ))}
          </ul>
        )

      case apiStatus.FAILURE:
        // SCENARIO 3: API failed
        return <SomethingWentWrong onRetry={this.getJobsInfo} />

      default:
        return null
    }
  }

  render() {
    const {userInfo, userApiStatus} = this.state
    const {employmentTypesList, salaryRangeList} = this.props

    return (
      <div className="main-container-aniket">
        <div className="side-main-container">
          <div className="user-info-aniket">
            <UserInfo
              retry={this.getUserInfo}
              details={userInfo}
              userApiStatus={userApiStatus}
            />
          </div>
          <hr />
          <div className="empy-list-filter-cont-aniket">
            <h1 className="filter-head-aniket">Type of Employment</h1>
            {employmentTypesList.map(filters => (
              <li
                key={filters.employmentTypeId}
                className="filter-option-aniket"
              >
                <input
                  type="checkbox"
                  id={filters.employmentTypeId}
                  value={filters.employmentTypeId}
                  onChange={this.onSelectEmp}
                />
                <label htmlFor={filters.employmentTypeId} className="lab-opt">
                  {filters.label}
                </label>
              </li>
            ))}
          </div>

          <hr />

          <div className="salary-list-filter-cont">
            <h1 className="filter-head-aniket">Salary Range</h1>
            {salaryRangeList.map(salaries => (
              <li key={salaries.salaryRangeId} className="filter-option-aniket">
                <input
                  type="checkbox"
                  id={salaries.salaryRangeId}
                  value={salaries.salaryRangeId}
                  onChange={this.onSelectSalary}
                />
                <label htmlFor={salaries.salaryRangeId} className="lab-opt">
                  {salaries.label}
                </label>
              </li>
            ))}
          </div>
        </div>
        <div className="main-content-container">
          {this.renderSearchField()}
          {this.renderJobsSection()}
        </div>
      </div>
    )
  }
}

export default JobsPage
