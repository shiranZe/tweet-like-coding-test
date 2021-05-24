export function fetchTweets() {
  return Promise.resolve([
    {
      id: 1,
      name: "Marge McAughtry",
      handle: "mmcaughtry0",
      text: "suspendisse ornare consequat lectus in est risus auctor"
    },
    {
      id: 2,
      name: "Valaria Pennetta",
      handle: "vpennetta1",
      text:
        "fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa"
    },
    {
      id: 3,
      name: "Gaven Alenin",
      handle: "galenin2",
      text:
        "non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis"
    },
    {
      id: 4,
      name: "Herold Anfrey",
      handle: "hanfrey3",
      text: "in consequat ut nulla sed accumsan felis ut"
    }
  ]);
}

export function likeTweet(tweetId) {
  const success = Math.random() > 0.5;

  if (success) {
    return Promise.resolve({});
  } else {
    return Promise.reject(`Failed to like tweet: #${tweetId}`);
  }
}
