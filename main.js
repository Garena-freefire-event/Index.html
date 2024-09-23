// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the confirm button and the popup overlay
    const confirmButton = document.getElementById('FconfirmButton');
    const popupOverlay = document.getElementById('FpopupOverlay');

    // Add a click event listener to the confirm button
    confirmButton.addEventListener('click', function () {
        // Hide the popup overlay when the confirm button is clicked
        popupOverlay.style.display = 'none';
    });
});

// Get elements
const popupOverlay = document.getElementById('popupOverlay');
const confirmButton = document.getElementById('confirmButton');

const spinBtn = document.getElementById('spinBtn');
const items = document.querySelectorAll('.item');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupImage = document.getElementById('popup-image');

// Variables for spinning logic
let currentIndex = 0;
let spinning = false;
let spinSpeed = 40;        // Initial fast spin speed
let finalSpeed = 500;       // Slowest spin speed
let minSpinTime = 4000;     // Minimum spin time (4 seconds)
let maxSpinTime = 5500;     // Maximum spin time (5.5 seconds)
let accelerationTime = 1300;// Time for accelerating spin (1.3 seconds)
let slowdownStart = 3000;   // Time to start slowing down (3 seconds)
let startTime;
let totalSpinTime;          // Total spin time

// Spin sequence (clockwise around center)
const spinSequence = [0,1,2,3,5,9,8,7,6,4]; 

// Item images and names for popup display
const itemImages = [
"https://i.postimg.cc/XNRSCZXm/Picsart-24-09-22-17-23-21-544.jpg",
"https://i.postimg.cc/j2VgL7vh/Picsart-24-09-22-17-03-10-578.jpg",
"https://i.postimg.cc/PJm6Z5Rn/Picsart-24-09-22-17-07-40-474.jpg",
"https://i.postimg.cc/wTCs2pPF/maxresdefault.jpg",
"https://i.postimg.cc/Wb1r04Km/Picsart-24-09-22-16-48-19-014.jpg",
"https://i.postimg.cc/DzZYDF81/Fcc-Bg9-Ka-UAMx-KMv.jpg",
"https://i.postimg.cc/zBkbgmFP/Picsart-24-09-22-16-43-41-811.jpg",
"https://i.postimg.cc/XYTCMkvx/Picsart-24-09-22-17-10-08-666.jpg",
"https://i.postimg.cc/9XqsCW1p/f3b9f-16651241660228-1920.jpg",
"https://i.postimg.cc/8PmKzsvh/Picsart-24-09-22-16-48-56-124.jpg",

];

const itemNames = [
    "MP40 EVO MAX","BOUNTY STORE","GOLD EXP CARD","WOODPECKER EVO MAX","BOAN FIRE","UMP EVO MAX","SPECIAL EMOT","CUBE FRAGMENT","FAMASH EVO MAX"
];

// Function to reset item borders
function resetBorders() {
    items.forEach(item => {
        if (!item.classList.contains('center-item')) {
            item.classList.remove('active');
        }
    });
}

// Main spin function
function spin() {
    resetBorders(); // Reset borders before each spin
    items[spinSequence[currentIndex]].classList.add('active'); // Highlight current item
    currentIndex = (currentIndex + 1) % spinSequence.length; // Update currentIndex

    let elapsedTime = performance.now() - startTime;

    if (elapsedTime < accelerationTime) {
        // Fast spinning phase
        setTimeout(spin, spinSpeed);
    } else if (elapsedTime < slowdownStart) {
        // Slowing down phase
        let progress = (elapsedTime - accelerationTime) / (slowdownStart - accelerationTime);
        spinSpeed = 50 + progress * (finalSpeed - 50); // Gradually slow down
        setTimeout(spin, spinSpeed);
    } else if (elapsedTime < totalSpinTime) {
        // Final slow spin phase
        setTimeout(spin, finalSpeed);
    } else {
        // Stop spinning and select final item
        finalizeSpin();
    }
}

// Finalize spin and show popup
function finalizeSpin() {
    resetBorders();
    let stopIndex = (currentIndex - 1 + spinSequence.length) % spinSequence.length;
    items[spinSequence[stopIndex]].classList.add('active'); // Highlight stopped item
    showPopup(stopIndex); // Show popup with item details
    spinning = false;
    spinSpeed = 50; // Reset spin speed for next spin
    spinBtn.disabled = false;
}

// Start spin button click event
spinBtn.addEventListener('click', function () {
    if (!spinning) {
        spinning = true;
        spinBtn.disabled = true;
        startTime = performance.now(); // Start timing the spin
        totalSpinTime = Math.random() * (maxSpinTime - minSpinTime) + minSpinTime; // Random spin duration
        spin(); // Start the spin
    }
});

// Show popup with selected item details
function showPopup(stopIndex) {
    popupTitle.innerText = itemNames[stopIndex];  // Set item name
    popupImage.src = itemImages[stopIndex];       // Set item image
    popupOverlay.style.display = 'block';         // Show the popup overlay
    popup.classList.add('active');                // Show the popup
}

// Claim button event to link to a specific URL

// Close popup when confirm button is clicked
function closePopup() {
    popupOverlay.style.display = 'none'; // Close the popup
}