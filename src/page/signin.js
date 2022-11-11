import axios from "axios";
import Cookies from "js-cookie";
import {useState} from "react";
import { useNavigate } from "react-router-dom";


const Signin = ({setToken}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleEmailChange = event => {
        const value = event.target.value;
        setEmail(value);
    };
    const handlePasswordChange = event => {
        const value = event.target.value;
        setPassword(value);
    };

    const handleSubmit = async(ev) => {

        try {
            ev.preventDefault();
            console.log(ev)
            const response = await axios.post(
                "https://api--vinted-backend--lmfr2nmdlttd.code.run/user/signin",
                {
                    email: email,
                    password: password,
                }
            );
            Cookies.set("userToken", response.data.token);
            setToken(response.data.token);
            navigate("/");
        } catch (error) {
            alert(error.response);
        }
    };
    return(
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl tracking-tight text-zinc-600">Connexion</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-600">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-zinc-600">
                                Mot de passe
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="btn btn-primary block w-full"
                            >
                               Se connecter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signin