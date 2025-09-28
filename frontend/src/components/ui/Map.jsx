import React, { useEffect, useRef } from 'react';

const Map = ({ location, zoom = 15 }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: location,
          zoom,
        });

        new window.google.maps.Marker({
          position: location,
          map,
          title: 'Resort Location',
        });
      }
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      if (window.google && window.initMap) {
        delete window.initMap;
      }
    };
  }, [location, zoom]);

  return (
    <div 
      ref={mapRef} 
      style={{ height: '400px', width: '100%' }}
      className="rounded"
    ></div>
  );
};

export default Map;