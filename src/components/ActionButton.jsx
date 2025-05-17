
function ActionButton({toggleStart, isStart, isStop, toggleStop, addLap, elapsedTime}) {


    return(
        <div className="buttonContainer">
           <button onClick={toggleStart} disabled={isStop}>{isStart ? "Pause" : "Start"}</button>
            <button onClick={toggleStop}>{isStop === 1 && isStart === 0 ? "Reset" : "Stop"}</button>
            <button disabled={isStop || !isStart} onClick={addLap}>Lap</button>
        </div>
    )
}

export default ActionButton