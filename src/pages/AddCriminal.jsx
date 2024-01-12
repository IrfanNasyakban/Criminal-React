import React, { useEffect } from 'react'
import Layout from './Layout'
import FormAddCriminal from '../components/FormAddCriminal'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from "../features/authSlice"

const AddCriminal = () => {
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
        <FormAddCriminal/>
    </Layout>
  )
}

export default AddCriminal