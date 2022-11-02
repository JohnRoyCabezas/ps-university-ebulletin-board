import Cookies from "js-cookie";
import SubmitButton from './submitButton';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ChangePasswordApi from "../api/ChangePasswordApi";

const EditPassword = () => {

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
            const ValidNew = /^(?=.*[a-z])(?=.*[A-Z]).{4,24}/.test(changeNew)
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
        ChangePasswordApi.update(params).then((res) => {
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
            <div className="relative w-full items-center">
                <div className="relative top-0 z-50 w-full font-bold flex justify-between p-3 text-2xl bg-white border-b-2">
                    {/* <span className="text-lg">{time.getHours() > 5 && time.getHours() < 20 ? "🌞" : "🌙"} {time.toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</span> */}
                    <h1> Edit Settings</h1>
                    {/* <span className="botton-0 mr-6 text-sm font-normal">📆 <span className="italic">{time.toLocaleString([], {month: 'long', day: '2-digit'})}, {time.getFullYear()}</span></span> */}
                </div>
                {
                    <>
                        <div className="flex p-8 mt-10 w-auto justify-center">
                            <div className="flex-col bg-gray-100 rounded-l-lg shadow-lg shadow-gray-500/50 pt-20 px-14">
                                <img className="w-48 h-48 rounded-full p-1 ring-2 ring-gray-400" src={JSON.parse(userCookie).avatar} alt="Rounded avatar">
                                </img>
                                <span className="flex mt-6 font-bold text-2xl justify-evenly">{JSON.parse(userCookie).fullname}</span>
                            </div>

                            <div className="w-2/5 bg-gray-100 rounded-r-lg shadow-lg shadow-gray-500/50 pb-5">
                                <div className="py-6 px-6 lg:px-8">
                                    <span className="font-bold flex py-4 text-2xl">Change Password</span>
                                    <form className="space-y-6 py-2" action="#">
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
                                                    <FontAwesomeIcon icon={faInfoCircle} /> At least 4 character(s) With Upper case <br />
                                                </p>
                                            </span> : '')}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repeat password
                                                {!reqRep && (<span className="text-red-400"> *</span>)}
                                            </label>

                                            <div className="relative w-full">
                                                <input
                                                    type={showRep ? 'text' : 'password'}
                                                    name="password"
                                                    value={changeRep}
                                                    onChange={(e) => setChangeRep(e.target.value)}
                                                    placeholder="••••••••"
                                                    className="bg-gray-50 border border-gray-300 mb-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
                                            buttonDisabled={reqOld && reqNew && reqRep && !passMatch
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
