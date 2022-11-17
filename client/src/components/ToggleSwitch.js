import React from 'react';

const ToggleSwitch = ({enlisted, handleToggle}) => {

    return (
        <label className="flex items-center">
            <input className="toggle cursor-pointer relative w-10 h-5 transition-all duration-200 ease-in-out bg-gray-400 rounded-full shadow-inner outline-none appearance-none"
                type="checkbox"
                checked={enlisted}
                onChange={handleToggle}
            />
        </label>
    )
}

export default ToggleSwitch;