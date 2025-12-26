// Configuration
const YOUTUBE_CHANNEL_URL = '@gjriversideraceway'; // Replace with actual channel handle
const YOUTUBE_CHANNEL_ID = 'UCxXxXxXxXxXxXxXxXxXxXxX'; // Replace with actual channel ID
const API_BASE_URL = window.location.origin;

// Fetch and display racing schedule
async function loadSchedule() {
    const scheduleContainer = document.getElementById('schedule-container');
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/schedule`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch schedule');
        }
        
        const scheduleData = await response.json();
        
        if (scheduleData.length === 0) {
            scheduleContainer.innerHTML = '<p class="info-text">No scheduled races at this time.</p>';
            return;
        }
        
        scheduleContainer.innerHTML = scheduleData.map(item => {
            // Escape HTML to prevent XSS
            const escapeHtml = (text) => {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            };
            
            return `
            <div class="schedule-card">
                <div class="day">${escapeHtml(item.day_of_week)}</div>
                <div class="time">${escapeHtml(item.time)}</div>
                <div class="description">${escapeHtml(item.description)}</div>
            </div>
        `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading schedule:', error);
        scheduleContainer.innerHTML = '<p class="error">Unable to load schedule. Please try again later.</p>';
    }
}

// Check for YouTube live stream
async function checkYouTubeLive() {
    const youtubeContainer = document.getElementById('youtube-player');
    const checkBtn = document.getElementById('check-live-btn');
    
    // For a real implementation, you would need to use YouTube Data API v3
    // This requires an API key and proper authentication
    // For now, we'll provide a direct link to check the channel
    
    // Option 1: Direct embed of channel (will show live if streaming)
    const channelEmbedUrl = `https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}`;
    
    youtubeContainer.innerHTML = `
        <div class="youtube-embed">
            <iframe 
                src="${channelEmbedUrl}" 
                title="YouTube Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
        <p class="info-text" style="margin-top: 1rem;">
            If we're not currently live, you'll see our channel page. 
            <a href="https://www.youtube.com/${YOUTUBE_CHANNEL_URL}/streams" target="_blank" style="color: #667eea;">
                Click here to see upcoming streams
            </a>
        </p>
    `;
}

// Alternative: Simple link-based approach (more reliable without API key)
function setupYouTubeSection() {
    const youtubeContainer = document.getElementById('youtube-player');
    const checkBtn = document.getElementById('check-live-btn');
    
    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            // Open YouTube channel in new tab
            window.open(`https://www.youtube.com/${YOUTUBE_CHANNEL_URL}/streams`, '_blank');
            
            // Update the UI to show embedded player
            youtubeContainer.innerHTML = `
                <p class="info-text">
                    Opening YouTube in a new tab...<br>
                    If you'd like to view the stream here, we can embed it below.
                </p>
                <div class="youtube-embed" style="margin-top: 1rem;">
                    <iframe 
                        src="https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}" 
                        title="YouTube Live Stream"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <p class="info-text" style="margin-top: 1rem;">
                    <em>Note: If we're not currently streaming, the embed will show our channel page.</em>
                </p>
            `;
        });
    }
}

// Format next race date
function getNextRaceInfo() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
    
    let nextRaceDay = '';
    let daysUntil = 0;
    
    // Check for next Tuesday (2) or Saturday (6)
    if (dayOfWeek < 2) {
        nextRaceDay = 'Tuesday';
        daysUntil = 2 - dayOfWeek;
    } else if (dayOfWeek === 2) {
        nextRaceDay = 'Saturday';
        daysUntil = 4;
    } else if (dayOfWeek < 6) {
        nextRaceDay = 'Saturday';
        daysUntil = 6 - dayOfWeek;
    } else if (dayOfWeek === 6) {
        nextRaceDay = 'Tuesday';
        daysUntil = 3;
    } else { // Sunday
        nextRaceDay = 'Tuesday';
        daysUntil = 2;
    }
    
    return { nextRaceDay, daysUntil };
}

// Add next race info to page
function displayNextRaceInfo() {
    const scheduleSection = document.querySelector('.schedule-section h2');
    const { nextRaceDay, daysUntil } = getNextRaceInfo();
    
    if (scheduleSection) {
        let message = '';
        if (daysUntil === 0) {
            message = ' - Racing Today! 🏁';
        } else if (daysUntil === 1) {
            message = ` - Next race: Tomorrow (${nextRaceDay})`;
        } else {
            message = ` - Next race: ${nextRaceDay} (in ${daysUntil} days)`;
        }
        
        const infoSpan = document.createElement('span');
        infoSpan.style.fontSize = '1rem';
        infoSpan.style.color = '#666';
        infoSpan.style.fontWeight = 'normal';
        infoSpan.textContent = message;
        scheduleSection.appendChild(infoSpan);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadSchedule();
    setupYouTubeSection();
    displayNextRaceInfo();
});
