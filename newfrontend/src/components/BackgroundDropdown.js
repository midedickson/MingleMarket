import React from 'react'
import { Switch } from "antd";
import backgroundList from './backgroundList'

const BackgroundDropdown = ({toggleBackground,currentBg}) => (
    backgroundList.map((val,index) => {
        return (
            <>
            <div className="dropdown-item">
                {val.color}{" "}
            <Switch size="small" onChange={() => toggleBackground(val.value)} checked={currentBg === val.value}/>
            </div>
            <div className="dropdown-divider"></div>
            </>
        )
    })
)

export default BackgroundDropdown;