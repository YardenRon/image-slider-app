import React from 'react';
import './App.scss';
import ImageSlider from '../ImageSlider';

const IMAGES_URL = "https://picsum.photos/v2/list";

function App() {
  return (
    <ImageSlider url={IMAGES_URL} page={1} limit={10} />
  );
}

export default App;
