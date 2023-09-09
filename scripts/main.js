var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

const thumbnails = document.querySelectorAll('.thumbnail-item');
const detailImage = document.querySelector('.detail-image');
const detailTitle = document.querySelector('.detail-image-title');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
let currentThumbnailIndex = 0;

function setDetails(imageUrl, titleText) {
  'use strict';

  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function showDetails() {
    'use strict;'
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function(event){
        event.preventDefault();
        console.log(event.key);
        if (event.metaKey === ESC_KEY) {
            hideDetails();
        }
    })
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
}

function showImage(index) {
  const thumbnail = thumbnails[index];
  const image = thumbnail.querySelector('.thumbnail-image');
  const title = thumbnail.querySelector('.thumbnail-title');

  detailImage.src = image.getAttribute('data-image-url');
  detailTitle.textContent = title.textContent;
  currentThumbnailIndex = index;

  // Enable/disable previous and next buttons
  prevButton.disabled = currentThumbnailIndex === 0;
  nextButton.disabled = currentThumbnailIndex === thumbnails.length - 1;
}

function showPreviousImage() {
  if (currentThumbnailIndex > 0) {
    showImage(currentThumbnailIndex - 1);
  }
}

function showNextImage() {
  if (currentThumbnailIndex < thumbnails.length - 1) {
    showImage(currentThumbnailIndex + 1);
  }
}

// Initialize with the first image
showImage(currentThumbnailIndex);

initializeEvents();
