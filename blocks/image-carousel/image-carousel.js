import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Creates a YouTube embed from URL with autoplay support
 * @param {string} url YouTube URL
 * @param {boolean} autoplay Whether to autoplay the video
 * @returns {HTMLElement} Iframe element
 */
function createYouTubeEmbed(url, autoplay = false) {
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/)?.[1];
  
  if (!videoId) return null;
  
  const wrapper = document.createElement('div');
  wrapper.className = 'image-carousel-video-wrapper';
  
  const iframe = document.createElement('iframe');
  // Add autoplay=1 and mute=1 (required for autoplay) to URL if autoplay is true
  iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1${autoplay ? '&autoplay=1&mute=1' : ''}`;
  iframe.title = 'YouTube video player';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  
  wrapper.append(iframe);
  return wrapper;
}

/**
 * Creates a YouTube thumbnail preview
 * @param {string} url YouTube URL
 * @returns {HTMLElement} Preview element
 */
function createYouTubePreview(url) {
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/)?.[1];
  
  if (!videoId) return null;
  
  const wrapper = document.createElement('div');
  wrapper.className = 'image-carousel-preview-wrapper';
  
  // Create play button overlay
  const playButton = document.createElement('div');
  playButton.className = 'youtube-play-button';
  
  // Create preview image
  const img = document.createElement('img');
  img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  img.alt = 'YouTube video preview';
  
  wrapper.append(img, playButton);
  return wrapper;
}

/**
 * Updates the active indicator
 * @param {Element} block The carousel block element
 * @param {number} activeIndex The active slide index
 */
function updateIndicators(block, activeIndex) {
  const indicators = block.querySelectorAll('.image-carousel-indicator');
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === activeIndex);
    indicator.setAttribute('aria-selected', index === activeIndex);
  });
}

/**
 * Updates the active thumbnail
 * @param {Element} block The carousel block element
 * @param {number} activeIndex The active slide index
 */
function updateThumbnails(block, activeIndex) {
  const thumbnails = block.querySelectorAll('.image-carousel-thumbnail');
  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle('active', index === activeIndex);
    thumb.setAttribute('aria-selected', index === activeIndex);
  });
}

/**
 * Handles video playback when slide changes
 * @param {Element} block The carousel block element
 * @param {number} index The active slide index
 */
function handleVideoPlayback(block, index) {
  const slides = block.querySelectorAll('.image-carousel-slide');
  
  // Pause all videos
  slides.forEach((slide) => {
    const iframe = slide.querySelector('iframe');
    if (iframe) {
      // Post message to pause video
      iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      // Replace with non-autoplay version
      const videoWrapper = iframe.closest('.image-carousel-video-wrapper');
      if (videoWrapper) {
        const url = new URL(iframe.src).pathname.split('/').pop();
        const newEmbed = createYouTubeEmbed(`https://youtube.com/watch?v=${url}`, false);
        if (newEmbed) videoWrapper.replaceWith(newEmbed);
      }
    }
  });
  
  // Start video in active slide
  const activeSlide = slides[index];
  if (activeSlide && activeSlide.classList.contains('video-slide')) {
    const iframe = activeSlide.querySelector('iframe');
    if (iframe) {
      const url = new URL(iframe.src).pathname.split('/').pop();
      const autoplayEmbed = createYouTubeEmbed(`https://youtube.com/watch?v=${url}`, true);
      if (autoplayEmbed) iframe.closest('.image-carousel-video-wrapper').replaceWith(autoplayEmbed);
    }
  }
}

/**
 * Scrolls to a specific slide with fade effect
 * @param {Element} block The carousel block element
 * @param {number} index The target slide index
 */
function scrollToSlide(block, index) {
  const slideElements = block.querySelectorAll('.image-carousel-slide');
  
  if (index < 0) {
    index = slideElements.length - 1;
  } else if (index >= slideElements.length) {
    index = 0;
  }

  // Remove active class from all slides
  slideElements.forEach((slide) => {
    slide.classList.remove('active');
  });

  // Add active class to target slide
  slideElements[index].classList.add('active');
  
  // Handle video playback
  handleVideoPlayback(block, index);
  
  updateIndicators(block, index);
  updateThumbnails(block, index);
  block.dataset.currentSlide = index;
}

/**
 * Creates navigation buttons
 * @param {Element} block The carousel block element
 */
function createNavigation(block) {
  const nav = document.createElement('div');
  nav.className = 'image-carousel-navigation';
  
  const prevBtn = document.createElement('button');
  prevBtn.className = 'prev';
  prevBtn.setAttribute('aria-label', 'Previous slide');
  
  const nextBtn = document.createElement('button');
  nextBtn.className = 'next';
  nextBtn.setAttribute('aria-label', 'Next slide');
  
  nav.append(prevBtn, nextBtn);
  
  prevBtn.addEventListener('click', () => {
    const currentIndex = parseInt(block.dataset.currentSlide, 10);
    scrollToSlide(block, currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', () => {
    const currentIndex = parseInt(block.dataset.currentSlide, 10);
    scrollToSlide(block, currentIndex + 1);
  });
  
  return nav;
}

/**
 * Creates slide indicators
 * @param {Element} block The carousel block element
 * @param {number} count Number of slides
 */
function createIndicators(block, count) {
  const indicators = document.createElement('div');
  indicators.className = 'image-carousel-indicators';
  
  for (let i = 0; i < count; i += 1) {
    const button = document.createElement('button');
    button.className = 'image-carousel-indicator';
    button.setAttribute('aria-label', `Go to slide ${i + 1}`);
    button.setAttribute('aria-selected', i === 0);
    
    button.addEventListener('click', () => {
      scrollToSlide(block, i);
    });
    
    indicators.append(button);
  }
  
  return indicators;
}

/**
 * Creates thumbnails for the carousel
 * @param {Element} block The carousel block element
 * @param {Array} slides Array of slide elements
 */
function createThumbnails(block, slides) {
  const thumbnailsContainer = document.createElement('div');
  thumbnailsContainer.className = 'image-carousel-thumbnails';
  
  slides.forEach((slide, index) => {
    const img = slide.querySelector('img');
    if (img) {
      const button = document.createElement('button');
      button.className = 'image-carousel-thumbnail';
      button.setAttribute('aria-label', `Go to slide ${index + 1}`);
      button.setAttribute('aria-selected', index === 0);
      if (index === 0) button.classList.add('active');
      
      // Create optimized thumbnail image
      const thumbnail = createOptimizedPicture(img.src, '', false, [{ width: '160' }]);
      button.append(thumbnail);
      
      button.addEventListener('click', () => {
        scrollToSlide(block, index);
      });
      
      thumbnailsContainer.append(button);
    }
  });
  
  return thumbnailsContainer;
}

/**
 * Decorates the image carousel block
 * @param {Element} block The carousel block element
 */
export default function decorate(block) {
  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'image-carousel-slides';
  
  // Process images and videos
  const slides = [...block.children];
  slides.forEach((slide, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'image-carousel-slide';
    if (index === 0) slideDiv.classList.add('active');
    
    // Check for YouTube link
    const link = slide.querySelector('a[href*="youtube.com"], a[href*="youtu.be"]');
    if (link) {
      const videoEmbed = createYouTubeEmbed(link.href);
      if (videoEmbed) {
        slideDiv.classList.add('video-slide');
        slideDiv.append(videoEmbed);
        
        // Replace link with preview in original content
        const preview = createYouTubePreview(link.href);
        if (preview) {
          const linkWrapper = document.createElement('div');
          linkWrapper.className = 'youtube-link-wrapper';
          linkWrapper.innerHTML = `<p class="youtube-url">${link.href}</p>`;
          link.replaceWith(preview, linkWrapper);
        }
      }
    } else {
      // Handle image as before
      const img = slide.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [
          { width: '2000' },
          { width: '750' }
        ]);
        slideDiv.append(picture);
      }
    }
    
    slidesContainer.append(slideDiv);
  });
  
  // Clear original content and add new structure
  block.textContent = '';
  block.append(slidesContainer);
  
  // Add navigation if there's more than one slide
  if (slides.length > 1) {
    block.append(
      createNavigation(block),
      createIndicators(block, slides.length),
      createThumbnails(block, slides)
    );
    
    // Initialize current slide
    block.dataset.currentSlide = 0;
    
    // Set up intersection observer for automatic slide updates
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideIndex = [...slidesContainer.children].indexOf(entry.target);
            if (slideIndex !== parseInt(block.dataset.currentSlide, 10)) {
              scrollToSlide(block, slideIndex);
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    
    slidesContainer.querySelectorAll('.image-carousel-slide').forEach((slide) => {
      observer.observe(slide);
    });
  }
} 