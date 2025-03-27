document.addEventListener("DOMContentLoaded", function() {
    // Grab the summary wrapper and all speaker wrappers
    const summaryWrapper = document.getElementById("summary-wrapper");
    const speakerWrappers = document.querySelectorAll(".speaker-wrapper");
    // Get all tabs in the tab-wrapper
    const tabs = document.querySelectorAll("#tab-wrapper .tab");
  
    tabs.forEach(tab => {
      tab.addEventListener("click", function() {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove("active"));
        // Add active class to the clicked tab
        tab.classList.add("active");
  
        // Hide the summary and all speaker sections
        summaryWrapper.style.display = "none";
        speakerWrappers.forEach(wrapper => wrapper.style.display = "none");
  
        // Check if the clicked tab is the summary tab
        if (tab.id === "summary-tab") {
          // Show the summary-wrapper as flex
          summaryWrapper.style.display = "flex";
        } else {
          // Otherwise, get the profile name from the data attribute
          const profileName = tab.getAttribute("data-name");
          // Find the corresponding speaker-wrapper by matching the id
          const targetSpeaker = document.getElementById(profileName);
          if (targetSpeaker) {
            // Show the corresponding speaker-wrapper (adjust display style if needed)
            targetSpeaker.style.display = "block";
          }
        }
      });
    });
    function addSpeakerTimes(speakers) {
        const wrapper = document.getElementById("speaker-time-wrapper");
        let totalWidth = 40; // Adjust as needed for the total length
    
        let output = speakers.map(([name, percent]) => {
            let text = `${name} `;
            let dots = ".".repeat(totalWidth - (text.length + percent.toString().length + 1));
            return `${name} ${dots} ${percent}%`;
        }).join("\n");
    
        wrapper.innerHTML = output.replace(/\n/g, "<br>"); // Maintain line breaks
    }
    
    // Example usage with multiple speakers
    addSpeakerTimes([
        ["Speaker One", 20],
        ["Another Speaker", 40],
        ["Someone Else", 40]
    ]);
        // Handle "Edit Speaker" clicks
        const editButtons = document.querySelectorAll('.edit-speaker-trigger');
        editButtons.forEach(function(button) {
            button.addEventListener('click', function(event) {
                // Find the parent .speaker-verification container
                const verificationDiv = event.target.closest('.speaker-verification');
                if (verificationDiv) {
                    // Hide the header and show the search section
                    const header = verificationDiv.querySelector('.speaker-ver-header');
                    const search = verificationDiv.querySelector('.speaker-ver-search');
                    if (header && search) {
                        header.style.display = 'none';
                        search.style.display = 'flex';
                    }
                }
            });
        });
    
        // Handle "Cancel" clicks inside the speaker-ver-search section
        // (Assuming the "Cancel" button inside .speaker-ver-search has the class "text-btn")
        const cancelButtons = document.querySelectorAll('.speaker-ver-search .text-btn');
        cancelButtons.forEach(function(button) {
            button.addEventListener('click', function(event) {
                // Find the parent .speaker-verification container
                const verificationDiv = event.target.closest('.speaker-verification');
                if (verificationDiv) {
                    // Hide the search section and show the header again
                    const header = verificationDiv.querySelector('.speaker-ver-header');
                    const search = verificationDiv.querySelector('.speaker-ver-search');
                    if (header && search) {
                        search.style.display = 'none';
                        header.style.display = 'block';
                    }
                }
            });
        });
  });
  



