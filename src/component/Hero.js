
const Hero =()=> {
    return (
        <div className="lg:relative flex items-center">
            <div className="z-10 absolute w-full text-center lg:text-left flex">
                <div className={"relative container"}>
                    <div className={"bg-white lg:px-8 mx-4 w-1/3"}>
                        <div className={"p-12"}>
                        <p className=" mb-3 text-4xl text-zinc-700">
                            Prêts à faire
                            du tri dans vos placards ?</p>
                        <a href="#toto"
                           className="btn btn-md btn-primary block text-center text-lg">Vends maintenant</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative h-[70vh] w-full">
                <img className="absolute inset-0 h-full w-full object-cover"
                     src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
                     alt=""/>
            </div>
        </div>
    )
}

export default Hero