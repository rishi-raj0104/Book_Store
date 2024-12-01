import React from 'react';
import Banner from './Banner';
import TopSellers from './TopSellers';
import Recommend from './Recommend';
import News from './News';
const Home = () => {
  return (
    <>
      <Banner></Banner>
      <TopSellers></TopSellers>
      <Recommend></Recommend>
      <News></News>
    </>
  )
}

export default Home
