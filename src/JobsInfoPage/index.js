import './index.css'
import {Link} from 'react-router-dom'

const JobsInfoPage = ({
  companyLogoUrl,
  employmentType,
  id,
  jobDesc,
  location,
  totalSalary,
  rating,
  title,
}) => (
  <Link to={`/jobs/${id}`}>
    <div className="main-cont-aniket">
      <div className="job-head">
        <img src={companyLogoUrl} className="logo" alt="company logo" />
        <div className="head-info-aniket">
          <h1 className="head-aniket">{title}</h1>
          <p className="head-aniket">{rating}</p>
        </div>
      </div>
      <hr className="line-aniket" />
      <div className="job-type-info">
        <div className="type-info-container">
          <p className="type-info-aniket">{location}</p>
          <p className="type-info-aniket">{employmentType}</p>
        </div>
        <p className="salary-aniket">{totalSalary}</p>
      </div>
      <hr className="line-aniket" />
      <div className="job-info-content">
        <h1 className="desc-head-aniket">Description</h1>
        <p className="desc-aniket">{jobDesc}</p>
      </div>
    </div>
  </Link>
)

export default JobsInfoPage
