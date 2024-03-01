document.addEventListener('DOMContentLoaded', function () {
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
                        console.log(suggestions)
                        var suggestionList = '';
                        for (var i = 0; i < suggestions.length; i++) {
                            var placePrediction = suggestions[i].placePrediction;
                          var placeId = placePrediction.placeId;
                            var text = placePrediction.text.text;

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
                           // console.log("city",city + "state", state + "postalCode", postalCode );
                            suggestionList += '<li>' + suggestions[i]?.placePrediction?.text?.text + '</li>';
                        }
                        $('#autocomplete-results').html(suggestionList);
                        $('#autocomplete-results li').click(function () {
                            var selectedText = $(this).text();
                            var selectedPlaceId = $(this).data('placeid');
                            $('#autocomplete').val(selectedText);
                            $('#selected-place-id').val(selectedPlaceId);
                            $('#autocomplete-results').html('');
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