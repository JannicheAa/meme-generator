import React from "react";

export default function Meme() {
  const [allMeme, setAllMeme] = React.useState({});
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMeme(data.data.memes));
  }, []);

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImg: "http://i.imgflip.com/1bij.jpg",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function getMemeImg() {
    const randomIndex = Math.floor(Math.random() * allMeme.length);
    const randomImg = allMeme[randomIndex].url;

    setMeme(function (prevMeme) {
      return {
        ...prevMeme,
        randomImg: randomImg,
      };
    });
  }
  return (
    <main className="content">
      <div className="div-inputs">
        <div className="input-display">
          <label htmlFor="input-top">Tekst øverst</label>
          <input
            type="text"
            id="input-top"
            name="topText"
            placeholder="One simply cannot"
            value={meme.topText}
            onChange={handleChange}
          />
        </div>
        <div className="input-display">
          <label htmlFor="input-bottom">Tekst nederst</label>
          <input
            type="text"
            id="input-bottom"
            name="bottomText"
            placeholder="learn React in a day"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
      </div>
      <button onClick={getMemeImg}>Få et nytt bilde 🖼</button>
      <div className="img-container">
        <img className="meme-img" src={meme.randomImg} />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
