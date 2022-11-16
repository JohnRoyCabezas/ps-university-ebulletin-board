import { ThemeContext } from "./ThemeContext";
import { useContext, useEffect } from "react";
import SettingsApi from "../api/ChangePasswordApi";
import Cookies from "js-cookie";

export const ThemePick = () => {

    const { theme, setTheme } = useContext(ThemeContext);
    const user = JSON.parse(Cookies.get('user'));

    useEffect(() => {
        SettingsApi.theme({ theme: theme }, user.id);
    }, [theme])

    return (
        <>
            <div className={`z-50 items-center w-11/12 min-h-fit`}>
                {
                    <>
                        <div className="grid grid-cols-2 gap-6 p-4 px-10">
                            <div>
                                <div className="flex justify-center bg-regal-blue py-2 rounded-t-lg"> </div>
                                <div className="flex justify-center bg-regal-blue bg-opacity-80 py-2"> </div>
                                <div className="flex justify-center bg-regal-blue bg-opacity-60 py-2"> </div>
                                <div className="flex justify-center bg-regal-blue bg-opacity-40 py-2"> </div>
                                <div className="flex justify-center py-1">
                                    <input id="default-radio-1" type="radio" onClick={() => setTheme('bg-regal-blue')} value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
                                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900"> #162750 </label>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-center bg-primary-100 py-2 rounded-t-lg"> </div>
                                <div className="flex justify-center bg-primary-100 bg-opacity-80 py-2"> </div>
                                <div className="flex justify-center bg-primary-100 bg-opacity-60 py-2"> </div>
                                <div className="flex justify-center bg-primary-100 bg-opacity-40 py-2"> </div>
                                <div className="flex justify-center py-1">
                                    <input id="default-radio-2" type="radio" onClick={() => setTheme('bg-primary-100')} value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
                                    <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900"> #85586F </label>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-center bg-secondary-100 py-2 rounded-t-lg"> </div>
                                <div className="flex justify-center bg-secondary-100 bg-opacity-80 py-2"> </div>
                                <div className="flex justify-center bg-secondary-100 bg-opacity-60 py-2"> </div>
                                <div className="flex justify-center bg-secondary-100 bg-opacity-40 py-2"> </div>
                                <div className="flex justify-center py-1">
                                    <input id="default-radio-3" type="radio" onClick={() => setTheme('bg-secondary-100')} value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
                                    <label htmlFor="default-radio-3" className="ml-2 text-sm font-medium text-gray-900"> #4C0033 </label>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-center bg-tertiary-100 py-2 rounded-t-lg"> </div>
                                <div className="flex justify-center bg-tertiary-100 bg-opacity-80 py-2"> </div>
                                <div className="flex justify-center bg-tertiary-100 bg-opacity-60 py-2"> </div>
                                <div className="flex justify-center bg-tertiary-100 bg-opacity-40 py-2"> </div>
                                <div className="flex justify-center py-1">
                                    <input id="default-radio-4" type="radio" onClick={() => setTheme('bg-tertiary-100')} value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
                                    <label htmlFor="default-radio-4" className="ml-2 text-sm font-medium text-gray-900"> #371B58 </label>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-center bg-quinary-100 py-2 rounded-t-lg"> </div>
                                <div className="flex justify-center bg-quinary-100 bg-opacity-80 py-2"> </div>
                                <div className="flex justify-center bg-quinary-100 bg-opacity-60 py-2"> </div>
                                <div className="flex justify-center bg-quinary-100 bg-opacity-40 py-2 px-auto"> </div>
                                <div className="flex justify-center py-1 mx-auto">
                                    <input id="default-radio-5" type="radio" onClick={() => setTheme('bg-quinary-100')} value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
                                    <label htmlFor="default-radio-5" className="ml-2 text-sm font-medium text-gray-900"> #371B58 </label>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-center bg-senary-100 py-2 rounded-t-lg"> </div>
                                <div className="flex justify-center bg-senary-100 bg-opacity-80 py-2"> </div>
                                <div className="flex justify-center bg-senary-100 bg-opacity-60 py-2"> </div>
                                <div className="flex justify-center bg-senary-100 bg-opacity-40 py-2"> </div>
                                <div className="flex justify-center py-1">
                                    <input id="default-radio-6" type="radio" onClick={() => setTheme('bg-senary-100')} value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
                                    <label htmlFor="default-radio-6" className="ml-2 text-sm font-medium text-gray-900"> #371B58 </label>
                                </div>
                            </div>


                        </div>
                    </>
                }
            </div>

        </>
    );
}
