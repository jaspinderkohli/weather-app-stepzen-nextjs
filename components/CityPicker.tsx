'use client' // so tyhat we can use useState and useEffect

import { Country, City } from "country-state-city"
import Select from "react-select";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlobeIcon } from "@heroicons/react/outline";

type option = {
    value: {
        latitude: string;
        longitude: string;
        isoCode: string;
    };
    label: string;
} | null;

type cityOption = {
    value: {
        latitude: string;
        longitude: string;
        countryCode: string;
        name: string;
        stateCode: string;
    };
    label: string;
} | null;

const options = Country.getAllCountries().map((country) => ({
    value: {
        latitude: country.latitude,
        longitude: country.longitude,
        isoCode: country.isoCode,
    },
    label: country.name,
}));


function CityPicker() {
    const [selectedCountry, setSelectedCountry] = useState<option>(null);
    const [selectedCity, setSelectedCity] = useState<cityOption>(null);
    const router = useRouter();

    const handleSelectedCountry = (selectedOption: option) => {
        setSelectedCountry(selectedOption);
        setSelectedCity(null);
        console.log(selectedOption);
    };

    const handleSelectedCity = (selectedOption: cityOption) => {
        setSelectedCity(selectedOption);
        router.push(`/location/${selectedOption?.value.latitude}/${selectedOption?.value.longitude}`)
        console.log(selectedOption);
    };

  return (
    <div className="space-y-4">
        <div className="space-y-2">
            <div className="flex items-center space-x-2 text-white/80">
                <GlobeIcon className="h-5 w-5 text-white" />
                <label htmlFor="country">Country</label>
            </div>
            <Select 
                className="text-black"
                value={selectedCountry}
                options={options}
                onChange={handleSelectedCountry} 
            />
        </div>

          {selectedCountry && (
              <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-white/80">
                      <GlobeIcon className="h-5 w-5 text-white" />
                      <label htmlFor="country">City</label>
                  </div>
                  <Select
                      className="text-black"
                      value={selectedCity}
                      onChange={handleSelectedCity}
                      options={
                            City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map((city) => ({
                                value: {
                                    latitude: city.latitude!,
                                    longitude: city.longitude!,
                                    countryCode: city.countryCode,
                                    name: city.name,
                                    stateCode: city.stateCode,
                                },
                                label: city.name,
                            }))
                      }
                    />
              </div>
          )}
    </div>
  )
}

export default CityPicker