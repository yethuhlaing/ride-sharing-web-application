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
                styles: {
                    input: (provided) => ({
                        ...provided,
                    }),
                    placeholder: (provided) => ({
                        ...provided,
                        fontSize: '14px',
                        color: 'primary-foreground',
                    }),
                    control: (provided) => ({
                        ...provided,
                        width: "300px",
                        '@media (min-width: 768px)': {
                            width: '500px', 
                        },
                        '@media (min-width: 1024px)': {
                            width: '250px',// lg:
                        },
                        borderRadius: '10px', 
                        paddingleft: "0.5rem",
                        paddingRight: "0.5rem",
                    }),
                },
                components: {
                    DropdownIndicator: false
                }
            }}
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        />
    )
}