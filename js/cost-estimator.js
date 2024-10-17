document.addEventListener('DOMContentLoaded', () => {
    const sizeRange = document.getElementById('sizeRange');
    const complexityRange = document.getElementById('complexityRange');
    const scopeRange = document.getElementById('scopeRange');
    const qualityRange = document.getElementById('qualityRange');
    const polygon = document.getElementById('dynamicPolygon');

    // Function to generate diamond points based on slider values
    function generateDiamondPoints(size, complexity, scope, quality) {
        const centerX = 100;
        const centerY = 100;

        // Scaling factor to keep the values within bounds
        const scaleFactor = 1;

        const points = [
            `${centerX},${centerY - size * scaleFactor}`,          // Top point (Size)
            `${centerX + quality * scaleFactor},${centerY}`,       // Right point (Quality)
            `${centerX},${centerY + scope * scaleFactor}`,         // Bottom point (Scope)
            `${centerX - complexity * scaleFactor},${centerY}`     // Left point (Complexity)
        ];
        return points.join(' ');
    }

    // Function to update cost breakdown based on input values
    function updateCostBreakdown(size, complexity, scope, quality) {
        const baseCost = 50000; // Base cost for calculations
        const estimatedCost = Math.floor((size + complexity + scope + quality) / 4);
        document.getElementById('estimatedCost').innerText = estimatedCost;
        document.getElementById('complexityCost').innerText = estimatedCost + 10;
    }
    function updateFontsize(size, complexity, scope, quality) {
        const estimatedCostElement = document.getElementById('costBreakdown');
        const estimatedCostElement2 = document.getElementById('costBreakdown2');
        const headingText = document.getElementById('heading-text');
        let baseFontSize = scope < 50 ? 14 : 17;
        const scaledFontSize = baseFontSize * 0.92 + 'px';
        if (scope < 50) {
            estimatedCostElement.style.fontSize = scaledFontSize;
        estimatedCostElement2.style.fontSize = scaledFontSize;
        headingText.style.fontSize = scaledFontSize;
        } else {
            estimatedCostElement.style.fontSize = 'inherit';
            estimatedCostElement2.style.fontSize = 'inherit';
            headingText.style.fontSize = 'inherit';
        }
    }

    function updateTextBasedOnInput(renovationOptions, size, complexity, scope, quality) {
        const propertyType = document.getElementById('propertyType');
        const renovationType = document.getElementById('renovationType');

        // Find the matching renovation option from the JSON data

        const matchingOption = renovationOptions.find(option => {
            return (option.size === getSizeCategory(size) &&
                option.complexity === getComplexityCategory(complexity) &&
                option.scope === getScopeCategory(scope) &&
                option.quality === getQualityCategory(quality));
        });

        // Update the innerText with values from the JSON data if a match is found
        if (matchingOption) {
            propertyType.innerText = matchingOption.propertyType;
            renovationType.innerText = matchingOption.renovationType;
        } else {
            // Default values if no match is found
            propertyType.innerText = 'Unknown Property Type';
            renovationType.innerText = 'Unknown Renovation Type';
        }
    }


    // Function to update the diamond shape and cost breakdown based on range inputs
    function initiateDiamond(e) {
        const size = parseInt(sizeRange.value);
        const complexity = parseInt(complexityRange.value);
        const scope = parseInt(scopeRange.value);
        const quality = parseInt(qualityRange.value);
        const points = generateDiamondPoints(size, complexity, scope, quality);
        polygon.setAttribute('points', points);

        // Update circle positions
        document.getElementById('circle1').setAttribute('cy', 100 - size);
        document.getElementById('circle2').setAttribute('cx', 100 + quality);
        document.getElementById('circle3').setAttribute('cy', 100 + scope);
        document.getElementById('circle4').setAttribute('cx', 100 - complexity);

        updateCostBreakdown(size, complexity, scope, quality);
        // updateTextBasedOnInput(renovationOptions, size, complexity, scope, quality);
        updateFontsize(size, complexity, scope, quality)
    }

    // Initial diamond rendering based on default values
    initiateDiamond();

    // handler function for range selectors
    const updateDiamond = (e) => {
        // update diamond
        const size = parseInt(sizeRange.value);
        const complexity = parseInt(complexityRange.value);
        const scope = parseInt(scopeRange.value);
        const quality = parseInt(qualityRange.value);
        const points = generateDiamondPoints(size, complexity, scope, quality);
        polygon.setAttribute('points', points);

        // Update circle positions
        document.getElementById('circle1').setAttribute('cy', 100 - size);
        document.getElementById('circle2').setAttribute('cx', 100 + quality);
        document.getElementById('circle3').setAttribute('cy', 100 + scope);
        document.getElementById('circle4').setAttribute('cx', 100 - complexity);
        // update diamond

        updateCostBreakdown(size, complexity, scope, quality);
        updateFontsize(size, complexity, scope, quality)
    }

    // Add event listeners to update the diamond when the range values change
    sizeRange.addEventListener('input', updateDiamond);
    complexityRange.addEventListener('input', updateDiamond);
    scopeRange.addEventListener('input', updateDiamond);
    qualityRange.addEventListener('input', updateDiamond);
    const sizeRange1 = document.getElementById('sizeRange');
    const sizeText = document.getElementById('sizeText');

    function updateSizeTextAndSlider(value) {
        let text;
        let slideIndex;
        if (value <= 30) {
            text = 'Small';
            slideIndex = 0;
        } else if (value <= 60) {
            text = 'Medium';
            slideIndex = 1;
        } else {
            text = 'Large';
            slideIndex = 2;
        }

        sizeText.textContent = text;
        $('.slick-slider').slick('slickGoTo', slideIndex);
    }

    sizeRange1.addEventListener('input', () => {
        updateSizeTextAndSlider(sizeRange1.value);
    });

    // Initialize on page load
    updateSizeTextAndSlider(sizeRange1.value);
});

jQuery(document).ready(function ($) {
    const sliderContainer = $('#slick-slider');

    // Fetching the data for the slider
    fetch('../js/cost-estimator.json')
        .then(response => response.json())
        .then(data => {
            const pathname = window.location.pathname;
            const filteredData = data.filter(post => post.blogUrl !== pathname);
            shuffleArray(filteredData);

            filteredData[0]?.imges?.forEach(post => {
                const slide = `
                    <div class="custom-slide">
                        <div class="slide-image-wrap">
                            <img src="${post.imageUrl}" alt="Image">
                        </div>
                    </div>
                `;
                sliderContainer.append(slide);
            });

            // Initialize slick slider after appending elements
            sliderContainer.slick({
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });
            //console.log("Full data object:", data); // Log the entire data
            const renovationOptions = data[0]?.renovationOptions;
            // console.log("renovationOptions", renovationOptions)

            // Helper functions to categorize input values into the JSON categories
            function getSizeCategory(size) {
                if (size <= 30) return 'Small';
                else if (size <= 60) return 'Medium';
                else return 'Large';
            }

            function getComplexityCategory(complexity) {
                if (complexity <= 30) return 'Simple';
                else if (complexity <= 60) return 'Moderate';
                else return 'Complex';
            }

            function getScopeCategory(scope) {
                if (scope <= 30) return 'Minimal';
                else if (scope <= 60) return 'Standard';
                else return 'Full';
            }

            function getQualityCategory(quality) {
                if (quality <= 30) return 'Low';
                else if (quality <= 60) return 'Medium';
                else return 'High';
            }
            updateTextBasedOnInput(renovationOptions, size, complexity, scope, quality);
        })
        .catch(error => {
            //console.error('Error fetching blog data:', error);
        });

    // Shuffle function for the array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});