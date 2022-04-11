import React, { useEffect, useState } from "react";
import "./styles.css";

export default function Giphy() {
  const [images, setImages] = useState([]);
  const [giphyVal, setGiphyVal] = useState("");

  const myDebounce = (cb, delay) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const onSearchChange = myDebounce((e) => {
    setGiphyVal(e.target.value);
  }, 1000);

  const fetchApi = async (term) => {
    let response = await fetch(
      `http://api.giphy.com/v1/gifs/search?q=${term}&api_key=smci7eAzejq3LJs77bipHDe95GAHOZjz&limit=12`
    );

    response = await response.json();

    if (response.error) {
      throw new Error("ERRRR", response.message);
    } else {
      const { data } = response;
      const imgs = data.map(({ images }) => images);
      setImages(imgs);
    }
  };

  useEffect(() => {
    fetchApi(giphyVal);
  }, [giphyVal]);

  console.log("images", images);
  return (
    <div>
      <label>Enter Search Term: </label>
      <input type="text" onChange={onSearchChange} />
      <div className="giphy-container">
        {images.map((img, i) => (
          <img src={img.fixed_width.url} alt="test" key={i} />
        ))}
      </div>
    </div>
  );
}
