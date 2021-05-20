import React, { useState, useEffect } from "react";

const LikeButton = ({ id, likeTweet }) => {
    const [counter, setCounter] = useState(0)
    const [liked, setLiked] = useState(false)
  
    const handleClick = () => {
      setLiked(!liked)
      if (counter === 0) {
        setCounter(3)
      }
    }
  
    useEffect(() => {
      const like = async (id) => {
        await likeTweet(id).catch((err) => {
          console.log(err)
          setLiked(false)
        })
      }
  
      if (counter > 0) {
        setTimeout(() => setCounter(counter - 1), 1000);
      } else {
        setCounter(0);
        if (liked) {
          like(id)
        }
      }
    }, [counter, likeTweet, liked, id]);
  
  
    return (
      <>
        {counter ? <span>{counter}</span> : null}
        <i onClick={handleClick} className={liked ? `fa fa-heart like-button liked` : "fa fa-heart like-button"} />
      </>
    )
  }

  export default LikeButton