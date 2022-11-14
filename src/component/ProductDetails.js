import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const ProductDetails =({data})=> {
    // carousel option
    const options = {
        all: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 0 },
            items: 1
        },

    };
    // secure data
    let avatarUrl = null
    let userName = "non renseigné"
    let userNameInitial = "?"

    if(data.owner) {
        avatarUrl = data.owner?.account?.avatar.secure_url;
        userName = data.owner?.account?.username
        userNameInitial = userName.charAt(0)
    }

    return (
        <div className={"bg-zinc-100 min-h-screen"}>
            <div className={"container"}>
                <div className="lg:grid lg:grid-cols-4 lg:items-start lg:gap-x-8 pt-12">
                    <div className="col-span-3 flex flex-col-reverse">
                        {
                            data.product_pictures ? (
                                <Carousel responsive={options}>
                                    {data.product_pictures.map((picture,index)=>{
                                        return  <img className={"w-full aspect-[4/3] bg-zinc-200 object-cover"} src={picture.secure_url} alt={`Image ${index+1}  of "${data.product_name}"`}/>
                                    })}
                                </Carousel>
                            ) :(
                                <p>...aucune image...</p>
                            )
                        }

                    </div>
                    <div className="bg-white p-4 flex flex-col">
                        {/* use flex order to display a correct tag strucure for seo */}
                        <div className="order-3 py-3 border-t">
                            <h1>
                                {data.product_name}
                            </h1>
                            <p className={"text-zinc-400 text-sm"}>
                                {data.product_description}
                            </p>
                            <div className={"flex items-center mt-4"}>
                                {
                                    avatarUrl ? (
                                        <img
                                            className="inline-block h-8 w-8 rounded-full"
                                            src={avatarUrl}
                                            alt=""
                                        />
                                    ) :(
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-600">
                                        <span className="text-xl font-medium leading-none text-white">{userNameInitial}</span>
                                    </span>
                                    )
                                }
                                <span className={"ml-2 text-sm"}>{userName}</span>

                            </div>
                        </div>
                        <h2 className="sr-only">Product detail</h2>
                        <div className="order-2 py-3 ">
                            <div className={"flex flex-col"}>
                                {data.product_details.map((detail)=>{
                                    return (
                                        <p className="flex align-items justify-between text-xs text-zinc-400 my-1">
                                            <span className={"uppercase"}>{Object.keys(detail)}</span>
                                            <span className={"text-zinc-600 ml-2 truncate"}>{detail[Object.keys(detail)]}</span>
                                        </p>
                                    )
                                })}
                            </div>
                        </div>
                        <p className="order-1 text-xl tracking-tight text-zinc-600">{data.product_price}€</p>
                    </div>
                </div>
            </div>
        </div>
        /*<p>{data.product_name}</p>*/


    )
}

export default ProductDetails