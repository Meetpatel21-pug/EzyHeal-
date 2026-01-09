// API Base URL - Update this to match your backend server
const API_BASE_URL = 'http://localhost:5000/api';

// Medicine and Lab Test Data
const medicineData = [
    { id: 1, name: "Crocin Advance 500mg", price: 40, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop", description: "Fast-acting pain reliever and fever reducer. Contains Paracetamol 500mg.", usage: "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.", sideEffects: "Rare side effects include nausea, allergic reactions. Consult doctor if symptoms persist." },
    { id: 2, name: "Dolo 650 Tablet", price: 30, img: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop", description: "Effective for mild to moderate pain and fever. Contains Paracetamol 650mg.", usage: "Take 1 tablet every 4-6 hours. Maximum 4 tablets per day.", sideEffects: "Generally well tolerated. May cause liver damage if overdosed." },
    { id: 3, name: "Vicks Vaporub 50g", price: 155, img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop", description: "Topical cough suppressant and nasal decongestant. Provides relief from cold symptoms.", usage: "Apply to chest, throat, and back. Can also be used in steam inhalation.", sideEffects: "May cause skin irritation in sensitive individuals. For external use only." },
    { id: 4, name: "Limcee Vitamin C", price: 105, img: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?w=400&h=400&fit=crop", description: "Chewable Vitamin C supplement. Boosts immunity and promotes healthy skin.", usage: "Chew 1-2 tablets daily or as directed by physician.", sideEffects: "High doses may cause stomach upset or diarrhea." },
    { id: 5, name: "Volini Pain Spray", price: 195, img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop", description: "Fast-acting pain relief spray for muscle and joint pain. Contains Diclofenac.", usage: "Spray on affected area 3-4 times daily. Do not use on broken skin.", sideEffects: "May cause mild skin irritation or redness at application site." },
    { id: 6, name: "Revital H Daily", price: 550, img: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=400&fit=crop", description: "Daily multivitamin with minerals and ginseng. Helps fight fatigue and boost energy.", usage: "Take 1 capsule daily after breakfast.", sideEffects: "Generally safe. May cause mild stomach upset in some individuals." },
    { id: 7, name: "Digene Gel Mint", price: 145, img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop", description: "Antacid gel for quick relief from acidity, heartburn, and indigestion.", usage: "Take 1-2 teaspoons after meals or when needed.", sideEffects: "Prolonged use may cause constipation or diarrhea." },
    { id: 8, name: "Omez Capsule", price: 175, img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop", description: "Proton pump inhibitor for treating acid reflux, GERD, and stomach ulcers.", usage: "Take 1 capsule before breakfast on empty stomach.", sideEffects: "May cause headache, nausea, or abdominal pain." },
    { id: 9, name: "Zifi 200 Tablet", price: 108, img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop", description: "Antibiotic containing Cefixime. Used to treat bacterial infections.", usage: "Take as prescribed by doctor. Complete the full course.", sideEffects: "May cause diarrhea, nausea, or allergic reactions." },
    { id: 10, name: "Allegra 120mg", price: 212, img: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop", description: "Non-drowsy antihistamine for allergies, hay fever, and hives.", usage: "Take 1 tablet once daily. Can be taken with or without food.", sideEffects: "Rare side effects include headache and drowsiness." },
    { id: 11, name: "Combiflam", price: 45, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop", description: "Combination of Ibuprofen and Paracetamol for pain and inflammation.", usage: "Take 1 tablet 3 times daily after meals.", sideEffects: "May cause stomach upset. Avoid on empty stomach." },
    { id: 12, name: "Pantocid 40", price: 160, img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop", description: "Pantoprazole tablet for treating gastric acid-related conditions.", usage: "Take 1 tablet daily before breakfast.", sideEffects: "May cause headache, diarrhea, or flatulence." },
    { id: 13, name: "Shelcal 500", price: 115, img: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=400&fit=crop", description: "Calcium and Vitamin D3 supplement for bone health.", usage: "Take 1 tablet twice daily after meals.", sideEffects: "May cause constipation or bloating in some cases." },
    { id: 14, name: "Becosules Z", price: 45, img: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?w=400&h=400&fit=crop", description: "B-Complex with Zinc capsules. Supports nervous system and immunity.", usage: "Take 1 capsule daily after meals.", sideEffects: "Generally well tolerated. High doses may cause nausea." },
    { id: 15, name: "Avil 25mg", price: 15, img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop", description: "Antihistamine for allergic conditions, itching, and skin rashes.", usage: "Take 1 tablet 2-3 times daily as needed.", sideEffects: "May cause drowsiness. Avoid driving after taking." },
    { id: 16, name: "Saridon", price: 42, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop", description: "Triple-action formula for headache and body pain relief.", usage: "Take 1-2 tablets with water. Do not exceed 6 tablets daily.", sideEffects: "May cause dizziness or stomach upset." },
    { id: 17, name: "Liv 52 Syrup", price: 130, img: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&h=400&fit=crop", description: "Herbal liver tonic that protects and improves liver function.", usage: "Take 2-3 teaspoons twice daily.", sideEffects: "Rare. May cause mild gastric discomfort." },
    { id: 18, name: "Septilin", price: 150, img: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=400&h=400&fit=crop", description: "Ayurvedic immunity booster with natural herbs.", usage: "Take 2 tablets twice daily for adults.", sideEffects: "Generally safe for long-term use." },
    { id: 19, name: "Evyion 400", price: 32, img: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=400&fit=crop", description: "Vitamin E capsule for skin health and antioxidant support.", usage: "Take 1 capsule daily after meals.", sideEffects: "High doses may cause bleeding issues. Consult doctor." },
    { id: 20, name: "Glycomet 500", price: 60, img: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop", description: "Metformin tablet for managing Type 2 diabetes.", usage: "Take as prescribed by doctor, usually with meals.", sideEffects: "May cause stomach upset, diarrhea. Take with food." },
    { id: 21, name: "Telma 40", price: 190, img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop", description: "Telmisartan for high blood pressure management.", usage: "Take 1 tablet daily at the same time.", sideEffects: "May cause dizziness, especially when starting." },
    { id: 22, name: "Augmentin 625", price: 205, img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop", description: "Broad-spectrum antibiotic combining Amoxicillin and Clavulanate.", usage: "Take as prescribed. Complete the full antibiotic course.", sideEffects: "May cause diarrhea, nausea, or skin rash." },
    { id: 23, name: "Aricep 5mg", price: 800, img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop", description: "Donepezil tablet for Alzheimer's disease management.", usage: "Take 1 tablet daily at bedtime as prescribed.", sideEffects: "May cause nausea, diarrhea, or sleep problems." },
    { id: 24, name: "Atorva 10", price: 120, img: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop", description: "Atorvastatin for lowering cholesterol levels.", usage: "Take 1 tablet daily, preferably at night.", sideEffects: "May cause muscle pain or weakness. Report to doctor." },
    { id: 25, name: "Thyronorm 50", price: 175, img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop", description: "Levothyroxine for hypothyroidism treatment.", usage: "Take on empty stomach, 30 minutes before breakfast.", sideEffects: "Overdose may cause palpitations, weight loss." },
    { id: 26, name: "L-Cyzine", price: 50, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop", description: "Levocetirizine antihistamine for allergies and cold symptoms.", usage: "Take 1 tablet daily in the evening.", sideEffects: "May cause mild drowsiness or dry mouth." },
    { id: 27, name: "B-Complex", price: 35, img: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?w=400&h=400&fit=crop", description: "Essential B vitamins supplement for energy and nerve health.", usage: "Take 1 tablet daily after meals.", sideEffects: "Generally safe. May turn urine bright yellow." },
    { id: 28, name: "Nurokind LC", price: 210, img: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=400&fit=crop", description: "Nerve health supplement with Methylcobalamin and Alpha Lipoic Acid.", usage: "Take 1 tablet daily or as prescribed.", sideEffects: "Rare side effects. Generally well tolerated." },
    { id: 29, name: "Urimax 0.4", price: 450, img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop", description: "Tamsulosin for benign prostatic hyperplasia (enlarged prostate).", usage: "Take 1 capsule daily after meals.", sideEffects: "May cause dizziness or ejaculation problems." },
    { id: 30, name: "Electral Powder", price: 20, img: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&h=400&fit=crop", description: "Oral rehydration salts for treating dehydration and diarrhea.", usage: "Dissolve 1 sachet in 1 liter of water. Sip frequently.", sideEffects: "Safe when used as directed. Do not add sugar." }
];

const labTests = [
    { name: "Full Body Checkup", price: 1999, img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop", description: "Comprehensive health screening including 70+ parameters.", usage: "Fasting for 10-12 hours required. Reports in 24-48 hours.", sideEffects: "Includes blood, urine, and vital organ tests." },
    { name: "Diabetes Screening", price: 499, img: "https://images.unsplash.com/photo-1593491034932-844ab981ed7c?w=400&h=400&fit=crop", description: "Complete diabetes profile including HbA1c and glucose levels.", usage: "Fasting for 8-10 hours. Avoid sugary foods before test.", sideEffects: "Includes Fasting Blood Sugar, PP Sugar, HbA1c." },
    { name: "COVID-19 RT-PCR", price: 700, img: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400&h=400&fit=crop", description: "Gold standard test for detecting active COVID-19 infection.", usage: "Nasal/throat swab collection. No fasting required.", sideEffects: "Results available within 24 hours." },
    { name: "Thyroid Profile", price: 550, img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", description: "Complete thyroid function test including T3, T4, and TSH.", usage: "No fasting required. Best done in morning.", sideEffects: "Helps diagnose hypo/hyperthyroidism." },
    { name: "Heart Health Test", price: 1200, img: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop", description: "Cardiac risk assessment with lipid profile and ECG.", usage: "12 hour fasting required for lipid profile.", sideEffects: "Includes Cholesterol, Triglycerides, ECG." },
    { name: "Liver Function Test", price: 800, img: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop", description: "Evaluates liver health through enzyme and protein levels.", usage: "Fasting for 8-10 hours recommended.", sideEffects: "Includes SGOT, SGPT, Bilirubin, Albumin." },
    { name: "Vitamin D Deficiency", price: 1100, img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop", description: "Measures Vitamin D levels in blood for bone health assessment.", usage: "No fasting required. Can be done anytime.", sideEffects: "Helps identify deficiency causing fatigue, bone pain." },
    { name: "CBC (Blood Test)", price: 300, img: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=400&fit=crop", description: "Complete Blood Count measuring RBC, WBC, platelets, and hemoglobin.", usage: "No fasting required. Quick sample collection.", sideEffects: "Basic test for infections, anemia, immunity." },
    { name: "Kidney Profile", price: 950, img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=400&fit=crop", description: "Comprehensive kidney function evaluation.", usage: "Fasting for 8-10 hours recommended.", sideEffects: "Includes Creatinine, BUN, Uric Acid, Electrolytes." },
    { name: "Bone Health Scan", price: 2500, img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=400&fit=crop", description: "DEXA scan for bone density and osteoporosis screening.", usage: "No fasting required. Avoid calcium supplements before.", sideEffects: "Non-invasive scan. Results same day." }
];

let cartCount = 0;
let cart = [];
let currentUser = null;
const DELIVERY_CHARGE = 50;
let checkoutTotals = { subtotal: 0, delivery: DELIVERY_CHARGE, total: 0 };

// API Helper Functions
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'API request failed');
        }
        
        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Cart Functions
function openCart() {
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
    document.body.style.overflow = 'auto';
}

function updateCartDisplay() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalEl.textContent = '₹0';
    } else {
        cartItemsEl.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotalEl.textContent = '₹' + total;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    cartCount = cart.length;
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const cartLabels = document.querySelectorAll('.action-item span, .mobile-cart-btn span');
    cartLabels.forEach(label => {
        if(label.innerText.includes("Cart")) label.innerText = `Cart (${cartCount})`;
    });
}

// Initialize Content
function loadContent() {
    const homeEl = document.getElementById('home-products');
    const allMedEl = document.getElementById('all-medicines');
    const labEl = document.getElementById('lab-test-grid');

    if(homeEl) homeEl.innerHTML = medicineData.slice(0, 4).map(m => createProductCard(m)).join('');
    if(allMedEl) allMedEl.innerHTML = medicineData.map(m => createProductCard(m)).join('');
    if(labEl) labEl.innerHTML = labTests.map(t => createProductCard(t, "Book Test")).join('');
}

function createProductCard(item, btnText = "Add to Cart") {
    return `
        <div class="medicine-card" onclick="showProductDetails('${item.name}')">
            <img src="${item.img}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p class="price-tag">₹${item.price}</p>
            <button class="add-btn" onclick="event.stopPropagation(); addToCart('${item.name}')">${btnText}</button>
        </div>
    `;
}

// Product Details Modal
function showProductDetails(name) {
    const medicine = medicineData.find(m => m.name === name);
    const labTest = labTests.find(t => t.name === name);
    const item = medicine || labTest;
    const isLabTest = !!labTest;
    
    if (item) {
        const modal = document.getElementById('product-modal');
        document.getElementById('modal-img').src = item.img;
        document.getElementById('modal-name').textContent = item.name;
        document.getElementById('modal-price').textContent = '₹' + item.price;
        document.getElementById('modal-description').textContent = item.description || 'No description available.';
        document.getElementById('modal-usage').textContent = item.usage || 'Consult doctor for usage.';
        
        // Hide side effects section for lab tests
        const sideEffectsSection = document.getElementById('modal-side-effects').closest('.modal-section');
        if (isLabTest) {
            sideEffectsSection.style.display = 'none';
        } else {
            sideEffectsSection.style.display = 'block';
            document.getElementById('modal-side-effects').textContent = item.sideEffects || 'No known side effects.';
        }
        
        document.getElementById('modal-add-btn').onclick = function() { addToCart(item.name); };
        
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Auth Modal Functions
function openAuthModal() {
    document.getElementById('auth-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Forgot Password Modal Functions
let userPhoneNumber = '';

function openForgotPasswordModal() {
    closeAuthModal();
    document.getElementById('forgot-password-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
    // Reset to step 1
    document.getElementById('forgot-step-1').style.display = 'block';
    document.getElementById('forgot-step-2').style.display = 'none';
    document.getElementById('forgot-step-3').style.display = 'none';
    // Clear inputs
    document.getElementById('forgot-phone').value = '';
    document.getElementById('otp-display').style.display = 'none';
}

function closeForgotPasswordModal() {
    document.getElementById('forgot-password-modal').classList.remove('open');
    document.body.style.overflow = 'auto';
    // Reset states
    userPhoneNumber = '';
}

async function sendOTP(event) {
    event.preventDefault();
    const phone = document.getElementById('forgot-phone').value.trim();
    
    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        document.getElementById('forgot-phone').focus();
        return false;
    }
    
    userPhoneNumber = phone;
    
    try {
        const result = await apiCall('/auth/send-otp', 'POST', { phone });
        
        // Show phone number in step 2
        const maskedPhone = phone.substring(0, 2) + '****' + phone.substring(6);
        document.getElementById('display-phone').textContent = maskedPhone;
        
        // If OTP is returned (console mode), display it
        if (result.otp) {
            document.getElementById('generated-otp').textContent = result.otp;
            document.getElementById('otp-display').style.display = 'block';
        } else {
            document.getElementById('otp-display').style.display = 'none';
        }
        
        // Move to step 2
        document.getElementById('forgot-step-1').style.display = 'none';
        document.getElementById('forgot-step-2').style.display = 'block';
        document.getElementById('otp-input').value = '';
        document.getElementById('otp-input').focus();
        
        alert('OTP has been sent to your phone number: ' + maskedPhone);
        
    } catch (error) {
        alert('Failed to send OTP: ' + error.message);
    }
    
    return false;
}

async function verifyOTP(event) {
    event.preventDefault();
    const enteredOTP = document.getElementById('otp-input').value.trim();
    
    // Validate OTP format
    if (enteredOTP.length !== 6 || !/^[0-9]{6}$/.test(enteredOTP)) {
        alert('Please enter a valid 6-digit OTP.');
        document.getElementById('otp-input').focus();
        return false;
    }
    
    try {
        const result = await apiCall('/auth/verify-otp', 'POST', {
            phone: userPhoneNumber,
            otp: enteredOTP
        });
        
        if (result.verified) {
            // OTP is correct
            document.getElementById('forgot-step-2').style.display = 'none';
            document.getElementById('forgot-step-3').style.display = 'block';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-new-password').value = '';
            document.getElementById('new-password').focus();
            
            alert('OTP verified successfully! Please create a new password.');
        }
    } catch (error) {
        alert('OTP verification failed: ' + error.message);
        document.getElementById('otp-input').value = '';
        document.getElementById('otp-input').focus();
    }
    
    return false;
}

async function resendOTP() {
    event.preventDefault();
    
    if (!userPhoneNumber) {
        alert('Please enter your phone number first.');
        return false;
    }
    
    try {
        const result = await apiCall('/auth/send-otp', 'POST', { phone: userPhoneNumber });
        
        // If OTP is returned (console mode), display it
        if (result.otp) {
            document.getElementById('generated-otp').textContent = result.otp;
            document.getElementById('otp-display').style.display = 'block';
        }
        
        // Clear input
        document.getElementById('otp-input').value = '';
        document.getElementById('otp-input').focus();
        
        const maskedPhone = userPhoneNumber.substring(0, 2) + '****' + userPhoneNumber.substring(6);
        alert('New OTP has been sent to ' + maskedPhone);
    } catch (error) {
        alert('Failed to resend OTP: ' + error.message);
    }
    
    return false;
}

function changePhoneNumber() {
    event.preventDefault();
    // Go back to step 1
    document.getElementById('forgot-step-2').style.display = 'none';
    document.getElementById('forgot-step-1').style.display = 'block';
    document.getElementById('forgot-phone').focus();
    document.getElementById('otp-display').style.display = 'none';
    
    return false;
}

async function resetPassword(event) {
    event.preventDefault();
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-new-password').value;
    
    // Validate password
    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long.');
        document.getElementById('new-password').focus();
        return false;
    }
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        document.getElementById('confirm-new-password').focus();
        return false;
    }
    
    try {
        await apiCall('/auth/reset-password', 'POST', {
            phone: userPhoneNumber,
            new_password: newPassword
        });
        
        alert('Password reset successful! You can now login with your new password.');
        closeForgotPasswordModal();
        openAuthModal();
    } catch (error) {
        alert('Password reset failed: ' + error.message);
    }
    
    return false;
}

function backToLogin() {
    event.preventDefault();
    closeForgotPasswordModal();
    openAuthModal();
    return false;
}

// Terms & Conditions Modal Functions
function openTermsModal() {
    document.getElementById('terms-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeTermsModal() {
    document.getElementById('terms-modal').classList.remove('open');
    document.body.style.overflow = 'auto';
}

function showAuthTab(tab) {
    // Update tabs
    document.getElementById('login-tab').classList.remove('active');
    document.getElementById('register-tab').classList.remove('active');
    document.getElementById(tab + '-tab').classList.add('active');
    
    // Update forms
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.remove('active');
    document.getElementById(tab + '-form').classList.add('active');
}

function validateEmail(email) {
    // Basic format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email address (e.g., example@domain.com)' };
    }
    
    // Extract domain from email
    const domain = email.split('@')[1].toLowerCase();
    
    // Common valid domains
    const validDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
        'icloud.com', 'aol.com', 'mail.com', 'protonmail.com', 'zoho.com',
        'ymail.com', 'msn.com', 'rediffmail.com', 'inbox.com', 'gmx.com',
        'yahoo.in', 'yahoo.co.in', 'hotmail.co.uk', 'outlook.in',
        'gmail.co.in', 'live.in', 'rediff.com'
    ];
    
    // Common domain typos and their corrections
    const domainTypos = {
        'gmil.com': 'gmail.com',
        'gmal.com': 'gmail.com',
        'gmaill.com': 'gmail.com',
        'gamil.com': 'gmail.com',
        'gnail.com': 'gmail.com',
        'gmail.co': 'gmail.com',
        'gmail.cm': 'gmail.com',
        'gmail.om': 'gmail.com',
        'gmail.con': 'gmail.com',
        'gmail.cpm': 'gmail.com',
        'gmai.com': 'gmail.com',
        'gmailcom': 'gmail.com',
        'mail.com': 'gmail.com',
        'mai.com': 'gmail.com',
        'gmaul.com': 'gmail.com',
        'gmali.com': 'gmail.com',
        'gemail.com': 'gmail.com',
        'gimail.com': 'gmail.com',
        'yahooo.com': 'yahoo.com',
        'yaho.com': 'yahoo.com',
        'yahho.com': 'yahoo.com',
        'yahoo.co': 'yahoo.com',
        'yahoo.cm': 'yahoo.com',
        'yahoo.con': 'yahoo.com',
        'yhaoo.com': 'yahoo.com',
        'yhoo.com': 'yahoo.com',
        'yaoo.com': 'yahoo.com',
        'hotmal.com': 'hotmail.com',
        'hotmil.com': 'hotmail.com',
        'hotmai.com': 'hotmail.com',
        'hotmail.co': 'hotmail.com',
        'hotmail.cm': 'hotmail.com',
        'hotmail.con': 'hotmail.com',
        'hitmail.com': 'hotmail.com',
        'homail.com': 'hotmail.com',
        'outllok.com': 'outlook.com',
        'outlok.com': 'outlook.com',
        'outook.com': 'outlook.com',
        'outlook.co': 'outlook.com',
        'outlook.cm': 'outlook.com',
        'outlook.con': 'outlook.com',
        'outlookcom': 'outlook.com',
        'redifmail.com': 'rediffmail.com',
        'rediffmal.com': 'rediffmail.com',
        'reddifmail.com': 'rediffmail.com',
        'rediffmail.co': 'rediffmail.com'
    };
    
    // Check for typos
    if (domainTypos[domain]) {
        return { 
            valid: false, 
            message: `Did you mean "${email.split('@')[0]}@${domainTypos[domain]}"? Please check your email domain.`
        };
    }
    
    // Check if domain has valid TLD
    const tld = domain.split('.').pop();
    const validTLDs = ['com', 'in', 'org', 'net', 'edu', 'gov', 'co', 'io', 'info', 'biz', 'us', 'uk', 'ca', 'au', 'de', 'fr', 'jp'];
    
    if (!validTLDs.includes(tld) && !domain.includes('.co.')) {
        return { valid: false, message: 'Please enter a valid email domain.' };
    }
    
    // Check domain has at least one dot and valid structure
    const domainParts = domain.split('.');
    if (domainParts.length < 2 || domainParts.some(part => part.length < 2)) {
        return { valid: false, message: 'Please enter a valid email domain.' };
    }
    
    return { valid: true, message: '' };
}

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    // Email validation
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
        alert(emailValidation.message);
        document.getElementById('login-email').focus();
        return false;
    }
    
    // Password validation
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        document.getElementById('login-password').focus();
        return false;
    }
    
    try {
        const result = await apiCall('/auth/login', 'POST', { email, password });
        currentUser = result.user;
        alert('Login successful! Welcome back.');
        closeAuthModal();
        updateUserUI(email);
        return false;
    } catch (error) {
        alert('Login failed: ' + error.message);
        return false;
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Name validation
    if (name.length < 2) {
        alert('Please enter a valid name (at least 2 characters).');
        document.getElementById('register-name').focus();
        return false;
    }
    
    // Email validation
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
        alert(emailValidation.message);
        document.getElementById('register-email').focus();
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        document.getElementById('register-phone').focus();
        return false;
    }
    
    // Password validation
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        document.getElementById('register-password').focus();
        return false;
    }
    
    // Password match validation
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        document.getElementById('register-confirm-password').focus();
        return false;
    }
    
    try {
        const result = await apiCall('/auth/register', 'POST', { name, email, phone, password });
        currentUser = result.user;
        alert('Registration successful! Welcome to EzyHeal, ' + name + '!');
        closeAuthModal();
        updateUserUI(email);
        return false;
    } catch (error) {
        alert('Registration failed: ' + error.message);
        return false;
    }
}

function updateUserUI(email) {
    const username = currentUser?.name || email.split('@')[0];
    
    // Update desktop profile button
    const desktopBtn = document.getElementById('user-profile-btn');
    if (desktopBtn) {
        desktopBtn.innerHTML = '<i class="fas fa-user-circle"></i> ' + username + ' <i class="fas fa-chevron-down"></i>';
        desktopBtn.onclick = function() { toggleProfileDropdown('profile-dropdown'); };
    }
    
    // Update mobile profile button
    const mobileBtn = document.getElementById('mobile-user-profile-btn');
    if (mobileBtn) {
        mobileBtn.innerHTML = '<i class="fas fa-user-circle"></i> ' + username + ' <i class="fas fa-chevron-down"></i>';
        mobileBtn.onclick = function() { toggleProfileDropdown('mobile-profile-dropdown'); };
    }
}

function toggleProfileDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const isVisible = dropdown.style.display === 'block';
    
    // Close all dropdowns first
    document.querySelectorAll('.profile-dropdown').forEach(d => d.style.display = 'none');
    
    // Toggle the clicked dropdown
    dropdown.style.display = isVisible ? 'none' : 'block';
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.action-item') && !event.target.closest('.profile-dropdown')) {
        document.querySelectorAll('.profile-dropdown').forEach(d => d.style.display = 'none');
    }
});

function showUserDetails() {
    if (!currentUser) {
        alert('Please login first.');
        return;
    }
    
    // Close dropdowns
    document.querySelectorAll('.profile-dropdown').forEach(d => d.style.display = 'none');
    
    // Populate user details
    document.getElementById('user-detail-name').textContent = currentUser.name || '-';
    document.getElementById('user-detail-email').textContent = currentUser.email || '-';
    document.getElementById('user-detail-phone').textContent = currentUser.phone || '-';
    
    // Open modal
    const modal = document.getElementById('user-details-modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeUserDetailsModal() {
    const modal = document.getElementById('user-details-modal');
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        
        // Reset UI to Sign In state
        const desktopBtn = document.getElementById('user-profile-btn');
        if (desktopBtn) {
            desktopBtn.innerHTML = '<i class="fas fa-user-circle"></i> Sign In';
            desktopBtn.onclick = function() { openAuthModal(); };
        }
        
        const mobileBtn = document.getElementById('mobile-user-profile-btn');
        if (mobileBtn) {
            mobileBtn.innerHTML = '<i class="fas fa-user-circle"></i> Sign In';
            mobileBtn.onclick = function() { openAuthModal(); };
        }
        
        // Hide dropdowns
        document.querySelectorAll('.profile-dropdown').forEach(d => d.style.display = 'none');
        
        // Clear cart
        cart = [];
        cartCount = 0;
        updateCartCount();
        updateCartDisplay();
        
        alert('You have been logged out successfully.');
    }
}

// Navigation Logic
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const activeNav = document.getElementById('nav-' + pageId);
    if(activeNav) activeNav.classList.add('active');

    // Update mobile navigation bar active state
    document.querySelectorAll('.mobile-nav-item').forEach(n => n.classList.remove('active'));
    const activeMobileNav = document.getElementById('mobile-nav-' + pageId);
    if(activeMobileNav) activeMobileNav.classList.add('active');

    // Close mobile menu on click
    document.getElementById('nav-menu').classList.remove('active');
    window.scrollTo(0,0);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

// Cart Functionality
function addToCart(name) {
    const medicine = medicineData.find(m => m.name === name);
    const labTest = labTests.find(t => t.name === name);
    const item = medicine || labTest;
    
    if (item) {
        cart.push({...item});
        cartCount = cart.length;
        updateCartCount();
        updateCartDisplay();
        openCart();
    }
}

// Carousel
let idx = 0;
function moveSlide(n) {
    const items = document.querySelectorAll('.carousel-item');
    if (!items.length) return;
    items[idx].classList.remove('active');
    idx = (idx + n + items.length) % items.length;
    items[idx].classList.add('active');
}
setInterval(() => moveSlide(1), 5000);

// Search
function searchMedicine() {
    let input = document.getElementById('main-search').value.toLowerCase();
    if (input.length > 2) {
        showPage('medicines');
        const filtered = medicineData.filter(m => m.name.toLowerCase().includes(input));
        document.getElementById('all-medicines').innerHTML = filtered.length > 0 ? 
            filtered.map(m => createProductCard(m)).join('') : "<p>No results found.</p>";
    }
}

function updateMap(branch) {
    const frame = document.getElementById('map-frame');
    
    // Remove active class from all store cards
    document.querySelectorAll('.store-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to clicked store card
    const storeCards = document.querySelectorAll('.store-card');
    if(branch === 'branch1' && storeCards[0]) {
        storeCards[0].classList.add('active');
    } else if(branch === 'branch2' && storeCards[1]) {
        storeCards[1].classList.add('active');
    } else if(branch === 'branch3' && storeCards[2]) {
        storeCards[2].classList.add('active');
    } else if(branch === 'branch4' && storeCards[3]) {
        storeCards[3].classList.add('active');
    }
    
    if(branch === 'branch1') {
        frame.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114064.01869894332!2d75.71960134444005!3d26.88514165689408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000";
    } else if(branch === 'branch2') {
        frame.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.527280343993736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b71532ad414!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000";
    } else if(branch === 'branch3') {
        frame.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.8999999999996!2d72.5713!3d23.0225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fced29611690ff4!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000";
    } else if(branch === 'branch4') {
        frame.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.621299999998!2d77.59700000000001!3d13.040000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15d16aabcccf%3A0x8f0a0d7d5c5a5c5a!2sISKCON%20Cross%20Road%2C%20Bangalore%2C%20Karnataka%20560034!5e0!3m2!1sen!2sin!4v1700000000000";
    }
}

// Checkout Functions
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    if (!currentUser) {
        alert('Please login to proceed with checkout.');
        openAuthModal();
        return;
    }
    
    // Show checkout modal with cart items
    openCheckoutModal();
}

function openCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const checkoutItemsEl = document.getElementById('checkout-items');
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal + DELIVERY_CHARGE;
    
    // Display cart items
    checkoutItemsEl.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.img}" alt="${item.name}">
            <div class="checkout-item-details">
                <h4>${item.name}</h4>
                <p class="checkout-item-price">₹${item.price}</p>
            </div>
        </div>
    `).join('');
    
    // Update totals
    document.getElementById('checkout-subtotal').textContent = '₹' + subtotal;
    document.getElementById('checkout-total').textContent = '₹' + total;
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

function confirmCheckout() {
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    checkoutTotals = {
        subtotal,
        delivery: DELIVERY_CHARGE,
        total: subtotal + DELIVERY_CHARGE
    };
    
    // Move from checkout summary to user details/payment modal
    closeCheckoutModal();
    openOrderDetailsModal();
}

function openOrderDetailsModal() {
    const modal = document.getElementById('order-details-modal');
    document.getElementById('order-total-amount').textContent = '₹' + checkoutTotals.total;
    
    // Reset form fields
    const form = document.getElementById('order-details-form');
    form.reset();
    
    // Default payment method to card and show card fields
    document.getElementById('payment-card').checked = true;
    toggleCardDetails(true);
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeOrderDetailsModal() {
    const modal = document.getElementById('order-details-modal');
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

function toggleCardDetails(show) {
    const cardSection = document.getElementById('card-details-section');
    cardSection.style.display = show ? 'grid' : 'none';
    ['card-number', 'card-expiry', 'card-cvv'].forEach(id => {
        const field = document.getElementById(id);
        field.required = show;
    });
}

function handlePaymentMethodChange(event) {
    const method = event.target.value;
    toggleCardDetails(method === 'card');
}

async function submitOrderDetails(event) {
    event.preventDefault();
    
    if (!currentUser) {
        alert('Please login to proceed with checkout.');
        openAuthModal();
        return;
    }
    
    const firstName = document.getElementById('order-first-name').value.trim();
    const lastName = document.getElementById('order-last-name').value.trim();
    const email = document.getElementById('order-email').value.trim();
    const address = document.getElementById('order-address').value.trim();
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
    
    if (!firstName || !lastName || !email || !address || !paymentMethod) {
        alert('Please fill all required fields.');
        return;
    }
    
    let cardNumber = '';
    let expiry = '';
    let cvv = '';
    
    if (paymentMethod === 'card') {
        cardNumber = document.getElementById('card-number').value.replace(/\s+/g, '').trim();
        expiry = document.getElementById('card-expiry').value.trim();
        cvv = document.getElementById('card-cvv').value.trim();
        
        if (!/^\d{16}$/.test(cardNumber)) {
            alert('Please enter a valid 16-digit card number.');
            return;
        }
        
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
            alert('Please enter expiry in MM/YY format.');
            return;
        }
        
        if (!/^\d{3}$/.test(cvv)) {
            alert('Please enter a valid 3-digit CVV.');
            return;
        }
    }
    
    try {
        const orderData = {
            user_id: currentUser.id,
            items: cart.map(item => ({
                name: item.name,
                price: item.price,
                img: item.img
            })),
            total_amount: checkoutTotals.total,
            customer: {
                first_name: firstName,
                last_name: lastName,
                email,
                address,
                payment_method: paymentMethod,
                card_last4: paymentMethod === 'card' ? cardNumber.slice(-4) : null
            }
        };
        
        const result = await apiCall('/orders/create', 'POST', orderData);
        
        // Close modal and show success message
        closeOrderDetailsModal();
        alert('Order placed successfully! Order ID: ' + result.order_id);
        
        // Clear cart
        cart = [];
        cartCount = 0;
        updateCartCount();
        updateCartDisplay();
        closeCart();
    } catch (error) {
        alert('Checkout failed: ' + error.message);
    }
}

window.onload = function() {
    loadContent();
    
    // Cart button click handlers
    document.getElementById('cart-btn').addEventListener('click', openCart);
    
    const mobileCartBtn = document.querySelector('.mobile-cart-btn');
    if (mobileCartBtn) {
        mobileCartBtn.addEventListener('click', openCart);
    }
};

