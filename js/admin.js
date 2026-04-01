// Admin Settings Management

function saveSettings() {
    const businessPhone = document.getElementById('businessPhone').value;
    
    if (!businessPhone) {
        showToast('Please enter a phone number', 'danger');
        return;
    }
    
    localStorage.setItem('businessPhone', businessPhone);
    showToast('Settings saved successfully!', 'success');
}

function loadBusinessPhoneSettings() {
    const phoneInput = document.getElementById('businessPhone');
    if (phoneInput) {
        const phone = localStorage.getItem('businessPhone') || '+212676866995';
        phoneInput.value = phone;
    }
}

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed bottom-0 end-0 m-3`;
    toast.textContent = message;
    toast.style.zIndex = '9999';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Load settings on page load
document.addEventListener('DOMContentLoaded', () => {
    loadBusinessPhoneSettings();
});

