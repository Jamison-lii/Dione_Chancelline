import React, { useState, useEffect } from "react";
import { FiHeart, FiArrowLeft, FiShare2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BirthdayCard = () => {
  const [cardData, setCardData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem('birthdayCardData');
    if (savedData) {
      setCardData(JSON.parse(savedData));
    }
  }, []);

  if (!cardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="text-center p-8 max-w-md">
          <div className="animate-pulse mb-6">
            <FiHeart className="w-16 h-16 text-pink-500 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No Card Found</h1>
          <p className="text-gray-600 mb-6">Please create a birthday card first.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all inline-block"
          >
            Create New Card <FiArrowLeft className="inline ml-2" />
          </button>
        </div>
      </div>
    );
  }

  const { name, message, images = [] } = cardData;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const shareCard = () => {
    if (navigator.share) {
      navigator.share({
        title: `Birthday Card for ${name}`,
        text: `Check out this birthday card for ${name}!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Share this URL: ' + window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header with back button */}
        <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-sm hover:underline"
          >
            <FiArrowLeft className="mr-1" /> Create Another Card
          </button>
          <button 
            onClick={shareCard}
            className="flex items-center text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30"
          >
            <FiShare2 className="mr-1" /> Share
          </button>
        </div>

        <div className="md:flex">
          {/* Image Carousel Section */}
          <div className="relative w-full md:w-1/2 h-64 sm:h-80 md:h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center overflow-hidden">
            {images.length > 0 ? (
              <>
                <img
                  src={images[currentImageIndex]}
                  alt={`Memory ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 z-10 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 z-10 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                
                {/* Indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all ${currentImageIndex === index ? 'bg-pink-600 w-4' : 'bg-white/80'}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-8 text-gray-500">
                <FiHeart className="w-16 h-16 mx-auto mb-4 text-pink-300" />
                <p>No images added</p>
              </div>
            )}
          </div>
           
          {/* Message Section */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-pink-600 mb-2">Happy Birthday</h1>
              <h2 className="text-3xl font-semibold text-gray-800">{name}!</h2>
            </div>
            
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 mb-8">
              <p className="text-gray-700 text-lg italic mb-4">"{message}"</p>
              <div className="flex items-center justify-end">
                <FiHeart className="text-pink-500 mr-2" />
                <span className="text-gray-600">From your loved ones</span>
              </div>
            </div>
            
            {/* Thumbnail previews 
            {images.length > 1 && (
              <div className="flex justify-center space-x-2 mb-8">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-12 h-12 rounded overflow-hidden border-2 ${currentImageIndex === index ? 'border-pink-500' : 'border-transparent'}`}
                  >
                    <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}*/}
            
            <div className="text-center">
              <p className="text-gray-500 mb-2">Wishing you a wonderful day filled with joy</p>
              <div className="flex justify-center space-x-4">
                <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                  Save Card
                </button>
                <button className="border border-pink-500 text-pink-500 px-6 py-2 rounded-full text-sm font-medium">
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        <p>Created with love using Birthday Card Generator</p>
      </div>
    </div>
  );
};

export default BirthdayCard;