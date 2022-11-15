import Hero from '../component/Hero'
import FeaturedProducts from '../component/FeaturedProducts'
import GridProducts from '../component/GridProducts'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../component/Loader'

const HomePage = ({ search }) => {
  const [popularsData, setPopularsData] = useState()
  const [isLoadingPopularsData, setIsLoadingPopularsData] = useState(true)

  const [lastData, setLastData] = useState()
  const [isLoadingLastData, setIsLoadingLastData] = useState(true)

  const [myData, setMyData] = useState()
  const [isLoadingMyData, setIsLoadingMyData] = useState(true)

  /* Fetch Api reacteur to display populars offers */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://lereacteur-vinted-api.herokuapp.com/offers?page=1&limit=5'
        )
        setPopularsData(response.data)
        setIsLoadingPopularsData(false)
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [search])

  /* Fetch Api reacteur to display populars offers */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://lereacteur-vinted-api.herokuapp.com/offers?page=2&limit=12'
        )
        setLastData(response.data)
        setIsLoadingLastData(false)
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [])

  /* Fetch My API to display new published offers */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/offers')
        setMyData(response.data)
        setIsLoadingMyData(false)
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Hero />

      {!isLoadingPopularsData ? (
        <FeaturedProducts
          data={popularsData}
          title={'Articles populaires (api reacteur)'}
        ></FeaturedProducts>
      ) : (
        <Loader></Loader>
      )}

      {!isLoadingLastData ? (
        <GridProducts
          data={lastData}
          title={'Derniers articles (api Le Reacteur)'}
        ></GridProducts>
      ) : (
        <Loader></Loader>
      )}

      {/*{!isLoadingMyData ? (
        <GridProducts
          data={myData}
          title={'Ajoutés récemment (my api)'}
        ></GridProducts>
      ) : (
        <Loader></Loader>
      )}*/}
    </>
  )
}

export default HomePage
