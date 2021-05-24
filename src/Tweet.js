import React, { useState, useEffect, } from "react";
import Avatar from "./Avatar";
import Message from "./Message";
import NameWithHandle from "./NameWithHandle";
import Popup from "./Popup"
import { likeTweet } from './api'

export default function Tweet({ tweet }) {

  const [isOpen, setIsOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(isLiked)

  async function onRequestCompleted() {
    setIsOpen(false)
    try {
      await likeTweet(tweet.id)
    } catch (error) {
      console.log(error)
      setIsLiked(!isLiked)
    }
  }

  function onAbort() {
    setIsOpen(false)
    setIsLiked(!isLiked)
  }

  return (
    <div className="tweet">
      <div >
        {isOpen && <Popup setIsOpen={setIsOpen} onAbort={onAbort} onRequestCompleted={onRequestCompleted} togglePopup={() => setIsAborted(true)} />}
      </div>
      <Avatar />
      <div className="content">
        <NameWithHandle name={tweet.name} handle={tweet.handle} /> <Time />
        <Message />
        <div className="buttons">
          <Reply />
          <RetweetButton />
          <LikeButton isLiked={isLiked} toggleLike={() => {
            setIsLiked(!isLiked)
            setIsOpen(true)
          }}
          />
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


