import React from 'react'
import { Switch } from "antd";
import animations from './animationList'

const AnimationDropdown = ({toggleConfetti,current,start}) => (
    animations.map((val,index) => {
        return (
            <>
            <div className="dropdown-item">
                {val.name}{" "}
            <Switch size="small" onChange={(checked) => toggleConfetti(index, checked)} checked={current === index && start}/>
            </div>
            <div className="dropdown-divider"></div>
            </>
        )
    })
)

export default AnimationDropdown;