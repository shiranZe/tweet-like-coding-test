import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Tweet from "./Tweet";
import Toastr from "./Toastr";
import { fetchTweets, likeTweet } from "./api";

function App() {
  const [tweets, setTweets] = useState([]);
  const [showToastr, setShowToastr] = useState(false);
  const [currentLikeTweetId, setCurrentLikeTweetId] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const toastrRef = useRef(null);

  useEffect(() => {
    fetchTweetsData();
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  },[toastrRef, handleClickOutside]);

  const fetchTweetsData = async () => {
    const tweetsData = await fetchTweets();
    setTweets(tweetsData);
  };

  const handleClickOutside = () => {
    console.log("Outside");
    if (toastrRef.current && showToastr) {
      setShowToastr(false);
      clearTimeout(timeoutId);
      likeTweet(currentLikeTweetId);
      setCurrentLikeTweetId(null);
    }
  };

  const handleLikeClick = ({ id, isLike }) => {
    console.log("clicked: ", id);
    toggleTweetLikeStateById(id, !isLike);
    if (!isLike) {
      setCurrentLikeTweetId(id);
      setShowToastr(true);
      const timerId = setTimeout(() => {
        setShowToastr(false);
        likeTweetAction(id);
        setCurrentLikeTweetId(null);
      }, [TOASTR_TIMEOUT]);
      setTimeoutId(timerId);
    }
  };

  const getTweetIndexById = (tweetId) => {
    return tweets.findIndex((item) => item.id === tweetId);
  };

  const toggleTweetLikeStateById = (tweetId, isLike) => {
    const tweetsData = [...tweets];
    const likedTweetIndex = getTweetIndexById(tweetId);
    tweetsData[likedTweetIndex] = {
      ...tweetsData[likedTweetIndex],
      isLike: isLike,
    };
    setTweets(tweetsData);
  };

  const handleUndoClick = () => {
    setShowToastr(false);
    clearTimeout(timeoutId);
    console.log('currentLikeTweetId: ', currentLikeTweetId);
    toggleTweetLikeStateById(currentLikeTweetId, false);
  };

  const likeTweetAction = async (tweetId) => {
    setCurrentLikeTweetId(null);
    try {
      await likeTweet(tweetId);
      console.log("success!", tweetId);
    } catch (err) {
      console.log("failure: ", err);
      toggleTweetLikeStateById(tweetId, false);
    }
  };

  return (
    <>
      {tweets.length &&
        tweets.map((tweetItem) => {
          return (
            <Tweet
              key={tweetItem.id}
              tweet={tweetItem}
              onLikeClick={handleLikeClick}
            />
          );
        })}
      {showToastr && (
        <div ref={toastrRef}>
          <Toastr onUndoClick={handleUndoClick} />
        </div>
      )}
    </>
  );
}

const TOASTR_TIMEOUT = 3000;

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
