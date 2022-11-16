import Cookies from "js-cookie";
import SubmitButton from './submitButton';
import { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import SettingsApi from "../api/ChangePasswordApi";
import { ThemeContext } from "./ThemeContext";

const EditPassword = () => {

    const { theme } = useContext(ThemeContext);
    const oldPassRef = useRef();
    const userCookie = Cookies.get('user');

    const [changeOld, setChangeOld] = useState('');
    const [reqOld, setReqOld] = useState(false);

    const [changeNew, setChangeNew] = useState('');
    const [reqNew, setReqNew] = useState(false);
    const [validNew, setValidNew] = useState(false);

    const [changeRep, setChangeRep] = useState('');
    const [reqRep, setReqRep] = useState(false);

    const [passMatch, setPassMatch] = useState(false);

    const [processing, setProcessing] = useState(false);

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showRep, setShowRep] = useState(false);

    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const params = {
        'email': JSON.parse(userCookie).email,
        'old_password': changeOld,
        'new_password': changeNew
    }

    useEffect(() => {
        if (changeOld) {
            setReqOld(true)
        } else { setReqOld(false) }
    }, [changeOld])

    useEffect(() => {
        if (changeNew) {
            setReqNew(true)
            const ValidNew = /^(?=.*[a-z])(?=.*[A-Z]).{8,24}/.test(changeNew)
            setValidNew(ValidNew)
        } else { setReqNew(false) }
    }, [changeNew])

    useEffect(() => {
        if (changeRep) {
            setReqRep(true)
        } else { setReqRep(false) }

    }, [changeRep])

    useEffect(() => {
        if (changeNew === changeRep || !changeRep) {
            setPassMatch(false)
        } else { setPassMatch(true) }
    }, [changeRep, changeNew])

    useEffect(() => {
        oldPassRef.current.focus();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        SettingsApi.update(params).then((res) => {
            if (!res.data.Status) { //If password dont match
                oldPassRef.current.focus();
                setShowMessage(true);
                setChangeOld(changeOld);
                setMessage(res.data.Message);
                setStatus(res.data.Status);
                setProcessing(false);
            } else {
                setChangeNew('');
                setChangeOld('');
                setChangeRep('');
                setShowOld(false);
                setShowNew(false);
                setShowRep(false);
                setMessage(res.data.Message);
                setStatus(res.data.Status);
                setShowMessage(true);
                setProcessing(false);
            }

        });
    }

    return (
        <>
            <div className={`z-50 flex h-full mx-2 w-full`}>
                {
                    <>
                        <div className="flex w-full">
                            {/* First half */}
                            <div className={`flex flex-col justify-center ${theme} shadow-lg shadow-gray-500/50 px-14`}>
                                <img className={`w-52 h-auto rounded-full p-1 ring-2 ${theme} bg-opacity-80 ring-gray-400`} src={JSON.parse(userCookie).avatar} alt="Rounded avatar">
                                </img>
                                <span className="flex font-bold text-2xl mx-auto mt-5">{JSON.parse(userCookie).fullname}</span>
                            </div>
                            {/* Other half */}
                            <div className="w-full flex flex-col justify-center bg-gray-100 rounded-r-lg shadow-lg shadow-gray-500/50">
                                <div className="p-6">
                                    <span className="font-bold mb-6 flex text-black text-2xl">Change Password</span>
                                    <form className="w-full" action="#">
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block mb-2 text-sm font-medium text-gray-900">Old password
                                                {!reqOld ? <span className="text-red-600"> *</span> : ''}
                                            </label>

                                            <div className="relative w-full">
                                                <input
                                                    type={showOld ? 'text' : 'password'}
                                                    name="password"
                                                    ref={oldPassRef}
                                                    value={changeOld}
                                                    onChange={(e) => [setChangeOld(e.target.value), setShowMessage(false)]}
                                                    placeholder="••••••••"
                                                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                                    required
                                                />

                                                {reqOld && (<button
                                                    type="button"
                                                    onClick={() => setShowOld(!showOld)}
                                                    className="flex absolute inset-y-0 right-0 items-center pr-3 focus:outline-none"
                                                    disabled={!reqOld}>
                                                    {showOld ? <FontAwesomeIcon icon={faEye} color="gray" /> : <FontAwesomeIcon icon={faEyeSlash} color="gray" />}
                                                </button>)}

                                            </div>

                                        </div>

                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block mb-2 text-sm font-medium text-gray-900 ">New password
                                                {!reqNew && (<span className="text-red-400"> *</span>)}
                                                {/* <span className={`text-red-400 text-sm italic ${passMatch ? 'hide' : 'hidden'}`}> Password doesnt match </span> */}
                                            </label>

                                            <div className="relative w-full">
                                                <input
                                                    type={showNew ? 'text' : 'password'}
                                                    name="password"
                                                    value={changeNew}
                                                    onChange={(e) => setChangeNew(e.target.value)}
                                                    placeholder="••••••••"
                                                    className={`bg-gray-50 border border-gray-300 mb-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                                    required
                                                />
                                                {reqNew && (<button
                                                    type="button"
                                                    onClick={() => setShowNew(!showNew)}
                                                    className="flex absolute inset-y-0 right-0 items-center pr-3 focus:outline-none"
                                                    disabled={!reqNew}>
                                                    {showNew ? <FontAwesomeIcon icon={faEye} color="gray" /> : <FontAwesomeIcon icon={faEyeSlash} color="gray" />}
                                                </button>)}
                                            </div>

                                            {reqNew && (!validNew ? <span className=" text-sm italic">
                                                <p className={!validNew ? "instructions text-red-600 rounded" : "offscreen"}>
                                                    <FontAwesomeIcon icon={faInfoCircle} /> At least 8 character(s) With Upper case <br />
                                                </p>
                                            </span> : '')}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block mb-2 text-sm font-medium text-gray-900">Repeat password
                                                {!reqRep && (<span className="text-red-400"> *</span>)}
                                            </label>

                                            <div className="relative w-full">
                                                <input
                                                    type={showRep ? 'text' : 'password'}
                                                    name="password"
                                                    value={changeRep}
                                                    onChange={(e) => setChangeRep(e.target.value)}
                                                    placeholder="••••••••"
                                                    className="bg-gray-50 border border-gray-300 mb-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    required
                                                />
                                                {reqRep && (<button
                                                    type="button"
                                                    onClick={() => setShowRep(!showRep)}
                                                    className="flex absolute inset-y-0 right-0 items-center pr-3 focus:outline-none"
                                                    disabled={!reqRep}>
                                                    {showRep ? <FontAwesomeIcon icon={faEye} color="gray" /> : <FontAwesomeIcon icon={faEyeSlash} color="gray" />}
                                                </button>)}
                                            </div>

                                            {reqRep && (passMatch ? <span className=" text-sm italic text-red-600">
                                                <p className={!passMatch ? "instructions" : "offscreen"}>
                                                    <FontAwesomeIcon icon={faInfoCircle} /> Password does not match <br />
                                                </p>
                                            </span> : '')}
                                        </div>

                                        <div className="flex justify-between">
                                            <div className="flex items-start">
                                                {showMessage && (
                                                    <span className={`${status ? 'text-blue-600' : 'text-red-600'} italic`}> {message} </span>
                                                )}
                                            </div>
                                        </div>
                                        <SubmitButton
                                            handleSubmit={handleSubmit}
                                            buttonDisabled={reqOld && reqNew && reqRep && !passMatch && validNew
                                                ? true : false}
                                            processing={processing}
                                            buttonTitle={"Update Password"}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>

        </>
    );
}

export default EditPassword;
