import React, { FC, useState } from "react";
import FormInput from "../components/inputs/FormInput";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";

const Auth: FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

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
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    }

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            
        } catch(err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    }


    return <div className="bg-dark-gray h-screen w-full flex justify-center items-center">
            <div className="bg-light-gray p-9 rounded-xl">
                <h2 className="text-2xl text-center p-0 text-dark-yellow font-medium">{isLogin ? "Login" : "Registration"}</h2>
                <form className="mt-9 flex flex-col gap-6" onSubmit={isLogin ? loginHandler : registrationHandler}>
                    {!isLogin && (
                        <>
                            <FormInput fieldName="Firstname" value={firstName} onChange={(value) => setFirstName(value)}/>
                            <FormInput fieldName="Lastname" value={lastName} onChange={(value) => setLastName(value)}/>
                        </>
                    )}
                    <FormInput fieldName="Email" value={email} onChange={(value) => setEmail(value)}/>
                    <FormInput fieldName="Password" value={password} onChange={(value) => setPassword(value)}/>
                    <button className="px-6 py-2 bg-light-yellow rounded-lg text-dark-gray">{isLogin ? "Login" : "Sign Up"}</button>
                </form>
                <div className="text-center mt-2.5">
                    {isLogin ? (
                        <>
                            <span className="text-white/75 pr-1.5">Don't have an account?</span>
                            <button className="text-dark-yellow" onClick={() => setIsLogin(false)}>Register</button>
                        </>
                    ) : (
                        <>
                            <span className="text-white/75 pr-1.5">Already have an account?</span>
                            <button className="text-dark-yellow" onClick={() => setIsLogin(true)}>Login</button>
                        </>
                    )}
                </div>
            </div>
        </div>
}

export default Auth;