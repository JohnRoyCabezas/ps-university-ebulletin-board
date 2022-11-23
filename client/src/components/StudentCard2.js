
export const StudentCard2 = ({ avatar, fullname, department }) => {
    
    return (
        <div
            className="p-2 my-1 px-6 w-full flex border-b border-gray-300 flex-col mx-auto justify-content-center"
        >
            <div className="flex">
                <div className="rounded-full my-auto">
                    <img
                        onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360'}
                        src={avatar}
                        className="rounded-full w-11 h-11 min-w-max bg-white"
                    />
                </div>
                <div className="ml-3 max-w-xs my-auto">
                    <span>
                        <p className="font-normal text-md">{fullname}</p>
                        <p className="text-xs italic">{department}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}
