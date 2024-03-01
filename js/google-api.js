document.addEventListener('DOMContentLoaded', function () {
    $("#autocomplete-results").hide();
    $(document).ready(function () {
        $('#autocomplete').on('input', function () {
            var query = $(this).val();
            if (query.length > 0) {
                $.ajax({
                    url: 'https://api.hellochapter.dev/api/contact/autocomplete',
                    type: 'POST',
                    data: { input: query },
                    success: function (response) {
                        var suggestions = response.data.suggestions;
                        console.log("suggestions", suggestions);

                        // used for rendering addresses list
                        var suggestionList = '';
                        for (var i = 0; i < suggestions.length; i++) {
                            var placePrediction = suggestions[i].placePrediction;
                            var placeId = placePrediction.placeId;
                            var text = placePrediction.text.text;
                            console.log(placeId)
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

                            
                            suggestionList += '<li data-placeid="' + placeId + '">' + text + '</li>';
                        }
                        $("#autocomplete-results").show();
                        $('#autocomplete-results').html(suggestionList);
                        $('#autocomplete-results li').click(function () {
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
                                    console.log("placeInfo second api data", placeInfo)
                                    var city = placeInfo.city;
                                    var state = placeInfo.state;
                                    var postalCode = placeInfo.postalCode;
                                    placeInfo.data.addressComponents.forEach(function(component) {
                                        if (component.types.includes('locality')) {
                                            city = component.longText;
                                        } else if (component.types.includes('administrative_area_level_1')) {
                                            state = component.shortText;
                                        } else if (component.types.includes('postal_code')) {
                                            postalCode = component.longText;
                                        }
                                    });

                                    postDataObject.city = city;
                                    postDataObject.state = state;
                                    postDataObject.zipCode = postalCode;
                                    console.log("City:", city);
                                    console.log("State:", state);
                                    console.log("Postal Code:", postalCode);
                                   // console.log("latestRecord", secondApiResponse)
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
