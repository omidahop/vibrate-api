// ==================== APPLICATION CONSTANTS ====================
const APP_CONFIG = {
    version: '3.0.0',
    
    // Equipment data
    equipments: [
        { id: 'GB-cp48A', name: 'گیربکس کمپرسور 48A', code: 'GB-cp 48A', icon: 'fas fa-cog', color: '#8b5cf6' },
        { id: 'CP-cp48A', name: 'کمپرسور 48A', code: 'CP-cp 48A', icon: 'fas fa-compress', color: '#06b6d4' },
        { id: 'GB-cp48B', name: 'گیربکس کمپرسور 48B', code: 'GB-cp 48B', icon: 'fas fa-cog', color: '#8b5cf6' },
        { id: 'CP-cp48B', name: 'کمپرسور 48B', code: 'CP-cp 48B', icon: 'fas fa-compress', color: '#06b6d4' },
        { id: 'GB-cp51', name: 'گیربکس کمپرسور 51', code: 'GB-cp 51', icon: 'fas fa-cog', color: '#8b5cf6' },
        { id: 'CP-cp51', name: 'کمپرسور 51', code: 'CP-cp 51', icon: 'fas fa-compress', color: '#06b6d4' },
        { id: 'GB-cp71', name: 'گیربکس کمپرسور 71', code: 'GB-cp 71', icon: 'fas fa-cog', color: '#8b5cf6' },
        { id: 'CP-cp71', name: 'کمپرسور 71', code: 'CP-cp 71', icon: 'fas fa-compress', color: '#06b6d4' },
        { id: 'CP-cpSGC', name: 'کمپرسور سیل گس', code: 'CP-cp SGC', icon: 'fas fa-compress', color: '#06b6d4' },
        { id: 'FN-fnESF', name: 'فن استک', code: 'FN-fn ESF', icon: 'fas fa-fan', color: '#10b981' },
        { id: 'FN-fnAUX', name: 'فن اگزیلاری', code: 'FN-fn AUX', icon: 'fas fa-fan', color: '#10b981' },
        { id: 'FN-fnMAB', name: 'فن هوای اصلی', code: 'FN-fn MAB', icon: 'fas fa-fan', color: '#10b981' }
    ],
    
    // Parameter data
    parameters: [
        { id: 'V1', name: 'سرعت عمودی متصل', code: 'V1', icon: 'fas fa-arrow-up', color: '#ec4899', type: 'velocity', category: 'connected' },
        { id: 'GV1', name: 'شتاب عمودی متصل', code: 'GV1', icon: 'fas fa-arrow-up', color: '#f59e0b', type: 'acceleration', category: 'connected' },
        { id: 'H1', name: 'سرعت افقی متصل', code: 'H1', icon: 'fas fa-arrow-right', color: '#ec4899', type: 'velocity', category: 'connected' },
        { id: 'GH1', name: 'شتاب افقی متصل', code: 'GH1', icon: 'fas fa-arrow-right', color: '#f59e0b', type: 'acceleration', category: 'connected' },
        { id: 'A1', name: 'سرعت محوری متصل', code: 'A1', icon: 'fas fa-arrows-alt', color: '#ec4899', type: 'velocity', category: 'connected' },
        { id: 'GA1', name: 'شتاب محوری متصل', code: 'GA1', icon: 'fas fa-arrows-alt', color: '#f59e0b', type: 'acceleration', category: 'connected' },
        { id: 'V2', name: 'سرعت عمودی آزاد', code: 'V2', icon: 'fas fa-arrow-up', color: '#6366f1', type: 'velocity', category: 'free' },
        { id: 'GV2', name: 'شتاب عمودی آزاد', code: 'GV2', icon: 'fas fa-arrow-up', color: '#8b5cf6', type: 'acceleration', category: 'free' },
        { id: 'H2', name: 'سرعت افقی آزاد', code: 'H2', icon: 'fas fa-arrow-right', color: '#6366f1', type: 'velocity', category: 'free' },
        { id: 'GH2', name: 'شتاب افقی آزاد', code: 'GH2', icon: 'fas fa-arrow-right', color: '#8b5cf6', type: 'acceleration', category: 'free' },
        { id: 'A2', name: 'سرعت محوری آزاد', code: 'A2', icon: 'fas fa-arrows-alt', color: '#6366f1', type: 'velocity', category: 'free' },
        { id: 'GA2', name: 'شتاب محوری آزاد', code: 'GA2', icon: 'fas fa-arrows-alt', color: '#8b5cf6', type: 'acceleration', category: 'free' }
    ],
    
    // Units
    units: [
        { id: 'DRI1', name: 'واحد احیا مستقیم 1', code: 'DRI 1', color: '#3b82f6' },
        { id: 'DRI2', name: 'واحد احیا مستقیم 2', code: 'DRI 2', color: '#ef4444' }
    ],

    // Random colors for slideshow values
    randomColors: [
        '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', 
        '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
        '#14b8a6', '#f43f5e', '#a855f7', '#22d3ee', '#eab308',
        '#ef4444', '#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6'
    ]
};

// ==================== GLOBAL VARIABLES ====================
let currentSettings = {
    theme: 'light',
    primaryColor: '#2563eb',
    dri1Color: '#3b82f6',
    dri2Color: '#ef4444',
    // Equipment priority for slideshow (1-24)
    equipmentPriority: {},
    // Parameter priority for slideshow (1-12)
    parameterPriority: {},
    // Parameter mode: 'velocity-first' or 'custom'
    parameterMode: 'velocity-first',
    // Analysis settings
    analysisThreshold: 20, // percentage
    analysisTimeRange: 7, // days
    analysisComparisonDays: 1 // how many days back to compare
};

let currentUser = {
    name: 'کاربر میهمان',
    role: 'اپراتور تجهیزات',
    avatar: null
};

let dataEntryState = {
    mode: 'new', // 'new' or 'edit'
    selectedUnit: null,
    selectedDate: null,
    currentEquipmentIndex: 0,
    currentParameterIndex: 0,
    currentData: {},
    dateData: {},
    // Edit mode specific
    editSelectedUnit: null,
    editSelectedDate: null,
    editSelectedEquipment: null,
    editSelectedParameter: null,
    editCurrentValue: null
};

let slideshowState = {
    isRunning: false,
    isPaused: false,
    currentDate: null,
    currentEquipmentIndex: 0,
    currentParameterIndex: 0,
    interval: null,
    speed: 3000,
    data: {},
    isFullscreen: false,
    currentValueColor: '#3b82f6'
};

let chartInstance = null;

// ==================== UTILITY FUNCTIONS ====================
function getCurrentDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
}

function getRandomColor() {
    return APP_CONFIG.randomColors[Math.floor(Math.random() * APP_CONFIG.randomColors.length)];
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function validateValue(value) {
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0 && num <= 20;
}

// ==================== DATABASE FUNCTIONS (Updated to use API) ====================
async function saveDataToDB(data) {
    try {
        return await DatabaseAPI.saveDataToDB(data);
    } catch (error) {
        console.error('Error saving data:', error);
        throw error;
    }
}

async function getDataFromDB(filters = {}) {
    try {
        return await DatabaseAPI.getDataFromDB(filters);
    } catch (error) {
        console.error('Error getting data:', error);
        throw error;
    }
}

async function getLastUserFromDB() {
    try {
        return await DatabaseAPI.getLastUserFromDB();
    } catch (error) {
        console.error('Error getting last user:', error);
        return null;
    }
}

async function saveSettingsToDB(settings) {
    try {
        return await DatabaseAPI.saveSettingsToDB(settings);
    } catch (error) {
        console.error('Error saving settings:', error);
        throw error;
    }
}

async function getSettingsFromDB() {
    try {
        return await DatabaseAPI.getSettingsFromDB();
    } catch (error) {
        console.error('Error getting settings:', error);
        throw error;
    }
}

// ==================== AUTHENTICATION ====================
function showLoginModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.classList.add('active');
    document.getElementById('loginUsername').focus();
    
    // Hide main content
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.querySelector('.header').style.display = 'none';
}

function hideLoginModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.classList.remove('active');
    
    // Show main content
    document.querySelector('.header').style.display = 'block';
    document.getElementById('data-entry').style.display = 'block';
}

async function performLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    
    if (!username || !password) {
        errorDiv.textContent = 'لطفاً نام کاربری و رمز عبور را وارد کنید';
        errorDiv.classList.remove('d-none');
        return;
    }
    
    // Show loading
    const loginButton = document.querySelector('#loginModal .btn-success');
    const originalText = loginButton.innerHTML;
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ورود...';
    loginButton.disabled = true;
    
    try {
        const result = await DatabaseAPI.login(username, password);
        
        if (result.success) {
            currentUser.name = result.user.fullName || result.user.username;
            currentUser.role = result.user.role;
            
            hideLoginModal();
            updateUserDisplay();
            showNotification('با موفقیت وارد شدید', 'success');
            
            // Initialize app after login
            await initializeAfterLogin();
        } else {
            errorDiv.textContent = result.message;
            errorDiv.classList.remove('d-none');
        }
    } catch (error) {
        console.error('Login error:', error);
        errorDiv.textContent = 'خطا در ورود به سیستم';
        errorDiv.classList.remove('d-none');
    } finally {
        loginButton.innerHTML = originalText;
        loginButton.disabled = false;
    }
}

function logout() {
    if (confirm('آیا می‌خواهید از سیستم خارج شوید؟')) {
        DatabaseAPI.logout();
    }
}

// ==================== PRIORITY FUNCTIONS ====================
function getEquipmentByPriority() {
    if (Object.keys(currentSettings.equipmentPriority).length > 0) {
        return Object.entries(currentSettings.equipmentPriority)
            .sort(([,a], [,b]) => a - b)
            .map(([id]) => {
                // Handle both single equipment and unit-specific equipment
                const baseId = id.replace('_DRI1', '').replace('_DRI2', '');
                const equipment = APP_CONFIG.equipments.find(e => e.id === baseId);
                if (equipment) {
                    return {
                        ...equipment,
                        unit: id.includes('_DRI1') ? 'DRI1' : id.includes('_DRI2') ? 'DRI2' : null,
                        priorityId: id
                    };
                }
                return null;
            })
            .filter(Boolean);
    }
    
    return APP_CONFIG.equipments;
}

function getParametersByPriority() {
    if (currentSettings.parameterMode === 'velocity-first') {
        const velocityParams = APP_CONFIG.parameters.filter(p => p.type === 'velocity');
        const accelerationParams = APP_CONFIG.parameters.filter(p => p.type === 'acceleration');
        return [...velocityParams, ...accelerationParams];
    } else if (currentSettings.parameterMode === 'custom' && Object.keys(currentSettings.parameterPriority).length > 0) {
        return Object.entries(currentSettings.parameterPriority)
            .sort(([,a], [,b]) => a - b)
            .map(([id]) => APP_CONFIG.parameters.find(p => p.id === id))
            .filter(Boolean);
    }
    
    return APP_CONFIG.parameters;
}

function initializeDefaultPriorities() {
    if (Object.keys(currentSettings.equipmentPriority).length === 0) {
        // Initialize 24 equipment priorities (12 equipment × 2 units)
        let priority = 1;
        ['DRI1', 'DRI2'].forEach(unit => {
            APP_CONFIG.equipments.forEach(equipment => {
                currentSettings.equipmentPriority[`${equipment.id}_${unit}`] = priority++;
            });
        });
    }
    
    if (Object.keys(currentSettings.parameterPriority).length === 0) {
        APP_CONFIG.parameters.forEach((parameter, index) => {
            currentSettings.parameterPriority[parameter.id] = index + 1;
        });
    }
}

// ==================== THEME FUNCTIONS ====================
function toggleTheme() {
    currentSettings.theme = currentSettings.theme === 'light' ? 'dark' : 'light';
    applyTheme();
    updateThemeIcon();
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentSettings.theme);
    
    const root = document.documentElement;
    root.style.setProperty('--primary-color', currentSettings.primaryColor);
    root.style.setProperty('--dri1-color', currentSettings.dri1Color);
    root.style.setProperty('--dri2-color', currentSettings.dri2Color);
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        themeIcon.className = currentSettings.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ==================== NAVIGATION FUNCTIONS ====================
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    document.getElementById(sectionId).classList.add('active');
    
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    switch(sectionId) {
        case 'data-entry':
            initDataEntry();
            break;
        case 'view-data':
            initViewData();
            break;
        case 'charts':
            initCharts();
            break;
        case 'analysis':
            initAnalysis();
            break;
        case 'slideshow':
            initSlideshow();
            break;
        case 'database':
            initDatabase();
            break;
        case 'settings':
            initSettings();
            break;
    }
}

// ==================== USER MANAGEMENT FUNCTIONS ====================
function showUserModal() {
    const user = DatabaseAPI.getCurrentUser();
    document.getElementById('userNameInput').value = user ? user.fullName || user.username : '';
    document.getElementById('userRole').value = currentUser.role;
    showModal('userModal');
}

async function saveUser() {
    const name = document.getElementById('userNameInput').value.trim();
    const role = document.getElementById('userRole').value;
    
    if (!name) {
        showNotification('لطفاً نام کاربری را وارد کنید', 'error');
        return;
    }
    
    // For now, just update local display
    currentUser.name = name;
    currentUser.role = role;
    
    updateUserDisplay();
    closeModal('userModal');
    showNotification('اطلاعات کاربر بروزرسانی شد', 'success');
}

function updateUserDisplay() {
    // Update main user display
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = currentUser.name;
    }
    
    // Update user displays in view sections
    const userDisplayElements = [
        'currentUserDisplay',
        'currentUserDisplayCharts',
        'currentUserDisplayAnalysis'
    ];
    
    userDisplayElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = currentUser.name;
        }
    });
    
    const avatar = document.getElementById('userAvatar');
    if (avatar) {
        if (currentUser.name !== 'کاربر میهمان') {
            avatar.textContent = currentUser.name.charAt(0).toUpperCase();
        } else {
            avatar.innerHTML = '<i class="fas fa-user"></i>';
        }
    }
}

// ==================== DATA ENTRY FUNCTIONS ====================
function switchDataEntryMode(mode) {
    dataEntryState.mode = mode;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${mode}EntryTab`).classList.add('active');
    
    // Toggle sections
    if (mode === 'new') {
        document.getElementById('newEntryMode').classList.remove('d-none');
        document.getElementById('editMode').classList.add('d-none');
    } else {
        document.getElementById('newEntryMode').classList.add('d-none');
        document.getElementById('editMode').classList.remove('d-none');
    }
    
    // Reset states
    resetDataEntryState();
}

function resetDataEntryState() {
    // Reset unit selections
    document.querySelectorAll('.unit-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('.equipment-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('.parameter-card').forEach(card => card.classList.remove('selected'));
    
    // Hide sections
    document.getElementById('entryHeader').classList.add('d-none');
    document.getElementById('inputArea').classList.add('d-none');
    document.getElementById('newEntryControls').classList.add('d-none');
    document.getElementById('editEquipmentSection').classList.add('d-none');
    document.getElementById('editParameterSection').classList.add('d-none');
    document.getElementById('editInputArea').classList.add('d-none');
    document.getElementById('editControls').classList.add('d-none');
    
    // Reset state
    dataEntryState.selectedUnit = null;
    dataEntryState.selectedDate = null;
    dataEntryState.currentEquipmentIndex = 0;
    dataEntryState.currentParameterIndex = 0;
    dataEntryState.dateData = {};
    dataEntryState.currentData = {};
    dataEntryState.editSelectedUnit = null;
    dataEntryState.editSelectedDate = null;
    dataEntryState.editSelectedEquipment = null;
    dataEntryState.editSelectedParameter = null;
    dataEntryState.editCurrentValue = null;
    
    // Reset date inputs
    document.getElementById('entryDateInput').value = getCurrentDate();
    document.getElementById('editDateInput').value = getCurrentDate();
}

async function setNextIncompletePosition() {
    const equipments = APP_CONFIG.equipments;
    const parameters = APP_CONFIG.parameters;
    
    // Find first incomplete equipment
    for (let i = 0; i < equipments.length; i++) {
        const equipment = equipments[i];
        const equipmentData = dataEntryState.dateData[equipment.id];
        
        if (!equipmentData) {
            // Equipment not started
            dataEntryState.currentEquipmentIndex = i;
            dataEntryState.currentParameterIndex = 0;
            return;
        }
        
        // Check if equipment is complete
        const validParams = parameters.filter(param => 
            equipmentData[param.id] !== undefined && 
            equipmentData[param.id] !== null && 
            equipmentData[param.id] !== '' &&
                        !isNaN(equipmentData[param.id])
        );
        
        if (validParams.length < parameters.length) {
            // Equipment incomplete, find next parameter
            dataEntryState.currentEquipmentIndex = i;
            dataEntryState.currentParameterIndex = validParams.length;
            return;
        }
    }
    
    // All equipment completed
    dataEntryState.currentEquipmentIndex = 0;
    dataEntryState.currentParameterIndex = 0;
}

function showEntryInterface(unitId) {
    // Update unit button styles
    document.querySelectorAll('.unit-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelector(`.unit-btn.${unitId.toLowerCase()}`).classList.add('selected');
    
    // Show entry interface
    const entryHeader = document.getElementById('entryHeader');
    entryHeader.classList.remove('d-none');
    entryHeader.className = `data-entry-header ${unitId.toLowerCase()}`;
    
    document.getElementById('inputArea').classList.remove('d-none');
    document.getElementById('newEntryControls').classList.remove('d-none');
    
    // Update current display
    updateCurrentDisplay();
    
    // Focus on input
    setTimeout(() => {
        document.getElementById('dataInput').focus();
    }, 100);
}

async function selectUnit(unitId) {
    const selectedDate = document.getElementById('entryDateInput').value;
    
    if (!selectedDate) {
        showNotification('لطفاً تاریخ را انتخاب کنید', 'error');
        return;
    }
    
    try {
        // Reset state
        dataEntryState.selectedUnit = unitId;
        dataEntryState.selectedDate = selectedDate;
        dataEntryState.currentEquipmentIndex = 0;
        dataEntryState.currentParameterIndex = 0;
        dataEntryState.dateData = {};
        dataEntryState.currentData = {};
        
        // Get data for the date
        const dateData = await getDataFromDB({ 
            unit: unitId, 
            date: selectedDate 
        });
        
        // Check completion
        const equipmentIds = APP_CONFIG.equipments.map(e => e.id);
        let allCompleted = true;
        
        for (const equipmentId of equipmentIds) {
            const equipmentData = dateData.find(d => d.equipment === equipmentId);
            
            if (!equipmentData) {
                allCompleted = false;
                break;
            }
            
            // Check if all parameters are filled
            const parameterCount = APP_CONFIG.parameters.length;
            const filledParameterCount = Object.keys(equipmentData.parameters).length;
            
            if (filledParameterCount < parameterCount) {
                allCompleted = false;
                break;
            }
        }
        
        if (allCompleted && dateData.length === equipmentIds.length) {
            showNotification('تمام تجهیزات این واحد برای این تاریخ تکمیل شده. به حالت ویرایش منتقل می‌شوید.', 'info');
            switchDataEntryMode('edit');
            document.getElementById('editDateInput').value = selectedDate;
            selectEditUnit(unitId);
            return;
        }
        
        // Load data
        await loadDateData();
        showEntryInterface(unitId);
        
    } catch (error) {
        console.error('Error selecting unit:', error);
        showNotification('خطا در انتخاب واحد', 'error');
    }
}

async function selectEditUnit(unitId) {
    dataEntryState.editSelectedUnit = unitId;
    dataEntryState.editSelectedDate = document.getElementById('editDateInput').value;
    dataEntryState.editSelectedEquipment = null;
    dataEntryState.editSelectedParameter = null;
    
    if (!dataEntryState.editSelectedDate) {
        showNotification('لطفاً تاریخ را انتخاب کنید', 'error');
        return;
    }
    
    // Update unit button styles
    document.querySelectorAll('#editMode .unit-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelector(`#editMode .unit-btn.${unitId.toLowerCase()}`).classList.add('selected');
    
    // Show equipment selection
    document.getElementById('editEquipmentSection').classList.remove('d-none');
    
    // Render equipment cards
    renderEditEquipmentCards(unitId);
    
    // Hide parameter and input sections
    document.getElementById('editParameterSection').classList.add('d-none');
    document.getElementById('editInputArea').classList.add('d-none');
    document.getElementById('editControls').classList.add('d-none');
}

function renderEditEquipmentCards(unitId) {
    const container = document.getElementById('editEquipmentGrid');
    container.innerHTML = '';
    
    APP_CONFIG.equipments.forEach(equipment => {
        const card = document.createElement('div');
        card.className = `equipment-card ${unitId.toLowerCase()}-style`;
        card.onclick = () => selectEditEquipment(equipment.id);
        
        card.innerHTML = `
            <div class="equipment-header">
                <div class="equipment-icon">
                    <i class="${equipment.icon}"></i>
                </div>
                <div class="equipment-info">
                    <h3>${equipment.name}</h3>
                    <p>${equipment.code}</p>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

async function selectEditEquipment(equipmentId) {
    dataEntryState.editSelectedEquipment = equipmentId;
    dataEntryState.editSelectedParameter = null;
    
    // Update equipment card styles
    document.querySelectorAll('#editEquipmentGrid .equipment-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.equipment-card').classList.add('selected');
    
    // Show parameter selection
    document.getElementById('editParameterSection').classList.remove('d-none');
    
    // Render parameter cards
    renderEditParameterCards();
    
    // Hide input section
    document.getElementById('editInputArea').classList.add('d-none');
    document.getElementById('editControls').classList.add('d-none');
}

function renderEditParameterCards() {
    const container = document.getElementById('editParameterGrid');
    container.innerHTML = '';
    
    APP_CONFIG.parameters.forEach(parameter => {
        const card = document.createElement('div');
        card.className = `parameter-card ${dataEntryState.editSelectedUnit.toLowerCase()}-style`;
        card.onclick = () => selectEditParameter(parameter.id);
        
        card.innerHTML = `
            <div class="parameter-icon">
                <i class="${parameter.icon}"></i>
            </div>
            <div class="parameter-name">${parameter.name}</div>
            <div class="parameter-code">${parameter.code}</div>
        `;
        
        container.appendChild(card);
    });
}

async function selectEditParameter(parameterId) {
    dataEntryState.editSelectedParameter = parameterId;
    
    // Update parameter card styles
    document.querySelectorAll('#editParameterGrid .parameter-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.parameter-card').classList.add('selected');
    
    // Get current value
    try {
        const data = await getDataFromDB({
            unit: dataEntryState.editSelectedUnit,
            equipment: dataEntryState.editSelectedEquipment,
            date: dataEntryState.editSelectedDate
        });
        
        let currentValue = '--';
        if (data.length > 0 && data[0].parameters[parameterId] !== undefined) {
            currentValue = data[0].parameters[parameterId];
        }
        
        dataEntryState.editCurrentValue = currentValue;
        
        // Show input section
        document.getElementById('editInputArea').classList.remove('d-none');
        document.getElementById('editControls').classList.remove('d-none');
        
        // Update display
        document.getElementById('currentValue').textContent = currentValue;
        document.getElementById('editDataInput').value = currentValue === '--' ? '' : currentValue;
        document.getElementById('editDataInput').focus();
        
    } catch (error) {
        console.error('Error getting current value:', error);
        showNotification('خطا در دریافت مقدار فعلی', 'error');
    }
}

async function saveEditedData() {
    const value = document.getElementById('editDataInput').value.trim();
    
    if (!value || !validateValue(value)) {
        showNotification('لطفاً مقدار صحیح (0-20) وارد کنید', 'error');
        return;
    }
    
    try {
        // Get existing data
        const existingData = await getDataFromDB({
            unit: dataEntryState.editSelectedUnit,
            equipment: dataEntryState.editSelectedEquipment,
            date: dataEntryState.editSelectedDate
        });
        
        let dataToSave;
        if (existingData.length > 0) {
            // Update existing record
            dataToSave = {
                ...existingData[0],
                parameters: {
                    ...existingData[0].parameters,
                    [dataEntryState.editSelectedParameter]: parseFloat(value)
                },
                timestamp: new Date().toISOString(),
                userName: currentUser.name
            };
        } else {
            // Create new record
            dataToSave = {
                unit: dataEntryState.editSelectedUnit,
                equipment: dataEntryState.editSelectedEquipment,
                date: dataEntryState.editSelectedDate,
                parameters: {
                    [dataEntryState.editSelectedParameter]: parseFloat(value)
                },
                timestamp: new Date().toISOString(),
                userName: currentUser.name
            };
        }
        
        const result = await saveDataToDB(dataToSave);
        if (result.success) {
            showNotification('داده با موفقیت ویرایش شد', 'success');
            
            // Update current value display
            dataEntryState.editCurrentValue = parseFloat(value);
            document.getElementById('currentValue').textContent = parseFloat(value);
        } else {
            showNotification(result.message || 'خطا در ذخیره داده', 'error');
        }
        
    } catch (error) {
        console.error('Error saving edited data:', error);
        showNotification('خطا در ذخیره داده', 'error');
    }
}

function cancelEdit() {
    // Reset edit selections
    dataEntryState.editSelectedUnit = null;
    dataEntryState.editSelectedDate = null;
    dataEntryState.editSelectedEquipment = null;
    dataEntryState.editSelectedParameter = null;
    dataEntryState.editCurrentValue = null;
    
    // Hide sections
    document.getElementById('editEquipmentSection').classList.add('d-none');
    document.getElementById('editParameterSection').classList.add('d-none');
    document.getElementById('editInputArea').classList.add('d-none');
    document.getElementById('editControls').classList.add('d-none');
    
    // Reset selections
    document.querySelectorAll('#editMode .unit-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('#editEquipmentGrid .equipment-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('#editParameterGrid .parameter-card').forEach(card => card.classList.remove('selected'));
}

async function loadDateData() {
    try {
        // Clear previous cache
        dataEntryState.dateData = {};
        
        // Load data for selected date
        const data = await getDataFromDB({ 
            unit: dataEntryState.selectedUnit, 
            date: dataEntryState.selectedDate 
        });
        
        // Organize data
        data.forEach(item => {
            dataEntryState.dateData[item.equipment] = { ...item.parameters };
        });
        
        // Set indices for next incomplete equipment
        await setNextIncompletePosition();
        
    } catch (error) {
        console.error('Error loading date data:', error);
    }
}

function updateCurrentDisplay() {
    const equipments = APP_CONFIG.equipments;
    const parameters = APP_CONFIG.parameters;
    const currentEquipment = equipments[dataEntryState.currentEquipmentIndex];
    const currentParameter = parameters[dataEntryState.currentParameterIndex];
    
    if (!currentEquipment || !currentParameter) return;
    
    // Update display
    const unitInfo = APP_CONFIG.units.find(u => u.id === dataEntryState.selectedUnit);
    document.getElementById('currentUnit').textContent = unitInfo.name;
    document.getElementById('currentDate').textContent = formatDate(dataEntryState.selectedDate);
    
    const equipmentElement = document.getElementById('currentEquipment');
    equipmentElement.innerHTML = `
        <i class="${currentEquipment.icon}" style="color: ${currentEquipment.color}"></i>
        ${currentEquipment.name}
    `;
    
    const parameterElement = document.getElementById('currentParameter');
    parameterElement.innerHTML = `
        <i class="${currentParameter.icon}" style="color: ${currentParameter.color}"></i>
        ${currentParameter.name} (${currentParameter.code})
    `;
    
    // Update progress
    const totalParams = equipments.length * parameters.length;
    const currentProgress = (dataEntryState.currentEquipmentIndex * parameters.length) + dataEntryState.currentParameterIndex;
    const progressPercent = Math.round((currentProgress / totalParams) * 100);
    document.getElementById('progressFill').style.width = `${progressPercent}%`;
    
    // Check if value exists
    const existingValue = dataEntryState.dateData[currentEquipment.id]?.[currentParameter.id];
    if (existingValue !== undefined) {
        document.getElementById('dataInput').value = existingValue;
    } else {
        document.getElementById('dataInput').value = '';
    }
}

async function handleDataInput() {
    const input = document.getElementById('dataInput');
    const value = input.value.trim();
    
    if (!value || !validateValue(value)) {
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
        showNotification('لطفاً مقدار صحیح (0-20) وارد کنید', 'error');
        return;
    }
    
    // Save current value
    const equipments = APP_CONFIG.equipments;
    const parameters = APP_CONFIG.parameters;
    const currentEquipment = equipments[dataEntryState.currentEquipmentIndex];
    const currentParameter = parameters[dataEntryState.currentParameterIndex];
    
    // Check for existing data conflict
    try {
        const checkResult = await DatabaseAPI.checkExistingData(
            dataEntryState.selectedUnit,
            currentEquipment.id,
            dataEntryState.selectedDate,
            currentParameter.id
        );
        
        if (checkResult.exists) {
            const confirmMessage = `این پارامتر قبلاً توسط ${checkResult.data.userName} با مقدار ${checkResult.data.value} ثبت شده است. آیا می‌خواهید ادامه دهید؟`;
            if (!confirm(confirmMessage)) {
                return;
            }
        }
    } catch (error) {
        console.warn('Could not check existing data:', error);
    }
    
    if (!dataEntryState.dateData[currentEquipment.id]) {
        dataEntryState.dateData[currentEquipment.id] = {};
    }
    dataEntryState.dateData[currentEquipment.id][currentParameter.id] = parseFloat(value);
    
    // Move to next parameter
    dataEntryState.currentParameterIndex++;
    
    if (dataEntryState.currentParameterIndex >= parameters.length) {
        // Save equipment data
        await saveEquipmentData(currentEquipment.id);
        
        // Move to next equipment
        dataEntryState.currentParameterIndex = 0;
        dataEntryState.currentEquipmentIndex++;
        
        if (dataEntryState.currentEquipmentIndex >= equipments.length) {
            // All equipment completed
            showNotification('تمام تجهیزات تکمیل شد!', 'success');
            dataEntryState.currentEquipmentIndex = 0;
            // Switch to edit mode
            setTimeout(() => {
                switchDataEntryMode('edit');
                document.getElementById('editDateInput').value = dataEntryState.selectedDate;
                showNotification('اکنون می‌توانید داده‌ها را ویرایش کنید', 'info');
            }, 1000);
            return;
        }
    }
    
    updateCurrentDisplay();
    input.focus();
}

async function saveEquipmentData(equipmentId) {
    const data = {
        unit: dataEntryState.selectedUnit,
        equipment: equipmentId,
        date: dataEntryState.selectedDate,
        parameters: dataEntryState.dateData[equipmentId],
        timestamp: new Date().toISOString(),
        userName: currentUser.name
    };
    
    try {
        const result = await saveDataToDB(data);
        if (result.success) {
            showNotification('داده‌های تجهیز ذخیره شد', 'success');
        } else {
            showNotification(result.message || 'خطا در ذخیره داده‌ها', 'error');
        }
    } catch (error) {
        console.error('Error saving equipment data:', error);
        showNotification('خطا در ذخیره داده‌ها', 'error');
    }
}

function saveCurrentData() {
    const input = document.getElementById('dataInput');
    const value = input.value.trim();
    
    if (value && validateValue(value)) {
        handleDataInput();
    } else {
        showNotification('لطفاً مقدار صحیح وارد کنید', 'error');
    }
}

function resetEntry() {
    dataEntryState.currentEquipmentIndex = 0;
    dataEntryState.currentParameterIndex = 0;
    updateCurrentDisplay();
    document.getElementById('dataInput').focus();
}

function initDataEntry() {
    // Set default date to today
    document.getElementById('entryDateInput').value = getCurrentDate();
    document.getElementById('editDateInput').value = getCurrentDate();
    
    // Setup input event listeners
    const input = document.getElementById('dataInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleDataInput();
            }
        });
        
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value && !validateValue(value)) {
                e.target.style.borderColor = 'var(--error-color)';
            } else {
                e.target.style.borderColor = 'var(--border-color)';
            }
        });
    }
    
    // Setup edit input event listener
    const editInput = document.getElementById('editDataInput');
    if (editInput) {
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEditedData();
            }
        });
        
        editInput.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value && !validateValue(value)) {
                e.target.style.borderColor = 'var(--error-color)';
            } else {
                e.target.style.borderColor = 'var(--border-color)';
            }
        });
    }
    
    // Show offline data count if exists
    const offlineCount = DatabaseAPI.getOfflineDataCount();
    if (offlineCount > 0) {
        showNotification(`${offlineCount} داده آفلاین در انتظار همگام‌سازی`, 'warning');
    }
}

// ==================== VIEW DATA FUNCTIONS ====================
async function initViewData() {
    await loadViewFilters();
    await loadViewData();
    updateUserDisplay();
    
    // Show offline data count
    const offlineCount = DatabaseAPI.getOfflineDataCount();
    if (offlineCount > 0) {
        showNotification(`${offlineCount} داده آفلاین در انتظار همگام‌سازی`, 'info');
    }
}

async function loadViewFilters() {
    // Load equipment options
    const equipmentSelect = document.getElementById('viewEquipment');
    equipmentSelect.innerHTML = '<option value="">همه تجهیزات</option>';
    
    APP_CONFIG.equipments.forEach(equipment => {
        const option = document.createElement('option');
        option.value = equipment.id;
        option.textContent = equipment.name;
        equipmentSelect.appendChild(option);
    });
    
    // Set default date to today
    document.getElementById('viewDate').value = getCurrentDate();
    
    // Add event listeners
    document.getElementById('viewUnit').addEventListener('change', loadViewData);
    document.getElementById('viewDate').addEventListener('change', loadViewData);
    document.getElementById('viewEquipment').addEventListener('change', loadViewData);
}

async function loadViewData() {
    const unit = document.getElementById('viewUnit').value;
    const date = document.getElementById('viewDate').value;  
    const equipment = document.getElementById('viewEquipment').value;
    
    const filters = {};
    if (unit) filters.unit = unit;
    if (date) filters.date = date;
    if (equipment) filters.equipment = equipment;
    
    try {
        const data = await getDataFromDB(filters);
        
        if (unit === '') {
            // Show both units in separate tables
            renderSeparateUnitTables(data, date);
        } else {
            // Show single table
            renderDataTable(data, unit);
        }
    } catch (error) {
        console.error('Error loading view data:', error);
        showNotification('خطا در بارگذاری داده‌ها', 'error');
    }
}

function renderSeparateUnitTables(data, date) {
    const container = document.getElementById('dataTablesContainer');
    container.innerHTML = '';
    
    ['DRI1', 'DRI2'].forEach(unitId => {
        const unitData = data.filter(d => d.unit === unitId);
        const unitInfo = APP_CONFIG.units.find(u => u.id === unitId);
        
        // Create table container
        const tableContainer = document.createElement('div');
        tableContainer.className = `table-container mobile-scroll table-${unitId.toLowerCase()}`;
        
        // Add title with user info
        const title = document.createElement('div');
        title.className = `table-title ${unitId.toLowerCase()}`;
        title.innerHTML = `
            <div class="d-flex justify-between align-center">
                <span>${unitInfo.name} - ${date ? formatDate(date) : 'همه تاریخ‌ها'}</span>
                <span style="font-size: 0.9rem;">کاربر: ${currentUser.name}</span>
            </div>
        `;
        tableContainer.appendChild(title);
        
        // Create table
        const table = document.createElement('table');
        table.className = 'table';
        
        // Create header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>پارامتر</th>';
        
        const equipments = [...new Set(unitData.map(d => d.equipment))].sort();
        equipments.forEach(equipmentId => {
            const equipment = APP_CONFIG.equipments.find(e => e.id === equipmentId);
            const th = document.createElement('th');
            th.textContent = equipment ? equipment.name : equipmentId;
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create body
        const tbody = document.createElement('tbody');
        
        if (unitData.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="${equipments.length + 1}" class="text-center">داده‌ای موجود نیست</td>`;
            tbody.appendChild(row);
        } else {
            const parameters = APP_CONFIG.parameters;
            parameters.forEach(parameter => {
                const row = document.createElement('tr');
                
                // Parameter name cell
                const paramCell = document.createElement('td');
                paramCell.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="${parameter.icon}" style="color: ${parameter.color}"></i>
                        <span>${parameter.name}</span>
                        <small style="opacity: 0.7;">(${parameter.code})</small>
                    </div>
                `;
                row.appendChild(paramCell);
                
                // Data cells
                equipments.forEach(equipmentId => {
                    const td = document.createElement('td');
                    const equipmentData = unitData.find(d => d.equipment === equipmentId);
                    const value = equipmentData?.parameters?.[parameter.id];
                    
                    if (value !== undefined) {
                        td.textContent = value;
                        td.style.fontWeight = '600';
                    } else {
                        td.textContent = '--';
                        td.style.opacity = '0.5';
                    }
                    
                    row.appendChild(td);
                });
                
                tbody.appendChild(row);
            });
        }
        
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        container.appendChild(tableContainer);
    });
}

function renderDataTable(data, selectedUnit) {
    const container = document.getElementById('dataTablesContainer');
    container.innerHTML = '';
    
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container mobile-scroll';
    
    if (selectedUnit) {
        tableContainer.classList.add(`table-${selectedUnit.toLowerCase()}`);
    }
    
    const table = document.createElement('table');
    table.className = 'table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>پارامتر</th>';
    
    if (data.length === 0) {
        const tbody = document.createElement('tbody');
        tbody.innerHTML = '<tr><td colspan="100%" class="text-center">داده‌ای موجود نیست</td></tr>';
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        container.appendChild(tableContainer);
        return;
    }
    
    // Get unique equipments from data
    const equipments = [...new Set(data.map(d => d.equipment))].sort();
    
    equipments.forEach(equipmentId => {
        const equipment = APP_CONFIG.equipments.find(e => e.id === equipmentId);
        const th = document.createElement('th');
        th.textContent = equipment ? equipment.name : equipmentId;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    const parameters = APP_CONFIG.parameters;
    
    parameters.forEach(parameter => {
        const row = document.createElement('tr');
        
        // Parameter name cell
        const paramCell = document.createElement('td');
        paramCell.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="${parameter.icon}" style="color: ${parameter.color}"></i>
                <span>${parameter.name}</span>
                <small style="opacity: 0.7;">(${parameter.code})</small>
            </div>
        `;
        row.appendChild(paramCell);
        
        // Data cells
        equipments.forEach(equipmentId => {
            const td = document.createElement('td');
            const equipmentData = data.find(d => d.equipment === equipmentId);
            const value = equipmentData?.parameters?.[parameter.id];
            
            if (value !== undefined) {
                td.textContent = value;
                td.style.fontWeight = '600';
            } else {
                td.textContent = '--';
                td.style.opacity = '0.5';
            }
            
            row.appendChild(td);
        });
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    tableContainer.appendChild(table);
    container.appendChild(tableContainer);
}

function printTable() {
    const selectedUnit = document.getElementById('viewUnit').value;
    const selectedDate = document.getElementById('viewDate').value;
    
    let unitName = 'همه واحدها';
    if (selectedUnit) {
        const unit = APP_CONFIG.units.find(u => u.id === selectedUnit);
        unitName = unit ? unit.name : selectedUnit;
    }
    
    const printWindow = window.open('', '', 'width=800,height=600');
    
    const tablesContainer = document.getElementById('dataTablesContainer');
    
    printWindow.document.write(`
        <html>
            <head>
                <title>گزارش داده‌های ویبره</title>
                <style>
                    body { font-family: 'Vazirmatn', sans-serif; direction: rtl; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                    th { background-color: #f2f2f2; font-weight: bold; }
                    .header { text-align: center; margin-bottom: 20px; }
                    .info { margin-bottom: 10px; color: #666; }
                    .table-title { background: #f0f0f0; padding: 10px; font-weight: bold; margin-bottom: 10px; }
                    .table-title.dri1 { background: #3b82f6; color: white; }
                    .table-title.dri2 { background: #ef4444; color: white; }
                    .user-info { text-align: left; font-size: 0.9rem; margin-top: 10px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>گزارش داده‌های ویبره تجهیزات</h2>
                    <div class="info">واحد: ${unitName}</div>
                    <div class="info">تاریخ: ${selectedDate ? formatDate(selectedDate) : 'همه تاریخ‌ها'}</div>
                    <div class="user-info">کاربر: ${currentUser.name}</div>
                </div>
                ${tablesContainer.innerHTML}
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// ==================== CHARTS FUNCTIONS ====================
async function initCharts() {
    await loadChartFilters();
    initChartParameters();
    updateUserDisplay();
    updateChartContainerSize();
}

async function loadChartFilters() {
    // Load equipment options
    const equipmentSelect = document.getElementById('chartEquipment');
    equipmentSelect.innerHTML = '';
    
    APP_CONFIG.equipments.forEach(equipment => {
        const option = document.createElement('option');
        option.value = equipment.id;
        option.textContent = equipment.name;
        equipmentSelect.appendChild(option);
    });
    
    // Set default dates
    const today = getCurrentDate();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    document.getElementById('chartDateFrom').value = weekAgo.toISOString().split('T')[0];
    document.getElementById('chartDateTo').value = today;
    
    // Add event listeners
    document.getElementById('chartUnit').addEventListener('change', updateChart);
    document.getElementById('chartEquipment').addEventListener('change', updateChart);
    document.getElementById('chartDateFrom').addEventListener('change', updateChart);
    document.getElementById('chartDateTo').addEventListener('change', updateChart);
}

function initChartParameters() {
    const container = document.getElementById('chartParameters');
    container.innerHTML = '';
    
    const parameters = APP_CONFIG.parameters;
    parameters.forEach(parameter => {
        const div = document.createElement('div');
        div.className = 'parameter-item';
        div.innerHTML = `
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <input type="checkbox" value="${parameter.id}" onchange="updateChart()">
                <i class="${parameter.icon}" style="color: ${parameter.color}"></i>
                <span>${parameter.name}</span>
            </label>
        `;
        container.appendChild(div);
    });
}

function updateChartContainerSize() {
    const chartContainer = document.getElementById('chartContainerMain');
    const isFullscreen = document.getElementById('charts').classList.contains('fullscreen');
    
    if (isFullscreen) {
        chartContainer.style.width = '90%';
        chartContainer.style.height = '90vh';
        chartContainer.style.margin = '0 auto';
    } else {
        chartContainer.style.width = '80%';
        chartContainer.style.height = '80vh';
        chartContainer.style.margin = '0 auto';
    }
}

async function updateChart() {
    const unit = document.getElementById('chartUnit').value;
    const equipment = document.getElementById('chartEquipment').value;
    const dateFrom = document.getElementById('chartDateFrom').value;
    const dateTo = document.getElementById('chartDateTo').value;
    
    const selectedParameters = [];
    document.querySelectorAll('#chartParameters input[type="checkbox"]:checked').forEach(cb => {
        selectedParameters.push(cb.value);
    });
    
    if (!equipment || selectedParameters.length === 0) {
        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }
        return;
    }
    
    try {
        const data = await getDataFromDB({
            unit,
            equipment,
            dateFrom,
            dateTo
        });
        
        renderChart(data, selectedParameters);
    } catch (error) {
        console.error('Error loading chart data:', error);
        showNotification('خطا در بارگذاری داده‌های نمودار', 'error');
    }
}

function renderChart(data, selectedParameters) {
    const ctx = document.getElementById('mainChart').getContext('2d');
    
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    // Prepare data
    const dates = [...new Set(data.map(d => d.date))].sort();
    const datasets = [];
    
    selectedParameters.forEach((paramId, index) => {
        const parameter = APP_CONFIG.parameters.find(p => p.id === paramId);
        const values = dates.map(date => {
            const item = data.find(d => d.date === date);
            return item?.parameters?.[paramId] || null;
        });
        
        datasets.push({
            label: parameter.name,
            data: values,
            borderColor: parameter.color,
            backgroundColor: parameter.color + '20',
            borderWidth: 2,
            fill: false,
            tension: 0.1
        });
    });
    
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.map(date => formatDate(date)),
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        font: {
                            family: 'Vazirmatn'
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'تاریخ'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'مقدار'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function printChart() {
    const canvas = document.getElementById('mainChart');
    const printWindow = window.open('', '', 'width=800,height=600');
    
    printWindow.document.write(`
        <html>
            <head>
                <title>نمودار داده‌های ویبره</title>
                <style>
                    body { font-family: 'Vazirmatn', sans-serif; direction: rtl; text-align: center; }
                    .header { margin-bottom: 20px; }
                    img { max-width: 100%; height: auto; }
                    .user-info { text-align: left; font-size: 0.9rem; margin-top: 10px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>نمودار داده‌های ویبره</h2>
                    <p>تجهیز: ${document.getElementById('chartEquipment').selectedOptions[0]?.textContent}</p>
                    <div class="user-info">کاربر: ${currentUser.name}</div>
                </div>
                <img src="${canvas.toDataURL()}" alt="نمودار">
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// ==================== ANALYSIS FUNCTIONS ====================
async function initAnalysis() {
    updateUserDisplay();
    await loadAnalysisData();
}

async function loadAnalysisData() {
    try {
        const anomalies = await findAnomalies();
        renderAnalysisCards(anomalies);
    } catch (error) {
        console.error('Error loading analysis data:', error);
        showNotification('خطا در بارگذاری داده‌های آنالیز', 'error');
    }
}

async function findAnomalies() {
    const anomalies = [];
    const today = new Date();
    const timeRangeEnd = new Date(today);
    
    // Calculate date range based on settings
    const timeRangeStart = new Date(today);
    timeRangeStart.setDate(timeRangeStart.getDate() - currentSettings.analysisTimeRange);
    
    const comparisonDate = new Date(today);
    comparisonDate.setDate(comparisonDate.getDate() - currentSettings.analysisComparisonDays);
    
    // Get all data for the time range
    const allData = await getDataFromDB({
        dateFrom: timeRangeStart.toISOString().split('T')[0],
        dateTo: timeRangeEnd.toISOString().split('T')[0]
    });
    
    // Group data by unit, equipment, and parameter
    const dataGroups = {};
    allData.forEach(item => {
        const key = `${item.unit}_${item.equipment}`;
        if (!dataGroups[key]) {
            dataGroups[key] = {};
        }
        dataGroups[key][item.date] = item.parameters;
    });
    
    // Check for anomalies in each group
    for (const [groupKey, dateData] of Object.entries(dataGroups)) {
        const [unit, equipment] = groupKey.split('_');
        const dates = Object.keys(dateData).sort();
        
        if (dates.length < 2) continue; // Need at least 2 data points
        
        for (const parameterId of Object.keys(APP_CONFIG.parameters.reduce((acc, p) => ({ ...acc, [p.id]: true }), {}))) {
            const values = dates.map(date => dateData[date]?.[parameterId]).filter(v => v !== undefined);
            
            if (values.length < 2) continue;
            
            // Compare latest value with comparison value
            const latestValue = values[values.length - 1];
            const comparisonValue = values[values.length - 2]; // Previous value
            
            if (comparisonValue === 0) continue; // Avoid division by zero
            
            const increasePercentage = ((latestValue - comparisonValue) / comparisonValue) * 100;
            
            // Check if increase is above threshold
            if (increasePercentage >= currentSettings.analysisThreshold) {
                const parameter = APP_CONFIG.parameters.find(p => p.id === parameterId);
                const equipmentInfo = APP_CONFIG.equipments.find(e => e.id === equipment);
                const unitInfo = APP_CONFIG.units.find(u => u.id === unit);
                
                anomalies.push({
                    unit,
                    unitName: unitInfo?.name || unit,
                    equipment,
                    equipmentName: equipmentInfo?.name || equipment,
                    parameter: parameterId,
                    parameterName: parameter?.name || parameterId,
                    parameterIcon: parameter?.icon || 'fas fa-chart-line',
                    parameterColor: parameter?.color || '#666',
                    currentValue: latestValue,
                    previousValue: comparisonValue,
                    increasePercentage: Math.round(increasePercentage * 100) / 100,
                    increaseAmount: Math.round((latestValue - comparisonValue) * 100) / 100,
                    latestDate: dates[dates.length - 1]
                });
            }
        }
    }
    
    // Sort anomalies by increase percentage (highest first)
    return anomalies.sort((a, b) => b.increasePercentage - a.increasePercentage);
}

function renderAnalysisCards(anomalies) {
    const container = document.getElementById('analysisCardsContainer');
    container.innerHTML = '';
    
    if (anomalies.length === 0) {
        container.innerHTML = `
            <div class="text-center p-5">
                <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                <h3 class="mt-3">هیچ افزایش غیرعادی‌ای یافت نشد</h3>
                <p class="text-secondary">تمام پارامترها در محدوده طبیعی قرار دارند</p>
            </div>
        `;
        return;
    }
    
    anomalies.forEach(anomaly => {
        const card = document.createElement('div');
        card.className = `analysis-card ${anomaly.unit.toLowerCase()}-style`;
        card.onclick = () => navigateToChart(anomaly.unit, anomaly.equipment);
        
        card.innerHTML = `
            <div class="analysis-card-header">
                <div class="analysis-icon">
                    <i class="${anomaly.parameterIcon}" style="color: ${anomaly.parameterColor}"></i>
                </div>
                <div class="analysis-severity ${getSeverityClass(anomaly.increasePercentage)}">
                    ${getSeverityText(anomaly.increasePercentage)}
                </div>
            </div>
            <div class="analysis-card-body">
                <h4 class="analysis-title">${anomaly.parameterName}</h4>
                <div class="analysis-equipment">
                    <strong>${anomaly.equipmentName}</strong> - ${anomaly.unitName}
                </div>
                <div class="analysis-values">
                    <div class="analysis-value-item">
                        <span class="analysis-label">مقدار فعلی:</span>
                        <span class="analysis-value analysis-current">${anomaly.currentValue}</span>
                    </div>
                    <div class="analysis-value-item">
                        <span class="analysis-label">مقدار قبلی:</span>
                        <span class="analysis-value">${anomaly.previousValue}</span>
                    </div>
                    <div class="analysis-value-item">
                        <span class="analysis-label">میزان افزایش:</span>
                        <span class="analysis-value analysis-increase">+${anomaly.increaseAmount}</span>
                    </div>
                    <div class="analysis-value-item">
                        <span class="analysis-label">درصد افزایش:</span>
                        <span class="analysis-value analysis-percentage">+${anomaly.increasePercentage}%</span>
                    </div>
                </div>
                <div class="analysis-date">
                    <i class="fas fa-calendar"></i>
                    ${formatDate(anomaly.latestDate)}
                </div>
            </div>
            <div class="analysis-card-footer">
                <span class="analysis-action-hint">
                    <i class="fas fa-chart-line"></i>
                    برای مشاهده نمودار کلیک کنید
                </span>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function getSeverityClass(percentage) {
    if (percentage >= 50) return 'severity-critical';
    if (percentage >= 30) return 'severity-high';
    if (percentage >= 20) return 'severity-medium';
    return 'severity-low';
}

function getSeverityText(percentage) {
    if (percentage >= 50) return 'بحرانی';
    if (percentage >= 30) return 'بالا';
    if (percentage >= 20) return 'متوسط';
    return 'پایین';
}

function navigateToChart(unit, equipment) {
    // Switch to charts section
    document.querySelector('.nav-tab[onclick*="charts"]').click();
    
    // Set chart filters
    setTimeout(() => {
        document.getElementById('chartUnit').value = unit;
        document.getElementById('chartEquipment').value = equipment;
        
        // Select all parameters for better analysis
        document.querySelectorAll('#chartParameters input[type="checkbox"]').forEach(cb => {
            cb.checked = true;
        });
        
        // Set date range to last 30 days
        const today = getCurrentDate();
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        
        document.getElementById('chartDateFrom').value = monthAgo.toISOString().split('T')[0];
        document.getElementById('chartDateTo').value = today;
        
        // Update chart
        updateChart();
        
        showNotification(`نمودار ${equipment} در واحد ${unit} نمایش داده شد`, 'success');
    }, 300);
}

function refreshAnalysis() {
    showNotification('در حال به‌روزرسانی آنالیز...', 'info');
    setTimeout(() => {
        loadAnalysisData();
    }, 500);
}

// ==================== SLIDESHOW FUNCTIONS ====================
function initSlideshow() {
    document.getElementById('slideshowDate').value = getCurrentDate();
    document.getElementById('slideshowSpeed').addEventListener('change', updateSlideshowSpeed);
}

function updateSlideshowSpeed() {
    const speed = parseInt(document.getElementById('slideshowSpeed').value);
    slideshowState.speed = speed * 1000;
    
    if (slideshowState.isRunning && !slideshowState.isPaused) {
        clearInterval(slideshowState.interval);
        startSlideshowInterval();
    }
}

async function startSlideshow() {
    const date = document.getElementById('slideshowDate').value;
    
    if (!date) {
        showNotification('لطفاً تاریخ را انتخاب کنید', 'error');
        return;
    }
    
    try {
        // Get all data for the date
        const allData = await getDataFromDB({ date });
        
        if (allData.length === 0) {
            showNotification('داده‌ای برای این تاریخ موجود نیست', 'error');
            return;
        }
        
        // Organize data by equipment priority
        const equipmentsByPriority = getEquipmentByPriority();
        
        slideshowState.data = {};
        allData.forEach(item => {
            const key = `${item.equipment}_${item.unit}`;
            slideshowState.data[key] = item.parameters;
        });
        
        slideshowState.isRunning = true;
        slideshowState.isPaused = false;
        slideshowState.currentDate = date;
        slideshowState.currentEquipmentIndex = 0;
        slideshowState.currentParameterIndex = 0;
        
        startSlideshowInterval();
        
        showNotification('اسلایدشو شروع شد', 'success');
    } catch (error) {
        console.error('Error starting slideshow:', error);
        showNotification('خطا در شروع اسلایدشو', 'error');
    }
}

function startSlideshowInterval() {
    slideshowState.interval = setInterval(() => {
        showNextSlide();
    }, slideshowState.speed);
    
    // Show first slide immediately
    showNextSlide();
}

function showNextSlide() {
    const equipmentsByPriority = getEquipmentByPriority();
    const parameters = getParametersByPriority();
    
    if (slideshowState.currentEquipmentIndex >= equipmentsByPriority.length) {
        stopSlideshow();
        return;
    }
    
    const currentEquipment = equipmentsByPriority[slideshowState.currentEquipmentIndex];
    const currentParameter = parameters[slideshowState.currentParameterIndex];
    
    // Get data key
    const dataKey = `${currentEquipment.id}_${currentEquipment.unit || 'DRI1'}`;
    
    // Generate random color for the value
    slideshowState.currentValueColor = getRandomColor();
    
    // Update display
    updateSlideshowDisplay(currentEquipment, currentParameter, dataKey);
    
    // Move to next parameter
    slideshowState.currentParameterIndex++;
    
    if (slideshowState.currentParameterIndex >= parameters.length) {
        // Equipment finished, ask for next
        clearInterval(slideshowState.interval);
        slideshowState.currentParameterIndex = 0;
        slideshowState.currentEquipmentIndex++;
        
        if (slideshowState.currentEquipmentIndex < equipmentsByPriority.length) {
            showEquipmentConfirmation();
        } else {
            stopSlideshow();
        }
    }
}

function updateSlideshowDisplay(equipment, parameter, dataKey) {
    const value = slideshowState.data[dataKey]?.[parameter.id];
    
    // Update normal display
    document.getElementById('slideshowEquipmentName').textContent = equipment.name;
    document.getElementById('slideshowParameterName').textContent = `${parameter.name} (${parameter.code})`;
    const valueElement = document.getElementById('slideshowValue');
    valueElement.textContent = value !== undefined ? value : '--';
    valueElement.style.color = slideshowState.currentValueColor;
    
    // Update fullscreen display if active
    if (slideshowState.isFullscreen) {
        document.getElementById('slideshowEquipmentNameFS').textContent = equipment.name;
        document.getElementById('slideshowParameterNameFS').textContent = `${parameter.name} (${parameter.code})`;
        const valueFSElement = document.getElementById('slideshowValueFS');
        valueFSElement.textContent = value !== undefined ? value : '--';
        valueFSElement.style.color = slideshowState.currentValueColor;
    }
}

function showEquipmentConfirmation() {
    const equipmentsByPriority = getEquipmentByPriority();
    const nextEquipment = equipmentsByPriority[slideshowState.currentEquipmentIndex];
    
    if (slideshowState.isFullscreen) {
        // Show fullscreen modal
        document.getElementById('slideshowFullscreenMessage').textContent = 
            `آیا به تجهیز ${nextEquipment.name} بروم؟`;
        document.getElementById('slideshowFullscreenModal').classList.remove('d-none');
    } else {
        // Show normal modal
        document.getElementById('slideshowMessage').textContent = 
            `آیا به تجهیز ${nextEquipment.name} بروم؟`;
        document.getElementById('slideshowModal').classList.add('active');
    }
}

function confirmNextEquipment() {
    closeModal('slideshowModal');
    
    if (slideshowState.isRunning) {
        startSlideshowInterval();
    }
}

function confirmNextEquipmentFullscreen() {
    document.getElementById('slideshowFullscreenModal').classList.add('d-none');
    
    if (slideshowState.isRunning) {
        startSlideshowInterval();
    }
}

function stopSlideshowFromFullscreen() {
    document.getElementById('slideshowFullscreenModal').classList.add('d-none');
    stopSlideshow();
}

function pauseSlideshow() {
    if (slideshowState.isRunning) {
        slideshowState.isPaused = true;
        clearInterval(slideshowState.interval);
        showNotification('اسلایدشو متوقف شد', 'warning');
    }
}

function resumeSlideshow() {
    if (slideshowState.isRunning && slideshowState.isPaused) {
        slideshowState.isPaused = false;
        startSlideshowInterval();
        showNotification('اسلایدشو ادامه یافت', 'success');
    }
}

function stopSlideshow() {
    slideshowState.isRunning = false;
    slideshowState.isPaused = false;
    clearInterval(slideshowState.interval);
    
    // Reset colors
    const valueElement = document.getElementById('slideshowValue');
    const valueFSElement = document.getElementById('slideshowValueFS');
    valueElement.style.color = 'var(--primary-color)';
    valueFSElement.style.color = 'var(--primary-color)';
    
    document.getElementById('slideshowEquipmentName').textContent = 'اسلایدشو متوقف شد';
    document.getElementById('slideshowParameterName').textContent = '';
    document.getElementById('slideshowValue').textContent = '--';
    
    if (slideshowState.isFullscreen) {
        document.getElementById('slideshowEquipmentNameFS').textContent = 'اسلایدشو متوقف شد';
        document.getElementById('slideshowParameterNameFS').textContent = '';
        document.getElementById('slideshowValueFS').textContent = '--';
    }
    
    closeModal('slideshowModal');
    document.getElementById('slideshowFullscreenModal').classList.add('d-none');
    showNotification('اسلایدشو پایان یافت', 'info');
}

function toggleSlideshowFullscreen() {
    if (slideshowState.isFullscreen) {
        exitSlideshowFullscreen();
    } else {
        enterSlideshowFullscreen();
    }
}

function enterSlideshowFullscreen() {
    slideshowState.isFullscreen = true;
    document.getElementById('slideshowFullscreen').classList.remove('d-none');
    
    // Copy current values to fullscreen
    document.getElementById('slideshowEquipmentNameFS').textContent = 
        document.getElementById('slideshowEquipmentName').textContent;
    document.getElementById('slideshowParameterNameFS').textContent = 
        document.getElementById('slideshowParameterName').textContent;
    const valueFSElement = document.getElementById('slideshowValueFS');
    const valueElement = document.getElementById('slideshowValue');
    valueFSElement.textContent = valueElement.textContent;
    valueFSElement.style.color = valueElement.style.color;
}

function exitSlideshowFullscreen() {
    slideshowState.isFullscreen = false;
    document.getElementById('slideshowFullscreen').classList.add('d-none');
    document.getElementById('slideshowFullscreenModal').classList.add('d-none');
}

// ==================== DATABASE FUNCTIONS ====================
async function initDatabase() {
    await updateDatabaseStats();
}

async function updateDatabaseStats() {
    try {
        const stats = await DatabaseAPI.getDatabaseStats();
        
        if (stats) {
            document.getElementById('totalDays').textContent = stats.totalDates || 0;
            document.getElementById('totalRecords').textContent = stats.totalRecords || 0;
            document.getElementById('lastUpdate').textContent = stats.lastUpdate ? 
                formatDate(stats.lastUpdate.split('T')[0]) : '--';
            document.getElementById('lastUser').textContent = stats.lastUser || 'نامشخص';
        }
        
        // Calculate approximate database size (this is just for display)
        const offlineCount = DatabaseAPI.getOfflineDataCount();
        document.getElementById('dbSize').textContent = `${Math.max(1, Math.round((stats?.totalRecords || 0) * 0.5))} KB`;
        
        // Show offline data count
        if (offlineCount > 0) {
            const offlineInfo = document.createElement('div');
            offlineInfo.className = 'text-center mt-3 p-3';
            offlineInfo.style.background = 'var(--warning-color)';
            offlineInfo.style.color = 'white';
            offlineInfo.style.borderRadius = '8px';
            offlineInfo.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                ${offlineCount} داده آفلاین در انتظار همگام‌سازی
            `;
            document.querySelector('.card .grid').appendChild(offlineInfo);
        }
        
    } catch (error) {
        console.error('Error updating database stats:', error);
        showNotification('خطا در دریافت آمار دیتابیس', 'warning');
    }
}

async function exportData(format) {
    try {
        if (format === 'csv') {
            const allData = await DatabaseAPI.exportAllData();
            if (allData) {
                exportToCSV(allData);
            } else {
                throw new Error('No data to export');
            }
        }
        
        showNotification('داده‌ها با موفقیت خروجی گرفته شد', 'success');
    } catch (error) {
        console.error('Error exporting data:', error);
        showNotification('خطا در خروجی گرفتن', 'error');
    }
}

function exportToCSV(data) {
    const headers = ['واحد', 'تجهیز', 'تاریخ', 'زمان', 'کاربر'];
    const parameters = APP_CONFIG.parameters;
    parameters.forEach(param => {
        headers.push(param.name);
    });
    
    const rows = [headers];
    
    // Group data by unit, equipment, date
    const groupedData = {};
    data.forEach(item => {
        const key = `${item.unit}_${item.equipment}_${item.date}`;
        if (!groupedData[key]) {
            groupedData[key] = {
                unit: item.unit,
                equipment: item.equipment,
                date: item.date,
                updated_at: item.updated_at,
                username: item.full_name || item.username,
                parameters: {}
            };
        }
        groupedData[key].parameters[item.parameter_id] = item.value;
    });
    
    Object.values(groupedData).forEach(item => {
        const equipment = APP_CONFIG.equipments.find(e => e.id === item.equipment);
        const row = [
            item.unit,
            equipment?.name || item.equipment,
            item.date,
            item.updated_at.split('T')[1]?.split('.')[0] || '',
            item.username || 'نامشخص'
        ];
        
        parameters.forEach(param => {
            row.push(item.parameters[param.id] || '');
        });
        
        rows.push(row);
    });
    
    const csvContent = rows.map(row => row.join(',')).join('\n');
    downloadFile(csvContent, 'vibrate-data.csv', 'text/csv');
}

async function exportSettings() {
    try {
        const settingsData = JSON.stringify(currentSettings, null, 2);
        downloadFile(settingsData, 'vibrate-settings.json', 'application/json');
        showNotification('تنظیمات با موفقیت خروجی گرفته شد', 'success');
    } catch (error) {
        console.error('Error exporting settings:', error);
        showNotification('خطا در خروجی گرفتن تنظیمات', 'error');
    }
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
}

function importSettings() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            const text = await file.text();
            const importedSettings = JSON.parse(text);
            
            // Validate settings structure
            if (typeof importedSettings === 'object') {
                Object.assign(currentSettings, importedSettings);
                await saveSettingsToDB(currentSettings);
                applyTheme();
                updateThemeIcon();
                initializeDefaultPriorities();
                showNotification('تنظیمات با موفقیت وارد شد', 'success');
            } else {
                throw new Error('Invalid settings format');
            }
        } catch (error) {
            console.error('Error importing settings:', error);
            showNotification('خطا در وارد کردن تنظیمات', 'error');
        }
    };
    
    input.click();
}

async function clearAllData() {
    if (!confirm('آیا مطمئن هستید که می‌خواهید تمام داده‌ها را پاک کنید؟\nاین عمل غیرقابل برگشت است.')) {
        return;
    }
    
    if (!confirm('این عمل تمام داده‌های سیستم را پاک می‌کند. آیا واقعاً ادامه می‌دهید؟')) {
        return;
    }
    
    try {
        // Clear local storage
        localStorage.clear();
        
        // Reinitialize with defaults
        currentSettings = {
            theme: 'light',
            primaryColor: '#2563eb',
            dri1Color: '#3b82f6',
            dri2Color: '#ef4444',
            equipmentPriority: {},
            parameterPriority: {},
            parameterMode: 'velocity-first',
            analysisThreshold: 20,
            analysisTimeRange: 7,
            analysisComparisonDays: 1
        };
        
        initializeDefaultPriorities();
        applyTheme();
        updateThemeIcon();
        
        showNotification('تمام داده‌ها پاک شد', 'success');
        setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
        console.error('Error clearing data:', error);
        showNotification('خطا در پاک کردن داده‌ها', 'error');
    }
}

// ==================== SETTINGS FUNCTIONS ====================
async function initSettings() {
    loadSettingsInterface();
}

function loadSettingsInterface() {
    // Theme settings
    document.querySelector(`input[name="theme"][value="${currentSettings.theme}"]`).checked = true;
    document.getElementById('primaryColor').value = currentSettings.primaryColor;
    document.getElementById('dri1Color').value = currentSettings.dri1Color;
    document.getElementById('dri2Color').value = currentSettings.dri2Color;
    
    // Parameter mode
    document.querySelector(`input[name="parameterMode"][value="${currentSettings.parameterMode}"]`).checked = true;
    
    // Analysis settings
    document.getElementById('analysisThreshold').value = currentSettings.analysisThreshold;
    document.getElementById('analysisTimeRange').value = currentSettings.analysisTimeRange;
    document.getElementById('analysisComparisonDays').value = currentSettings.analysisComparisonDays;
    
    // Equipment priority
    loadEquipmentPrioritySettings();
    
    // Parameter priority (only show if custom mode)
    toggleParameterPrioritySection();
    if (currentSettings.parameterMode === 'custom') {
        loadParameterPrioritySettings();
    }
    
    // Add event listeners
    document.querySelectorAll('input[name="theme"]').forEach(input => {
        input.addEventListener('change', () => {
            currentSettings.theme = input.value;
            applyTheme();
            updateThemeIcon();
        });
    });
    
    document.getElementById('primaryColor').addEventListener('change', (e) => {
        currentSettings.primaryColor = e.target.value;
        applyTheme();
    });
    
    document.getElementById('dri1Color').addEventListener('change', (e) => {
        currentSettings.dri1Color = e.target.value;
        applyTheme();
    });
    
    document.getElementById('dri2Color').addEventListener('change', (e) => {
        currentSettings.dri2Color = e.target.value;
        applyTheme();
    });
    
    document.querySelectorAll('input[name="parameterMode"]').forEach(input => {
        input.addEventListener('change', () => {
            currentSettings.parameterMode = input.value;
            toggleParameterPrioritySection();
            if (input.value === 'custom') {
                loadParameterPrioritySettings();
            }
        });
    });
    
    document.getElementById('analysisThreshold').addEventListener('change', (e) => {
        currentSettings.analysisThreshold = parseInt(e.target.value);
    });
    
    document.getElementById('analysisTimeRange').addEventListener('change', (e) => {
        currentSettings.analysisTimeRange = parseInt(e.target.value);
    });
    
    document.getElementById('analysisComparisonDays').addEventListener('change', (e) => {
        currentSettings.analysisComparisonDays = parseInt(e.target.value);
    });
}

function loadEquipmentPrioritySettings() {
    const container = document.getElementById('equipmentPriorityList');
    container.innerHTML = '';
    
    // Create 24 equipment items (12 equipment × 2 units)
    const equipmentItems = [];
    ['DRI1', 'DRI2'].forEach(unitId => {
        APP_CONFIG.equipments.forEach(equipment => {
            equipmentItems.push({
                id: `${equipment.id}_${unitId}`,
                name: `${equipment.name} (${unitId})`,
                priority: currentSettings.equipmentPriority[`${equipment.id}_${unitId}`] || 1,
                unitColor: APP_CONFIG.units.find(u => u.id === unitId)?.color || '#666'
            });
        });
    });
    
    // Sort by priority
    equipmentItems.sort((a, b) => a.priority - b.priority);
    
    equipmentItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'priority-item';
        div.innerHTML = `
            <div class="priority-item-content">
                <div class="priority-number" style="background: ${item.unitColor};">
                    ${index + 1}
                </div>
                <div class="priority-name">${item.name}</div>
            </div>
            <div class="priority-controls">
                <button onclick="moveEquipmentPriority('${item.id}', 'up')" class="btn-icon" ${index === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button onclick="moveEquipmentPriority('${item.id}', 'down')" class="btn-icon" ${index === equipmentItems.length - 1 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-down"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

function loadParameterPrioritySettings() {
    const container = document.getElementById('parameterPriorityList');
    container.innerHTML = '';
    
    // Get parameters sorted by priority
    const parameterItems = APP_CONFIG.parameters.map(param => ({
        ...param,
        priority: currentSettings.parameterPriority[param.id] || 1
    })).sort((a, b) => a.priority - b.priority);
    
    parameterItems.forEach((param, index) => {
        const div = document.createElement('div');
        div.className = 'priority-item';
        div.innerHTML = `
            <div class="priority-item-content">
                <div class="priority-number" style="background: ${param.color};">
                    ${index + 1}
                </div>
                <div class="priority-name">
                    <i class="${param.icon}" style="color: ${param.color}; margin-left: 0.5rem;"></i>
                    ${param.name} (${param.code})
                </div>
            </div>
            <div class="priority-controls">
                <button onclick="moveParameterPriority('${param.id}', 'up')" class="btn-icon" ${index === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button onclick="moveParameterPriority('${param.id}', 'down')" class="btn-icon" ${index === parameterItems.length - 1 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-down"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

function moveEquipmentPriority(equipmentId, direction) {
    const currentPriority = currentSettings.equipmentPriority[equipmentId];
    const allPriorities = Object.entries(currentSettings.equipmentPriority);
    
    if (direction === 'up' && currentPriority > 1) {
        // Find equipment with priority currentPriority - 1 and swap
        const targetEntry = allPriorities.find(([, priority]) => priority === currentPriority - 1);
        if (targetEntry) {
            currentSettings.equipmentPriority[targetEntry[0]] = currentPriority;
            currentSettings.equipmentPriority[equipmentId] = currentPriority - 1;
        }
    } else if (direction === 'down' && currentPriority < 24) {
        // Find equipment with priority currentPriority + 1 and swap
        const targetEntry = allPriorities.find(([, priority]) => priority === currentPriority + 1);
        if (targetEntry) {
            currentSettings.equipmentPriority[targetEntry[0]] = currentPriority;
            currentSettings.equipmentPriority[equipmentId] = currentPriority + 1;
        }
    }
    
    loadEquipmentPrioritySettings();
}

function moveParameterPriority(parameterId, direction) {
    const currentPriority = currentSettings.parameterPriority[parameterId];
    const allPriorities = Object.entries(currentSettings.parameterPriority);
    
    if (direction === 'up' && currentPriority > 1) {
        // Find parameter with priority currentPriority - 1 and swap
        const targetEntry = allPriorities.find(([, priority]) => priority === currentPriority - 1);
        if (targetEntry) {
            currentSettings.parameterPriority[targetEntry[0]] = currentPriority;
            currentSettings.parameterPriority[parameterId] = currentPriority - 1;
        }
    } else if (direction === 'down' && currentPriority < 12) {
        // Find parameter with priority currentPriority + 1 and swap
        const targetEntry = allPriorities.find(([, priority]) => priority === currentPriority + 1);
        if (targetEntry) {
            currentSettings.parameterPriority[targetEntry[0]] = currentPriority;
            currentSettings.parameterPriority[parameterId] = currentPriority + 1;
        }
    }
    
    loadParameterPrioritySettings();
}

function toggleParameterPrioritySection() {
    const section = document.getElementById('parameterPrioritySection');
    if (currentSettings.parameterMode === 'custom') {
        section.classList.remove('d-none');
    } else {
        section.classList.add('d-none');
    }
}

function resetEquipmentPriorities() {
    if (!confirm('آیا می‌خواهید اولویت تجهیزات را به حالت پیش‌فرض برگردانید؟')) {
        return;
    }
    
    currentSettings.equipmentPriority = {};
    let priority = 1;
    ['DRI1', 'DRI2'].forEach(unit => {
        APP_CONFIG.equipments.forEach(equipment => {
            currentSettings.equipmentPriority[`${equipment.id}_${unit}`] = priority++;
        });
    });
    
    loadEquipmentPrioritySettings();
    showNotification('اولویت تجهیزات به حالت پیش‌فرض برگشت', 'success');
}

function resetParameterPriorities() {
    if (!confirm('آیا می‌خواهید اولویت پارامترها را به حالت پیش‌فرض برگردانید؟')) {
        return;
    }
    
    currentSettings.parameterPriority = {};
    APP_CONFIG.parameters.forEach((parameter, index) => {
        currentSettings.parameterPriority[parameter.id] = index + 1;
    });
    
    loadParameterPrioritySettings();
    showNotification('اولویت پارامترها به حالت پیش‌فرض برگشت', 'success');
}

async function saveSettings() {
    try {
        const success = await saveSettingsToDB(currentSettings);
        if (success) {
            showNotification('تنظیمات ذخیره شد', 'success');
        } else {
            throw new Error('Save failed');
        }
    } catch (error) {
        console.error('Error saving settings:', error);
        showNotification('خطا در ذخیره تنظیمات', 'error');
    }
}

function resetSettings() {
    if (!confirm('آیا می‌خواهید تمام تنظیمات را به حالت پیش‌فرض برگردانید؟')) {
        return;
    }
    
    currentSettings = {
        theme: 'light',
        primaryColor: '#2563eb',
        dri1Color: '#3b82f6',
        dri2Color: '#ef4444',
        equipmentPriority: {},
        parameterPriority: {},
        parameterMode: 'velocity-first',
        analysisThreshold: 20,
        analysisTimeRange: 7,
        analysisComparisonDays: 1
    };
    
    initializeDefaultPriorities();
    loadSettingsInterface();
    applyTheme();
    updateThemeIcon();
    
    showNotification('تنظیمات به حالت پیش‌فرض برگشت', 'success');
}

// ==================== MODAL FUNCTIONS ====================
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// ==================== INITIALIZATION FUNCTIONS ====================
async function checkAuthentication() {
    if (!DatabaseAPI.isAuthenticated()) {
        showLoginModal();
        return false;
    }
    
    const user = DatabaseAPI.getCurrentUser();
    if (user) {
        currentUser.name = user.fullName || user.username;
        currentUser.role = user.role;
        updateUserDisplay();
    }
    
    return true;
}

async function initializeAfterLogin() {
    try {
        // Load settings from database
        const savedSettings = await getSettingsFromDB();
        if (savedSettings) {
            Object.assign(currentSettings, savedSettings);
        }
        
        // Initialize default priorities if not set
        initializeDefaultPriorities();
        
        // Apply theme and settings
        applyTheme();
        updateThemeIcon();
        
        // Initialize default section
        initDataEntry();
        
        showNotification(`خوش آمدید ${currentUser.name}`, 'success');
        
    } catch (error) {
        console.error('Error initializing after login:', error);
        showNotification('خطا در راه‌اندازی سیستم', 'error');
    }
}

async function initApp() {
    try {
        console.log('Initializing Vibrate Data Entry System v' + APP_CONFIG.version);
        
        // Initialize network listeners
        DatabaseAPI.initNetworkListeners();
        
        // Check authentication
        if (!(await checkAuthentication())) {
            return;
        }
        
        await initializeAfterLogin();
        
    } catch (error) {
        console.error('Error initializing application:', error);
        showNotification('خطا در راه‌اندازی برنامه', 'error');
    }
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', () => {
    // Login form submission
    const loginForm = document.getElementById('loginModal');
    if (loginForm) {
        loginForm.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performLogin();
            }
        });
    }
    
    // Initialize app
    initApp();
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Network: Online');
    document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
    console.log('Network: Offline');
    document.body.classList.add('offline');
});

// Handle page visibility for slideshow
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause slideshow if running
        if (slideshowState.isRunning && !slideshowState.isPaused) {
            pauseSlideshow();
        }
    } else {
        // Page is visible, resume slideshow if it was running
        if (slideshowState.isRunning && slideshowState.isPaused) {
            setTimeout(() => {
                if (confirm('آیا می‌خواهید اسلایدشو را ادامه دهید؟')) {
                    resumeSlideshow();
                }
            }, 1000);
        }
    }
});

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Only handle shortcuts when not in input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    // Ctrl + S: Save settings (if in settings section)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        const settingsSection = document.getElementById('settings');
        if (settingsSection.classList.contains('active')) {
            saveSettings();
        }
    }
    
    // F11: Toggle slideshow fullscreen (if in slideshow section)
    if (e.key === 'F11') {
        e.preventDefault();
        const slideshowSection = document.getElementById('slideshow');
        if (slideshowSection.classList.contains('active')) {
            toggleSlideshowFullscreen();
        }
    }
    
    // Space: Pause/Resume slideshow (if running)
    if (e.key === ' ' && slideshowState.isRunning) {
        e.preventDefault();
        if (slideshowState.isPaused) {
            resumeSlideshow();
        } else {
            pauseSlideshow();
        }
    }
    
    // Escape: Stop slideshow or exit fullscreen
    if (e.key === 'Escape') {
        if (slideshowState.isFullscreen) {
            exitSlideshowFullscreen();
        } else if (slideshowState.isRunning) {
            stopSlideshow();
        }
    }
});

// Auto-save settings when changed
let settingsChangeTimeout;
function scheduleSettingsSave() {
    clearTimeout(settingsChangeTimeout);
    settingsChangeTimeout = setTimeout(() => {
        saveSettings();
    }, 2000);
}

// Export functions to global scope for HTML onclick events
window.selectUnit = selectUnit;
window.selectEditUnit = selectEditUnit;
window.selectEditEquipment = selectEditEquipment;
window.selectEditParameter = selectEditParameter;
window.saveEditedData = saveEditedData;
window.cancelEdit = cancelEdit;
window.saveCurrentData = saveCurrentData;
window.resetEntry = resetEntry;
window.switchDataEntryMode = switchDataEntryMode;
window.handleDataInput = handleDataInput;
window.showSection = showSection;
window.toggleTheme = toggleTheme;
window.showUserModal = showUserModal;
window.saveUser = saveUser;
window.logout = logout;
window.printTable = printTable;
window.printChart = printChart;
window.updateChart = updateChart;
window.refreshAnalysis = refreshAnalysis;
window.startSlideshow = startSlideshow;
window.pauseSlideshow = pauseSlideshow;
window.resumeSlideshow = resumeSlideshow;
window.stopSlideshow = stopSlideshow;
window.toggleSlideshowFullscreen = toggleSlideshowFullscreen;
window.confirmNextEquipment = confirmNextEquipment;
window.confirmNextEquipmentFullscreen = confirmNextEquipmentFullscreen;
window.stopSlideshowFromFullscreen = stopSlideshowFromFullscreen;
window.exitSlideshowFullscreen = exitSlideshowFullscreen;
window.exportData = exportData;
window.exportSettings = exportSettings;
window.importSettings = importSettings;
window.clearAllData = clearAllData;
window.saveSettings = saveSettings;
window.resetSettings = resetSettings;
window.moveEquipmentPriority = moveEquipmentPriority;
window.moveParameterPriority = moveParameterPriority;
window.resetEquipmentPriorities = resetEquipmentPriorities;
window.resetParameterPriorities = resetParameterPriorities;
window.performLogin = performLogin;
window.showModal = showModal;
window.closeModal = closeModal;
window.showNotification = showNotification;

console.log('Vibrate Data Entry System loaded successfully');