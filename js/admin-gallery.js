// Admin Gallery Management with Enhanced Upload Features

// Track upload progress
let uploadProgress = {
    currentFile: null,
    progress: 0,
    total: 0
};

function displayAdminGallery() {
    const items = getGalleryItems();
    const container = document.getElementById('adminGalleryContainer');
    
    if (!container) return;
    
    // Update the gallery count in the heading
    const gallerySection = container.closest('.card');
    if (gallerySection) {
        const heading = gallerySection.querySelector('.card-header h5');
        if (heading) {
            const maxItems = 6;
            const statusColor = items.length >= maxItems ? '#e74c3c' : items.length >= 4 ? '#f39c12' : '#27ae60';
            heading.innerHTML = `<i class="fas fa-images"></i> Manage Gallery Items (${items.length}/${maxItems}) <span style="color: ${statusColor}; font-size: 0.9rem; margin-left: 1rem;">●</span>`;
        }
    }
    
    // Set grid layout for 3 columns
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(3, 1fr)';
    container.style.gap = '2rem';
    
    container.innerHTML = items.map(item => `
        <div style="width: 100%;">
            <div style="background: white; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); transition: all 0.3s ease; height: 100%; display: flex; flex-direction: column;">
                <div style="position: relative; width: 100%; padding-bottom: 75%; overflow: hidden; background: #f0f0f0;">
                    <img src="${item.image}" alt="${item.title}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; border-radius: 12px 12px 0 0;">
                </div>
                <div style="padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column;">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; font-weight: 600; font-size: 0.9rem; color: #333; margin-bottom: 0.5rem;">Title</label>
                        <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; font-family: inherit; font-size: 0.9rem;" value="${item.title}" id="title-${item.id}">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; font-weight: 600; font-size: 0.9rem; color: #333; margin-bottom: 0.5rem;">Price</label>
                        <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; font-family: inherit; font-size: 0.9rem;" value="${item.price}" id="price-${item.id}">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; font-weight: 600; font-size: 0.9rem; color: #333; margin-bottom: 0.5rem;">Replace Image</label>
                        <input type="file" style="width: 100%; padding: 0.75rem; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; font-family: inherit; font-size: 0.9rem;" id="image-${item.id}" accept="image/*">
                    </div>
                    <div style="display: flex; gap: 0.75rem; margin-top: auto;">
                        <button style="flex-grow: 1; padding: 0.75rem; background: #FFA827; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-size: 0.9rem;" onmouseover="this.style.background='#FFB74D'" onmouseout="this.style.background='#FFA827'" onclick="updateItem(${item.id})">Update</button>
                        <button style="flex-grow: 1; padding: 0.75rem; background: #E24B4A; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-size: 0.9rem;" onmouseover="this.style.background='#C93C3B'" onmouseout="this.style.background='#E24B4A'" onclick="deleteItem(${item.id})">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Show message if gallery is full
    if (items.length >= 6) {
        const fullMessage = document.createElement('div');
        fullMessage.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 2rem; background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; color: #856404; margin-top: 1rem;';
        fullMessage.innerHTML = '<i class="fas fa-info-circle"></i> Gallery is full (6/6 items). Delete an item to add a new one.';
        container.appendChild(fullMessage);
    }
}

function updateItem(id) {
    const titleInput = document.getElementById(`title-${id}`);
    const priceInput = document.getElementById(`price-${id}`);
    const imageInput = document.getElementById(`image-${id}`);
    
    if (!titleInput || !priceInput) return;
    
    const title = titleInput.value;
    const price = priceInput.value;
    
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
            updateGalleryItem(id, title, price, e.target.result);
            showToast('Item updated successfully!', 'success');
            displayAdminGallery();
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        updateGalleryItem(id, title, price);
        showToast('Item updated successfully!', 'success');
        displayAdminGallery();
    }
}

function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        deleteGalleryItem(id);
        showToast('Item deleted successfully!', 'success');
        displayAdminGallery();
    }
}

function addNewItem() {
    const titleInput = document.getElementById('newItemTitle');
    const priceInput = document.getElementById('newItemPrice');
    const imageInput = document.getElementById('newItemImage');
    const uploadBtn = event.target;
    
    // Validation
    if (!titleInput.value.trim()) {
        showToast('Please enter an item title', 'danger');
        return;
    }
    if (!priceInput.value.trim()) {
        showToast('Please enter a price', 'danger');
        return;
    }
    if (!imageInput.files.length) {
        showToast('Please select an image', 'danger');
        return;
    }
    
    const file = imageInput.files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file (JPG, PNG, etc.)', 'danger');
        return;
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        showToast('Image file is too large. Maximum size is 5MB.', 'danger');
        return;
    }
    
    // Check if gallery is full (max 6 items)
    const items = getGalleryItems();
    if (items.length >= 6) {
        const replaceOldest = confirm('Gallery is full (6/6 items). Would you like to replace the oldest item to add this new one?');
        if (replaceOldest && items.length > 0) {
            // Remove the oldest item (first one)
            deleteGalleryItem(items[0].id);
            showToast('Oldest item removed to make space', 'info');
        } else {
            showToast('Please delete an item first to add a new one', 'warning');
            return;
        }
    }
    
    // Show loading state
    uploadBtn.disabled = true;
    uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
    
    const reader = new FileReader();
    reader.onprogress = (event) => {
        if (event.lengthComputable) {
            uploadProgress.progress = Math.round((event.loaded / event.total) * 100);
            updateUploadProgressUI();
        }
    };
    
    reader.onload = (e) => {
        try {
            addGalleryItem(titleInput.value.trim(), priceInput.value.trim(), e.target.result);
            
            // Reset form
            titleInput.value = '';
            priceInput.value = '';
            imageInput.value = '';
            
            // Reset button
            uploadBtn.disabled = false;
            uploadBtn.innerHTML = '<i class="fas fa-image"></i> Add Item to Gallery';
            
            showToast('✓ Item added successfully! Gallery updated.', 'success');
            displayAdminGallery();
            syncGalleryToMainPage();
        } catch (error) {
            console.error('Error adding item:', error);
            showToast('Error adding item: ' + error.message, 'danger');
            uploadBtn.disabled = false;
            uploadBtn.innerHTML = '<i class="fas fa-image"></i> Add Item to Gallery';
        }
    };
    
    reader.onerror = () => {
        showToast('Error reading file. Please try again.', 'danger');
        uploadBtn.disabled = false;
        uploadBtn.innerHTML = '<i class="fas fa-image"></i> Add Item to Gallery';
    };
    
    reader.readAsDataURL(file);
}

// Update upload progress UI
function updateUploadProgressUI() {
    // This can be used to show a progress bar if needed
    console.log('Upload progress:', uploadProgress.progress + '%');
}

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed bottom-0 end-0 m-3`;
    toast.textContent = message;
    toast.style.zIndex = '9999';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Sync gallery updates to main page if it's open
function syncGalleryToMainPage() {
    // Check if this is being called from the main page
    const galleryContainer = document.querySelector('.gallery-row');
    if (galleryContainer && typeof displayGallery === 'function') {
        displayGallery(); // Call the main page gallery display function
    }
}

// Load on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    displayAdminGallery();
});
