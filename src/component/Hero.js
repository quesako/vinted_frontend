import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="flex items-center lg:relative">
      <div className="absolute z-10 flex w-full text-center lg:text-left">
        <div className={'container relative'}>
          <div className={'w-1/3 bg-white lg:px-8'}>
            <div className={'p-12'}>
              <p className=" text-color-body-ultra mb-3 text-4xl">
                Prêts à faire du tri dans vos placards ?
              </p>
              <Link to={'/publish'} className="btn btn-md btn-primary block">
                Vends maintenant
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[70vh] w-full">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
          alt=""
        />
      </div>
    </div>
  )
}

export default Hero
