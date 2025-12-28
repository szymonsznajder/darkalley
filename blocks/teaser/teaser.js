import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Checks if a URL is a YouTube video
 * @param {string} url URL to check
 * @returns {boolean} True if YouTube URL
 */
function isYouTubeUrl(url) {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

/**
 * Extracts YouTube video ID from URL
 * @param {string} url YouTube URL
 * @returns {string|null} Video ID or null
 */
function getYouTubeVideoId(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/);
  return match ? match[1] : null;
}

/**
 * Creates a YouTube embed iframe
 * @param {string} videoId YouTube video ID
 * @returns {HTMLElement} Iframe wrapper
 */
function createYouTubeEmbed(videoId) {
  const wrapper = document.createElement('div');
  wrapper.className = 'teaser-video-wrapper';

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0`;
  iframe.title = 'YouTube video player';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';

  wrapper.append(iframe);
  return wrapper;
}

/**
 * Checks if a URL is a video file
 * @param {string} url URL to check
 * @returns {boolean} True if video file
 */
function isVideoFile(url) {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
  return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
}

/**
 * Creates a video element for asset videos
 * @param {string} src Video source URL
 * @returns {HTMLElement} Video wrapper
 */
function createVideoElement(src) {
  const wrapper = document.createElement('div');
  wrapper.className = 'teaser-video-wrapper';

  const video = document.createElement('video');
  video.setAttribute('controls', '');
  video.setAttribute('playsinline', '');
  video.loading = 'lazy';

  const source = document.createElement('source');
  source.src = src;
  const extension = src.split('.').pop().toLowerCase();
  source.type = `video/${extension === 'mov' ? 'mp4' : extension}`;

  video.append(source);
  wrapper.append(video);
  return wrapper;
}

/**
 * Processes the media cell (image or video)
 * @param {Element} cell Media cell element
 * @returns {HTMLElement|null} Processed media element
 */
function processMedia(cell) {
  // Check for video link first
  const link = cell.querySelector('a');
  if (link) {
    const url = link.href;

    // YouTube video
    if (isYouTubeUrl(url)) {
      const videoId = getYouTubeVideoId(url);
      if (videoId) {
        return createYouTubeEmbed(videoId);
      }
    }

    // Asset video file
    if (isVideoFile(url)) {
      return createVideoElement(url);
    }
  }

  // Image (picture element)
  const picture = cell.querySelector('picture');
  if (picture) {
    const wrapper = document.createElement('div');
    wrapper.className = 'teaser-image-wrapper';
    wrapper.append(picture.cloneNode(true));
    return wrapper;
  }

  // Fallback: try to get img and create optimized picture
  const img = cell.querySelector('img');
  if (img) {
    const wrapper = document.createElement('div');
    wrapper.className = 'teaser-image-wrapper';
    const optimizedPicture = createOptimizedPicture(img.src, img.alt || '', false, [
      { width: '750' }
    ]);
    wrapper.append(optimizedPicture);
    return wrapper;
  }

  return null;
}

/**
 * Processes the content cell (title, description, buttons)
 * @param {Element} cell Content cell element
 * @returns {Object} Processed content
 */
function processContent(cell) {
  const title = cell.querySelector('h1, h2, h3, h4, h5, h6');
  const paragraphs = cell.querySelectorAll('p:not(:has(a))');
  const links = cell.querySelectorAll('a');

  return {
    title: title ? title.textContent.trim() : '',
    titleTag: title ? title.tagName.toLowerCase() : 'h2',
    description: Array.from(paragraphs).map(p => p.textContent.trim()).filter(text => text),
    buttons: Array.from(links).map(link => ({
      text: link.textContent.trim(),
      href: link.href,
      title: link.title || link.textContent.trim()
    }))
  };
}

/**
 * Decorates the teaser block
 * @param {Element} block The teaser block element
 */
export default function decorate(block) {
  // Configuration
  const config = {
    defaultMediaPosition: 'left',
    errorMessage: 'Unable to load content'
  };

  try {
    // Extract content from block structure
    const rows = Array.from(block.children);
    if (rows.length === 0) {
      throw new Error('No content rows found');
    }

    // Get the first row (should contain media and content cells)
    const firstRow = rows[0];
    const cells = Array.from(firstRow.children);

    if (cells.length < 2) {
      throw new Error('Teaser block requires two columns: media and content');
    }

    // Process media (first cell)
    const mediaElement = processMedia(cells[0]);

    // Process content (second cell)
    const content = processContent(cells[1]);

    // Create new structure
    const container = document.createElement('div');
    container.className = 'teaser-container';

    // Add media section
    if (mediaElement) {
      const mediaSection = document.createElement('div');
      mediaSection.className = 'teaser-media';
      mediaSection.append(mediaElement);
      container.append(mediaSection);
    }

    // Add content section
    const contentSection = document.createElement('div');
    contentSection.className = 'teaser-content';

    // Add title
    if (content.title) {
      const titleElement = document.createElement(content.titleTag);
      titleElement.className = 'teaser-title';
      titleElement.textContent = content.title;
      contentSection.append(titleElement);
    }

    // Add description
    if (content.description.length > 0) {
      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.className = 'teaser-description';

      content.description.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        descriptionWrapper.append(p);
      });

      contentSection.append(descriptionWrapper);
    }

    // Add buttons
    if (content.buttons.length > 0) {
      const buttonsWrapper = document.createElement('div');
      buttonsWrapper.className = 'teaser-buttons';

      content.buttons.forEach((button, index) => {
        const btnElement = document.createElement('a');
        btnElement.href = button.href;
        btnElement.textContent = button.text;
        btnElement.title = button.title;
        btnElement.className = index === 0 ? 'teaser-button primary' : 'teaser-button secondary';
        buttonsWrapper.append(btnElement);
      });

      contentSection.append(buttonsWrapper);
    }

    container.append(contentSection);

    // Replace block content
    block.textContent = '';
    block.append(container);

  } catch (error) {
    console.error('Teaser block decoration failed:', error);
    block.innerHTML = `<p class="error-message">${config.errorMessage}</p>`;
  }
}
