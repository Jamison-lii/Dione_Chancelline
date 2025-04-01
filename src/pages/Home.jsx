import React, { useState } from "react";
import { FiHeart, FiArrowLeft, FiShare2, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import D1 from '../assets/D1.jpeg';
import D2 from '../assets/D2.jpeg';
import D3 from '../assets/D3.jpeg';

const BirthdayCard = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();

  // Card data with image-specific messages
  const cardData = {
    name: "Dione Chancelline",
    images: [
      { 
        src: D1, 
        message: "Wishing you an amazing birthday filled with joy and laughter!",
        caption: "May your smile always shine this bright!"
      },
      { 
        src: D2, 
        message: "May this special day bring you happiness and wonderful memories!",
        caption: "Celebrating your wonderful spirit today!"
      },
      { 
        src: D3, 
        message: "Here's to another year of amazing adventures and success!",
        caption: "Your best year starts now!"
      }
    ],
    defaultCaption: "May your day be as special as you are"
  };

  const { name, images, defaultCaption } = cardData;
  const { message, caption } = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const shareCard = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Birthday Wishes for ${name}`,
          text: `Check out these birthday wishes for ${name}!`,
          url: window.location.href,
        });
      } else {
        alert(`Share this link: ${window.location.href}`);
      }
    } catch (err) {
      console.log('Sharing cancelled', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      {/* Main Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-sm hover:underline"
          >
            <FiArrowLeft /> Back
          </button>
          <button 
            onClick={shareCard}
            className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30"
          >
            <FiShare2 /> Share
          </button>
        </div>

        <div className="md:flex">
          {/* Enhanced Image Gallery */}
          <div className="relative w-full md:w-1/2 aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={images[currentImageIndex].src}
                alt={`Birthday memory ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain drop-shadow-lg rounded-lg"
                onClick={() => setIsFullscreen(true)}
              />
            </div>
            
            {/* Navigation Controls */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-all"
                >
                  <FiChevronLeft className="h-5 w-5 text-pink-600" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-all"
                >
                  <FiChevronRight className="h-5 w-5 text-pink-600" />
                </button>
              </>
            )}
            
            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${currentImageIndex === index ? 'bg-pink-600 w-6' : 'bg-white/80 w-2'}`}
                />
              ))}
            </div>
          </div>

          {/* Message Section */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-pink-600 mb-2">Happy Birthday</h1>
              <h2 className="text-3xl font-semibold text-gray-800">{name}!</h2>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 mb-6 transition-all duration-300">
              <p className="text-gray-700 text-lg italic mb-4">"{message}"</p>
              <div className="flex items-center justify-end">
                <FiHeart className="text-pink-500 mr-2" />
                <span className="text-gray-600">With love</span>
              </div>
            </div>
            
            <p className="text-center text-gray-500 mb-6">
              {caption || defaultCaption}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={() => window.print()}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-md transition-all"
              >
                Print Card
              </button>
              <button 
                onClick={() => navigate('/')}
                className="border border-pink-500 text-pink-500 px-6 py-3 rounded-lg font-medium hover:bg-pink-50 transition-all"
              >
                Create Another
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fullscreen Viewer */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setIsFullscreen(false)}
          >
            &times;
          </button>
          <div className="relative w-full max-w-4xl h-full max-h-screen">
            <img
              src={images[currentImageIndex].src}
              alt={`Fullscreen view`}
              className="w-full h-full object-contain"
            />
            {images.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30"
                >
                  <FiChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30"
                >
                  <FiChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
      
      <div className="text-center mt-6 text-gray-500 text-sm">
        <p>Made with ❤️ to celebrate special moments</p>
      </div>
    </div>
  );
};

export default BirthdayCard;