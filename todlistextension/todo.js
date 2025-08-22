// Store lists in localStorage for persistence
const STORAGE_KEY = 'harsh_todo_lists';
let lists = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [[]];
let currentListIndex = 0;
let isMuted = JSON.parse(localStorage.getItem('harsh_todo_muted')) || false;

// Keep-alive mechanism to prevent popup from closing
let keepAliveInterval;

// Sound effects - using actual audio files with fallback
const sounds = {
  tick: null,
  click: null,
  chimes: null
};

// Initialize sounds with error handling
function initializeSounds() {
  try {
    sounds.tick = new Audio('sounds/tick.mp3');
    sounds.click = new Audio('sounds/click.mp3');
    sounds.chimes = new Audio('sounds/chimes.mp3');
    
    // Test if sounds load properly
    sounds.tick.addEventListener('error', () => {
      console.log('Tick sound failed to load');
      sounds.tick = null;
    });
    sounds.click.addEventListener('error', () => {
      console.log('Click sound failed to load');
      sounds.click = null;
    });
    sounds.chimes.addEventListener('error', () => {
      console.log('Chimes sound failed to load');
      sounds.chimes = null;
    });
  } catch (e) {
    console.log('Sound initialization failed:', e);
  }
}

// Keep popup alive
function startKeepAlive() {
  keepAliveInterval = setInterval(() => {
    // Send keep-alive message to background script
    if (chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({action: 'keepAlive'}, (response) => {
        if (chrome.runtime.lastError) {
          // Extension context is still valid
          console.log('Keep-alive sent');
        }
      });
    }
  }, 30000); // Send every 30 seconds
}

// Stop keep-alive when popup is about to close
function stopKeepAlive() {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
  }
}

// DOM elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const prevListBtn = document.getElementById('prevListBtn');
const newListBtn = document.getElementById('newListBtn');
const listIndicator = document.getElementById('listIndicator');
const muteBtn = document.getElementById('muteBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const deleteCompletedBtn = document.getElementById('deleteCompletedBtn');

// Check if all required elements exist
function checkElements() {
  const requiredElements = [
    'todoInput', 'addBtn', 'todoList', 'prevListBtn', 
    'newListBtn', 'listIndicator', 'muteBtn', 
    'deleteAllBtn', 'deleteCompletedBtn'
  ];
  
  const missingElements = requiredElements.filter(id => !document.getElementById(id));
  
  if (missingElements.length > 0) {
    console.error('Missing elements:', missingElements);
    return false;
  }
  
  return true;
}

// Sound functions
function playSound(soundName) {
  if (!isMuted && sounds[soundName]) {
    try {
      sounds[soundName].currentTime = 0;
      sounds[soundName].play().catch(e => console.log('Sound play failed:', e));
    } catch (e) {
      console.log('Sound play error:', e);
    }
  }
}

function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem('harsh_todo_muted', JSON.stringify(isMuted));
  updateMuteButton();
  playSound('click');
}

function updateMuteButton() {
  if (muteBtn) {
    muteBtn.innerHTML = isMuted ? '🔇' : '🔊';
    muteBtn.title = isMuted ? 'Unmute Sounds' : 'Mute Sounds';
  }
}

// Save lists to localStorage
function saveLists() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
}

// Delete functions
function deleteAllTodos() {
  console.log('Delete all clicked');
  if (lists[currentListIndex].length === 0) {
    console.log('No todos to delete');
    return;
  }
  
  if (confirm('Are you sure you want to delete ALL todos in this list?')) {
    console.log('Deleting all todos');
    lists[currentListIndex] = [];
    saveLists();
    renderList();
    playSound('click');
    
    // Add delete animation
    todoList.style.animation = 'todoComplete 0.3s ease-in-out';
    setTimeout(() => {
      todoList.style.animation = '';
    }, 300);
  }
}

function deleteCompletedTodos() {
  console.log('Delete completed clicked');
  const completedCount = lists[currentListIndex].filter(todo => todo.completed).length;
  if (completedCount === 0) {
    console.log('No completed todos to delete');
    return;
  }
  
  if (confirm(`Are you sure you want to delete ${completedCount} completed todo(s)?`)) {
    console.log('Deleting completed todos');
    lists[currentListIndex] = lists[currentListIndex].filter(todo => !todo.completed);
    saveLists();
    renderList();
    playSound('click');
    
    // Add delete animation
    todoList.style.animation = 'todoComplete 0.3s ease-in-out';
    setTimeout(() => {
      todoList.style.animation = '';
    }, 300);
  }
}

// Render the current list
function renderList() {
  todoList.innerHTML = '';
  const todos = lists[currentListIndex];
  
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      saveLists();
      renderList();
      if (checkbox.checked) {
        playSound('tick');
        // Add completion animation
        li.style.animation = 'todoComplete 0.5s ease-in-out';
        setTimeout(() => {
          li.style.animation = '';
        }, 500);
      }
    });
    
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;
    
    li.appendChild(checkbox);
    li.appendChild(span);
    todoList.appendChild(li);
  });
  
  // Disable add if 15 items
  addBtn.disabled = todos.length >= 15;
  todoInput.disabled = todos.length >= 15;
  listIndicator.textContent = `List ${currentListIndex + 1}`;
  prevListBtn.disabled = currentListIndex === 0;
  
  // Update delete button states
  if (deleteAllBtn) {
    deleteAllBtn.disabled = todos.length === 0;
    console.log('Delete all button disabled:', todos.length === 0);
  }
  if (deleteCompletedBtn) {
    const completedCount = todos.filter(todo => todo.completed).length;
    deleteCompletedBtn.disabled = completedCount === 0;
    console.log('Delete completed button disabled:', completedCount === 0);
  }
}

// Add new todo
addBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  if (!text) return;
  if (lists[currentListIndex].length >= 15) return;
  
  lists[currentListIndex].push({ text, completed: false });
  todoInput.value = '';
  saveLists();
  renderList();
  playSound('click');
  
  // Add new todo animation
  const newTodo = todoList.lastElementChild;
  if (newTodo) {
    newTodo.style.animation = 'todoAdd 0.3s ease-out';
    setTimeout(() => {
      newTodo.style.animation = '';
    }, 300);
  }
});

// Enter key to add todo
todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

// Create new list
newListBtn.addEventListener('click', () => {
  if (currentListIndex < lists.length - 1) {
    lists = lists.slice(0, currentListIndex + 1);
  }
  lists.push([]);
  currentListIndex++;
  saveLists();
  renderList();
  playSound('click');
});

// Go to previous list
prevListBtn.addEventListener('click', () => {
  if (currentListIndex > 0) {
    currentListIndex--;
    renderList();
    playSound('click');
  }
});

// Delete button event listeners
if (deleteAllBtn) {
  console.log('Adding delete all event listener');
  deleteAllBtn.addEventListener('click', deleteAllTodos);
}

if (deleteCompletedBtn) {
  console.log('Adding delete completed event listener');
  deleteCompletedBtn.addEventListener('click', deleteCompletedTodos);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing...');
  
  // Check if all elements exist
  if (!checkElements()) {
    console.error('Some required elements are missing');
    return;
  }
  
  try {
    initializeSounds();
    updateMuteButton();
    renderList();
    playSound('chimes');
    
    // Start keep-alive mechanism
    startKeepAlive();
    
    // Mark as successfully loaded
    window.todoLoaded = true;
    console.log('Todo app initialized successfully');
  } catch (error) {
    console.error('Error initializing todo app:', error);
  }
});

// Add mute button event listener
if (muteBtn) {
  muteBtn.addEventListener('click', toggleMute);
}

// Prevent popup from closing when clicking outside
document.addEventListener('click', (e) => {
  // Keep popup open by preventing event bubbling
  e.stopPropagation();
});

// Prevent popup from closing on blur
window.addEventListener('blur', (e) => {
  // Keep popup open
  e.preventDefault();
  e.stopPropagation();
});

// Clean up when popup is about to close
window.addEventListener('beforeunload', () => {
  stopKeepAlive();
}); 