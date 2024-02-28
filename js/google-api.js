document.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById('autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['geocode'], 
        componentRestrictions: { country: 'us' }, 
        fields: ['address_components', 'geometry'],
        strictBounds: true
    });

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            console.log("Place details not found for input: '" + place.name + "'");
            return;
        }

        var addressComponents = place.address_components;
        var city, state, postalCode;
        var hasCity = false, hasState = false, hasPostalCode = false;

        for (var i = 0; i < addressComponents.length; i++) {
            var component = addressComponents[i];
            var componentType = component.types[0];
            
            if (componentType === 'locality') {
                city = component.long_name;
                hasCity = true;
            } else if (componentType === 'administrative_area_level_1') {
                state = component.long_name;
                hasState = true;
            } else if (componentType === 'postal_code') {
                postalCode = component.long_name;
                hasPostalCode = true;
            }
            debugger;
        }
        console.log("city : ",city + " state : ", state + " postalCode : ", postalCode  );

        if (hasCity && hasState) {
            postDataObject.city = city;
            postDataObject.state = state;
        } else {
            postDataObject.city = null;
            postDataObject.state = null;
        }
        if (hasPostalCode) {
            postDataObject.zipCode = postalCode;
        } else {
            postDataObject.zipCode = null;
        }
    });
    input.addEventListener('input', function() {
        var inputText = input.value;
        if (inputText) {
            var autocompleteService = new google.maps.places.AutocompleteService();
            autocompleteService.getPlacePredictions({
                input: inputText,
                componentRestrictions: { country: 'us' }
            }, function(predictions, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                    console.log(predictions);
                }
            });
        }
    });
});
