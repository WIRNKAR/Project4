// Admin Gallery Management

function displayAdminGallery() {
    const items = getGalleryItems();
    const container = document.getElementById('adminGalleryContainer');
    
    if (!container) return;
    
    // Update the gallery count in the heading
    const gallerySection = container.closest('.card');
    if (gallerySection) {
        const heading = gallerySection.querySelector('.card-header h5');
        if (heading) {
            heading.innerHTML = `<i class="fas fa-images"></i> Manage Gallery Items (${items.length}/6)`;
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
    
    if (!titleInput.value || !priceInput.value || !imageInput.files.length) {
        alert('Please fill all fields and select an image');
        return;
    }
    
    // Check if gallery is full (max 6 items)
    const items = getGalleryItems();
    if (items.length >= 6) {
        alert('Gallery is full! You can only have 6 items maximum. Delete an item first.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        addGalleryItem(titleInput.value, priceInput.value, e.target.result);
        showToast('Item added successfully!', 'success');
        titleInput.value = '';
        priceInput.value = '';
        imageInput.value = '';
        displayAdminGallery();
    };
    reader.readAsDataURL(imageInput.files[0]);
}

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed bottom-0 end-0 m-3`;
    toast.textContent = message;
    toast.style.zIndex = '9999';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Load on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    displayAdminGallery();
});
