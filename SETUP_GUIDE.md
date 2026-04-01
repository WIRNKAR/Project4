# Welding Portfolio Website - Setup Guide

## Overview
This is a beautiful, offline-ready welding portfolio website built with HTML, CSS, and JavaScript. It includes an admin panel to manage images and WhatsApp integration for inquiries.

## Features
✅ Beautiful responsive gallery
✅ Admin panel to add/update/delete images
✅ WhatsApp integration (click images to message on WhatsApp)
✅ Fully offline - Bootstrap CSS/JS downloaded locally
✅ No backend required - uses browser storage (localStorage)
✅ Works on desktop and mobile

## Project Structure
```
Project4/
├── index.html           # Main gallery page
├── admin.html           # Admin panel (images management)
├── css/
│   └── style.css       # Custom styles
├── js/
│   ├── app.js          # Gallery functionality
│   └── admin.js        # Admin panel functionality
├── bootstrap/          # Bootstrap CSS & JS (download required)
│   ├── css/
│   │   └── bootstrap.min.css
│   └── js/
│       └── bootstrap.bundle.min.js
└── images/            # Folder for storing images (optional)
```

## Setup Instructions

### Step 1: Download Bootstrap Files
Bootstrap is already referenced in the HTML files, but you need to download it locally:

**Option A: Download from officialbsite**
1. Go to: https://getbootstrap.com/docs/5.3/getting-started/download/
2. Click "Compiled CSS and JS"
3. Extract the downloaded ZIP file
4. Copy `bootstrap.min.css` → `bootstrap/css/`
5. Copy `bootstrap.bundle.min.js` → `bootstrap/js/`

**Option B: Quick Download (Already Created)**
The `bootstrap/` folder structure is already created. Just download:
- Bootstrap CSS: https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css
- Bootstrap JS: https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js

Place them in the appropriate folders as shown in Step 1.

### Step 2: Add Your Images
You can add images in two ways:

**Option A: Using the Admin Panel (Recommended)**
1. Open `admin.html` in your browser
2. Scroll to "Upload New Images"
3. Click "Select Image" and choose your welding work photos
4. Add optional titles for each image
5. Click "Upload Images"
6. The images will appear on the main gallery (index.html)

**Option B: Manual Upload**
- Place image files in the `images/` folder
- Update the `admin.html` or manually add them through the admin panel

### Step 3: Configure WhatsApp Business Number
1. Open `admin.html` in your browser
2. Scroll to "Business Settings"
3. Enter your WhatsApp phone number with country code (e.g., +1234567890)
4. Click "Save Settings"
5. Now when anyone clicks an image, they'll be sent to WhatsApp with a pre-filled message

### Step 4: View Your Website
1. Open `index.html` in your browser
2. Browse your welding portfolio
3. Click any image to send a WhatsApp message inquiry

## How It Works

### Gallery Display
- All images are stored in browser's localStorage (no server needed)
- Images are Base64 encoded and saved locally
- This allows the site to work completely offline

### WhatsApp Integration
- When someone clicks an image, it opens WhatsApp Web/App
- A pre-filled message is sent: "I'm interested in this welding work: [image title]"
- The recipient must be available on WhatsApp with the configured number

### Admin Panel
- Protected by browser storage (basic security)
- Add, edit, and delete images easily
- Set business WhatsApp number for inquiries
- No login required (you can add login protection later if needed)

## Important Notes
⚠️ **Storage Limit**: Browser localStorage typically allows 5-10MB. With Base64 encoding, you can store roughly 30-50 images (depending on quality).

⚠️ **Browser Compatibility**: Works on all modern browsers (Chrome, Firefox, Safari, Edge)

⚠️ **Offline Mode**: Once Bootstrap is downloaded, the website works 100% offline (images loaded previously will display without internet)

⚠️ **WhatsApp Links**: WhatsApp links only work when you have a WhatsApp account (web.whatsapp.com or mobile app)

## Advanced Customization

### Change Colors
Edit `css/style.css` - Look for `:root` variables:
```css
:root {
    --primary-color: #dc3545;    /* Main red color */
    --secondary-color: #6c757d;  /* Gray color */
    --dark-color: #1a1a1a;
    --light-color: #f8f9fa;
    --success-color: #28a745;    /* Green WhatsApp color */
}
```

### Change Business Name
Edit `index.html` and `admin.html` - Find "Elite Welding Works" and change to your business name

### Add More Sections
Edit `index.html` to add:
- Services section
- Testimonials
- About Us
- Pricing

## Troubleshooting

**Q: Images not appearing?**
A: Make sure they're uploaded through the admin panel or check localStorage isn't full

**Q: WhatsApp link not working?**
A: Ensure you entered the correct phone number with country code (+1234567890)

**Q: Styles look broken?**
A: Download Bootstrap files - the website won't look right without them

**Q: How to backup images?**
A: Use browser DevTools → Application → Local Storage → Copy the 'gallery' value and save it

## Future Enhancements
- Add image categories/filters
- Add before/after image comparison
- Add customer testimonials
- Add image compression for more storage
- Add backup/export functionality

## Support
For issues or questions, refer to the code comments in:
- `js/app.js` - Gallery logic
- `js/admin.js` - Admin panel logic
- `css/style.css` - Styling

Enjoy your beautiful welding portfolio website! 🔥
