import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination ,Navigation } from 'swiper/modules';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
const Recommend = () => {
    //const [books ,setBooks]=useState([]);
    // useEffect(() => {
    //     fetch("books.json")
    //       .then(res => res.json())
    //       .then((data) => setBooks(data))
    //       .catch(error => console.error('Error fetching books:', error));
    //   }, []);
    const {data: books = []} = useFetchAllBooksQuery();
  return (
    <div className='py-16 px-10'>
      <h2 className='text-3xl font-semibold mb-6'>Recommendation</h2>
      <Swiper
            slidesPerView={1}
            spaceBetween={30}
            navigation={true} 
            // pagination={{
            // clickable: true,
            // }}
            breakpoints={{
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 50,
            },
            1180: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
            }}
            modules={[Pagination,Navigation]}
            className="mySwiper"
        >
        {
            books.length > 0 && books.slice(8,18).map((book,index) => (
                <SwiperSlide key={index}>
                    <BookCard book={book}>  
                    </BookCard>
                </SwiperSlide>
            ))
        }
        </Swiper>
    </div>
  )
}

export default Recommend
