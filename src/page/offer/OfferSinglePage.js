import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProductDetails from '../../component/ProductDetails'
import Loader from '../../component/Loader'

const OfferSinglePage = () => {
  const { id } = useParams()
  const [singleData, setSingleData] = useState()
  const [isSingleLoading, setIsSingleLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        )
        setSingleData(response.data)
        setIsSingleLoading(false)
      } catch (error) {
        console.log(error.response) // contrairement au error.message d'express
      }
    }
    fetchData()
  }, [])

  return (
    <>{!isSingleLoading ? <ProductDetails data={singleData} /> : <Loader />}</>
  )
}

export default OfferSinglePage
