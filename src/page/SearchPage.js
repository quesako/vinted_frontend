import GridProducts from '../component/GridProducts'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDebounce } from 'use-debounce'
import { Switch } from '@headlessui/react'
import { Range } from 'react-range'
import Loader from '../component/Loader'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SearchPage = ({
  search,
  values,
  setValues,
  enabledFilteringByPrice,
  setEnabledFilteringByPrice,
}) => {
  const [searchData, setSearchData] = useState()
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [debouncedSearch] = useDebounce(search, 1000)

  // Use for display popular offers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${debouncedSearch}`
        )
        console.log(response.data)
        setSearchData(response.data)
        if (debouncedSearch) {
          setIsDataLoading(false)
        }
      } catch (error) {
        console.log(error.response) // contrairement au error.message d'express
      }
    }
    fetchData()
  }, [debouncedSearch])

  return (
    <>
      <div className={'bg-white py-4'}>
        <div className={'container'}>
          <h1 className={'text-color-body-ultra text-2xl'}>
            Votre recherche pour " {debouncedSearch}"
          </h1>
        </div>
      </div>

      {!isDataLoading ? (
        <>
          {/*Filters @ todo*/}
          <div className={'bg-white'}>
            <div className={'container'}>
              <div className={'flex items-center border-t border-b py-4'}>
                <div className={'flex items-center'}>
                  <p className={'mr-2 flex-grow text-xs'}>Filtrer:</p>
                  <Switch
                    checked={enabledFilteringByPrice}
                    onChange={setEnabledFilteringByPrice}
                    className={classNames(
                      enabledFilteringByPrice ? 'bg-teal-700' : 'bg-gray-200',
                      'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2'
                    )}
                  >
                    <span className="sr-only">Filtrer par prix</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        enabledFilteringByPrice
                          ? 'translate-x-4'
                          : 'translate-x-0',
                        'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>
                <div
                  className={'ml-2 flex w-full items-center justify-between'}
                >
                  <p className={'mr-2 w-auto min-w-[120px] text-right text-xs'}>
                    Prix entre:
                  </p>
                  <Range
                    classNames={''}
                    step={1}
                    min={1}
                    max={1000}
                    values={values}
                    onChange={(number) => {
                      setValues(number)
                    }}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '1px',
                          width: '100%',
                          backgroundColor: '#0f172a1a',
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props, isDragged, index }) => (
                      <div
                        className={'focus:outline-none'}
                        {...props}
                        style={{
                          ...props.style,
                          width: 0,
                          height: 0,
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderTop: '6px solid #10766e',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '-24px',
                            left: '-25px',
                            minWidth: '50px',
                            color: '#fff',
                            fontSize: '10px',
                            fontFamily:
                              'Arial,Helvetica Neue,Helvetica,sans-serif',
                            padding: '2px',
                            textAlign: 'center',
                            borderRadius: '2px',
                            backgroundColor: '#10766e',
                          }}
                        >
                          {values[index].toFixed(0)}
                          {' €'}
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <GridProducts data={searchData} showMore={false}></GridProducts>
        </>
      ) : (
        <Loader></Loader>
      )}
    </>
  )
}

export default SearchPage
