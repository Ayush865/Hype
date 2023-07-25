import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import '../ThemeSwitch.css'; // Import the CSS file for styling if needed

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const handleThemeToggle = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked);
    // Implement your theme toggle logic here
    dispatch(setMode());
  };

  return (
    <label className="theme-switch">
      <input
        type="checkbox"
        className="theme-switch__checkbox"
        checked={isChecked}
        onChange={handleThemeToggle}
      />
      <div className="theme-switch__container">
        <div className="theme-switch__clouds"></div>
        <div className="theme-switch__stars-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="... (SVG path data here) ..."
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="theme-switch__circle-container">
          <div className="theme-switch__sun-moon-container">
            <div className={`theme-switch__moon ${isChecked ? 'theme-switch__moon--dark' : ''}`}>
              <div className="theme-switch__spot"></div>
              <div className="theme-switch__spot"></div>
              <div className="theme-switch__spot"></div>
            </div>
          </div>
        </div>
      </div>
    </label>
  );
};

export default ThemeSwitch;
