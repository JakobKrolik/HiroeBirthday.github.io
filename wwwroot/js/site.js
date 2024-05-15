document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById('backgroundMusic');
    const volumeIcon = document.getElementById('volumeIcon');
    const volumeSlider = document.getElementById('volumeControl');
    const skipButton = document.getElementById('skipButton');
    const trackTitle = document.getElementById('trackTitle');
    const playlist = [
        { url: '../music/ベイビー・アイラブユー-TEE【vocal off】arranged by Ask-Water.mp3', title: 'ベイビー・アイラブユ' },
        { url: '../music/Reason.mp3', title: 'Reason' },
        { url: '../music/あのね.mp3', title: 'あのね' },
        { url: '../music/Sparkle.mp3', title: 'Sparkle' },
        { url: '../music/好きになってはいけない理由.mp3', title: '好きになってはいけない理由' },
        { url: '../music/アナログライフ.mp3', title: 'アナログライフ' },
    ];
    let trackIndex = 0;

    const progress = document.getElementById('songProgress');

    player.addEventListener('timeupdate', function () {
        const percentage = (this.currentTime / this.duration) * 100;
        progress.value = percentage;
    });

    function setTrack(index) {
        if (index < 0) {
            index = playlist.length - 1;  // Loop back to the last track if index is negative
        } else if (index >= playlist.length) {
            index = 0;  // Loop to the first track if index exceeds playlist length
        }
        trackIndex = index;
        player.src = playlist[index].url;
        trackTitle.textContent = playlist[index].title;
        player.play();
    }

    player.addEventListener('ended', function () {
        setTrack(trackIndex + 1);
    });

    prevButton.addEventListener('click', function () {
        setTrack(trackIndex - 1);
    });

    skipButton.addEventListener('click', function () {
        setTrack(trackIndex + 1);
    });

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
    console.log(sessionStorage.getItem('musicTime'))
    setTrack(parseInt(sessionStorage.getItem('musicTrack') || 0)); // Start with the first song
    player.play(); // Consider browser autoplay policy

    window.addEventListener('beforeunload', function () {
        sessionStorage.setItem('musicTime', player.currentTime);
        console.log(player.currentTime);
        sessionStorage.setItem('musicTrack', trackIndex);
    });
});
