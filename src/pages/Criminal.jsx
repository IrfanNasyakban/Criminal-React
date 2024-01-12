import React, { useEffect } from 'react'
import Layout from './Layout'
import CriminalList from '../components/CriminalList'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from "../features/authSlice"

const Criminal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isError} = useSelector((state => state.auth))

  useEffect(()=> {
    dispatch(getMe())
  }, [dispatch])

  useEffect(()=> {
    if (isError){
      navigate("/")
    }
  }, [isError, navigate])

  return (
    <Layout>
        <CriminalList/>
    </Layout>
  )
}

export default Criminal