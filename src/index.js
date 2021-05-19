import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Tweet from "./Tweet";
import { fetchTweets } from "./api";

const staticTweets = [{ name: "James Blake", handle: "@jblake", id: 1 }, { name: "Elon Musk", handle: "@emusk", id: 2 }]

function App() {
  const [tweets, setTweets] = useState(staticTweets)
  const [likedTweets, setLikedTweets] = useState({})
  

  useEffect(() => {
    async function fetchData() {

      const fetchedTweets = await fetchTweets()
      setTweets(prevTweets => [...prevTweets, ...fetchedTweets])
    }
    fetchData()
  }, [])


  return (
    <>
      {tweets.map(tweet => <Tweet
        isLiked={likedTweets[tweet.id]}
        key={tweet.id}
        tweet={tweet}
        setLikedTweets={setLikedTweets}
        likedTweets={likedTweets}
      />)}
    </>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);

/*
  Right now the app renders two static tweets.

  1. Use the fetchTweets function to fetch tweets and render them (id, name, handle and text).

  2. When the ♥️ is clicked, optimistically update the ui to show the new tweet liked state
     and update the server state using the likeTweet api method.
     (likeTweet has a 50% chance of succeeding)

  3. When liking/unlining a tweet, a popover should appear with a countdown of 3
     seconds. Within these 3 seconds the user can cancel his like.
     Please add some kind of animation for this countdown so the user sees how much time he
     has left

  4. Undo popover should close when clicking outside of it. Closing the popover should
     send the tweet like request immediately
*/
