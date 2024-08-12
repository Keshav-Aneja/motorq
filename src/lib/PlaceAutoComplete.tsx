import { Dispatch, SetStateAction, useEffect, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import axios from "axios";
import { cn } from "@/lib/utils";

export default function PlaceAutocomplete({
  setValue,
  type = "none",
  label = "Address",
  placeholder = "Enter full address",
  fullAdd = false,
  error,
  className,
  defaultAdd,
  showLabel = true,
  suggestionBoxStyle,
}: {
  setValue: any;
  type?: string;
  label?: string;
  placeholder?: string;
  fullAdd?: boolean;
  name?: string;
  error?: boolean;
  className?: string;
  defaultAdd?: string;
  showLabel?: boolean;
  suggestionBoxStyle?: string;
}) {
  const cityOptions = {
    types: ["(cities)"],
    fields: ["place_id", "geometry", "address_components", "formatted_address"],
    componentRestrictions: { country: "in" },
  };
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    options:
      type === "cities"
        ? cityOptions
        : {
            fields: [
              "place_id",
              "geometry",
              "address_components",
              "formatted_address",
            ],
            componentRestrictions: { country: "in" },
          },
  });
  const [placeDetails, setPlaceDetails] = useState<any>(null);
  const [openSuggestionBox, setOpenSuggestionBox] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [inputQuery, setInputQuery] = useState(defaultAdd || "");
  useEffect(() => {
    if (placePredictions.length) {
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails: any) => {
          const { lat, lng } = placeDetails.geometry.location;
          const addressComponents = placeDetails.address_components;
          const formattedAddress = placeDetails.formatted_address;
          let city = "";
          let state = "";
          let postalCode = "";
          for (const component of addressComponents) {
            if (component.types.includes("locality")) {
              city = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
              state = component.long_name;
            }
            if (component.types.includes("postal_code")) {
              postalCode = component.long_name;
            }
          }
          console.log(city, state, postalCode);
          setPlaceDetails({
            ...placeDetails,
            coordinates: { lat: lat(), lng: lng() },
            city,
            state,
            postalCode,
          });
        }
      );
      setOpenSuggestionBox(true);
    } else {
      setOpenSuggestionBox(false);
    }
  }, [placePredictions]);
  useEffect(() => {
    if (selectedValue.length > 0) {
      (async () => {
        try {
          if (fullAdd) {
            setValue({
              address: placeDetails.formatted_address,
              lat: placeDetails.coordinates.lat,
              lng: placeDetails.coordinates.lng,
              city: placeDetails.city,
              state: placeDetails.state,
              pinCode: placeDetails.postalCode,
            });
          } else {
            setValue(selectedValue);
          }
        } catch (error) {
          console.log("Error fetching Postal code");
        }
      })();
    }
  }, [selectedValue]);

  return (
    <div
      className={cn(
        "relative w-full md:w-[80%] flex flex-col gap-2",
        error && "text-destructive",
        className
      )}
    >
      {showLabel && (
        <FormLabel className="text-base font-semibold">
          {label}
          <strong>*</strong>
        </FormLabel>
      )}
      <Input
        placeholder={placeholder}
        onChange={(evt) => {
          getPlacePredictions({ input: evt.target.value });
          setInputQuery(evt.target.value);
        }}
        className="text-black bg-white dark:text-white"
        value={inputQuery}
      />
      {openSuggestionBox && (
        <div
          className={cn(
            "w-full p-2 absolute top-20 flex flex-col gap-1 bg-white rounded-lg shadow-xl z-[200]",
            suggestionBoxStyle
          )}
        >
          {placePredictions.map((item) => (
            <span
              key={item.place_id}
              className="text-sm font-medium text-black/70 truncate hover:bg-slate-300 p-1 rounded-md px-2 cursor-pointer"
              onClick={() => {
                setSelectedValue(item.description);
                setOpenSuggestionBox(false);
                setInputQuery(item.description);
              }}
            >
              {item.description}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
