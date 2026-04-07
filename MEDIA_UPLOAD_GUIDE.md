# Media Upload & Management System Guide

## Overview
This guide explains how to use the new dynamic media upload and display system in the admin dashboard. The system allows you to manage images and videos that are displayed on your welding center website.

---

## 📸 Image Gallery Management

### How to Upload a New Image

1. **Go to Admin Dashboard**
   - Navigate to `admin.html` in your browser
   - You'll see the "Upload New Image" section

2. **Fill in Image Details**
   - **Item Title**: Enter a descriptive name (e.g., "Custom Steel Gate")
   - **Price**: Enter the project price in FCFA
   - **Select Image File**: Click to choose an image from your device

3. **Click "Add Item to Gallery"**
   - The system validates your inputs
   - File is automatically uploaded and processed
   - Gallery updates instantly

### Important Gallery Rules

- **Maximum 6 items** in the gallery at any time
- **File size limit**: 5MB per image
- **Supported formats**: JPG, PNG, WebP
- **Auto-replace**: When gallery is full, the system asks to replace the oldest item
- **Instant display**: New items appear immediately on your website

### Editing an Image Item

1. Scroll to the "Manage Gallery Items" section
2. Find the item you want to edit
3. Update the **Title** and/or **Price**
4. To replace the image:
   - Click "Select Image" and choose a new image
   - Or leave blank to keep the current image
5. Click **"Update"** to save changes

### Deleting an Image Item

1. Go to "Manage Gallery Items" section
2. Click the **"Delete"** button on the item
3. Confirm the deletion
4. Item is removed instantly from your website

---

## 🎬 Video Management

### Option 1: Upload a Local Video File

1. **Fill in Video Details**
   - **Video Title**: Give your video a descriptive name
   - **Description**: Explain what the video shows
   - **Select Video File**: Click to choose a video from your device

2. **Upload Requirements**
   - **Maximum file size**: 100MB
   - **Supported formats**: MP4, WebM, OGG, MOV, AVI (converted to MP4)
   - **Resolution**: 1080p (Full HD) recommended
   - **Frame rate**: 24-30 FPS

3. **Progress Tracking**
   - Button shows upload percentage
   - Large files take longer based on your connection
   - Do not close the page during upload

4. **After Upload**
   - Click **"Add Video Now"**
   - Video is stored and immediately visible on your website
   - No YouTube account needed

### Option 2: Embed from YouTube

1. **Get Your YouTube Link**
   - Go to YouTube and find your video
   - Copy the full URL

2. **Fill in Video Details**
   - **Video Title**: Your video's title
   - **Description**: What the video is about
   - **YouTube URL**: Paste the video link

3. **Valid URL Formats**
   - `https://www.youtube.com/watch?v=VIDEO_ID`
   - `https://youtu.be/VIDEO_ID`
   - `https://www.youtube.com/embed/VIDEO_ID`

4. **Click "Add Video Now"**
   - Video is embedded and linked to your website
   - Uses YouTube's servers for streaming

### Managing Videos

**Edit a Video**
- Go to "Manage Videos" section
- Update title, description, or video source
- Click **"Update"** to save

**Delete a Video**
- Click **"Delete"** on the video card
- Confirm the action
- Video is removed from your website

---

## ⚡ Real-Time Updates

### How It Works

1. **Instant Display**: Changes appear immediately on your website
2. **Tab Synchronization**: If you have the website open in another tab, it auto-refreshes
3. **Live Visitor Updates**: Online visitors see changes without refreshing
4. **Cross-Device Sync**: Updates sync across all devices using the same website

### What Gets Updated Instantly

- ✅ New images added to gallery
- ✅ Image titles and prices changed
- ✅ Images deleted from gallery
- ✅ New videos uploaded or added
- ✅ Video titles and descriptions changed
- ✅ Videos deleted
- ✅ Gallery order (newest items first)

---

## 🎯 Best Practices

### For Images

1. **Choose High-Quality Images**
   - Use professional project photos
   - Ensure good lighting and clear details
   - Show the final welded product

2. **Image Optimization**
   - Compress images before uploading (5MB max)
   - Recommended size: 1200x900 pixels
   - Use JPG for photos, PNG for graphics

3. **Titles and Pricing**
   - Be descriptive: "Custom Stainless Steel Gate" not just "Gate"
   - Keep prices accurate
   - Update prices if costs change

### For Videos

1. **Video Quality**
   - Record in HD (720p minimum, 1080p recommended)
   - Ensure good audio if narrating
   - Trim unnecessary content

2. **Video Content Ideas**
   - Show the welding process
   - Display the finished product
   - Include customer testimonials
   - Show unique techniques
   - Demonstrate problem-solving

3. **File vs. YouTube**
   - **Use local upload** for exclusive content
   - **Use YouTube** for:
     - Videos streamed from other creators
     - Playlists
     - Long-form content (saves bandwidth)
     - Already-published YouTube content

---

## 🔒 File Storage

### Image Storage
- Stored as **Base64** in browser localStorage
- Limited capacity: ~5-10MB total for all images
- Persists across browser sessions
- Delete unused images to free space

### Video Storage
- Stored in **IndexedDB** for large files
- Can handle up to **100MB per video**
- Stored locally on visitors' browsers
- Better for large media files

---

## ❌ Troubleshooting

### "Gallery is Full"
- **Problem**: You can't add a new image
- **Solution**: Delete an old image first, or accept auto-replace of oldest item

### "File Too Large"
- **Problem**: Image or video exceeds size limit
- **Solution**: 
  - Compress images online (TinyPNG, ImageOptimizer)
  - Cut/trim video, or upload to YouTube instead

### "Upload Stuck"
- **Problem**: Upload not completing
- **Solution**:
  - Check internet connection
  - Reduce file size
  - Try a different browser
  - Clear browser cache

### "Changes Not Showing"
- **Problem**: Updates not visible on website
- **Solution**:
  - Refresh the page (Ctrl+R or Cmd+R)
  - Hard refresh to clear cache (Ctrl+Shift+R)
  - Check browser console for errors

### "Video Not Playing"
- **Problem**: Video doesn't play on website
- **Solution**:
  - Ensure video format is supported
  - Check file isn't corrupted
  - For YouTube: verify URL is correct
  - Try re-uploading the video

---

## 📊 Monitoring Your Media

### Check Current Status

1. **In Admin Dashboard**
   - Gallery shows (X/6) items
   - Color indicator shows fullness:
     - 🟢 Green: 0-3 items (plenty of space)
     - 🟡 Yellow: 4-5 items (getting full)
     - 🔴 Red: 6 items (full)

2. **Video Count**
   - "Manage Videos" shows all uploaded videos
   - Each video shows title and type (Local or YouTube)

### Keep Your Media Fresh

- Update images quarterly
- Replace old project photos with new ones
- Add new project videos regularly
- Keep descriptions accurate
- Maintain 3-6 diverse images
- Have 2-5 videos for better engagement

---

## 🚀 Advanced Tips

### URL Format for Custom Files

If you want to link to videos from another server:
```
https://example.com/videos/myvideo.mp4
```

### Organizing Your Gallery

**Suggested Layout:**
1. Recent/featured project (most impressive)
2. Complex welding work
3. Custom design project
4. Large-scale project
5. Detailed metalwork
6. Customer testimonial/before-after

### Video Best Practices

- **Opening**: Show the finished product first
- **Middle**: Show the process/details
- **Ending**: Show final quality and proud moment
- **Duration**: 30 seconds to 3 minutes ideal
- **Title**: Include key details (type, material, size)

---

## 🆘 Getting Help

If you encounter issues:

1. Check this guide first
2. Try the troubleshooting section
3. Clear browser cache and try again
4. Test in a different browser
5. Check internet connection

---

## 📝 Summary

| Task | Steps | Time |
|------|-------|------|
| Add Image | Title → Price → File → Upload | < 1 min |
| Add Video (File) | Title → Desc → File → Upload | 1-5 min |
| Add Video (YouTube) | Title → Desc → URL → Upload | < 1 min |
| Edit Item | Update fields → Click Update | < 1 min |
| Delete Item | Click Delete → Confirm | < 1 min |

---

**Your website is now equipped with a professional, user-friendly media management system. Keep it updated with your latest projects to attract more customers!**

Last updated: 2026
