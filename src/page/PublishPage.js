import axios from 'axios'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const PublishPage = ({ token }) => {
  const [isPosted, setIsPosted] = useState(false)
  const [titre, setTitre] = useState('')
  const [desc, setDesc] = useState('')
  const [marque, setMarque] = useState('')
  const [taille, setTaille] = useState('')
  const [couleur, setCouleur] = useState('')
  const [etat, setEtat] = useState('')
  const [lieu, setLieu] = useState('')
  const [prix, setPrix] = useState(0)
  const [file, setFile] = useState('')

  const handleSubmit = async (ev) => {
    ev.preventDefault()

    const formData = new FormData()
    formData.append('picture', picture)
    formData.append('title', titre)
    formData.append('description', desc)
    formData.append('brand', marque)
    formData.append('color', couleur)
    formData.append('condition', etat)
    formData.append('city', lieu)
    formData.append('price', prix)
    /*@todo add file[0]*/
    console.log(formData)
    try {
      const response = await axios.post(
        'https://api--vinted-backend--lmfr2nmdlttd.code.run/offer/publish',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      setIsPosted(true)
    } catch (err) {
      console.error(err.response.data.msg)
    }
  }

  return (
    <>
      {token ? (
        <div className={'bg-zinc-100'}>
          {!isPosted ? (
            <form className={'mx-auto max-w-5xl py-4'} onSubmit={handleSubmit}>
              {/*image*/}
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="picture"
                    className="text-color-body-light block text-sm font-medium"
                  >
                    Image de l'offre
                  </label>
                  <div className="border-1 mt-1 flex justify-center rounded-md  bg-white px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="picture"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Télécharger un fichier</span>
                          <input
                            id="picture"
                            name="picture"
                            type="file"
                            className="sr-only"
                            onChange={(event) => {
                              setFile(event.target.files[0])
                            }}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF jusqu'a 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/*title desc*/}
              <div className={'my-6 bg-white p-4'}>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                      <label
                        htmlFor="title"
                        className="text-color-body-light block text-sm font-medium sm:mt-px sm:pt-2"
                      >
                        Titre de l'annonce
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="titre"
                          id="titre"
                          value={titre}
                          onChange={(ev) => {
                            setTitre(ev.target.value)
                          }}
                          autoComplete="titre"
                          className="block w-full  rounded-md border-gray-300 shadow-sm focus:border-teal-700/40 focus:ring-teal-700/20  sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                      <label
                        htmlFor="desc"
                        className="text-color-body-light block text-sm font-medium sm:mt-px sm:pt-2"
                      >
                        Description de l'annonce
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="desc"
                          id="desc"
                          value={desc}
                          onChange={(ev) => {
                            setDesc(ev.target.value)
                          }}
                          autoComplete="description"
                          className="block w-full  rounded-md border-gray-300 shadow-sm focus:border-teal-700/40 focus:ring-teal-700/20  sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*features*/}
              <div className={'my-6 bg-white p-4'}>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                      <label
                        htmlFor="marque"
                        className="text-color-body-light block text-sm font-medium sm:mt-px sm:pt-2"
                      >
                        Marque
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="marque"
                          id="marque"
                          autoComplete="marque"
                          value={marque}
                          onChange={(ev) => {
                            setMarque(ev.target.value)
                          }}
                          className="block w-full  rounded-md border-gray-300 shadow-sm focus:border-teal-700/40 focus:ring-teal-700/20  sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                      <label
                        htmlFor="taille"
                        className="text-color-body-light block text-sm font-medium sm:mt-px sm:pt-2"
                      >
                        Taille
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="taille"
                          id="taille"
                          value={taille}
                          onChange={(ev) => {
                            setTaille(ev.target.value)
                          }}
                          autoComplete="taille"
                          className="block w-full  rounded-md border-gray-300 shadow-sm focus:border-teal-700/40 focus:ring-teal-700/20  sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                      <label
                        htmlFor="couleur"
                        className="text-color-body-light block text-sm font-medium sm:mt-px sm:pt-2"
                      >
                        Couleur
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="couleur"
                          id="couleur"
                          value={couleur}
                          onChange={(ev) => {
                            setCouleur(ev.target.value)
                          }}
                          autoComplete="couleur"
                          className="block w-full  rounded-md border-gray-300 shadow-sm focus:border-teal-700/40 focus:ring-teal-700/20  sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                      <label
                        htmlFor="etat"
                        className="text-color-body-light block text-sm font-medium sm:mt-px sm:pt-2"
                      >
                        État
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="etat"
                          id="etat"
                          value={etat}
                          onChange={(ev) => {
                            setEtat(ev.target.value)
                          }}
                          autoComplete="etat"
                          className="block w-full  rounded-md border-gray-300 shadow-sm focus:border-teal-700/40 focus:ring-teal-700/20  sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                      <label
                        htmlFor="lieu"
                        className="text-color-body-light block text-sm font-medium sm:mt-px sm:pt-2"
                      >
                        Lieu
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="lieu"
                          id="lieu"
                          value={lieu}
                          onChange={(ev) => {
                            setLieu(ev.target.value)
                          }}
                          autoComplete="lieu"
                          className="block w-full  rounded-md border-gray-300 shadow-sm focus:border-teal-700/40 focus:ring-teal-700/20  sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*price*/}
              <div className={'my-6 bg-white p-4'}>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                      <label
                        htmlFor="prix"
                        className="text-color-body-light block text-sm font-medium sm:mt-px sm:pt-2"
                      >
                        Prix
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="number"
                          name="prix"
                          id="prix"
                          value={prix}
                          onChange={(ev) => {
                            setPrix(ev.target.value)
                          }}
                          autoComplete="price"
                          className="block w-full  rounded-md border-gray-300 shadow-sm focus:border-teal-700/40 focus:ring-teal-700/20  sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className={'btn btn-md btn-primary'}>Ajouter</button>
            </form>
          ) : (
            <div className={'flex min-h-screen items-center justify-center'}>
              <p>Votre offre est postée !</p>
            </div>
          )}
        </div>
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  )
}

export default PublishPage
