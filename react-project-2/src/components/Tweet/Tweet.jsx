import "./Tweet.css"


//REMMBER TO FIX OVERFLOW
function Tweet({tweet}) {
  return (
    <div className=" tweet m-3 rounded p-3 d-flex flex-column ">
      <div className="tweetHeader d-flex justify-content-between">
        <span>{tweet.userName}</span><span>{tweet.date}</span>
        </div>
     <div className="tweetContent d-flex pe-5 me-5 text-break"> {tweet.content}</div>
      
      </div>
  )
}

export default Tweet