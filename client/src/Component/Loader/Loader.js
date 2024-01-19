// Loader.js

import React, { useState, useEffect } from 'react';
import './Loader.css'; // Import your CSS file

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data)
    const fetchData = async () => {
      try {
        // Perform your data fetching or any other initialization here
        // For now, let's simulate a delay using setTimeout
        await new Promise(resolve => setTimeout(resolve, 200));

        // Update loading state to false once done
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData(); // Invoke the fetchData function

    // Cleanup function
    return () => {
      // Optional: perform cleanup if needed
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className={`loader-container ${loading ? 'visible' : 'hidden'}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
