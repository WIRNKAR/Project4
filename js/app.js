// App.js - Main Gallery Application

// Sample SVG images for demonstration
const sampleImages = [
    {
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZmY0ZTYiIHN0cm9rZT0iI2ZmNzcwZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBvbHlnb24gcG9pbnRzPSIyMDAsMTAwIDI1MCwxNTAgMTUwLDE1MCIgZmlsbD0iI2ZmNzcwZCIvPjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjI0Ij5QcmVtaXVtIFdlbGRpbmdXb3JrPC90ZXh0Pjwvc3ZnPg==',
        title: 'Premium Stainless Steel Gate'
    },
    {
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPjxyZWN0IHg9IjMwIiB5PSI3MCIgd2lkdGg9IjM0MCIgaGVpZ2h0PSIxNjAiIGZpsbD0iI2M4YmYzOCIgc3Ryb2tlPSIjODg2NjAwIiBzdHJva2Utd2lkdGg9IjMiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjEwMCIgcj0iOCIgZmlsbD0iIzg4NjYwMCIvPjxjaXJjbGUgY3g9IjM0MCIgY3k9IjEwMCIgcj0iOCIgZmlsbD0iIzg4NjYwMCIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iMjAwIiByPSI4IiBmaWxsPSIjODg2NjAwIi8+PGNpcmNsZSBjeD0iMzQwIiBjeT0iMjAwIiByPSI4IiBmaWxsPSIjODg2NjAwIi8+PHRleHQgeD0iMjAwIiB5PSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIyNCI+SGVhdnkgTWV0YWwgRmFicmljYXRpb248L3RleHQ+PC9zdmc+',
        title: 'Heavy Metal Fabrication Project'
    },
    {
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNhZGE1YTUiIHN0cm9rZT0iIzY2NjY2NiIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHJlY3QgeD0iNzAiIHk9IjEwMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzY2NjY2NiIvPjxyZWN0IHg9IjMyMCIgeT0iMTAwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNjY2NjY2Ii8+PHRleHQgeD0iMjAwIiB5PSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIyNCI+Q3VzdG9tIE1ldGFsIERvb3I8L3RleHQ+PC9zdmc+',
        title: 'Custom Metal Door'
    },
    {
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPjxwb2x5Z29uIHBvaW50cz0iMjAwLDUwIDM1MCwxMjUgMzUwLDI1MCAxMDAsMjUwIDEwMCwxMjUiIGZpbGw9IiNlZWVlZWUiIHN0cm9rZT0iI2ZmNzcwZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHJlY3QgeD0iMTUwIiB5PSIxNjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIGZpbGw9IiMzMzMzMzMiLz48dGV4dCB4PSIyMDAiIHk9IjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjI0Ij5Sb29mIFNUUlVDVFVSRTwvdGV4dD48L3N2Zz4=',
        title: 'Roof Structure'
    },
    {
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNjAiIGZpbGw9IiNkM2QzZDMiIHN0cm9rZT0iI2ZmNzcwZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PGNpcmNsZSBjeD0iMzAwIiBjeT0iMTAwIiByPSI2MCIgZmlsbD0iI2QzZDNkMyIgc3Ryb2tlPSIjZmY3NzBkIiBzdHJva2Utd2lkdGg9IjQiLz48cmVjdCB4PSI2MCIgeT0iMjAwIiB3aWR0aD0iMjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjY2xkNGNjIiBzdHJva2U9IiNmZjc3MGQiIHN0cm9rZS13aWR0aD0iMyIvPjx0ZXh0IHg9IjIwMCIgeT0iNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiIGZvbnQtc2l6ZT0iMjQiPk1ldGFsIEZsYW5nZXM8L3RleHQ+PC9zdmc+',
        title: 'Metal Flanges Assembly'
    },
    {
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPjxyZWN0IHg9IjEwIiB5PSI2MCIgd2lkdGg9IjM4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiM4ODg4ODgiIHN0cm9rZT0iI2ZmNzcwZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHJlY3QgeD0iMzAiIHk9IjgwIiB3aWR0aD0iMzQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2U2ZTZlNiIvPjxyZWN0IHg9IjUwIiB5PSIxMjAiIHdpZHRoPSI3MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzMzMzMzMyIvPjxyZWN0IHg9IjE0MCIgeT0iMTIwIiB3aWR0aD0iNzAiIGhlaWdodD0iNjAiIGZpbGw9IiMzMzMzMzMiLz48cmVjdCB4PSIyMzAiIHk9IjEyMCIgd2lkdGg9IjcwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMzMzMzMzIi8+PHRleHQgeD0iMjAwIiB5PSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIyNCI+RmFjdG9yeSBDYXJkaW5nPC90ZXh0Pjwvc3ZnPg==',
        title: 'Factory Carding System'
    }
];

// Sample videos
const sampleVideos = [
    {
        id: 'sample-video-1',
        title: 'Welding Process Demo',
        thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzIyMjIyMiIvPjxwb2x5Z29uIHBvaW50cz0iMTYwLDEwMCAyNjAsMTUwIDE2MCwyMDAiIGZpbGw9IiNmZjc3MGQiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHRleHQgeD0iMjAwIiB5PSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIyMCI+VjwvdmlkZW8gUGxheWVyPC90ZXh0Pjwvc3ZnPg=='
    },
    {
        id: 'sample-video-2',
        title: 'Project Showcase 2024',
        thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNTAiIGZpbGw9IiMzMzMzMzMiIHN0cm9rZT0iI2ZmNzcwZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBvbHlnb24gcG9pbnRzPSIxNzAsMTIwIDI3MCwxNTAgMTcwLDE4MCIgZmlsbD0iI2ZmNzcwZCIvPjx0ZXh0IHg9IjIwMCIgeT0iNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiIGZvbnQtc2l6ZT0iMjAiPlZpZGVvIFBsYXllcjwvdGV4dD48L3N2Zz4='
    },
    {
        id: 'sample-video-3',
        title: 'Behind the Scenes',
        thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPjxyZWN0IHg9IjUwIiB5PSI0MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMjAiIGZpbGw9IiMxMTExMTEiIHN0cm9rZT0iI2ZmNzcwZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBvbHlnb24gcG9pbnRzPSIxNzAsMTAwIDI3MCwxNTAgMTcwLDIwMCIgZmlsbD0iI2ZmNzcwZCIvPjwvc3ZnPg=='
    }
];

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
    loadGallery();
    loadVideos();
    loadBusinessPhone();
});

// Load gallery images from localStorage
function loadGallery() {
    const galleryContainer = document.getElementById('galleryContainer');
    let gallery = JSON.parse(localStorage.getItem('gallery')) || [];

    // Load sample images on first visit
    if (gallery.length === 0) {
        gallery = sampleImages;
    }

    galleryContainer.innerHTML = '';

    gallery.forEach((item, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.onclick = () => handleImageClick(item);

        card.innerHTML = `
            <img src="${item.image}" alt="${item.title || 'Welding Work'}">
            <div class="gallery-overlay">
                <div class="gallery-info">
                    <h5>${item.title || 'Our Work'}</h5>
                    <p>Click to inquire on WhatsApp</p>
                </div>
            </div>
        `;

        col.appendChild(card);
        galleryContainer.appendChild(col);
    });
}

// Handle image click - Send to WhatsApp
function handleImageClick(item) {
    const phoneNumber = localStorage.getItem('businessPhone') || '';
    
    if (!phoneNumber) {
        alert('Business WhatsApp number not set. Please contact the administrator.');
        return;
    }

    // Create WhatsApp message with image title
    const message = `Hi! I'm interested in this welding work: "${item.title || 'Your recent welding project'}"`;
    
    // Create WhatsApp share link
    const whatsappURL = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
}

// Load videos section
function loadVideos() {
    const videosContainer = document.getElementById('videosContainer');
    const videos = sampleVideos; // Using sample videos

    videosContainer.innerHTML = '';

    videos.forEach((video) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        
        videoCard.innerHTML = `
            <div class="video-thumbnail" onclick="playVideo('${video.id}')">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="play-button">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <h5 class="video-title mt-3">${video.title}</h5>
            <small class="text-muted">Replace in Admin Panel</small>
        `;

        col.appendChild(videoCard);
        videosContainer.appendChild(col);
    });
}

// Play video (placeholder)
function playVideo(videoId) {
    alert(`Video: ${videoId}\n\nThis is a placeholder. Replace with your actual video URL in the admin panel or embed your videos directly.\n\nSupported: YouTube, Vimeo, or MP4 files`);\n}

// Load business phone number
function loadBusinessPhone() {
    const phoneNumber = localStorage.getItem('businessPhone');
    if (phoneNumber) {
        const phoneElement = document.getElementById('businessPhone');
        if (phoneElement) {
            phoneElement.textContent = phoneNumber;
        }
        
        const mainBtn = document.getElementById('mainWhatsAppBtn');
        if (mainBtn) {
            mainBtn.style.display = 'inline-block';
            mainBtn.onclick = () => {
                const message = 'Hi! I would like to inquire about your welding services.';
                const whatsappURL = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
            };
        }
    }
}

// Toast notification function
function showToast(message, type = 'success') {
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast alert alert-${type} alert-dismissible fade show`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}
