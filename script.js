// Get query parameters
const urlParams = new URLSearchParams(window.location.search);
const teamSize = urlParams.get('teamSize');
const frequentResults = urlParams.get('frequentResults');
const automation = urlParams.get('automation');
const teamExperience = urlParams.get('teamExperience');
const deadline = urlParams.get('deadline');

// Recommendation Logic
let recommendedStyle = "Structured Cycles"; // Default for new teams
if (teamExperience === "New") {
  recommendedStyle = "Structured Cycles"; // Stays unless overridden
} else if (teamExperience === "Experienced") {
  if (frequentResults === "Yes") {
    if (automation === "Full") {
      recommendedStyle = "Continuous Delivery";
    } else if (automation === "Basic") {
      recommendedStyle = "Fast Results";
    } else {
      recommendedStyle = "Fast Results"; // Default for None with Yes
    }
  } else { // No frequent results
    if (automation === "Full" || automation === "Basic") {
      recommendedStyle = "Flexible Flow";
    } else {
      recommendedStyle = "Structured Cycles"; // None with No
    }
  }
}
// Я видалив рядок, який змінював Flexible Flow на Fast Results,
// щоб стиль залишався Flexible при наявності дедлайну.

document.getElementById('styleName').textContent = recommendedStyle;

// Дані тепер знаходяться всередині JS-файлу
const allBlocks = {
  "Meetings": [
    { "title": "Daily", "description": "Short daily meeting to discuss progress and issues." },
    { "title": "Kickoff", "description": "Initial meeting to align the team." },
    { "title": "Retrospectives", "description": "Meeting to review what went well and what to improve." },
    { "title": "Iteration Planning", "description": "Planning session to define the iteration goals." },
    { "title": "Weeklies", "description": "Weekly alignment meeting for the team." },
    { "title": "Iteration Demo", "description": "Demonstration of completed work in the iteration." },
    { "title": "Iteration Review", "description": "Review of the iteration's outcomes and process." },
    { "title": "Final Demo", "description": "Final demonstration of the project deliverables." },
    { "title": "Backlog Refinement", "description": "Session to refine and prioritize the backlog." },
    { "title": "Async messaging", "description": "Using asynchronous messaging tools for communication." },
    { "title": "Async chatting", "description": "Using chat tools for asynchronous team communication." },
    { "title": "Async Report", "description": "Asynchronous reporting of progress and updates." },
    { "title": "Summary Meeting", "description": "Meeting to summarize project outcomes and next steps." }
  ],
  "Documents": [
    { "title": "Project Charter", "description": "Document outlining project objectives and stakeholders." },
    { "title": "RACI", "description": "Matrix defining roles and responsibilities." },
    { "title": "Test Plan", "description": "Plan detailing testing strategies." },
    { "title": "Autotest Plan", "description": "Plan detailing automated testing strategies." },
    { "title": "Backlog", "description": "List of tasks and features to be completed." }
  ],
  "Tools": [
    { "title": "Basic Automated Tests", "description": "Simple unit tests for code validation." },
    { "title": "Full Automated Tests", "description": "End-to-end tests with CI/CD integration." },
    { "title": "Test Cases", "description": "Detailed test cases for manual or automated testing." },
    { "title": "Autotests", "description": "Automated tests covering various scenarios." },
    { "title": "Regression Tests", "description": "Tests to ensure new changes don’t break existing functionality." },
    { "title": "Final Autotests", "description": "Comprehensive automated tests for final validation." }
  ],
  "Practices": [
    { "title": "Pair Programming", "description": "Two developers working together on the same code." },
    { "title": "Test-Driven Development", "description": "Writing tests before code implementation." },
    { "title": "Basic Autotests", "description": "Fundamental automated tests for core functionality." },
    { "title": "Solution Regression", "description": "Comprehensive regression testing of the entire solution." },
    { "title": "Code Refactoring", "description": "Improving code structure without changing its behavior." },
    { "title": "Lessons Learned", "description": "Documenting insights and improvements for future projects." },
    { "title": "CI/CD", "description": "Continuous Integration and Continuous Deployment practices." },
    { "title": "Value Stream Map", "description": "Visualizing the flow of value to identify bottlenecks." }  
  ],
  "Metrics": [
    { "title": "Velocity", "description": "Measure of the amount of work a team completes in an iteration." },
    { "title": "Burndown Chart", "description": "Visual representation of work remaining over time." },
    { "title": "Burnup Chart", "description": "Visual representation of work completed over time." },
    { "title": "Throughput", "description": "Number of tasks completed in a given time period." },
    { "title": "Cycle Time", "description": "Time taken to complete a task from start to finish." },
    { "title": "Sprint Goal Success Rate", "description": "Percentage of sprint goals achieved." },
    { "title": "Average Velocity", "description": "Average amount of work completed per iteration." },
    { "title": "Release Success", "description": "Measure of the success rate of releases." },
    { "title": "NPS", "description": "Net Promoter Score to measure customer satisfaction." }
  ],
  "Duration": [
    { "title": "Iteration (3-4 weeks)", "description": "Standard iteration length of 2 to 4 weeks." },
    { "title": "Iteration (1-2 weeks)", "description": "Shorter iteration length of 1 to 2 weeks." },
    { "title": "Flow (WIP limit = )", "description": "Continuous flow with a work-in-progress limit to be defined." }
  ]
};

const allLayouts = {
  "Structured Cycles": {
    "start": [
      { "category": "Meetings", "blocks": ["Kickoff"] },
      { "category": "Documents", "blocks": ["Project Charter", "RACI", "Test Plan"] },
      { "category": "Tools", "blocks": [] },
      { "category": "Practices", "blocks": [] }
    ],
    "work": [
      { "category": "Duration", "blocks": ["Iteration (3-4 weeks)"] },
      { "category": "Meetings", "blocks": ["Daily", "Iteration Retrospectives"] },
      { "category": "Tools", "blocks": ["Test Cases", "Regression Tests"] },
      { "category": "Practices", "blocks": ["Pair Programming"] },
      { "category": "Metrics", "blocks": ["Velocity", "Burndown Chart"] }
    ],
    "finish": [
      { "category": "Meetings", "blocks": ["Final Demo"] },
      { "category": "Documents", "blocks": [] },
      { "category": "Tools", "blocks": [] },
      { "category": "Practices", "blocks": ["Solution Regression", "Code Refactoring", "Lessons Learned"] },
      { "category": "Metrics", "blocks": ["NPS"] }
    ]
  },
  "Fast Results": {
    "start": [
      { "category": "Meetings", "blocks": ["Kickoff"] },
      { "category": "Documents", "blocks": ["Project Charter", "RACI", "Backlog", "Autotest Plan"] },
      { "category": "Tools", "blocks": [] },
      { "category": "Practices", "blocks": [] }
    ],
    "work": [
      { "category": "Duration", "blocks": ["Iteration (1-2 weeks)"] },
      { "category": "Meetings", "blocks": ["Daily", "Retrospectives", "Iteration Demo"] },
      { "category": "Documents", "blocks": [] },
      { "category": "Tools", "blocks": ["Basic Automated Tests", "Regression Tests"] },
      { "category": "Practices", "blocks": ["Test-Driven Development"] },
      { "category": "Metrics", "blocks": ["Velocity", "Burndown Chart", "Release Success"] }
    ],
    "finish": [
      { "category": "Meetings", "blocks": ["Final Demo"] },
      { "category": "Documents", "blocks": [] },
      { "category": "Tools", "blocks": ["Final Autotests"] },
      { "category": "Practices", "blocks": ["Code Refactoring", "Lessons Learned"] }
    ]
  },
  "Continuous Delivery": {
    "start": [
      { "category": "Meetings", "blocks": ["Async messaging"] },
      { "category": "Documents", "blocks": ["Project Charter", "RACI", "Backlog", "Autotest Plan"] },
      { "category": "Tools", "blocks": ["Full Automated Tests"] },
      { "category": "Practices", "blocks": [] }
    ],
    "work": [
      { "category": "Duration", "blocks": ["Flow (WIP limit = )"] },
      { "category": "Meetings", "blocks": ["Async chatting"] },
      { "category": "Documents", "blocks": [] },
      { "category": "Tools", "blocks": ["Autotests","Value Stream Map"] },
      { "category": "Practices", "blocks": ["Test-Driven Development", "Pair Programming", "CI/CD"] },
      { "category": "Metrics", "blocks": ["Cycle Time", "Throughput"] }
    ],
    "finish": [
      { "category": "Meetings", "blocks": ["Async Report"] },
      { "category": "Documents", "blocks": [] },
      { "category": "Tools", "blocks": ["Final Autotests"] },
      { "category": "Practices", "blocks": ["Code refactoring", "Lessons Learned"] }
    ]
  },
  "Flexible Flow": {
    "start": [
      { "category": "Meetings", "blocks": ["Kickoff"] },
      { "category": "Documents", "blocks": ["Project Charter", "RACI", "Backlog", "Autotest Plan"] },
      { "category": "Tools", "blocks": [] },
      { "category": "Practices", "blocks": [] }
    ],
    "work": [
      { "category": "Duration", "blocks": ["Flow (WIP limit = )"] },
      { "category": "Meetings", "blocks": ["Weeklies"] },
      { "category": "Documents", "blocks": [] },
      { "category": "Tools", "blocks": ["Autotests","Value Stream Map"] },
      { "category": "Practices", "blocks": ["Test-Driven Development", "CI/CD"] },
      { "category": "Metrics", "blocks": ["Cycle Time", "Throughput"] }
    ],
    "finish": [
      { "category": "Meetings", "blocks": ["Summary Meeting"] },
      { "category": "Documents", "blocks": ["Project Charter"] },
      { "category": "Tools", "blocks": ["Final Autotests"] },
      { "category": "Practices", "blocks": ["Code refactoring", "Lessons Learned"] }
    ]
  }
};

// Загальна функція ініціалізації додатку
function initializeApp() {
    const panelSections = document.getElementById('panelSections');
    for (const category in allBlocks) {
        const section = document.createElement('div');
        section.className = 'panel-section';
        section.id = `panel${category}`;
        section.innerHTML = `<h4>${category}</h4><div class="cards" id="panel${category}Cards"></div>`;
        panelSections.appendChild(section);
        const cardsContainer = section.querySelector('.cards');
        // Додаємо атрибут data-category до контейнера
        cardsContainer.dataset.category = category;
        allBlocks[category].forEach(block => {
            const card = document.createElement('div');
            card.className = 'card';
            card.draggable = true;
            card.dataset.category = category;
            card.dataset.title = block.title;
            card.dataset.description = block.description || '';
            card.textContent = block.title;
            addCardEventListeners(card);
            cardsContainer.appendChild(card);
        });
    }

    // Викликаємо функцію з потрібним підходом
    populateColumns(recommendedStyle);
    updateDropZones();
    // Виділяємо блоки після завантаження
    highlightUsedBlocks();
}

function saveBlocks() {
  localStorage.setItem('customBlocks', JSON.stringify(allBlocks));
}

function downloadBlocks() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allBlocks, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "blocks.json");
  document.body.appendChild(downloadAnchorNode); // Required for Firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

// Загальна функція для заповнення колонок
function populateColumns(styleName) {
  const columns = {
    'start': document.getElementById('startColumn'),
    'work': document.getElementById('workColumn'),
    'finish': document.getElementById('finishColumn')
  };

  const selectedLayout = allLayouts[styleName];

  if (!selectedLayout) {
    console.error(`Layout for style "${styleName}" not found.`);
    return;
  }

  Object.values(columns).forEach(column => {
    column.querySelectorAll('.section').forEach(section => section.remove());
  });

  for (const [columnId, column] of Object.entries(columns)) {
    selectedLayout[columnId].forEach(section => {
      const sectionId = `${columnId}${section.category.charAt(0).toUpperCase() + section.category.slice(1)}`;
      let sectionElement = column.querySelector(`#${sectionId}`);
      if (!sectionElement) {
        sectionElement = document.createElement('div');
        sectionElement.className = 'section';
        sectionElement.id = sectionId;
        sectionElement.innerHTML = `<h3>${section.category}</h3><div class="cards" id="${sectionId}Cards"></div>`;
        column.insertBefore(sectionElement, column.querySelector('.add-section'));
      }
      const cardsContainer = sectionElement.querySelector('.cards');
      // Додаємо атрибут data-category до контейнера
      cardsContainer.dataset.category = section.category;
      section.blocks.forEach(blockTitle => {
        const blockData = allBlocks[section.category].find(b => b.title === blockTitle);
        if (blockData) {
          const card = document.createElement('div');
          card.className = 'card';
          card.draggable = true;
          card.dataset.category = section.category;
          card.dataset.title = blockTitle;
          card.dataset.description = blockData.description;

          // Додаємо кнопку видалення
          const deleteBtn = document.createElement('span');
          deleteBtn.className = 'delete-card';
          deleteBtn.textContent = '×';
          deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Зупиняємо розповсюдження події, щоб не спрацьовували інші кліки на картці
            card.remove(); // Видаляємо картку
            highlightUsedBlocks(); // Оновлюємо виділення після видалення
          });

          card.textContent = blockTitle;
          card.appendChild(deleteBtn);
          addCardEventListeners(card);
          cardsContainer.appendChild(card);
        }
      });
    });
  }
}

// Функція для підсвічування вже використаних блоків
function highlightUsedBlocks() {
    // Спочатку знімаємо всі попередні підсвічування
    document.querySelectorAll('#panelSections .card').forEach(card => {
        card.classList.remove('used-block');
    });

    const usedBlocks = new Set();
    document.querySelectorAll('#startColumn .card, #workColumn .card, #finishColumn .card').forEach(card => {
        const key = `${card.dataset.category}-${card.dataset.title}`;
        usedBlocks.add(key);
    });

    document.querySelectorAll('#panelSections .card').forEach(card => {
        const key = `${card.dataset.category}-${card.dataset.title}`;
        if (usedBlocks.has(key)) {
            card.classList.add('used-block');
        }
    });
}

// Save current state
function saveState() {
  const saveName = document.getElementById('saveName').value.trim();
  if (!saveName) {
    alert('Please enter a save name!');
    return;
  }
  const state = {
    columns: {}
  };
  ['start', 'work', 'finish'].forEach(columnId => {
    const column = document.getElementById(`${columnId}Column`);
    state.columns[columnId] = {};
    column.querySelectorAll('.section').forEach(section => {
      const category = section.id.replace(`${columnId}`, '').toLowerCase();
      state.columns[columnId][category] = Array.from(section.querySelectorAll('.card')).map(card => ({
        title: card.dataset.title,
        category: card.dataset.category
      }));
    });
  });
  const saves = JSON.parse(localStorage.getItem('saves') || '{}');
  saves[saveName] = state;
  localStorage.setItem('saves', JSON.stringify(saves));
  alert('Saved successfully!');
  document.getElementById('saveName').value = '';
}

// Load saved state
function loadState() {
  const saveName = document.getElementById('saveName').value.trim();
  if (!saveName) {
    alert('Please enter a save name!');
    return;
  }
  const saves = JSON.parse(localStorage.getItem('saves') || '{}');
  const state = saves[saveName];
  if (!state) {
    alert('Save not found!');
    return;
  }
  ['start', 'work', 'finish'].forEach(columnId => {
    const column = document.getElementById(`${columnId}Column`);
    column.querySelectorAll('.section').forEach(section => section.remove());
    
    for (const [category, cards] of Object.entries(state.columns[columnId])) {
      const sectionId = `${columnId}${category.charAt(0).toUpperCase() + category.slice(1)}`;
      const sectionElement = document.createElement('div');
      sectionElement.className = 'section';
      sectionElement.id = sectionId;
      sectionElement.innerHTML = `<h3>${category}</h3><div class="cards" id="${sectionId}Cards"></div>`;
      column.insertBefore(sectionElement, column.querySelector('.add-section'));
      const cardsContainer = sectionElement.querySelector('.cards');
      // Додаємо атрибут data-category до контейнера
      cardsContainer.dataset.category = category;
      
      cards.forEach(cardData => {
        const card = document.createElement('div');
        const blockData = allBlocks[cardData.category]?.find(b => b.title === cardData.title);
        card.className = 'card';
        card.draggable = true;
        card.dataset.category = cardData.category;
        card.dataset.title = cardData.title;
        card.dataset.description = blockData ? blockData.description : '';
        
        // Додаємо кнопку видалення
        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete-card';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          card.remove();
          highlightUsedBlocks(); // Оновлюємо виділення після видалення
        });

        card.textContent = cardData.title;
        card.appendChild(deleteBtn);
        addCardEventListeners(card);
        cardsContainer.appendChild(card);
      });
    }
  });
  updateDropZones();
  alert('Loaded successfully!');
  document.getElementById('saveName').value = '';
  // Оновлюємо виділення після завантаження стану
  highlightUsedBlocks();
}

// Function to add drag and hover event listeners to a card
function addCardEventListeners(card) {
  card.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      title: card.dataset.title,
      category: card.dataset.category,
      description: card.dataset.description
    }));
  });
  let timeoutId;
  card.addEventListener('mouseover', () => {
    if (card.dataset.description) {
      timeoutId = setTimeout(() => {
        const descriptionPopup = document.getElementById('descriptionPopup');
        const descriptionText = document.getElementById('descriptionText');
        descriptionText.textContent = card.dataset.description;
        
        descriptionPopup.style.visibility = 'hidden';
        descriptionPopup.style.display = 'block';

        const rect = card.getBoundingClientRect();
        const containerRect = document.querySelector('.container').getBoundingClientRect();
        const popupWidth = descriptionPopup.offsetWidth;
        const popupHeight = descriptionPopup.offsetHeight;
        
        let leftPosition = rect.left - containerRect.left;
        let topPosition = rect.bottom - containerRect.top + 5;
        
        if (rect.left - popupWidth < 0) {
          leftPosition = rect.left - containerRect.left; 
        } else if (rect.right + popupWidth > window.innerWidth) {
          leftPosition = rect.right - containerRect.left - popupWidth;
        }

        if (rect.bottom + popupHeight > window.innerHeight) {
          topPosition = rect.top - containerRect.top - popupHeight - 5;
        }

        descriptionPopup.style.left = `${leftPosition}px`;
        descriptionPopup.style.top = `${topPosition}px`;
        
        descriptionPopup.style.visibility = 'visible';

      }, 500);
    }
  });
  card.addEventListener('mouseout', () => {
    clearTimeout(timeoutId);
    const descriptionPopup = document.getElementById('descriptionPopup');
    descriptionPopup.style.display = 'none';
    descriptionPopup.style.visibility = 'hidden';
  });
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  
  const popup = document.getElementById('addSectionPopup');
  const confirmAddSection = document.getElementById('confirmAddSection');
  const cancelAddSection = document = document.getElementById('cancelAddSection');
  const sectionNameInput = document.getElementById('sectionName');

  document.querySelector('.add-section-panel').addEventListener('click', function() {
    popup.style.display = 'block';
  });

  confirmAddSection.addEventListener('click', function() {
    const newSectionName = sectionNameInput.value.trim();
    if (newSectionName && !allBlocks.hasOwnProperty(newSectionName)) {
      allBlocks[newSectionName] = [];
      saveBlocks();

      const newSection = document.createElement('div');
      newSection.className = 'panel-section';
      newSection.id = `panel${newSectionName}`;
      newSection.innerHTML = `<h4>${newSectionName}</h4><div class="cards" id="panel${newSectionName}Cards"></div>`;
      document.getElementById('panelSections').appendChild(newSection);
      updateDropZones();
      popup.style.display = 'none';
      sectionNameInput.value = '';

      if (confirm('New section added. Download updated blocks.json to replace the original?')) {
        downloadBlocks();
        alert('Please save the downloaded blocks.json file and replace the original in your project folder.');
      }
    } else if (allBlocks.hasOwnProperty(newSectionName)) {
      alert('This section already exists!');
      sectionNameInput.value = '';
    }
  });

  cancelAddSection.addEventListener('click', function() {
    popup.style.display = 'none';
    sectionNameInput.value = '';
  });

  document.getElementById('saveButton').addEventListener('click', saveState);
  document.getElementById('loadButton').addEventListener('click', loadState);
});

// Function to update dropZones (call after adding new sections)
function updateDropZones() {
  const dropZones = document.querySelectorAll('.cards');
  dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => e.preventDefault());
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData('text'));
      const draggedCategory = data.category;
      const dropZoneCategory = zone.dataset.category;

      // Перевіряємо, чи категорії збігаються перед тим, як дозволити перетягування
      if (draggedCategory !== dropZoneCategory) {
        return; // Виходимо, якщо категорії не збігаються
      }
      
      const newCard = document.createElement('div');
      newCard.className = 'card';
      newCard.textContent = data.title;
      newCard.dataset.category = data.category;
      newCard.dataset.title = data.title;
      newCard.dataset.description = data.description;
      
      // Додаємо кнопку видалення
      const deleteBtn = document.createElement('span');
      deleteBtn.className = 'delete-card';
      deleteBtn.textContent = '×';
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        newCard.remove();
        highlightUsedBlocks(); // Оновлюємо виділення після видалення
      });
      newCard.textContent = data.title;
      newCard.appendChild(deleteBtn);
      
      addCardEventListeners(newCard);
      zone.appendChild(newCard);
      highlightUsedBlocks(); // Оновлюємо виділення після перетягування
    });
  });
}