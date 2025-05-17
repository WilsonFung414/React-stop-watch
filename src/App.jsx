import { useState,useEffect,useRef } from "react";
import "./App.css";
import TimeDisplay from "./components/TimeDisplay";
import ActionButton from "./components/ActionButton";
import LapRecord from "./components/LapRecord";

function App() {

  const [isStart,setIsStart] = useState(0);
  const [isStop, setIsStop] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lapRecords, setLapRecords] = useState([]);
  const intervalRef = useRef(null);
  const lapIdRef = useRef(1); 
  const lastLapTimeRef = useRef(0);
  const lapsContainerRef = useRef(0);

  const toggleStart = () => {
    if(isStart === 0){
      setIsStart(1)
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {setElapsedTime(Date.now() - startTime);}, 10);
    }else{
      setIsStart(0);
      clearInterval(intervalRef.current);
    }
    setIsStop(0);
  }

  const toggleStop = () => {
    if(isStop === 0){
      setIsStop(1);
      clearInterval(intervalRef.current);
    }else{
      clearInterval(intervalRef.current);
      setElapsedTime(0);
      setIsStart(0);
      setIsStop(0);
      lastLapTimeRef.current = 0;
      lapIdRef.current = 1;
      setLapRecords([]);
    }
    setIsStart(0);
  }

  const addLap = () => {
    setLapRecords([...lapRecords, {count:lapIdRef.current, time:formatTime(elapsedTime-lastLapTimeRef.current)}]);
    lapIdRef.current += 1;
    lastLapTimeRef.current = elapsedTime;
  }

  useEffect(() => {
    if (lapsContainerRef.current) {
      lapsContainerRef.current.scrollTo({top:-(lapsContainerRef.current.scrollHeight),behavior:"smooth"});
    }
  },[lastLapTimeRef.current]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000); 
    const milliseconds = Math.floor((time % 1000) / 10); 

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2,"0")}`;
  };

  return (
    <>
      <h1 style={{padding:"10px"}}>Stop Watch</h1>
      <TimeDisplay formatTime={formatTime} elapsedTime={elapsedTime}/>
      <ActionButton toggleStart={toggleStart} isStart={isStart} isStop={isStop} toggleStop={toggleStop} addLap={addLap} elapsedTime={elapsedTime}/>
      <div className="record-table"  ref={lapsContainerRef}>
        {lapRecords.map((lapRecord) => {
          return <LapRecord lapRecord={lapRecord} key={lapRecord.count}/>
        })}
      </div>
    </>
  );
}

export default App;