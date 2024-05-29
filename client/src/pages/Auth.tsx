import React, { FC, useState } from "react";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/inputs/TextInput";
import PasswordInput from "../components/inputs/PasswordInput";
import SolidButton from "../components/buttons/SolidButton";

const Auth: FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.registration({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
            })
            

            if(data) {
                toast.success("An account has been created");
                setIsLogin((isLoginState) => !isLoginState)
            }
        } catch(err: any) {
            const errorData = err.response?.data.message;
            
            if (Array.isArray(errorData)) {
                errorData.forEach((msg: string) => toast.error(msg));
            } else {
                toast.error(errorData);
            }
        }
    }

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.login({
                email,
                password
            })

            if(data) {
                setTokenToLocalStorage('access_token', data.access_token)
                dispatch(login(data.user));
                toast.success("You were logged in")
                navigate('/');
            }
        } catch(err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    }

    const handleResetStates = () => {
        setFirstName('');
        setLastName('');
        setPassword('');
        setEmail('');
    }

    return <div className="bg-dark-gray max-h-full w-full flex justify-center items-center h-screen">
            <div className="bg-light-gray p-3 lg:p-9 rounded-xl">
                <h2 className="text-2xl text-center p-0 text-dark-yellow font-medium">{isLogin ? "Login" : "Registration"}</h2>
                <form className="mt-9 flex flex-col gap-6" onSubmit={isLogin ? loginHandler : registrationHandler}>
                    {!isLogin && (
                        <>
                            <TextInput fieldName="Firstname" value={firstName} onChange={(value) => setFirstName(value)} required={true}/>
                            <TextInput fieldName="Lastname" value={lastName} onChange={(value) => setLastName(value)} required={true}/>
                        </>
                    )}
                    <TextInput fieldName="Email" value={email} onChange={(value) => setEmail(value)} required={true}/>
                    <PasswordInput value={password} onChange={(value) => setPassword(value)} required={true}/>
                    <SolidButton type="submit">{isLogin ? "Login" : "Sign Up"}</SolidButton>
                </form>
                <div className="text-center mt-2.5">
                    {isLogin ? (
                        <>
                            <span className="text-white/75 pr-1.5">Don't have an account?</span>
                            <button className="text-dark-yellow" onClick={() => {
                                setIsLogin(false)
                                handleResetStates()
                            }}>Register</button>
                        </>
                    ) : (
                        <>
                            <span className="text-white/75 pr-1.5">Already have an account?</span>
                            <button className="text-dark-yellow" onClick={() => {
                                setIsLogin(true)
                                handleResetStates()
                            }}>Login</button>
                        </>
                    )}
                </div>
            </div>
        </div>
}

export default Auth;