import React, { useEffect, useState, useRef } from "react";
import { FiHeart, FiShare2, FiChevronLeft, FiChevronRight, FiVolume2, FiVolumeX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import D1 from '../assets/D1.jpeg';
import D2 from '../assets/D2.jpeg';
import D3 from '../assets/D3.jpeg';
import BackgroundMusic from '../assets/Adun.mp3';

const BirthdayCard = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true); // Default to true
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Initialize audio with better autoplay handling
  useEffect(() => {
    audioRef.current = new Audio(BackgroundMusic);
    audioRef.current.loop = true;
    
    // Store the play promise
    let playPromise;
    
    // Function to handle autoplay
    const attemptAutoplay = () => {
      playPromise = audioRef.current.play();
      
      playPromise
        .then(() => {
          setIsMusicPlaying(true);
          window.removeEventListener('click', handleFirstInteraction);
        })
        .catch(error => {
          console.log("Autoplay prevented, waiting for user interaction:", error);
          // Wait for user interaction
          window.addEventListener('click', handleFirstInteraction);
        });
    };

    // Handle first user interaction
    const handleFirstInteraction = () => {
      playPromise = audioRef.current.play();
      playPromise
        .then(() => {
          setIsMusicPlaying(true);
          window.removeEventListener('click', handleFirstInteraction);
        })
        .catch(error => {
          console.log("Still couldn't play:", error);
        });
    };

    // Start with muted autoplay (works in most browsers)
    audioRef.current.muted = true;
    playPromise = audioRef.current.play();
    
    playPromise
      .then(() => {
        // Success! Now unmute
        audioRef.current.muted = false;
        setIsMusicPlaying(true);
      })
      .catch(error => {
        console.log("Muted autoplay failed, trying regular autoplay:", error);
        attemptAutoplay();
      });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  // ... rest of your component code remains the same ...
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      {/* Music Control */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-4 left-4 z-40 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-all"
        aria-label={isMusicPlaying ? "Mute music" : "Play music"}
      >
        {isMusicPlaying ? <FiVolume2 className="text-pink-600" /> : <FiVolumeX className="text-pink-600" />}
      </button>

      {/* ... rest of your JSX remains the same ... */}
    </div>
  );
};

export default BirthdayCard;