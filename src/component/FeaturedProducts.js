import {HeartIcon} from "@heroicons/react/24/outline";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const FeaturedProducts = ({data}) => {
    return (
        <div className={"container mt-12"}>
            <div className={"flex items-center justify-between"}>
                <h2 className="text-2xl text-zinc-900">Articles populaires</h2>
                <a className={"text-teal-600"} href={"#toto"}>Voir tout</a>
            </div>


            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8">
                {data.offers.map((product) => (

                    <div key={product._id} className="group relative">
                        {product.product_pictures.length !==0 &&
                        <div
                            className="h-80 w-full overflow-hidden rounded-md bg-zinc-100 group-hover:opacity-75">
                            <img
                                src={product.product_pictures[0].url}
                                alt="product"
                                className="h-full w-full object-cover object-center "
                            />
                        </div>
                        }
                        <div className="mt-4 flex justify-between items-start">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <Link to={`/offer/${product._id}`}>
                                    <span aria-hidden="true" className="absolute inset-0"/>

                                    {product.product_price}€
                                    </Link>
                                </h3>
                                <p className="text-sm text-zinc-400">xxl / 44 / 16</p>
                                <p className="text-sm text-zinc-400">{product.product_details[0].MARQUE}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900 flex items-center ">
                                <HeartIcon className={"w-4 h-4 text-zinc-600"}></HeartIcon>
                                <span>5</span>
                            </p>
                        </div>
                    </div>

                ))}

                <div className="group relative bg-zinc-100 flex items-center justify-center">
                    <a href="#toto">
                        <span aria-hidden="true" className="absolute inset-0" />
                        voir plus
                    </a>
                </div>

            </div>
        </div>
    )
}

export default FeaturedProducts