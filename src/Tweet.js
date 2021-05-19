import React, { useState, useEffect, useRef } from "react";
import Avatar from "./Avatar";
import Message from "./Message";
import NameWithHandle from "./NameWithHandle";
import Popup from "./Popup"
import { likeTweet } from './api'

export default function Tweet({ tweet, isLiked, likedTweets, setLikedTweets }) {

  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef(null)

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  async function setIsLiked(tweetId, didToggle = false) {
    const value = likedTweets[tweetId] ? !likedTweets[tweetId] : true
    setLikedTweets({ ...likedTweets, [tweetId]: value })
    if(didToggle){
      setIsOpen(false)
      return
    }
    try {
      await likeTweet(tweetId)
      toggleLike()
      setIsOpen(!isOpen)
    } catch (err) {
      setTimeout(() => {
        setLikedTweets({ ...likedTweets, [tweetId]: !value })
        console.log(err)
      }, 500);
    }
  }

  function toggleLike() {
    setIsOpen(!isOpen)
    setTimeout(() => {
      setIsOpen(false)
    }, 3000);
  }

  const handleClickOutside = (e) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="tweet">
      <div ref={popoverRef}>
        {isOpen && <Popup togglePopup={() => setIsLiked(tweet.id, true)} />}
      </div>
      <Avatar />
      <div className="content">
        <NameWithHandle name={tweet.name} handle={tweet.handle} /> <Time />
        <Message />
        <div className="buttons">
          <Reply />
          <RetweetButton />
          <LikeButton isLiked={isLiked} toggleLike={() => setIsLiked(tweet.id)} />
          <MoreOPtionsButton />
        </div>
      </div>
    </div>
  );
}


// Accessories
const Time = () => <span className="time">1min ago</span>;

const Reply = () => <i className="fa fa-reply reply-button" />;

const RetweetButton = () => <i className="fa fa-retweet retweet-button" />;

const LikeButton = ({ isLiked, toggleLike }) => <i className="fa fa-heart like-button" onClick={toggleLike} style={isLiked ? { color: 'red' } : {}} />;

const MoreOPtionsButton = () => (
  <i className="fa fa-ellipsis-h more-options-button" />
);


