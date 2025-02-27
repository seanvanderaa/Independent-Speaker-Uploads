document.addEventListener('DOMContentLoaded', function() {
    const prevUploads = document.querySelectorAll('.prev-upload');

    prevUploads.forEach(function(prevUpload) {
      prevUpload.addEventListener('click', function(event) {
        // Avoid handling the click if the upload-menu is clicked
        if (event.target.classList.contains('upload-menu')) {
          return;
        }

        // Get the filename from the data attribute
        const fileName = prevUpload.dataset.filename;

        // If already active, redirect to "/" to clear the active state
        if (prevUpload.classList.contains('active')) {
          window.location.href = '/';
        } else {
          // Redirect to the /source-view endpoint with the filename as a parameter
          window.location.href = `/iu-source-view?file=${encodeURIComponent(fileName)}`;
        }
      });
    });
});

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggleButtonDiv = document.getElementById('toggle-btn-div');

        sidebar.classList.toggle('collapsed');

        if (sidebar.classList.contains('collapsed')) {
            toggleButtonDiv.style.display = "flex"; // Show the button when sidebar is collapsed
        } else {
            toggleButtonDiv.style.display = "none"; // Hide the button when sidebar is open
        }
    }
    document.getElementById("new-file-btn").addEventListener("click", function() {
        window.location.href = "/upload";
    });

    function updateLoadingBar(percentage) {
        const loadingBar = document.getElementById("loadingBar");
        loadingBar.style.width = percentage + "%";
    }

    // Example usage: Simulate loading updates
    let progress = 0;
    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
        } else {
            progress += 10; // Simulate progress increase
            updateLoadingBar(progress);
        }
    }, 500);
