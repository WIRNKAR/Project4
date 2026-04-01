// Admin Gallery Management

function displayAdminGallery() {
    const items = getGalleryItems();
    const container = document.getElementById('adminGalleryContainer');
    
    if (!container) return;
    
    container.innerHTML = items.map(item => `
        <div class="col-md-6 col-lg-4">
            <div class="card admin-gallery-card">
                <img src="${item.image}" alt="${item.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body p-2">
                    <div class="mb-2">
                        <label class="form-label mb-1" style="font-size: 0.85rem;">Title</label>
                        <input type="text" class="form-control form-control-sm" value="${item.title}" id="title-${item.id}">
                    </div>
                    <div class="mb-2">
                        <label class="form-label mb-1" style="font-size: 0.85rem;">Price</label>
                        <input type="text" class="form-control form-control-sm" value="${item.price}" id="price-${item.id}">
                    </div>
                    <div class="mb-2">
                        <label class="form-label mb-1" style="font-size: 0.85rem;">Replace Image</label>
                        <input type="file" class="form-control form-control-sm" id="image-${item.id}" accept="image/*">
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-primary flex-grow-1" onclick="updateItem(${item.id})">Update</button>
                        <button class="btn btn-sm btn-danger flex-grow-1" onclick="deleteItem(${item.id})">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
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
