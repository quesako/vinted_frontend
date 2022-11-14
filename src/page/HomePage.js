import Hero from "../component/Hero";
import FeaturedProducts from "../component/FeaturedProducts";
import GridProducts from "../component/GridProducts";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import { Switch } from '@headlessui/react'
import { Range } from 'react-range';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const HomePage =() =>{
    const[values, SetValues] = useState([1,1000])

    const [featuredData, setFeaturedData] = useState();
    const [isFeaturedLoading, setIsFeaturedLoading] = useState(true);
    const [gridData, setGridData] = useState();
    const [isGridLoading, setIsGridLoading] = useState(true);
    const [enabled, setEnabled] = useState(false)

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
            <div className={"max-w-7xl mx-auto py-4"}>
                <div className={"flex items-center  py-4"}>
                    <div className={"flex"}>
                        <p className={"flex-grow  mr-2"}>Trier par prix:</p>
                        <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className={classNames(
                                enabled ? 'bg-teal-700' : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2'
                            )}
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    enabled ? 'translate-x-5' : 'translate-x-0',
                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                )}
                            />
                        </Switch>
                    </div>
                    <div className={"flex items-center flex-1 w-full justify-between ml-2"}>
                        <p className={" min-w-[120px] w-auto"}>Prix entre:</p>
                        <Range
                            classNames={"w-auto"}
                            step={1}
                            min={1}
                            max={1000}
                            values={values}
                            onChange={(number)=>{
                                SetValues(number)
                            }}
                            renderTrack={({ props, children }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '4px',
                                        width: '100%',
                                        backgroundColor: '#f4f4f5'
                                    }}
                                >
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props,isDragged ,index}) => (
                                <div
                                    className={'focus:outline-none'}
                                    {...props}
                                    style={{
                                        ...props.style,
                                        width: 0,
                                        height:0,
                                        borderLeft: "10px solid transparent",
                                        borderRight: "10px solid transparent",
                                        borderTop: "10px solid #10766e",
                                    }}
                                >
                                    <div

                                        style={{
                                            position: 'absolute',
                                            top: '-34px',
                                            left:'-25px',
                                            minWidth:'50px',
                                            color: '#fff',
                                            fontSize: '12px',
                                            fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                                            padding: '4px',
                                            textAlign:'center',
                                            borderRadius: '2px',
                                            backgroundColor: '#10766e'
                                        }}
                                    >
                                        {values[index].toFixed(0) }{' €'}
                                    </div>

                                </div>

                            )}
                        />
                    </div>
                </div>


            </div>
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