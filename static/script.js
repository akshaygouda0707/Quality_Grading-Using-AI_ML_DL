function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setBallColors() {
    var balls = document.getElementsByClassName('ball');
    for (var i = 0; i < balls.length; i++) {
        balls[i].style.backgroundColor = randomColor();
    }
}

setBallColors(); // Call the function to set initial ball colors

function displaySelectedImage(input) {
    var uploadedImage = document.getElementById('uploaded-image');
    if (input.files.length > 0) {
        var reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        uploadedImage.src = '';
    }
}

function predictImage() {
    var formData = new FormData();
    var imageInput = document.getElementById('image-input');
    var predictionResult = document.getElementById('prediction-result');

    if (imageInput.files.length > 0) {
        var file = imageInput.files[0];
        formData.append('image', file);

        // Send the image for prediction
        fetch('/predict', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            predictionResult.innerHTML = 'Predicted Class: ' + result;
        })
        .catch(error => console.error(error));
    } else {
        // No image selected
        predictionResult.innerHTML = 'Please select an image.';
    }
}

// Update button color dynamically
var uploadButton = document.getElementById('upload-button');
uploadButton.style.backgroundColor = '#ff0000'; // Replace with your desired color

// Call setBallColors() every 2 seconds to change ball colors dynamically
setInterval(setBallColors, 2000);
