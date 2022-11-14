import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const ProductDetails = ({ data }) => {
  // carousel option
  const options = {
    all: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  }
  // secure data
  let avatarUrl = null
  let userName = 'non renseigné'
  let userNameInitial = '?'

  if (data.owner) {
    userName = data.owner?.account?.username
    userNameInitial = userName.charAt(0)
  }
  if (data.owner.account.avatar) {
    avatarUrl = data.owner.account?.avatar.secure_url

    userNameInitial = userName.charAt(0)
  }

  return (
    <div className={'min-h-screen bg-zinc-100'}>
      <div className={'container'}>
        <div className="pt-12 lg:grid lg:grid-cols-4 lg:items-start lg:gap-x-8">
          <div className="col-span-3 flex flex-col-reverse">
            {data.product_pictures.length !== 0 ? (
              <Carousel responsive={options}>
                {data.product_pictures.map((picture, index) => {
                  return (
                    <img
                      className={'aspect-[4/3] w-full bg-zinc-200 object-cover'}
                      src={picture.secure_url}
                      alt={`Image ${index + 1}  of "${data.product_name}"`}
                    />
                  )
                })}
              </Carousel>
            ) : (
              <p>Aucun visuel n'est disponnnible pour cette offre</p>
            )}
          </div>
          <div className="flex flex-col bg-white p-4">
            {/* use flex order to display a correct tag strucure for seo */}
            <div className="order-3 border-t py-3">
              <h1>{data.product_name}</h1>
              <p className={'text-sm text-zinc-400'}>
                {data.product_description}
              </p>
              <div className={'mt-4 flex items-center'}>
                {avatarUrl ? (
                  <img
                    className="inline-block h-8 w-8 rounded-full"
                    src={avatarUrl}
                    alt=""
                  />
                ) : (
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-600">
                    <span className="text-xl font-medium leading-none text-white">
                      {userNameInitial}
                    </span>
                  </span>
                )}
                <span className={'ml-2 text-sm'}>{userName}</span>
              </div>
            </div>
            <h2 className="sr-only">Product detail</h2>
            <div className="order-2 py-3 ">
              <div className={'flex flex-col'}>
                {data.product_details.map((detail) => {
                  return (
                    <p className="align-items my-1 flex justify-between text-xs text-zinc-400">
                      <span className={'uppercase'}>{Object.keys(detail)}</span>
                      <span className={'ml-2 truncate text-zinc-600'}>
                        {detail[Object.keys(detail)]}
                      </span>
                    </p>
                  )
                })}
              </div>
            </div>
            <p className="order-1 text-xl tracking-tight text-zinc-600">
              {data.product_price}€
            </p>
          </div>
        </div>
      </div>
    </div>
    /*<p>{data.product_name}</p>*/
  )
}

export default ProductDetails
