// Admin Video Management with Enhanced Upload Features

let videoUploadProgress = {
    fileName: null,
    progress: 0,
    total: 0,
    isUploading: false
};

function displayAdminVideos() {
    getVideos().then(videos => {
        const container = document.getElementById('adminVideosContainer');
        
        if (!container) return;
        
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(2, 1fr)';
        container.style.gap = '2rem';
        
        if (videos.length === 0) {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; background: #f8f9fa; border-radius: 8px; color: #666;">No videos added yet. Add your first video above.</div>';
            return;
        }
        
        container.innerHTML = videos.map(video => {
            let previewHtml;
            
            if (video.isLocal) {
                // Local video preview
                previewHtml = `
                    <div style="position: relative; width: 100%; padding-bottom: 56.25%; overflow: hidden; background: #000;">
                        <video width="100%" height="100%" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain;">
                            <source src="${video.videoUrl}" type="video/mp4">
                        </video>
                    </div>
                `;
            } else {
                // YouTube preview
                const videoId = extractYoutubeId(video.videoUrl);
                const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : video.videoUrl;
                previewHtml = `
                    <div style="position: relative; width: 100%; padding-bottom: 56.25%; overflow: hidden; background: #000;">
                        <iframe width="100%" height="100%" src="${embedUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" loading="lazy"></iframe>
                    </div>
                `;
            }
            
            return `
                <div style="width: 100%;">
                    <div style="background: white; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); transition: all 0.3s ease; height: 100%; display: flex; flex-direction: column;">
                        ${previewHtml}
                        <div style="padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column;">
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-weight: 600; font-size: 0.9rem; color: #333; margin-bottom: 0.5rem;">Title</label>
                                <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; font-family: inherit; font-size: 0.9rem;" value="${video.title}" id="vtitle-${video.id}">
                            </div>
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-weight: 600; font-size: 0.9rem; color: #333; margin-bottom: 0.5rem;">Description</label>
                                <textarea style="width: 100%; padding: 0.75rem; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; font-family: inherit; font-size: 0.9rem; min-height: 80px; resize: none;" id="vdesc-${video.id}">${video.description}</textarea>
                            </div>
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-weight: 600; font-size: 0.9rem; color: #333; margin-bottom: 0.5rem;">${video.isLocal ? 'Local Video File' : 'YouTube URL'}</label>
                                <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; font-family: inherit; font-size: 0.9rem;" value="${video.videoUrl}" id="vurl-${video.id}" placeholder="${video.isLocal ? 'Local file path' : 'https://youtube.com/watch?v=...'}">
                            </div>
                            <div style="display: flex; gap: 0.75rem; margin-top: auto;">
                                <button style="flex-grow: 1; padding: 0.75rem; background: #FFA827; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-size: 0.9rem;" onmouseover="this.style.background='#FFB74D'" onmouseout="this.style.background='#FFA827'" onclick="updateVideoClick(${video.id})">Update</button>
                                <button style="flex-grow: 1; padding: 0.75rem; background: #E24B4A; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-size: 0.9rem;" onmouseover="this.style.background='#C93C3B'" onmouseout="this.style.background='#E24B4A'" onclick="deleteVideoClick(${video.id})">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }).catch(err => {
        console.error('Error displaying admin videos:', err);
    });
}

function updateVideoClick(id) {
    const titleInput = document.getElementById(`vtitle-${id}`);
    const descInput = document.getElementById(`vdesc-${id}`);
    const urlInput = document.getElementById(`vurl-${id}`);
    const updateBtn = event.target;
    
    if (!titleInput || !descInput || !urlInput) return;
    
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const videoUrl = urlInput.value.trim();
    
    if (!title) {
        showToast('Please enter a video title', 'danger');
        return;
    }
    
    if (!videoUrl) {
        showToast('Please provide a video source', 'danger');
        return;
    }
    
    // Show loading state
    updateBtn.disabled = true;
    updateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
    const originalText = updateBtn.innerHTML;
    
    updateVideo(id, title, description, videoUrl, true).then(() => {
        showToast('✓ Video updated successfully! Changes applied immediately.', 'success');
        
        // Reset button
        updateBtn.disabled = false;
        updateBtn.innerHTML = '<i class="fas fa-check"></i> Update';
        
        setTimeout(() => {
            updateBtn.innerHTML = '<i class="fas fa-edit"></i> Update';
        }, 2000);
        
        displayAdminVideos();
        if (document.getElementById('videosContainer')) {
            displayVideos();
        }
    }).catch(err => {
        console.error('Error updating video:', err);
        showToast('Error updating video: ' + err.message, 'danger');
        updateBtn.disabled = false;
        updateBtn.innerHTML = '<i class="fas fa-edit"></i> Update';
    });
}

function deleteVideoClick(id) {
    if (confirm('Are you sure you want to delete this video?')) {
        deleteVideo(id).then(() => {
            showToast('Video deleted successfully!', 'success');
            displayAdminVideos();
            if (document.getElementById('videosContainer')) {
                displayVideos();
            }
        }).catch(err => {
            console.error('Error deleting video:', err);
            alert('Error deleting video: ' + err.message);
        });
    }
}

function addNewVideo() {
    const titleInput = document.getElementById('newVideoTitle');
    const descInput = document.getElementById('newVideoDesc');
    const urlInput = document.getElementById('newVideoUrl');
    const fileInput = document.getElementById('newVideoFile');
    const uploadBtn = event.target;
    
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const url = urlInput.value.trim();
    
    // Validation
    if (!title) {
        showToast('Please enter a video title', 'danger');
        return;
    }
    
    // Handle file upload or YouTube URL
    if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        
        // Validate file type
        if (!file.type.startsWith('video/')) {
            showToast('Please select a valid video file (MP4, WebM, etc.)', 'danger');
            return;
        }
        
        // Validate file size (max 100MB for video)
        const maxSize = 100 * 1024 * 1024;
        if (file.size > maxSize) {
            showToast('Video file is too large. Maximum size is 100MB. Please compress your video.', 'warning');
            return;
        }
        
        // Show loading state
        uploadBtn.disabled = true;
        videoUploadProgress.isUploading = true;
        videoUploadProgress.fileName = file.name;
        const originalText = uploadBtn.innerHTML;
        uploadBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Uploading: ${Math.round(file.size / 1024 / 1024)}MB...`;
        
        const reader = new FileReader();
        
        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                videoUploadProgress.progress = Math.round((event.loaded / event.total) * 100);
                uploadBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Uploading ${videoUploadProgress.progress}%...`;
            }
        };
        
        reader.onload = async function(e) {
            try {
                await addVideo(title, description, e.target.result, true);
                showToast('✓ Video uploaded successfully! Now visible to all users.', 'success');
                
                // Reset form
                titleInput.value = '';
                descInput.value = '';
                urlInput.value = '';
                fileInput.value = '';
                
                // Reset button
                uploadBtn.disabled = false;
                uploadBtn.innerHTML = originalText;
                videoUploadProgress.isUploading = false;
                
                // Refresh displays
                displayAdminVideos();
                if (document.getElementById('videosContainer')) {
                    displayVideos();
                }
            } catch (err) {
                console.error('Error adding video:', err);
                showToast('Error uploading video: ' + err.message, 'danger');
                uploadBtn.disabled = false;
                uploadBtn.innerHTML = originalText;
                videoUploadProgress.isUploading = false;
            }
        };
        
        reader.onerror = () => {
            showToast('Error reading file. Please try again.', 'danger');
            uploadBtn.disabled = false;
            uploadBtn.innerHTML = originalText;
            videoUploadProgress.isUploading = false;
        };
        
        reader.readAsDataURL(file);
    } else if (url) {
        // Validate YouTube URL format
        if (!isValidYoutubeUrl(url)) {
            showToast('Please enter a valid YouTube URL (e.g., https://www.youtube.com/watch?v=...)', 'danger');
            return;
        }
        
        // Show loading state
        uploadBtn.disabled = true;
        uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding Video...';
        
        addVideo(title, description, url, false).then(() => {
            showToast('✓ YouTube video added successfully! Now visible to all users.', 'success');
            
            // Reset form
            titleInput.value = '';
            descInput.value = '';
            urlInput.value = '';
            if (fileInput) fileInput.value = '';
            
            // Reset button
            uploadBtn.disabled = false;
            uploadBtn.innerHTML = '<i class="fas fa-video"></i> Add Video';
            
            // Refresh displays
            displayAdminVideos();
            if (document.getElementById('videosContainer')) {
                displayVideos();
            }
        }).catch(err => {
            console.error('Error adding video:', err);
            showToast('Error adding video: ' + err.message, 'danger');
            uploadBtn.disabled = false;
            uploadBtn.innerHTML = '<i class="fas fa-video"></i> Add Video';
        });
    } else {
        showToast('Please upload a video file or enter a YouTube URL', 'warning');
    }
}

// Validate YouTube URL
function isValidYoutubeUrl(url) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\//;
    return youtubeRegex.test(url);
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
document.addEventListener('DOMContentLoaded', function() {
    displayAdminVideos();
});
