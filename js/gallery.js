// Gallery Management System
const GALLERY_STORAGE = 'welding_gallery_items';
const DEFAULT_GALLERY = [
    { id: 1, title: 'Stainless Steel Gate', price: '10,000', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop' },
    { id: 2, title: 'Heavy Metal Fabrication', price: '15,000', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
    { id: 3, title: 'Custom Metal Doors', price: '12,500', image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400&h=300&fit=crop' },
    { id: 4, title: 'Roof Structures', price: '20,000', image: 'https://images.unsplash.com/photo-1581092546109-b349e7a85b72?w=400&h=300&fit=crop' },
    { id: 5, title: 'Metal Flanges Assembly', price: '8,500', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop' },
    { id: 6, title: 'Industrial Fabrication', price: '25,000', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82290?w=400&h=300&fit=crop' }
];

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
    const galleryContainer = document.querySelector('.gallery-row');
    
    if (galleryContainer) {
        galleryContainer.innerHTML = items.map(item => `
            <div>
                <div class="gallery-card" onclick="openImageDetails('${item.id}')">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="card-info">
                        <h5><i class="fas fa-hammer"></i> ${item.title}</h5>
                        <div class="price-whatsapp">
                            <span class="price">₦${item.price}</span>
                            <a href="#" class="whatsapp-icon" onclick="handleWhatsAppClick(event, '${item.title}', '₦${item.price}')">
                                <i class="fab fa-whatsapp"></i>
                            </a>
                        </div>
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
        const message = `Hi! I'm interested in: ${item.title} (₦${item.price})`;
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
});
