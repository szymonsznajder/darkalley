/*
 * Video Hero Block
 * Full viewport hero with background video and title overlay
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function embedYoutube(url) {
  const usp = new URLSearchParams(url.search);
  const suffixParams = {
    autoplay: '1',
    mute: '1',
    controls: '0',
    disablekb: '1',
    loop: '1',
    playsinline: '1',
    playlist: '', // Will be set to video ID for looping
  };

  let vid = usp.get('v') ? encodeURIComponent(usp.get('v')) : '';
  const embed = url.pathname;
  if (url.origin.includes('youtu.be')) {
    [, vid] = url.pathname.split('/');
  }

  // Set playlist to video ID for loop to work
  if (vid) {
    suffixParams.playlist = vid;
  }

  const suffix = `&${Object.entries(suffixParams).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')}`;

  const temp = document.createElement('div');
  temp.className = 'video-hero-background';
  temp.innerHTML = `<iframe src="https://www.youtube.com${vid ? `/embed/${vid}?rel=0&v=${vid}${suffix}` : embed}"
    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture"
    allowfullscreen=""
    scrolling="no"
    title="Background Video"
    loading="lazy"></iframe>`;
  return temp;
}

function embedVimeo(url) {
  const [, video] = url.pathname.split('/');
  const suffixParams = {
    autoplay: '1',
    background: '1',
    loop: '1',
    muted: '1',
  };
  const suffix = `?${Object.entries(suffixParams).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')}`;

  const temp = document.createElement('div');
  temp.className = 'video-hero-background';
  temp.innerHTML = `<iframe src="https://player.vimeo.com/video/${video}${suffix}"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
    title="Background Video"
    loading="lazy"></iframe>`;
  return temp;
}

function getVideoElement(source) {
  const wrapper = document.createElement('div');
  wrapper.className = 'video-hero-background';

  const video = document.createElement('video');
  video.setAttribute('autoplay', '');
  video.setAttribute('loop', '');
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.removeAttribute('controls');

  video.addEventListener('canplay', () => {
    video.muted = true;
    video.play();
  });

  const sourceEl = document.createElement('source');
  sourceEl.setAttribute('src', source);
  sourceEl.setAttribute('type', `video/${source.split('.').pop()}`);
  video.append(sourceEl);

  wrapper.append(video);
  return wrapper;
}

const loadVideoEmbed = (block, link) => {
  if (block.dataset.embedLoaded === 'true') {
    return;
  }

  const url = new URL(link);
  const isYoutube = link.includes('youtube') || link.includes('youtu.be');
  const isVimeo = link.includes('vimeo');

  let embedWrapper;

  if (isYoutube) {
    embedWrapper = embedYoutube(url);
    block.prepend(embedWrapper);
    embedWrapper.querySelector('iframe').addEventListener('load', () => {
      block.dataset.embedLoaded = true;
    });
  } else if (isVimeo) {
    embedWrapper = embedVimeo(url);
    block.prepend(embedWrapper);
    embedWrapper.querySelector('iframe').addEventListener('load', () => {
      block.dataset.embedLoaded = true;
    });
  } else {
    embedWrapper = getVideoElement(link);
    block.prepend(embedWrapper);
    embedWrapper.querySelector('video').addEventListener('canplay', () => {
      block.dataset.embedLoaded = true;
    });
  }
};

export default async function decorate(block) {
  // Extract content from block
  const link = block.querySelector('a')?.href;
  const h1 = block.querySelector('h1');
  const h2 = block.querySelector('h2');

  if (!link) {
    block.textContent = 'Video URL is required';
    return;
  }

  // Store titles
  const h1Text = h1?.textContent || '';
  const h2Text = h2?.textContent || '';

  // Clear block
  block.textContent = '';
  block.dataset.embedLoaded = false;

  // Create content overlay with titles
  const contentOverlay = document.createElement('div');
  contentOverlay.className = 'video-hero-content';

  if (h1Text) {
    const heading1 = document.createElement('h1');
    heading1.textContent = h1Text;
    contentOverlay.append(heading1);
  }

  if (h2Text) {
    const heading2 = document.createElement('h2');
    heading2.textContent = h2Text;
    contentOverlay.append(heading2);
  }

  block.append(contentOverlay);

  // Lazy load video when block enters viewport
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      // Only autoplay if user hasn't set reduced motion preference
      if (!prefersReducedMotion.matches) {
        loadVideoEmbed(block, link);
      } else {
        // Show a static background or skip video
        block.classList.add('no-video');
      }
    }
  });
  observer.observe(block);
}
