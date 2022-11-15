import { HeartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const FeaturedProducts = ({ data, title }) => {
  return (
    <section className={'bg-white'}>
      <div className={'container py-12'}>
        <div className={'flex items-center justify-between'}>
          <h2 className="text-color-body-ultra text-2xl">{title}</h2>
          <a className={'text-teal-600'} href={'#toto'}>
            Voir tout
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8">
          {data.offers.map((product) => (
            <div key={product._id} className="group relative">
              {product.product_pictures.length !== 0 && (
                <div className="h-80 w-full overflow-hidden rounded-md bg-zinc-100 group-hover:opacity-75">
                  <img
                    src={product.product_pictures[0].url}
                    alt="product"
                    className="h-full w-full object-cover object-center "
                  />
                </div>
              )}
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="text-color-body-ultra text-sm">
                    <Link to={`/offer/${product._id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.product_price}€
                    </Link>
                  </h3>
                  <p className="text-color-body-light text-sm">xxl / 44 / 16</p>
                  <p className="text-color-body-light text-sm">
                    {product.product_details[0].MARQUE}
                  </p>
                </div>
                <p className="flex items-center text-sm font-medium text-gray-900 ">
                  <HeartIcon className={'text-color-body h-4 w-4'}></HeartIcon>
                  <span>5</span>
                </p>
              </div>
            </div>
          ))}

          <div className="group relative flex items-center justify-center bg-zinc-100">
            <a href="#more">
              <span aria-hidden="true" className="absolute inset-0" />
              voir plus
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
