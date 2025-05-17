function LapRecord ({lapRecord}) {
    return (
        <div className="record" style={{display:"flex"}}>
            <p>
                {lapRecord.count}
            </p>
            <p>
                {lapRecord.time}
            </p>
        </div>
    )
}
export default LapRecord