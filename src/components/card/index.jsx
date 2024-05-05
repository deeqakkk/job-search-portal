import React, { useState } from 'react'
import styles from '../stylesheet.module.css'
import { capitalizeFirstLetter } from '../../util/index'

const JobCard = ({ job }) => {
  const [showMore, setShowMore] = useState(false)
  const {
    companyName = '',
    jobRole = '',
    location = '',
    minJdSalary = '',
    jobDetailsFromCompany = '',
    minExp = '',
    logoUrl = '',
    jdLink = '',
  } = job

  const readLessAndMoreStyle = {
    cursor: 'pointer',
    color: 'blue',
    display: 'block',
  }
  return (
    <div className={styles.card}>
      <div className={styles.companyInfo}>
        <div className={styles.logo}>
          <img
            alt="logo"
            src={logoUrl}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem',
          }}
        >
          <span style={{ fontWeight: 'bold', color: '#8b8b8b' }}>
            {companyName}
          </span>
          <span>{capitalizeFirstLetter(jobRole)}</span>
          <span style={{ fontSize: 14 }}>
            {capitalizeFirstLetter(location)}
          </span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '1rem',
          fontWeight: '400',
        }}
      >
        <span>Estimated Salary:</span>
        <span>{minJdSalary ? minJdSalary + 'LPA' : 'Undisclosed'}</span>
        <span>✅</span>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexDirection: 'column',
          marginTop: '0.5rem',
          alignItems: 'start',
        }}
      >
        <span style={{ fontWeight: 'bold' }}>Job Details:</span>
        <div
          className={styles.jobDetail}
          style={{ height: showMore ? 'fit-content' : '12rem' }}
          onClick={() => showMore && setShowMore(false)}
        >
          <span>
            {jobDetailsFromCompany}{' '}
            {showMore && (
              <span
                style={readLessAndMoreStyle}
                onClick={() => setShowMore(!showMore)}
              >
                Read Less
              </span>
            )}
          </span>

          {!showMore && <div className={styles.overlay} />}
          {!showMore && (
            <span
              style={{
                position: 'absolute',
                bottom: '1rem',
                ...readLessAndMoreStyle,
              }}
              onClick={() => setShowMore(!showMore)}
            >
              View Job
            </span>
          )}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '0.2rem',
          marginTop: '1rem',
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <span
          style={{ fontWeight: 'bold', color: '#8b8b8b', letterSpacing: '1px' }}
        >
          Minimum Experience
        </span>
        <span>{minExp || 0} years</span>
      </div>
      <a
        className={styles.button}
        href={jdLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        ⚡ Easy Apply
      </a>
    </div>
  )
}

export default JobCard
