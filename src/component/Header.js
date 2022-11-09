import logo from "../assets/logo.svg"
import {QuestionMarkCircleIcon} from "@heroicons/react/24/outline";

const Header =()=>{
    return(
    <div
        className="sticky top-0 z-40 w-full lg:z-50 lg:border-b lg:border-slate-900/10 bg-white/95 s">
        <div className="max-w-7xl mx-auto">
              <div
                className="py-1 border-b border-slate-900/10 lg:px-8 lg:border-0 mx-4 lg:mx-0">
                <div className="relative flex items-center">
                    <a
                        className="mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto mr-8" href="/">
                        <span className="sr-only">Vinted</span>
                        <img src={logo} alt={"logo vinted"}/>
                    </a>

                    <div className="ml-3 bg-slate-400/10 rounded-md py-1 px-3 flex items-center hover: bg-slate-400/20 flex-1">
                        <span className="border-r text-sm border-zinc-500  text-zinc-600 pr-2">Articles</span>
                        <div className={"w-full"}>
                            <label htmlFor="email" className="sr-only">
                                Search
                            </label>
                            <input
                                type="search"
                                name="search"
                                id="search"
                                className="w-full text-zinc-600 p-1 text-sm block w-full bg-transparent border-none focus:border-trans focus:ring-none "
                                placeholder="Rechercher des articles"
                            />
                        </div>
                    </div>
                    <div className="relative flex items-center ml-12">
                        <nav>
                            <ul className="flex space-x-2">
                                <li>
                                    <a className="btn btn-sm btn-primary"
                                       href="#toto">Se connecter | s'inscrire</a></li>
                                <li>
                                    <a href="#toto"
                                       className="btn btn-sm btn-primary-outline">Vends tes articles</a>
                                </li>
                                <li className="flex items-center justify-center">
                                    <a  href="#toto">
                                        <QuestionMarkCircleIcon className={"h-6 w-6 text-zinc-600"}></QuestionMarkCircleIcon>
                                    </a>
                                </li>
                                <li  className="flex items-center justify-center">
                                    <a className=" text-zinc-600" href="#toto">fr</a>
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