document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById('backgroundMusic');
    const volumeIcon = document.getElementById('volumeIcon');
    const volumeSlider = document.getElementById('volumeControl');

    // Set initial volume and icon
    volumeSlider.value = parseFloat(sessionStorage.getItem('volume') || volumeSlider.value);
    player.volume = parseFloat(volumeSlider.value);
    updateVolumeIcon(player.volume);

    volumeSlider.addEventListener('input', function () {
        const volume = parseFloat(this.value);
        player.volume = volume;
        sessionStorage.setItem('volume', volume);
        updateVolumeIcon(volume);
    });

    function updateVolumeIcon(volume) {
        if (volume === 0) {
            volumeIcon.className = 'fas fa-volume-mute text-white';
        } else if (volume > 0.5) {
            volumeIcon.className = 'fas fa-volume-up text-white';
        } else {
            volumeIcon.className = 'fas fa-volume-down text-white';
        }
    }
    // Restore music time and attempt to play
    player.currentTime = parseFloat(sessionStorage.getItem('musicTime') || 0);
    player.play(); // Consider browser autoplay policy

    window.addEventListener('beforeunload', function () {
        sessionStorage.setItem('musicTime', player.currentTime);
    });
});
