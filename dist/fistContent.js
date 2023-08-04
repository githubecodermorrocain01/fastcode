function saveFirstContent() {
    const textareaContent = document.getElementById('code').innerHTML;
    if (!localStorage.getItem('editorContent')) {
      localStorage.setItem('editorContent', textareaContent);
      alert('First content saved!');
    } else {
      alert('First content has already been saved.');
    }
  }

  function loadFirstContent() {
    const savedFirstContent = localStorage.getItem('editorContent');
    if (savedFirstContent) {
      document.getElementById('code').innerHTML = savedFirstContent;
      alert('First content loaded!');
    } else {
      alert('No first content found.');
    }
  }
  // Load first content on page load (optional)
  window.onload = function () {
    const savedFirstContent = localStorage.getItem('editorContent');
    if (savedFirstContent) {
      document.getElementById('code').innerHTML = savedFirstContent;
    }
  };

  
// Step 1: Check if the item exists in local storage
function isItemInLocalStorage(key) {
  return localStorage.getItem(key) !== null;
}

// Step 2: Remove the item from local storage
function removeItemFromLocalStorage(key) {
  if (isItemInLocalStorage(key)) {
    localStorage.removeItem(key);
    console.log(`Item with key "${key}" has been removed from local storage.`);
  } else {
    console.log(`Item with key "${key}" does not exist in local storage.`);
  }
}

// Example usage:
const keyToRemove = "editorContent";
removeItemFromLocalStorage(keyToRemove);








