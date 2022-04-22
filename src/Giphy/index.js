import React, { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import "./styles.css";

const apiKey = "smci7eAzejq3LJs77bipHDe95GAHOZjz";

export default function Giphy() {
  const [images, setImages] = useState([]);
  const [giphyVal, setGiphyVal] = useState("giphy");
  const [offset, setOffset] = useState(0);

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

  const fetchApi = async () => {
    let response = await fetch(
      `http://api.giphy.com/v1/gifs/search?q=${giphyVal}&api_key=${apiKey}&offset=${offset}&limit=12`
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

  const onNextClick = () => {
    setOffset(offset + 12);
  };

  const onPrevClick = () => {
    setOffset(offset - 12);
  };

  useEffect(() => {
    fetchApi();
  }, [giphyVal, offset]);

  return (
    <div>
      <label>Enter Search Term: </label>
      <input type="text" onChange={onSearchChange} />
      <div className="giphy-wrapper">
        <Icon
          name="angle double left"
          disabled={offset === 0}
          onClick={onPrevClick}
        />
        <div className="giphy-container">
          {images.map((img, i) => (
            <img src={img.fixed_width.url} alt="test" key={i} />
          ))}
        </div>
        <Icon name="angle double right" onClick={onNextClick} />
      </div>
    </div>
  );
}
