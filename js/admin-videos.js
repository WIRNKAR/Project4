// Admin Video Management

function displayAdminVideos() {
    getVideos().then(videos => {
        const container = document.getElementById('adminVideosContainer');
        
        if (!container) return;
        
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(2, 1fr)';
        container.style.gap = '2rem';
        
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
    
    if (!titleInput || !descInput || !urlInput) return;
    
    const title = titleInput.value;
    const description = descInput.value;
    const videoUrl = urlInput.value;
    
    if (!title || !videoUrl) {
        alert('Please fill in title and video source');
        return;
    }
    
    updateVideo(id, title, description, videoUrl, true).then(() => {
        showToast('Video updated successfully!', 'success');
        displayAdminVideos();
        if (document.getElementById('videosContainer')) {
            displayVideos();
        }
    }).catch(err => {
        console.error('Error updating video:', err);
        alert('Error updating video: ' + err.message);
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
    
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const url = urlInput.value.trim();
    
    if (!title) {
        alert('Please enter a video title');
        return;
    }
    
    // Handle file upload
    if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (!file.type.startsWith('video/')) {
            alert('Please select a valid video file');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = async function(e) {
            try {
                await addVideo(title, description, e.target.result, true);
                showToast('Video added successfully!', 'success');
                
                // Reset form
                titleInput.value = '';
                descInput.value = '';
                urlInput.value = '';
                fileInput.value = '';
                
                // Refresh displays
                displayAdminVideos();
                if (document.getElementById('videosContainer')) {
                    displayVideos();
                }
            } catch (err) {
                console.error('Error adding video:', err);
                alert('Error adding video: ' + err.message);
            }
        };
        reader.readAsDataURL(file);
    } else if (url) {
        // Handle YouTube URL
        addVideo(title, description, url, false).then(() => {
            showToast('Video added successfully!', 'success');
            
            // Reset form
            titleInput.value = '';
            descInput.value = '';
            urlInput.value = '';
            if (fileInput) fileInput.value = '';
            
            // Refresh displays
            displayAdminVideos();
            if (document.getElementById('videosContainer')) {
                displayVideos();
            }
        }).catch(err => {
            console.error('Error adding video:', err);
            alert('Error adding video: ' + err.message);
        });
    } else {
        alert('Please upload a video file or enter a YouTube URL');
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

// Load on page load
document.addEventListener('DOMContentLoaded', function() {
    displayAdminVideos();
});
