# Teaser Block - Content Examples

This document provides examples of how to create teaser blocks in Google Docs or Microsoft Word for Adobe Edge Delivery Services.

## Basic Structure

Create a table with 2 columns and 1 row:

```
+--------------------------------+--------------------------------+
|           MEDIA                |            CONTENT             |
+--------------------------------+--------------------------------+
| [Image or Video Link]          | Title (as heading)             |
|                                | Description paragraph(s)        |
|                                | Button link(s)                 |
+--------------------------------+--------------------------------+
```

---

## Example 1: Image Teaser with Single Button

### In Google Docs:

**Table (2 columns, 1 row):**

| Column 1 | Column 2 |
|----------|----------|
| [Insert image: product-launch.jpg] | **New Product Launch** (Heading 2)<br><br>Discover our latest innovation that combines cutting-edge technology with elegant design. Available now for pre-order.<br><br>[Learn More](https://example.com/products/new) |

### Result:
- Left side: Product image
- Right side: Heading, description, and "Learn More" button

---

## Example 2: Image Teaser with Multiple Buttons

### In Google Docs:

**Table (2 columns, 1 row):**

| Column 1 | Column 2 |
|----------|----------|
| [Insert image: summer-sale.jpg] | **Summer Sale** (Heading 2)<br><br>Up to 50% off on selected items. Limited time offer - shop now and save big!<br><br>[Shop Now](https://example.com/sale)<br><br>[View Catalog](https://example.com/catalog) |

### Result:
- Two buttons: "Shop Now" (primary) and "View Catalog" (secondary)

---

## Example 3: YouTube Video Teaser

### In Google Docs:

**Table (2 columns, 1 row):**

| Column 1 | Column 2 |
|----------|----------|
| https://www.youtube.com/watch?v=dQw4w9WgXcQ | **Watch Our Story** (Heading 2)<br><br>See how we're transforming the industry and making a positive impact on communities worldwide.<br><br>Join us on this incredible journey.<br><br>[Get Involved](https://example.com/join) |

**Important:** For YouTube videos, just paste the URL directly in the first column.

### Result:
- Embedded YouTube video on the left
- Content with title, multi-paragraph description, and button on the right

---

## Example 4: Asset Video Teaser (MP4)

### In Google Docs:

**Table (2 columns, 1 row):**

| Column 1 | Column 2 |
|----------|----------|
| [Product Demo](https://example.com/videos/product-demo.mp4) | **See It In Action** (Heading 3)<br><br>Watch our comprehensive product demonstration and learn how easy it is to get started.<br><br>[Start Free Trial](https://example.com/trial) |

**Note:** Create a hyperlink with the link text being "Product Demo" and the URL pointing to the .mp4 file.

### Result:
- Video player with controls on the left
- Content on the right

---

## Example 5: Teaser with Long Description

### In Google Docs:

**Table (2 columns, 1 row):**

| Column 1 | Column 2 |
|----------|----------|
| [Insert image: conference.jpg] | **Annual Tech Conference 2024** (Heading 2)<br><br>Join industry leaders, innovators, and visionaries at the premier technology event of the year.<br><br>Three days of inspiring keynotes, hands-on workshops, and networking opportunities that will shape the future of technology.<br><br>Early bird tickets available until March 1st.<br><br>[Register Now](https://example.com/conference/register)<br><br>[View Schedule](https://example.com/conference/schedule) |

### Result:
- Multiple paragraphs in the description
- Multiple call-to-action buttons

---

## Styling Tips

### Headings
- Use **Heading 2** for main titles
- Use **Heading 3** for subtitles
- Use **Heading 4** for smaller emphasis

### Text Formatting
- Keep paragraphs concise (2-3 sentences each)
- Use line breaks between paragraphs
- Avoid excessive formatting (bold, italic) in body text

### Images
- Use high-quality images (minimum 1200px wide)
- Ensure images are properly optimized before upload
- Use descriptive alt text

### Videos
- **YouTube:** Use full URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
- **Asset Videos:** Must end with .mp4, .webm, .ogg, or .mov
- Keep videos under 10MB for best performance

### Buttons/Links
- Use clear, action-oriented text (e.g., "Learn More", "Get Started", "Shop Now")
- First link will be styled as primary button (filled)
- Additional links will be styled as secondary buttons (outlined)

---

## Block Variants

### Media Right

To place media on the right side instead of left, add a row above the content with `(media-right)`:

| Column 1 | Column 2 |
|----------|----------|
| (media-right) | |
| [Insert image] | **Title** (Heading 2)<br><br>Description text<br><br>[Button Link](https://example.com) |

### Full Width Media

To make media full width with content below:

| Column 1 | Column 2 |
|----------|----------|
| (full-width-media) | |
| [Insert image] | **Title** (Heading 2)<br><br>Description text<br><br>[Button Link](https://example.com) |

---

## Common Mistakes to Avoid

❌ **Don't** merge cells in the table
✅ **Do** keep the 2-column structure

❌ **Don't** put multiple images in the media column
✅ **Do** use one image or one video per teaser

❌ **Don't** forget to add alt text to images
✅ **Do** provide descriptive alt text for accessibility

❌ **Don't** use very long URLs as link text
✅ **Do** use descriptive, short link text

❌ **Don't** leave the content column empty
✅ **Do** always include at least a title

---

## Testing Your Teaser

After creating your content:

1. Preview the page in Edge Delivery Services
2. Check mobile, tablet, and desktop views
3. Test all button links
4. Verify video playback (if applicable)
5. Check accessibility with a screen reader

---

## Need Help?

- Check the [README.md](./README.md) for technical details
- Review existing teaser blocks on the site for inspiration
- Contact the development team for custom requirements
