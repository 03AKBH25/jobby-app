import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const apiStatus = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

class JobsDetail extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiState: apiStatus.INITIAL,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiState: apiStatus.LOADING})

    const {match} = this.props
    const {id} = match.params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const job = data.job_details

      const updatedJobDetails = {
        id: job.id,
        title: job.title,
        companyLogoUrl: job.company_logo_url,
        companyWebsiteUrl: job.company_website_url,
        jobDescription: job.job_description,
        employmentType: job.employment_type,
        location: job.location,
        rating: job.rating,
        packagePerAnnum: job.package_per_annum,
        skills: job.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
        lifeAtCompany: {
          description: job.life_at_company.description,
          imageUrl: job.life_at_company.image_url,
        },
      }

      const updatedSimilarJobs = data.similar_jobs.map(jobe => ({
        id: jobe.id,
        title: jobe.title,
        companyLogoUrl: jobe.company_logo_url,
        employmentType: jobe.employment_type,
        jobDescription: jobe.job_description,
        location: jobe.location,
        rating: jobe.rating,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        apiState: apiStatus.SUCCESS,
      })
    } else {
      this.setState({apiState: apiStatus.FAILURE})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <h1>Failed to load job details</h1>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {location} = this.props

    const titleFromList = location.state?.title

    return (
      <div className="jobs-detail-page">
        <div className="job-detail-header">
          <img
            src={jobDetails.companyLogoUrl}
            className="company-logo"
            alt="job details company logo"
          />

          <div>
            <h1>{titleFromList || jobDetails.title}</h1>
            <p>⭐ {jobDetails.rating}</p>
          </div>
        </div>

        <div className="desc-section">
          <div className="desc-head">
            <h1>Description</h1>
            <a
              href={jobDetails.companyWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗
            </a>
          </div>
          <p>{jobDetails.jobDescription}</p>
        </div>

        <h1>Skills</h1>
        <ul className="skills-list">
          {jobDetails.skills.map(skill => (
            <li key={skill.name}>
              <img src={skill.imageUrl} alt={skill.name} />
              <p>{skill.name}</p>
            </li>
          ))}
        </ul>

        <h1>Life at Company</h1>
        <div className="life-section">
          <p>{jobDetails.lifeAtCompany.description}</p>
          <img
            src={jobDetails.lifeAtCompany.imageUrl}
            alt="life at company"
            className="life-img"
          />
        </div>

        <h1>Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(job => (
            <li key={job.id} className="similar-job-card">
              <img src={job.companyLogoUrl} className="company-logo" alt="" />
              <h1>{job.title}</h1>
              <p>⭐ {job.rating}</p>
              <p>{job.jobDescription}</p>
              <p>{job.location}</p>
              <p>{job.employmentType}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {apiState} = this.state

    switch (apiState) {
      case apiStatus.LOADING:
        return this.renderLoadingView()

      case apiStatus.SUCCESS:
        return this.renderSuccessView()

      case apiStatus.FAILURE:
        return this.renderFailureView()

      default:
        return null
    }
  }
}

export default JobsDetail
