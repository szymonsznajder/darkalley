# Image Carousel Block

The Image Carousel block allows authors to create an interactive slideshow of images and videos with navigation controls and indicators.

## Block Type
`image-carousel`

## Usage

To create an image carousel in your document:

1. Create a new table with 1 column
2. Add the text `image-carousel` to the first cell
3. Add a new row for each slide
4. For images: Upload or select images
5. For videos: Add a YouTube link

### Example Table Structure

| image-carousel |
|----------------|
| ![First slide image](/path/to/image1.jpg) |
| [Watch Video](https://www.youtube.com/watch?v=VIDEO_ID) |
| ![Third slide image](/path/to/image3.jpg) |

### Supported Video Platforms
- YouTube (full URLs or shortened youtu.be links)

### Best Practices for Videos
- Use high-quality video thumbnails
- Ensure videos are publicly accessible
- Keep video length reasonable
- Consider mobile viewers when selecting video content

## Features

- Smooth slide transitions
- Previous/Next navigation buttons
- Indicator dots for direct slide access
- Touch/swipe support on mobile devices
- Keyboard navigation
- Fully responsive design
- Automatic image optimization
- Accessible navigation controls

## Best Practices

1. Image Dimensions
   - Recommended aspect ratio: 16:9
   - Minimum width: 1200px
   - Optimal resolution: 2000px wide

2. Image Format
   - Use JPG for photographs
   - Use PNG for images with transparency
   - Optimize images before uploading

3. Accessibility
   - Provide meaningful alt text for each image
   - Keep number of slides reasonable (3-5 recommended)

## Technical Details

The block automatically:
- Optimizes images for different screen sizes
- Creates responsive picture elements
- Adds ARIA labels for accessibility
- Implements touch controls for mobile devices

## Variations

The carousel adapts to different screen sizes:
- Desktop: Full navigation controls
- Tablet: Touch enabled with navigation
- Mobile: Touch optimized with compact controls

## Related Resources

- [AEM Authoring Guide](/)
- [Image Guidelines](/)
- [Accessibility Standards](/)

## Support

For technical issues or questions:
- Contact: [Technical Support](/)
- Documentation: [AEM Docs](/) 