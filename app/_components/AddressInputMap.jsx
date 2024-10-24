"use client";
import { ServerLoading } from "@/components/LoadingPage";
import React, { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";

const AddressInputMap = ({ onComplete }) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [mapLink, setMapLink] = useState("");
  const [addressObj, setAddressObj] = useState({
    street1: "",
    street2: "",
    city: "",
    province: "",
    postalcode: "",
    country: "",
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    const addressComponents = results[0].address_components;
    console.log({ addressComponents });

    let updatedAddress = {
      street1: "",
      street2: "",
      city: "",
      province: "",
      postalcode: "",
      country: "",
    };

    // Loop through the address components to fill in the fields based on their types
    addressComponents.forEach((component) => {
      const types = component.types;

      if (types.includes("street_number")) {
        updatedAddress.street1 = component.long_name;
      }
      if (types.includes("route")) {
        updatedAddress.street1 += ` ${component.long_name}`;
      }
      if (types.includes("sublocality") || types.includes("neighborhood")) {
        updatedAddress.street2 = component.long_name;
      }
      if (types.includes("locality")) {
        updatedAddress.city = component.long_name;
      }
      if (types.includes("administrative_area_level_1")) {
        updatedAddress.province = component.long_name;
      }
      if (types.includes("postal_code")) {
        updatedAddress.postalcode = component.long_name;
      }
      if (types.includes("country")) {
        updatedAddress.country = component.long_name;
      }
    });

    updatedAddress["street1"] = updatedAddress?.street1 || updatedAddress?.street2 || updatedAddress?.city;

    setAddressObj(updatedAddress);
    setAddress(updatedAddress?.street1 || updatedAddress?.street2 || updatedAddress?.city);
    setCoordinates(latLng);
    setMapLink(`https://www.google.com/maps?q=${latLng.lat},${latLng.lng}`);

    onComplete({
      address: updatedAddress,
      mapLink: `https://www.google.com/maps?q=${latLng.lat},${latLng.lng}`,
    });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyC4xDqx5yDdrRzTGbAakYuRBjjf0wxpvYs" libraries={['places']}>
      <div className="flex flex-col items-center justify-center relative">
        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className="w-full">
              <input
                autoComplete="false"
                aria-autocomplete="false"
                {...getInputProps({
                  placeholder: "Type your address...",
                  className:
                    "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                })}
              />
              {(loading || suggestions?.length > 0) && (
                <div className="absolute mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                  {loading && <ServerLoading />}
                  {suggestions.map((suggestion) => {
                    const isActive = suggestion.active;
                    const suggestionStyles = isActive
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : "bg-white";

                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className: `p-2 cursor-pointer transition-all duration-200 ${suggestionStyles}`,
                        })}
                        key={suggestion.placeId}
                      >
                        <span className="text-gray-700">{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    </LoadScript>
  );
};

export default AddressInputMap;
