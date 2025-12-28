# Teaser Block

A versatile content block for showcasing featured content with media (images or videos), title, description, and call-to-action buttons.

## Features

- **Multiple Media Types Support:**
  - Static images (JPG, PNG, JPEG)
  - YouTube videos (embedded)
  - Asset videos (MP4, WebM, OGG, MOV)
- **Responsive Design:** Mobile-first layout that adapts to tablet and desktop
- **Flexible Content:** Support for title, description (multiple paragraphs), and multiple buttons
- **Accessible:** Semantic HTML, keyboard navigation, and screen reader support
- **Performance Optimized:** Lazy loading for images and videos

## Content Structure

The teaser block uses a two-column layout in the document:

| Media | Content |
|-------|---------|
| [Image or Video Link] | [Title, Description, Buttons] |

### Media Column (First Column)
- **For Images:** Add an image directly
- **For YouTube Videos:** Add a link to the YouTube video
- **For Asset Videos:** Add a link to the video file (must end in .mp4, .webm, .ogg, or .mov)

### Content Column (Second Column)
- **Title:** Add as a heading (H2, H3, H4, etc.)
- **Description:** Add as one or more paragraphs
- **Buttons:** Add as links

## Usage Examples

### Example 1: Image Teaser with Buttons

```
| Image | Content |
|-------|---------|
| ![Product Image](/images/product.jpg) | ## New Product Launch |
|       | Our latest innovation brings cutting-edge technology to your fingertips. |
|       | Experience the future today. |
|       | [Learn More](/products/new) |
|       | [Buy Now](/shop) |
```

### Example 2: YouTube Video Teaser

```
| Video | Content |
|-------|---------|
| [https://www.youtube.com/watch?v=VIDEO_ID](https://www.youtube.com/watch?v=VIDEO_ID) | ## Watch Our Story |
|       | Discover how we're making a difference in communities around the world. |
|       | [Get Involved](/volunteer) |
```

### Example 3: Asset Video Teaser

```
| Video | Content |
|-------|---------|
| [/videos/demo.mp4](/videos/demo.mp4) | ## Product Demo |
|       | See how easy it is to get started with our platform. |
|       | Watch this quick 2-minute tutorial. |
|       | [Start Free Trial](/signup) |
```

## Variants

### Default (Media Left)
The default layout places media on the left and content on the right (on desktop).

### Media Right
To place media on the right side, add the `media-right` class to the block:

```
| Image | Content |
|-------|---------|
| (media-right) | |
| ![Image](/image.jpg) | ## Title |
|       | Description text |
|       | [Button](/link) |
```

### Full Width Media
To display media at full width with content below, add the `full-width-media` class:

```
| Image | Content |
|-------|---------|
| (full-width-media) | |
| ![Image](/image.jpg) | ## Title |
|       | Description text |
|       | [Button](/link) |
```

## Styling

### CSS Variables
The block uses the following CSS variables for theming:

- `--spacing-xs`, `--spacing-s`, `--spacing-m`, `--spacing-l`, `--spacing-xl`: Spacing values
- `--heading-font-family`: Font family for titles
- `--body-font-family`: Font family for body text
- `--heading-font-size-l`, `--heading-font-size-xl`, `--heading-font-size-xxl`: Title sizes
- `--body-font-size-s`, `--body-font-size-m`, `--body-font-size-l`: Body text sizes
- `--primary-color`: Primary button color
- `--primary-color-dark`: Primary button hover color
- `--color-white`: Button text color
- `--text-color`: Default text color
- `--heading-color`: Heading color
- `--border-radius`: Border radius for media and buttons
- `--background-color`: Background for video wrapper

### Button Styles
- **First button:** Styled as primary (filled background)
- **Subsequent buttons:** Styled as secondary (outlined)

## Responsive Behavior

### Mobile (< 768px)
- Vertical stack layout
- Media and content at 100% width
- Buttons stack vertically if needed

### Tablet (768px - 1023px)
- Horizontal layout
- Media: 45% width
- Content: 55% width

### Desktop (≥ 1024px)
- Enhanced spacing
- Media: 50% width
- Content: 50% width
- Larger font sizes

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- Focus indicators on buttons
- Respects `prefers-reduced-motion` setting

## Technical Details

### Dependencies
- `createOptimizedPicture` from `/scripts/aem.js`

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers

### Performance
- Lazy loading for videos and images
- Optimized picture elements with responsive sizes
- Minimal JavaScript execution

## Troubleshooting

### Video not showing
- Ensure the URL is correct and accessible
- For YouTube: Use the full URL format (https://www.youtube.com/watch?v=VIDEO_ID)
- For asset videos: Ensure the file extension is .mp4, .webm, .ogg, or .mov

### Layout issues
- Ensure the block has exactly two columns
- Check that media is in the first column and content in the second

### Buttons not appearing
- Ensure links are in the content column
- Links should be properly formatted with href and text

## Related Blocks

- **Video Hero:** Full-viewport video backgrounds
- **Image Carousel:** Multiple images/videos in a carousel
- **Cards:** Grid layout for multiple teasers
