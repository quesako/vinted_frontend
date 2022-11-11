import Hero from "../component/Hero";
import FeaturedProducts from "../component/FeaturedProducts";
import GridProducts from "../component/GridProducts";
import {useEffect, useState} from "react";
import axios from "axios";


const HomePage =() =>{
    const [featuredData, setFeaturedData] = useState();
    const [isFeaturedLoading, setIsFeaturedLoading] = useState(true);
    const [gridData, setGridData] = useState();
    const [isGridLoading, setIsGridLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers?page=1&limit=5");
                console.log(response.data);
                setFeaturedData(response.data);
                setIsFeaturedLoading(false);
            } catch (error) {
                console.log(error.response); // contrairement au error.message d'express
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers?page=2&limit=12");
                console.log(response.data);
                setGridData(response.data);
                setIsGridLoading(false);
            } catch (error) {
                console.log(error.response); // contrairement au error.message d'express
            }
        };
        fetchData();
    }, []);

    return(
        <>
            <Hero/>
            {!isFeaturedLoading ? (
                    <FeaturedProducts data={featuredData}></FeaturedProducts>
            ):(
                <p> chargement en cour...</p>
            )}
            {!isGridLoading ? (
                <GridProducts data={gridData}>
                </GridProducts>
            ):(
                <p> chargement en cour...</p>
            )}
        </>
    )
}

export default HomePage