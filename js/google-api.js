document.addEventListener('DOMContentLoaded', function () {
    $("#autocomplete-results").hide();
    $(document).ready(function () {
        $('#autocomplete').on('input', function (e) {
            var query = $(this).val();
            if (query.length > 0) {
                $.ajax({
                    url: 'https://api.hellochapter.dev/api/contact/autocomplete',
                    type: 'POST',
                    data: { input: query },
                    success: function (response) {
                        var suggestions = response.data.suggestions;
                       // console.log("suggestions list", suggestions);
                        // debugger;
                        // used for rendering addresses list
                        var suggestionList = '';
                        for (var i = 0; i < suggestions.length; i++) {
                            var placePrediction = suggestions[i].placePrediction;
                            let placeId = placePrediction.placeId;
                            var text = placePrediction.text.text;
                            // console.log("placeId11",placeId)
                            var city, state, postalCode;
                            var structuredFormat = placePrediction.structuredFormat;
                            if (structuredFormat && structuredFormat.mainText && structuredFormat.secondaryText) {
                                city = structuredFormat.mainText.text;
                                state = structuredFormat.secondaryText.text;
                            }

                            var types = placePrediction.types;
                            if (types && types.includes('postal_code')) {
                                postalCode = text.split(', ').pop();
                            }
                            let pattern = /\d/;
                            let found=pattern.test(text);
                            found? suggestionList += '<li data-placeid="' + placeId + '">' + text + '</li>':null;
                        }
                        $("#autocomplete-results").show();
                        $('#autocomplete-results').html(suggestionList);
                        $('#autocomplete-results li').click(function () {
                            let placeId= $(this).attr('data-placeid')
                            var selectedText = $(this).text();
                            $('#autocomplete').val(selectedText);
                            $('#autocomplete').attr("value", selectedText);
                            $('#autocomplete-results').html('');
                            $("#autocomplete-results").hide();

                            // set place id against the streetAddress field
                            $('#autocomplete').attr("data-place-id", placeId);

                            // API call to fetch selected address's details
                            $.ajax({
                                url: 'https://api.hellochapter.dev/api/contact/place/' + placeId,
                                type: 'GET',
                                success: function (placeInfo) {
                                    // debugger
                                    //console.log("placeInfo second api data", placeInfo)
                                    let city = "";
                                    let state = "";
                                    let postalCode = "";
                                    // console.log("placeInfo", placeInfo);
                                    let streetAddress='';
                                    placeInfo.data.addressComponents.forEach(function (component) {
                                        if (component.types.includes('locality')) {
                                            city = component.longText;
                                        } else if (component.types.includes('administrative_area_level_1')) {
                                            state = component.shortText;
                                        } else if (component.types.includes('postal_code')) {
                                            postalCode = component.longText;
                                        }else if (component.types.includes('street_number')) {
                                            streetAddress = component.longText;
                                        }else if (component.types.includes('route')) {
                                            streetAddress += " "+component.longText;
                                        }
                                        
                                        console.log(streetAddress,city, state, postalCode);
                                    });
                                    if (!city || !state || !postalCode) {
                                      // $("#autocomplete-results").show();
                                       //suggestionList += '<li class="red-text">Address not found. Check spelling or try another one.</li>'
                                        //$('#autocomplete-results').html(suggestionList);
                                       // $("#autocomplete-results").hide();

                                    } else {
                                        postDataObject.city = city;
                                        postDataObject.state = state;
                                        postDataObject.zipCode = postalCode;
                                        postDataObject.streetAddress=streetAddress;
                                    }
                                },
                                error: function (xhr, status, error) {
                                    console.error('Error:', status, error);
                                }
                            });
                        });
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', status, error);
                    }
                });
            } else {
                $('#autocomplete-results').html('');
            }
        });
    });
});
