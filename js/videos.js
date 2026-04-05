// Video Management System using IndexedDB for large file storage

// Initialize IndexedDB
const dbName = 'WeldingVideoDB';
const storeName = 'videos';
let db = null;

function initializeDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        
        request.onerror = () => {
            console.error('Database error:', request.error);
            reject(request.error);
        };
        
        request.onsuccess = () => {
            db = request.result;
            console.log('Database initialized successfully');
            resolve(db);
        };
        
        request.onupgradeneeded = (event) => {
            const database = event.target.result;
            if (!database.objectStoreNames.contains(storeName)) {
                const store = database.createObjectStore(storeName, { keyPath: 'id' });
                store.createIndex('title', 'title', { unique: false });
                console.log('Object store created');
            }
        };
    });
}

// Ensure DB is initialized
if (!db) {
    initializeDB().catch(err => console.error('Failed to initialize DB:', err));
}

function getVideos() {
    return new Promise((resolve, reject) => {
        if (!db) {
            console.warn('Database not initialized, returning empty array');
            resolve([]);
            return;
        }
        
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            console.log('Retrieved videos:', request.result);
            resolve(request.result);
        };
    });
}

function saveVideos(videos) {
    return new Promise((resolve, reject) => {
        if (!db) {
            console.error('Database not initialized');
            reject(new Error('Database not initialized'));
            return;
        }
        
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        
        // Clear all and add new
        const clearRequest = store.clear();
        
        clearRequest.onsuccess = () => {
            let completed = 0;
            videos.forEach(video => {
                const addRequest = store.add(video);
                addRequest.onsuccess = () => {
                    completed++;
                    if (completed === videos.length) {
                        console.log('All videos saved');
                        resolve();
                    }
                };
                addRequest.onerror = () => reject(addRequest.error);
            });
        };
        clearRequest.onerror = () => reject(clearRequest.error);
    });
}

function addVideo(title, description, videoUrl, isLocal = false) {
    return new Promise(async (resolve, reject) => {
        try {
            const videos = await getVideos();
            const newVideo = {
                id: Date.now(),
                title: title,
                description: description,
                videoUrl: videoUrl,
                isLocal: isLocal
            };
            videos.push(newVideo);
            await saveVideos(videos);
            console.log('Video added:', newVideo.id);
            resolve(newVideo);
        } catch (err) {
            console.error('Error adding video:', err);
            reject(err);
        }
    });
}

function updateVideo(id, title, description, videoUrl, isLocal = false) {
    return new Promise(async (resolve, reject) => {
        try {
            const videos = await getVideos();
            const video = videos.find(v => v.id === id);
            if (video) {
                video.title = title;
                video.description = description;
                video.videoUrl = videoUrl;
                video.isLocal = isLocal;
                await saveVideos(videos);
                console.log('Video updated:', id);
            }
            resolve();
        } catch (err) {
            console.error('Error updating video:', err);
            reject(err);
        }
    });
}

function deleteVideo(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const videos = await getVideos();
            const filtered = videos.filter(v => v.id !== id);
            await saveVideos(filtered);
            console.log('Video deleted:', id);
            resolve();
        } catch (err) {
            console.error('Error deleting video:', err);
            reject(err);
        }
    });
}

function displayVideos() {
    console.log('displayVideos called');
    getVideos().then(videos => {
        console.log('Got videos:', videos.length);
        const container = document.getElementById('videosContainer');
        
        console.log('Container element:', container);
        
        if (!container) {
            console.error('❌ Videos container NOT FOUND');
            return;
        }
        
        if (videos.length === 0) {
            console.log('No videos found');
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text2); padding: 2rem;">No videos added yet. Add videos from the main website or admin dashboard.</p>';
            return;
        }
        
        console.log('Rendering', videos.length, 'videos');
        
        container.innerHTML = videos.map((video, index) => {
            console.log('Rendering video', index + 1, ':', video.title);
            let videoContent;
            
            if (video.isLocal) {
                // Local video file - use video element with absolute positioning
                videoContent = `
                    <video controls style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; background: #000;">
                        <source src="${video.videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
            } else {
                // YouTube video - use iframe
                const videoId = extractYoutubeId(video.videoUrl);
                const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : video.videoUrl;
                videoContent = `
                    <iframe src="${embedUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" loading="lazy"></iframe>
                `;
            }
            
            return `
                <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; box-shadow: var(--card-shadow); display: flex; flex-direction: column;">
                    <div style="position: relative; width: 100%; padding-bottom: 56.25%; overflow: hidden; background: #000;">
                        ${videoContent}
                    </div>
                    <div style="padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column;">
                        <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text); font-weight: 600;">${video.title}</h3>
                        <p style="font-size: 0.9rem; color: var(--text2); line-height: 1.6; flex-grow: 1;">${video.description}</p>
                        <p style="font-size: 0.8rem; color: #999; margin-top: 0.75rem;">${video.isLocal ? '📁 Local Video' : '▶️ YouTube'}</p>
                    </div>
                </div>
            `;
        }).join('');
        console.log('✅ Videos rendered successfully');
    }).catch(err => {
        console.error('❌ Error displaying videos:', err);
        const container = document.getElementById('videosContainer');
        if (container) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: red; padding: 2rem;">Error loading videos: ' + err.message + '</p>';
        }
    });
}

function extractYoutubeId(url) {
    if (!url) return null;
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^\s&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Ensure database is initialized and functions are globally accessible
if (!db) {
    initializeDB().catch(err => console.error('Failed to initialize DB:', err));
}

// Expose functions globally
window.initializeDB = initializeDB;
window.getVideos = getVideos;
window.saveVideos = saveVideos;
window.addVideo = addVideo;
window.updateVideo = updateVideo;
window.deleteVideo = deleteVideo;
window.displayVideos = displayVideos;
window.extractYoutubeId = extractYoutubeId;
