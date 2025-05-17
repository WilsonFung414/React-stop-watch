import { useState } from "react";

function TimeDisplay({formatTime, elapsedTime}){

    let time = formatTime(elapsedTime)
    return (
        <div className="mainContainer">
            <p className="timeContainer">
                {time.split(".")[0]}
            </p>
            <div className="msContainer">
                {"." + time.split(".")[1]}
            </div>
        </div>
    )
}

export default TimeDisplay