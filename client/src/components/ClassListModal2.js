import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StudentCard2 } from './StudentCard2';
import { UserContext } from '../utils/UserContext';
import { faClose, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
export const ClassListModal2 = ({
    courseTitle,
    courseInformation,
    instructor,
    students,
    showModal }) => {

    const { user } = useContext(UserContext);
    const [search, setSearch] = useState('');

    return (
        <div>
            <div className="justify-center text-white bg-gray-500 bg-opacity-70 items-center flex overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                {/* Here */}
                <div className={`my-6 w-2/5 max-w-md ${user.theme} bg-opacity-70 h-fit my-4 pb-2 rounded-md`}>
                    <div className={`flex justify-between border-b border-solid ${user.theme} border-slate-200 rounded-t`}>
                        <div className="flex items-start justify-between p-3 w-full">
                            {/* <h3 className="text-3xl font-semibold m-auto w-full text-center mx-3">{courseTitle}</h3> */}

                            <div className={`truncate my-auto w-full justify-center text-center opacity-100`}>
                                <h3 className="text-3xl flex justify-center font-semibold m-auto w-full">
                                    <div className='group w-fit px-2'>
                                        <div className={`group-hover:visible py-3 invisible fixed w-screen right-0 `}>
                                            <div className={`bg-white w-fit mx-auto whitespace-pre-wrap rounded shadow-inner group-hover:translate-y-8 transition ease-in-out delay-300 group-hover:delay-300 group-hover:scale-150 duration-200 border border-slate-400 group-hover:bg-opacity-90 group-hover:text-black px-3 text-xs font-normal z-20`}>{courseInformation}</div>
                                        </div>
                                        <FontAwesomeIcon icon={faInfoCircle} size='2xs' />
                                    </div>
                                    {courseTitle}

                                </h3>
                            </div>
                            <div className="my-auto">
                                <button
                                    className="hover:bg-opacity-30 hover:bg-white rounded-md z-50 px-1"
                                    onClick={showModal}
                                >
                                    <FontAwesomeIcon icon={faClose} size="2xl" />
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="p-4 flex items-center w-full">
                        <input
                            placeholder="Search . . ."
                            className={`w-full px-2 font-normal text-white h-10 ${user.theme} placeholder-white bg-opacity-60 border rounded-md focus:outline-white-500`}
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                        />
                    </div>
                    {/* Instructor */}
                    <div className="p-2 px-6 w-full flex bg-black bg-opacity-40 border-b border-gray-300 flex-col mx-auto justify-content-center">
                        <div className="flex">
                            <div className="rounded-full my-auto">
                                <img
                                    onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360'}
                                    src={instructor.avatar}
                                    className="rounded-full w-11 h-11 min-w-max bg-white"
                                />
                            </div>
                            <div className="ml-3 max-w-xs my-auto">
                                <span>
                                    <p className="font-normal text-xl">{instructor.fullname}</p>
                                    <p className="text-xs italic">Instructor</p>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Student */}
                    <div className='overflow-auto h-96'>
                        {students
                            .filter((student) => student.user.fullname.toLowerCase().includes(search.toLowerCase()))
                            .sort((a, b) => a.user.fullname > b.user.fullname ? 1 : -1)
                            .map((student) => (
                                <StudentCard2
                                    avatar={student?.user?.avatar}
                                    fullname={student?.user?.fullname}
                                    department={student?.user?.department?.department}
                                />
                            ))}
                    </div>
                </div>
            </div >
        </div >
    );
}
