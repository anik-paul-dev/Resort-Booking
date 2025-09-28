import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [features, setFeatures] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const settingsResponse = await api.get('/admin/settings');
        setSettings(settingsResponse.data);

        const featuresResponse = await api.get('/features');
        setFeatures(featuresResponse.data.features);

        const facilitiesResponse = await api.get('/facilities');
        setFacilities(facilitiesResponse.data.facilities);

        const carouselResponse = await api.get('/carousel?isActive=true');
        setCarousel(carouselResponse.data);
      } catch (error) {
        console.error('Error fetching app data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppData();
  }, []);

  const value = {
    settings,
    features,
    facilities,
    carousel,
    loading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};