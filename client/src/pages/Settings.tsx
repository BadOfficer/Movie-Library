import { FC, useState } from "react";
import SettingsInput from "../components/settings/SettingsInput";
import { useGetUserQuery, useUpdateUserDataMutation } from "../services/user.service";
import { IUserUpdate } from "../types/types";
import { toast } from "react-toastify";
import SettingsPasswordInput from "../components/settings/SettingsPasswordInput";

const Settings: FC = () => {
    const { data: userData, refetch } = useGetUserQuery('');
    const [updateUser, {isError: updatingError}] = useUpdateUserDataMutation();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleUpdate = async(userData: IUserUpdate) => {
        try {
            if(userData.password.length < 6 && userData.password !== '') {
                throw new Error("Password must be more than 6 symbols!");
            }

            await updateUser(userData).unwrap();
            toast.success('Data has been updated');
            refetch();
        } catch(e: any) {
            const errorMessage = e?.data?.message.toString() || e.message.toString() || "Failed to update user data";
            toast.error(errorMessage);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const user = {
            first_name: formData.get('first_name') as string,
            last_name: formData.get('last_name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            oldPassword: formData.get('oldPassword') as string,
        }

        handleUpdate(user)

        setShowConfirm(false)
    }

    const handleTryUpdate = (event: any) => {
        event.preventDefault();
        setShowConfirm(true);
    }

    const handleCancelConfirm = (event: any) => {
        event.preventDefault();
        setShowConfirm(false);
    }

    return (
        <div className="h-screen flex justify-center items-center">
            {userData && (
                <div className="bg-light-gray p-9 rounded-xl flex flex-col items-center">
                    <h2 className="text-3xl uppercase font-semibold text-center">Settings</h2>
                    <form className="flex flex-col gap-6 mt-6" onSubmit={handleSubmit}>
                        <SettingsInput initialValue={userData.first_name} name="first_name" title="First name" />
                        <SettingsInput initialValue={userData.last_name} name="last_name" title="Last name" />
                        <SettingsInput initialValue={userData.email} name="email" title="Email" />
                        <SettingsPasswordInput initialValue="" name="password" title="New password" />

                        <button className="px-4 py-2 border-2 border-light-yellow bg-light-yellow text-dark-gray rounded-xl font-medium hover:bg-dark-yellow hover:border-dark-yellow" onClick={(e) => handleTryUpdate(e)}>Update</button>
                        {showConfirm && (
                            <div className="absolute top-0 left-0 w-full h-full bg-dark-gray/75 flex justify-center items-center" onClick={handleCancelConfirm}>
                                <div className="p-9 bg-light-gray rounded-xl flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
                                    <h3>Confirm your old password</h3>
                                    <SettingsPasswordInput initialValue="" name="oldPassword" title="Password" />
                                    <button type="submit" className="px-4 py-2 border-2 border-light-yellow bg-light-yellow text-dark-gray rounded-xl font-medium hover:bg-dark-yellow hover:border-dark-yellow">Confirm</button>
                                    <button className="px-4 py-2 border-2 border-light-yellow text-white rounded-xl font-medium hover:bg-light-yellow hover:text-dark-gray" onClick={handleCancelConfirm}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
}

export default Settings;
