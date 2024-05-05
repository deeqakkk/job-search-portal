import React, { useEffect, useState } from 'react'
import styles from '../stylesheet.module.css'
import Select from 'react-select'
import { addJD, updateTotalCount } from '../../redux/store.js'
import { fetchJobs } from '../../util/fetchJobs.js'
import {
  DEFAULT_FILTER_STATE,
  EXPERIENCE,
  LOCATION,
  PAY,
  ROLES,
} from '../../util/filters.js'
import makeAnimated from 'react-select/animated'
import { useSelector, useDispatch } from 'react-redux'
import JobCard from '../card/index.jsx'
import { filterData } from '../../util/index'
import LinearProgress from '@mui/material/LinearProgress'
import { Box } from '@mui/material'
const animatedComponents = makeAnimated()

const JobPosts = () => {
  const dispatch = useDispatch()
  const jdList = useSelector((state) => state.jdList)
  const locations = useSelector((state) => state.locations)
  const [tempJDList, setTempJDList] = useState([])
  const [filter, setFilter] = useState(DEFAULT_FILTER_STATE)
  const [loading, setLoading] = useState(false)
  
  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 5
    ) {
      jobsData()
    }
  }

  const jobsData = async () => {
    setLoading(true)
    try {
      const data = await fetchJobs()
      if (!data) return
      dispatch(addJD(data?.jdList))
      dispatch(updateTotalCount(data?.totalCount))
      setTempJDList(data?.jdList)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll, {
      passive: true,
    })
    return () => window.removeEventListener('scroll', handleInfiniteScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    jobsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const filteredData = filterData(filter, jdList)
    setTempJDList(filteredData)
  }, [filter, jdList])

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.inputWarpper}>
          {filter?.roles?.length > 0 && (
            <label htmlFor="role" className={styles.label}>
              Role
            </label>
          )}
          <Select
            closeMenuOnSelect={false}
            inputId="role"
            components={animatedComponents}
            isMulti
            options={ROLES}
            className={styles.select}
            classNamePrefix="select"
            placeholder="Role"
            onChange={(data) =>
              setFilter({ ...filter, roles: data.map((e) => e.value) })
            }
          />
        </div>
        <div className={styles.inputWarpper}>
          {filter?.experience && (
            <label htmlFor="experience" className={styles.label}>
              Experience
            </label>
          )}
          <Select
            inputId="experience"
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={EXPERIENCE}
            className={styles.select}
            classNamePrefix="select"
            placeholder="Experience"
            isClearable={true}
            onChange={(data) =>
              setFilter({ ...filter, experience: data?.value || null })
            }
          />
        </div>
        <div className={styles.inputWarpper}>
          {filter?.location?.length > 0 && (
            <label htmlFor="location" className={styles.label}>
              Location
            </label>
          )}
          <Select
            inputId="location"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={locations.map((location) => ({
              label: location,
              value: location,
            }))}
            className={styles.select}
            classNamePrefix="select"
            placeholder="Location"
            onChange={(data) =>
              setFilter({ ...filter, location: data.map((e) => e.value) })
            }
          />
        </div>
        <div className={styles.inputWarpper}>
          {filter?.locationType?.length > 0 && (
            <label htmlFor="locationType" className={styles.label}>
              Work Mode
            </label>
          )}

          <Select
            inputId="locationType"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={LOCATION}
            className={styles.select}
            classNamePrefix="select"
            placeholder="Remote"
            onChange={(data) =>
              setFilter({ ...filter, locationType: data.map((e) => e.value) })
            }
          />
        </div>
        <div className={styles.inputWarpper}>
          {filter?.minPay && (
            <label htmlFor="basepay" className={styles.label}>
              Base Pay
            </label>
          )}
          <Select
            inputId="basepay"
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={PAY}
            className={styles.select}
            classNamePrefix="select"
            placeholder="Min Base Pay"
            onChange={(data) => setFilter({ ...filter, minPay: data.value })}
          />
        </div>
        <div className={styles.inputWarpper}>
          {filter?.name && (
            <label htmlFor="companyName" className={styles.label}>
              Company Name
            </label>
          )}
          <input
            id="companyName"
            type="text"
            placeholder="Company Name"
            className={styles.input}
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.jobs}>
        {tempJDList?.length > 0
          ? tempJDList?.map((jd, i) => <JobCard key={i} job={jd} />)
          : !loading && <p>No Jobs Found</p>}
        {loading && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress sx={{ height: '20px' }} />
          </Box>
        )}
      </div>
    </div>
  )
}

export default JobPosts
