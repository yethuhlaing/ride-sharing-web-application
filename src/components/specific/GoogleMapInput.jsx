import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function GoogleMapInput( {value, handleSelect, placeholderName}) {
    return (
        <GooglePlacesAutocomplete
            selectProps={{
                value: value,
                onChange: (place) => handleSelect(place),
                placeholder: placeholderName,
                isClearable: true,
                required: true,
                className: 'w-full ml-4 text-sm rounded-lg',
                styles: {
                    input: (provided) => ({
                        ...provided,
                        minWidth: "210px"
                    })
                },
                components: {
                    DropdownIndicator: false
                }
            }}
        />
    )
}