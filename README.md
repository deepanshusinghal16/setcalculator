# Set Calculator

A web-based set calculator for performing union, intersection, and difference operations on sets.

## Features

- **Set Operations:**
  - Union (A ∪ B)
  - Intersection (A ∩ B)
  - Difference (A - B)
  - Difference (B - A)
  - Symmetric Difference (A △ B)

- **Input Options:**
  - Comma-separated values
  - Newline-separated values
  - Automatic duplicate removal
  - Whitespace trimming
  - Auto-detects input format

- **Output Options:**
  - Comma-separated output
  - Newline-separated output
  - Copy to clipboard functionality

- **User-Friendly Interface:**
  - Clean, simple design
  - Real-time set previews
  - Element count display
  - Responsive layout

## Usage

1. Open `app.html` or `index.html` in a web browser
2. Enter elements for Set A and Set B (supports both comma and newline formats)
3. Choose your preferred output format (comma or newline)
4. Select options (remove duplicates, trim whitespace)
5. Click on any operation button to see results
6. Use the copy button to copy results to clipboard

## Examples

### Numbers
- Set A: `1, 2, 3, 4, 5`
- Set B: `4, 5, 6, 7, 8`
- Union: `1, 2, 3, 4, 5, 6, 7, 8`
- Intersection: `4, 5`

### Letters
- Set A: `a, b, c, d`
- Set B: `c, d, e, f`
- Difference (A - B): `a, b`

## Files

- `app.html` / `index.html` - Main HTML structure
- `app.css` - Styling and layout
- `app.js` - Set calculation logic
- `vercel.json` - Deployment configuration

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge).
