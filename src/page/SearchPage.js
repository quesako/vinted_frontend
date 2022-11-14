import GridProducts from "../component/GridProducts";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useDebounce} from "use-debounce";
import {Switch} from "@headlessui/react";
import {Range} from "react-range";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SearchPage = ({
                        search,
                        values,
                        setValues,
                        enabledFilteringByPrice,
                        setEnabledFilteringByPrice
                    }
) => {

    const [searchData, setSearchData] = useState();
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [debouncedSearch] = useDebounce(search, 1000);

    // Use for display popular offers
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://lereacteur-vinted-api.herokuapp.com/offers?title=${debouncedSearch}`);
                console.log(response.data);
                setSearchData(response.data);
                if (debouncedSearch) {
                    setIsDataLoading(false);
                }
            } catch (error) {
                console.log(error.response); // contrairement au error.message d'express
            }
        };
        fetchData();
    }, [debouncedSearch]);


    return (
        <>

            <div className={"max-w-7xl mx-auto py-4"}>
                <div className={"flex items-center  py-4"}>
                    <div className={"flex"}>
                        <p className={"flex-grow  mr-2"}>Trier par prix:</p>
                        <Switch
                            checked={enabledFilteringByPrice}
                            onChange={setEnabledFilteringByPrice}
                            className={classNames(
                                enabledFilteringByPrice ? 'bg-teal-700' : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2'
                            )}
                        >
                            <span className="sr-only">filter by price</span>
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    enabledFilteringByPrice ? 'translate-x-5' : 'translate-x-0',
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
                            onChange={(number) => {
                                setValues(number)
                            }}
                            renderTrack={({props, children}) => (
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
                            renderThumb={({props, isDragged, index}) => (
                                <div
                                    className={'focus:outline-none'}
                                    {...props}
                                    style={{
                                        ...props.style,
                                        width: 0,
                                        height: 0,
                                        borderLeft: "10px solid transparent",
                                        borderRight: "10px solid transparent",
                                        borderTop: "10px solid #10766e",
                                    }}
                                >
                                    <div

                                        style={{
                                            position: 'absolute',
                                            top: '-34px',
                                            left: '-25px',
                                            minWidth: '50px',
                                            color: '#fff',
                                            fontSize: '12px',
                                            fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                                            padding: '4px',
                                            textAlign: 'center',
                                            borderRadius: '2px',
                                            backgroundColor: '#10766e'
                                        }}
                                    >
                                        {values[index].toFixed(0)}{' €'}
                                    </div>

                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>


            {!isDataLoading ? (
                <GridProducts data={searchData} showMore={false}
                              title={`Votre recherche pour "${debouncedSearch}"`}></GridProducts>
            ) : (
                <p> Chargement en cour...</p>
            )}
        </>
    )
}

export default SearchPage