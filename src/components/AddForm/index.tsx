'use client';

import React, { useState } from 'react';
import CountrySection from './CountrySection';
import CitySection from './CitySection';
import PlaceSection from './PlaceSection';
import PhotoSection from './PhotoSection';

const AddForm: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const handleCountrySelect = (countryId: string) => {
    setSelectedCountryId(countryId);
    setCurrentSection(2);
  };

  const handleCitySelect = (cityId: string) => {
    setSelectedCityId(cityId);
    setCurrentSection(3);
    console.log('Selected city ID:', cityId);
  };

  const handlePlaceSelect = (placeId: string) => {
    setSelectedPlaceId(placeId);
    setCurrentSection(4);
    console.log('Selected place ID:', placeId);
  };

  return (
    <div>
      {currentSection === 1 && (
        <CountrySection
          onSelectCountry={handleCountrySelect}
          onNextSection={() => setCurrentSection(2)}
        />
      )}

      {currentSection === 2 && selectedCountryId && (
        <CitySection
          countryId={selectedCountryId}
          onSelectCity={handleCitySelect}
          onNextSection={() => console.log('Next section (e.g., places)')}
        />
      )}

      {currentSection === 3 && selectedCountryId && selectedCityId && (
        <PlaceSection
          countryId={selectedCountryId}
          cityId={selectedCityId}
          onSelectPlace={handlePlaceSelect}
          onNextSection={() => console.log('Next section (e.g., places)')}
        />
      )}

      {currentSection === 4 && selectedCountryId && selectedCityId && selectedPlaceId && (
        <PhotoSection
          countryId={selectedCountryId}
          cityId={selectedCityId}
          placeId={selectedPlaceId}
        />
      )}
    </div>
  );
};

export default AddForm;
