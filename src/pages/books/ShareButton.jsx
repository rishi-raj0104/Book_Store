import React from 'react';
import { FaShareAlt } from "react-icons/fa";
const ShareButton = () => {
  const handleShare = async () => {
    //console.log('window.location.href',window.location.href);
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this book!',
          text: 'This is an awesome book you might like to read.',
          url: window.location.href,
        });
        console.log('Book shared successfully');
      } else {
        console.log('Sharing is not supported in this browser');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="mt-4 flex gap-4">
      {/* Share Button */}
      <button
        className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600"
        onClick={handleShare}
      >
      <FaShareAlt  />
      </button>
    </div>
  );
};

export default ShareButton;
