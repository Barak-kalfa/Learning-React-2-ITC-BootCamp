import "./Tweet.css"

function Tweet({tweet}) {
  return (
    <div className=" Tweet rounded d-flex flex-column bg-dark">
      <div className="tweetHeader d-flex justify-content-between">
        <span>{tweet.userName}</span><span>{tweet.date}</span>
        </div>
     <div className="tweetContent d-flex pe-5 me-5 text-break"> {tweet.content}</div>
      
      </div>
  )
}

export default Tweet