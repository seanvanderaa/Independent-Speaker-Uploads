document.addEventListener("DOMContentLoaded", function() {
  console.log("Here!");
  
  window.openFileDialog = function() {
    console.log("Here!");
    document.getElementById("audioFile").click();
  };

  window.handleDragOver = function(event) {
    event.preventDefault();
    event.currentTarget.classList.add('hover');
  };

  window.handleDragLeave = function(event) {
    event.currentTarget.classList.remove('hover');
  };

  window.handleDrop = function(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('hover');
    const files = event.dataTransfer.files;
    document.getElementById("audioFile").files = files;
  };

  // Example list of names
  const names = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy", "Karl", "Laura"];

  const inputField = document.getElementById('selected_speakers');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');
  const modalSearchInput = document.getElementById('modal-search-input');
  const nameList = document.getElementById('name-list');
  const selectedNamesContainer = document.getElementById('selected-names-container');

  inputField.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  function openModal() {
    modal.classList.add('active');
    modalSearchInput.value = '';
    renderNameList(names);
    modalSearchInput.focus();
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  function renderNameList(filteredNames) {
    nameList.innerHTML = '';
    if (filteredNames.length === 0) {
      nameList.innerHTML = '<div>No results found</div>';
      return;
    }
    filteredNames.forEach(name => {
      const div = document.createElement('div');
      div.className = 'name-item';
      div.textContent = name;
      div.addEventListener('click', () => {
        addSelectedName(name);
      });
      nameList.appendChild(div);
    });
  }

  modalSearchInput.addEventListener('input', () => {
    const query = modalSearchInput.value.toLowerCase();
    const filtered = names.filter(name => name.toLowerCase().includes(query));
    renderNameList(filtered);
  });

  function addSelectedName(name) {
    if (document.getElementById('selected-' + name)) return;

    const span = document.createElement('span');
    span.className = 'selected-name';
    span.id = 'selected-' + name;
    span.textContent = name;

    const removeX = document.createElement('span');
    removeX.className = 'remove';
    removeX.textContent = ' x';
    removeX.addEventListener('click', () => {
      selectedNamesContainer.removeChild(span);
      updateInputValue();
    });

    span.appendChild(removeX);
    selectedNamesContainer.appendChild(span);
    updateInputValue();
  }

  function updateInputValue() {
    const selectedNames = Array.from(selectedNamesContainer.getElementsByClassName('selected-name'))
                               .map(span => span.firstChild.textContent.trim());
    inputField.value = selectedNames.join(', ');
  }
});
