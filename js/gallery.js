// Gallery Management System with Real-time Synchronization
const GALLERY_STORAGE = 'welding_gallery_items';
const DEFAULT_GALLERY = [];

// Initialize Gallery
function initializeGallery() {
    let gallery = localStorage.getItem(GALLERY_STORAGE);
    if (!gallery) {
        localStorage.setItem(GALLERY_STORAGE, JSON.stringify(DEFAULT_GALLERY));
    }
}

// Get all gallery items
function getGalleryItems() {
    const items = localStorage.getItem(GALLERY_STORAGE);
    return items ? JSON.parse(items) : DEFAULT_GALLERY;
}

// Save gallery items
function saveGalleryItems(items) {
    localStorage.setItem(GALLERY_STORAGE, JSON.stringify(items));
}

// Add new gallery item
function addGalleryItem(title, price, imageData) {
    const items = getGalleryItems();
    const newId = Math.max(...items.map(i => i.id), 0) + 1;
    items.push({
        id: newId,
        title: title || `Project ${newId}`,
        price: price || '0',
        image: imageData
    });
    saveGalleryItems(items);
    return newId;
}

// Update gallery item
function updateGalleryItem(id, title, price, imageData) {
    const items = getGalleryItems();
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        if (title) items[index].title = title;
        if (price) items[index].price = price;
        if (imageData) items[index].image = imageData;
        saveGalleryItems(items);
        return true;
    }
    return false;
}

// Delete gallery item
function deleteGalleryItem(id) {
    let items = getGalleryItems();
    items = items.filter(i => i.id !== id);
    saveGalleryItems(items);
}

// Display gallery on main page
function displayGallery() {
    const items = getGalleryItems();
    const galleryContainer = document.getElementById('galleryContainer');
    
    if (galleryContainer) {
        galleryContainer.innerHTML = items.map(item => `
            <div class="gallery-card" onclick="openImageDetails('${item.id}')">
                <img src="${item.image}" alt="${item.title}">
                <div class="card-info">
                    <h5><i class="fas fa-hammer"></i> ${item.title}</h5>
                    <div class="price-whatsapp">
                        <span class="price">FCFA ${item.price}</span>
                        <a href="#" class="whatsapp-icon" onclick="handleWhatsAppClick(event, '${item.title}', 'FCFA ${item.price}')">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Handle image details and WhatsApp
function openImageDetails(id) {
    const item = getGalleryItems().find(i => i.id === id);
    if (item) {
        const message = `Hi! I'm interested in: ${item.title} (FCFA ${item.price})`;;
        const phoneNumber = localStorage.getItem('businessPhone') || '+212676866995';
        window.open(`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    }
}

function handleWhatsAppClick(e, title, price) {
    e.stopPropagation();
    const message = `Hi! I'm interested in: ${title} (${price})`;
    const phoneNumber = localStorage.getItem('businessPhone') || '+212676866995';
    window.open(`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    displayGallery();
    
    // Listen for real-time updates from other tabs/admin dashboard
    window.addEventListener('storage', (e) => {
        if (e.key === GALLERY_STORAGE) {
            console.log('Gallery updated in admin dashboard - refreshing display');
            displayGallery();
            showGalleryUpdateNotification();
        }
    });
});

// Show notification when gallery is updated
function showGalleryUpdateNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(39, 174, 96, 0.4);
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = '<i class="fas fa-check-circle"></i> Gallery updated! Showing latest projects.';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
