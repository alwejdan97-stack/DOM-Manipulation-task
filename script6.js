// =========================================================================
// 1. STATE DEFINITIONS & GLOBAL ELEMENT SELECTION
// =========================================================================
// Global array holding active structured tab items
let tabs = [];
// Variable tracking matching ID configurations of active visibility scopes
let activeTabId = null;

const tabBar = document.getElementById("tabBar");
const contentArea = document.getElementById("contentArea");
const addTabBtn = document.getElementById("addTabBtn");
const tabCountDisplay = document.getElementById("tabCount");
const saveFooter = document.getElementById("saveFooter");
const saveContentBtn = document.getElementById("saveContentBtn");

function renderTabs() {
    tabBar.innerHTML = "";
    contentArea.innerHTML = "";

    if (tabs.length === 0) {
        contentArea.innerHTML = "<p style='color:#718093; text-align:center;'>No tabs available. Click 'Add Tab' to create one.</p>";
        tabCountDisplay.textContent = "0";
        saveFooter.classList.add("hidden");
        contentArea.removeAttribute("contenteditable");
        activeTabId = null;
        return;
    }

    tabs.forEach(tab => {
        const tabButton = document.createElement("div");
        tabButton.className = "tab-btn";
        tabButton.setAttribute("data-tab-id", tab.id);

        const tabTitleSpan = document.createElement("span");
        tabTitleSpan.className = "tab-title-text";
        tabTitleSpan.textContent = tab.name;
        tabButton.appendChild(tabTitleSpan);

        const renameBtn = document.createElement("button");
        renameBtn.className = "action-icon-btn rename-btn";
        renameBtn.innerHTML = "&#9998;"; // Pen symbol marker
        renameBtn.title = "Rename Tab";
        tabButton.appendChild(renameBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "action-icon-btn delete-btn";
        deleteBtn.innerHTML = "&#10006;"; // Cross symbol marker
        deleteBtn.title = "Delete Tab";
        tabButton.appendChild(deleteBtn);

        if (tab.id === activeTabId) {
            tabButton.classList.add("active");
        }

        tabBar.appendChild(tabButton);
    });

    const currentActiveTab = tabs.find(t => t.id === activeTabId);
    if (currentActiveTab) {
        contentArea.innerHTML = currentActiveTab.content;
        contentArea.setAttribute("contenteditable", "true");
        saveFooter.classList.remove("hidden");
    }

    tabCountDisplay.textContent = tabs.length;
}

function addTab() {
    const uniqueId = Date.now();
    const defaultIndexNumber = tabs.length + 1;
    
    const newTab = {
        id: uniqueId,
        name: `Tab ${defaultIndexNumber}`,
        content: `<p>Welcome to your new Content Area for <strong>Tab ${defaultIndexNumber}</strong>.</p><ul><li>Modify this rich markup content at will.</li></ul>`
    };

    tabs.push(newTab);
    activeTabId = uniqueId; 

    saveTabs();
    renderTabs();
}

function switchTab(tabId) {
    activeTabId = Number(tabId);
    
    const buttons = tabBar.querySelectorAll(".tab-btn");
    buttons.forEach(btn => {
        const currentBtnId = Number(btn.getAttribute("data-tab-id"));
        if (currentBtnId === activeTabId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    const selectedTab = tabs.find(t => t.id === activeTabId);
    if (selectedTab) {
        contentArea.innerHTML = selectedTab.content;
    }
}

function renameTab(tabId) {
    const targetTab = tabs.find(t => t.id === Number(tabId));
    if (!targetTab) return;

    const userInputName = prompt("Enter a new name for this tab:", targetTab.name);

    if (userInputName === null || userInputName.trim() === "") {
        return;
    }

    targetTab.name = userInputName.trim();
    
    saveTabs();
    renderTabs();}

function deleteTab(tabId) {
    const targetIdParsed = Number(tabId);
    
    const wasActiveTab = (targetIdParsed === activeTabId);

    tabs = tabs.filter(t => t.id !== targetIdParsed);

    if (wasActiveTab && tabs.length > 0) {
        activeTabId = tabs[0].id;
    }

    saveTabs();
    renderTabs();}

function saveCurrentTabContent() {
    const currentActiveTab = tabs.find(t => t.id === activeTabId);
    if (!currentActiveTab) return;

    currentActiveTab.content = contentArea.innerHTML;
    
    saveTabs();
    alert("Content changes saved successfully!");}

function saveTabs() {
    localStorage.setItem("tabsData", JSON.stringify(tabs));
    localStorage.setItem("activeTabId", activeTabId);}

function loadTabs() {
    const rawTabsData = localStorage.getItem("tabsData");
    const rawActiveId = localStorage.getItem("activeTabId");

    if (rawTabsData) {
        tabs = JSON.parse(rawTabsData);
        activeTabId = rawActiveId ? Number(rawActiveId) : (tabs.length > 0 ? tabs[0].id : null);
    } else {

        tabs = [
            {
                id: 1001,
                name: "Home",
                content: "<h2>Welcome Dashboard Portal</h2><p>This workspace supports <strong>Rich HTML Markup content</strong>. Feel free to alter descriptions dynamically.</p>"
            },
            {
                id: 1002,
                name: "Analytics",
                content: "<h2>Analytics Status Report</h2><p>Review metrics tracking pipelines outputs here. System operations operate nominal.</p>"
            }
        ];
        activeTabId = 1001;
    }

    renderTabs();
}


tabBar.addEventListener("click", function(event) {
    const targetElement = event.target;
    
    const parentTabBtn = targetElement.closest(".tab-btn");
    if (!parentTabBtn) return;

    const extractedTabId = parentTabBtn.getAttribute("data-tab-id");

    if (targetElement.classList.contains("rename-btn")) {
        renameTab(extractedTabId);
    } else if (targetElement.classList.contains("delete-btn")) {

        event.stopPropagation();
        deleteTab(extractedTabId);
    } else {
        switchTab(extractedTabId);
    }});

document.addEventListener("DOMContentLoaded", loadTabs);