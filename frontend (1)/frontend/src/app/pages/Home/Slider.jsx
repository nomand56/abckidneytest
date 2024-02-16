
function Slider() {
  return (
    <div>Slider</div>
  )
}

export default Slider

// import { useEffect, useState } from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// const MultipleCardCarousel = () => {
//   const cards = [
//     { id: 1, title: 'Card 1', content: 'This is card 1.', image: '/download (1).jpeg' },
//     { id: 2, title: 'Card 2', content: 'This is card 2.', image: '/download (1).jpeg' },
//     { id: 3, title: 'Card 3', content: 'This is card 3.', image: '/download (1).jpeg' },
//     { id: 4, title: 'Card 4', content: 'This is card 4.', image: '/download (1).jpeg' },
//     { id: 5, title: 'Card 5', content: 'This is card 5.', image: '/download (1).jpeg' },
//     { id: 1, title: 'Card 1', content: 'This is card 1.', image: '/download (1).jpeg' },
//     { id: 2, title: 'Card 2', content: 'This is card 2.', image: '/download (1).jpeg' },
//     { id: 3, title: 'Card 3', content: 'This is card 3.', image: '/download (1).jpeg' },
//     { id: 4, title: 'Card 4', content: 'This is card 4.', image: '/download (1).jpeg' },
//     { id: 5, title: 'Card 5', content: 'This is card 5.', image: '/download (1).jpeg' },
//   ];

  
//   const [cardsPerSlide, setCardsPerSlide] = useState(4); // Default number of cards per slide

//   useEffect(() => {
//     // Function to determine the number of cards per slide based on screen width
//     const updateCardsPerSlide = () => {
//       if (window.innerWidth < 640) {
//         setCardsPerSlide(1); // For screens smaller than 640px, show 1 card per slide
//       } else if (window.innerWidth < 868) {
//         setCardsPerSlide(2); // For screens between 640px and 767px, show 2 cards per slide
//       } else if (window.innerWidth < 1094) {
//         setCardsPerSlide(3); // For screens between 768px and 1023px, show 3 cards per slide
//       } else {
//         setCardsPerSlide(4); // For larger screens, show 4 cards per slide
//       }
//     };

//     // Initial call to set the number of cards per slide
//     updateCardsPerSlide();

//     // Event listener to update the number of cards per slide on window resize
//     window.addEventListener('resize', updateCardsPerSlide);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener('resize', updateCardsPerSlide);
//     };
//   }, []);

//   const slides = [];

//   for (let i = 0; i < cards.length; i += cardsPerSlide) {
//     const slideCards = cards.slice(i, i + cardsPerSlide);
//     slides.push(
//       <div key={i} className="flex">
//         {slideCards.map((card) => (
//           <div key={card.id} className="w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-lg shadow p-4 m-4 text-center">
//             <img src={card.image} alt={card.title} className="h-80 object-cover" />
//             <h2 className="text-xl font-semibold my-4">{card.title}</h2>
//             <p className="text-gray-500">{card.content}</p>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className='p-8'>
//       <Carousel
//         showStatus={true}
//         showThumbs={true}
//         infiniteLoop={true}
//         useKeyboardArrows={true}
//         autoPlay={true}
//         interval={12000}
//         dynamicHeight={false}
//         buttons={true}
//         emulateTouch={true}
//         stopOnHover={true}
//       >
//         {slides}
//       </Carousel>
//     </div>
//   );
// };

// export default MultipleCardCarousel;