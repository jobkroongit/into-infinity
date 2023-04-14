const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unslash API
let count = 5;
const apiKey = '6t5tRgYHf1pSmoUTN_HrJBhfwyJ4IcmiCwsK9scsMOY';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imageLoaded() {
   imagesLoaded++;
   if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
      count = 30;
   }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
   for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
   }
}

// Create elements for links & photos, add to DOM
function displayPhotos() {
   imagesLoaded = 0;
   totalImages = photosArray.length;
   // Run function for each object in photosArray
   photosArray.forEach((photo) => {
      // Creat <a> element to link to Unsplash
      const item = document.createElement('a');
      setAttributes(item, {
         href: photo.links.html,
         target: '_blank',
      });
      // Create <img> element for photo
      const img = document.createElement('img');
      setAttributes(img, {
         src: photo.urls.regular,
         alt: photo.alt_description,
         title: photo.alt_description,
      });
      // Event listener, check when each is finished loading
      img.addEventListener('load', imageLoaded)
      // Put <img> element inside <a> element, then put both inside imageContainer element
      item.appendChild(img);
      imageContainer.appendChild(item);
   });
}

// Get photo's from Unsplash API
async function getPhotos() {
   try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
   }  catch (error) {
      // Catch error here
   }
}

// Check to if scrolling near bottom of page and then load more photos.
window.addEventListener('scroll', () => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      ready = false;
      getPhotos();
   }
});

// On load
getPhotos();