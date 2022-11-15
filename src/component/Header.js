import logo from '../assets/logo.svg'
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDebounce } from 'use-debounce'
import { useEffect } from 'react'

const Header = ({ token, setToken, search, setSearch }) => {
  const [debouncedSearch] = useDebounce(search, 1000)

  const navigate = useNavigate()

  const signOut = async () => {
    Cookies.remove('userToken')
    setToken(null)
  }

  const handleChange = (ev) => {
    setSearch(ev.target.value)
  }

  useEffect(() => {
    if (debouncedSearch) {
      navigate('/search')
    }
  }, [debouncedSearch])

  return (
    <div className="sticky top-0 z-40 w-full bg-white/95 lg:z-50 lg:border-b lg:border-slate-900/10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-4 border-b border-slate-900/10 py-1 lg:mx-0 lg:border-0 lg:px-8">
          <div className="relative flex items-center">
            <a
              className="mr-3 mr-8 w-[2.0625rem] flex-none overflow-hidden md:w-auto"
              href="/"
            >
              <span className="sr-only">Vinted</span>
              <img src={logo} alt={'logo vinted'} />
            </a>

            <div className="hover: ml-3 flex flex-1 items-center rounded-md bg-slate-400/10 bg-slate-400/20 py-1 px-3">
              <span className="text-color-body flex items-center  justify-center border-r border-zinc-300 pr-2 text-sm">
                <span>Articles</span>
                <ChevronDownIcon
                  className={'text-color-body-light ml-1 h-4 w-4'}
                ></ChevronDownIcon>
              </span>
              <div className={'ml-2 flex w-full items-center justify-center'}>
                <label htmlFor="email" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className={'text-color-body-light ml-1 h-4 w-4'}
                ></MagnifyingGlassIcon>

                <input
                  value={search}
                  onChange={handleChange}
                  type="search"
                  name="search"
                  id="search"
                  className="focus:border-trans focus:ring-none text-color-body-light block w-full w-full border-none bg-transparent p-1 text-sm "
                  placeholder="Rechercher des articles"
                />
              </div>
            </div>
            <div className="relative ml-12 flex items-center">
              <nav>
                <ul className="flex space-x-2">
                  {token ? (
                    <li>
                      <button
                        onClick={signOut}
                        className="btn btn-sm btn-primary"
                      >
                        Déconnexion
                      </button>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link to={'/signin'} className="btn btn-sm btn-primary">
                          Se connecter
                        </Link>
                      </li>
                      <li>
                        <Link to={'/signup'} className="btn btn-sm btn-primary">
                          S'inscrire
                        </Link>
                      </li>
                    </>
                  )}

                  <li>
                    {token ? (
                      <Link
                        to={'/publish'}
                        className="btn btn-sm btn-primary-outline"
                      >
                        Vends tes articles
                      </Link>
                    ) : (
                      <Link
                        to={'/signin'}
                        className="btn btn-sm btn-primary-outline"
                      >
                        Vends tes articles
                      </Link>
                    )}
                  </li>
                  <li className="flex items-center justify-center">
                    <a href="#toto">
                      <QuestionMarkCircleIcon
                        className={'text-color-body-light h-6 w-6'}
                      ></QuestionMarkCircleIcon>
                    </a>
                  </li>
                  <li className="flex items-center justify-center">
                    <a
                      className="text-color-body-light flex items-center justify-center"
                      href="#toto"
                    >
                      <span>fr</span>
                      <ChevronDownIcon
                        className={'text-color-body-light ml-1 h-4 w-4'}
                      ></ChevronDownIcon>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
