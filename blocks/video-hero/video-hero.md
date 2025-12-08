# Video Hero

Full viewport hero section with background video and title overlay.

## Usage

Create a table with the following structure:

| Video Hero |
|---|
| # Main Heading |
| ## Subheading |
| https://www.youtube.com/watch?v=VIDEO_ID |

### Example

```
| Video Hero |
|---|
| # Welcome to Our Platform |
| ## Transforming the way you work |
| https://www.youtube.com/watch?v=dQw4w9WgXcQ |
```

## Supported Video Sources

- **YouTube** - Full YouTube URLs or youtu.be short links
- **Vimeo** - Vimeo video URLs
- **Native Video** - Direct links to MP4 or WEBM files

## Features

- **Full Viewport Height** - Video fills the entire screen height (100vh)
- **Responsive Video** - Automatically scales to maintain aspect ratio
- **Title Overlay** - H1 and H2 titles centered over the video
- **Autoplay** - Video plays automatically on load (muted)
- **Loop** - Video continuously loops for seamless playback
- **Lazy Loading** - Video loads only when the block enters the viewport
- **Motion Preferences** - Respects user's `prefers-reduced-motion` setting

## Styling

The block uses CSS custom properties from `styles/styles.css`:

- `--background-color` - Text color for titles (white)
- `--dark-color` - Fallback background color
- `--heading-font-family` - Font family for titles
- `--heading-font-size-xxl` - H1 font size
- `--heading-font-size-xl` - H2 font size

Text includes shadow for better readability over video backgrounds.

## Best Practices

- **Video Duration** - Keep videos short (15-30 seconds) for faster loading
- **Video Format** - Use MP4 with H.264 codec for best compatibility
- **Video Quality** - 1080p or higher recommended for full screen display
- **Titles** - Keep titles concise for better visual impact
- **Accessibility** - Video is decorative (muted, no sound) and not essential for understanding content

## Technical Details

- Videos are embedded as iframes (YouTube/Vimeo) or HTML5 video elements
- All videos are muted and set to loop automatically
- Video controls are disabled for cleaner appearance
- Uses IntersectionObserver for efficient lazy loading
- Responsive font sizes adjust based on viewport width

## Related Blocks

- [Hero](../hero/hero.md) - Simple hero with background image
- [Video](../video/video.md) - Standard video player with controls
