//call back
const btnSearch = document.querySelector('#btnSearch');
const txtVerse = document.querySelector('#Search');
const txtReference = document.querySelector('#reference');
const txtPreview = document.querySelector('#preview');
const loader = document.querySelector('.loader'); 
const BASE_POINT = "https://bible-api.com/";

btnSearch.addEventListener('click', getBibleVerse);

// Listen for changes in the input field to re-enable the search button when typing starts
txtVerse.addEventListener('input', function() {
    if (txtVerse.value.trim()) {
        btnSearch.disabled = false; 
    } else {
        btnSearch.disabled = true; 
    }
});

function getBibleVerse() {
    let verse = txtVerse.value.trim(); 

    // Disable the search button immediately to prevent further clicks
    btnSearch.disabled = true;
    btnSearch.innerHTML = 'Search'; 

    // Show loader and clear previous content
    loader.style.display = 'block';
    txtReference.innerHTML = '';
    txtPreview.innerHTML = '';

    // Check if the verse input is empty
    if (!verse) {
        loader.style.display = 'none'; // Hide loader
        txtPreview.innerHTML = 'Please enter a verse.';
        return;
    }

    // Fetch the Bible verse from the API
    fetch(`${BASE_POINT}${verse}`)
        .then(function(res) {
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return res.json();
        })
        .then(function(data) {
            // Hide loader
            loader.style.display = 'none';

            // Display fetched Bible verse and reference
            if (data && data.reference && data.text) {
                txtReference.innerHTML = data.reference;
                txtPreview.innerHTML = data.text;
            } else {
                txtPreview.innerHTML = 'Verse not found.';
            }

            // Leave the button disabled after fetching the result until the user starts typing again
        })
        .catch(function(error) {
            loader.style.display = 'none'; // Hide loader if there's an error
            txtPreview.innerHTML = 'Error: Unable to give you the Bible verse. Please check the input and try again.';
            console.error('Error fetching data:', error);
        });
}
