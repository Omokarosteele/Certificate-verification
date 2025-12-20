// List of valid certificates
const validCertificates = [
    {
        forename: "Grace",
        surname: "Okafor",
        cert: "513-10458661-398825-20230515"
    },
    {
        forename: "John",
        surname: "Smith",
        cert: "513-10458662-398826-20230620"
    },
    {
        forename: "Sarah",
        surname: "Johnson",
        cert: "513-10458663-398827-20230715"
    },
    {
        forename: "Michael",
        surname: "Brown",
        cert: "513-10458664-398828-20230810"
    },
    {
        forename: "Emily",
        surname: "Davis",
        cert: "513-10458665-398829-20230905"
    }
];

// DOM elements
const verifyButton = document.getElementById('verifyButton');
const resultsArea = document.getElementById('resultsArea');
const validResult = document.getElementById('validResult');
const errorResult = document.getElementById('errorResult');
const forenameInput = document.getElementById('forename');
const surnameInput = document.getElementById('surname');
const certInput = document.getElementById('cert');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial values
    forenameInput.value = "Grace";
    surnameInput.value = "Okafor";
    certInput.value = "513-10458661-398825-20230515";
    
    // Initially hide results area
    resultsArea.style.display = 'none';
    
    // Setup input listeners
    setupInputListeners();
    
    // Setup mobile menu
    setupMobileMenu();
});

// Setup mobile menu
function setupMobileMenu() {
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        
        // Change icon
        const icon = this.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && !mobileNav.contains(event.target) && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        }
    });
}

// Verify button click handler
verifyButton.addEventListener('click', function() {
    // Get current values
    const forename = forenameInput.value.trim();
    const surname = surnameInput.value.trim();
    const cert = certInput.value.trim();
    
    // Validate inputs
    if (!forename || !surname || !cert) {
        alert('Please fill in all fields before verifying.');
        return;
    }
    
    // Show loading state
    const originalText = verifyButton.textContent;
    verifyButton.textContent = 'Verifying...';
    verifyButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Check if certificate is valid
        const isValid = checkCertificate(forename, surname, cert);
        
        // Show results area
        resultsArea.style.display = 'block';
        
        // Show appropriate result
        if (isValid) {
            showValidResult(forename, surname, cert);
        } else {
            showErrorResult(forename, surname, cert);
        }
        
        // Reset button
        verifyButton.textContent = originalText;
        verifyButton.disabled = false;
        
        // Scroll to results
        resultsArea.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }, 1500);
});

// Check if certificate exists in valid list
function checkCertificate(forename, surname, cert) {
    return validCertificates.some(certificate => 
        certificate.forename.toLowerCase() === forename.toLowerCase() &&
        certificate.surname.toLowerCase() === surname.toLowerCase() &&
        certificate.cert === cert
    );
}

// Show valid result
function showValidResult(forename, surname, cert) {
    validResult.style.display = 'block';
    errorResult.style.display = 'none';
    
    // Update valid result details
    document.getElementById('resultForename').textContent = forename;
    document.getElementById('resultSurname').textContent = surname;
    document.getElementById('resultCertNum').textContent = cert;
}

// Show error result
function showErrorResult(forename, surname, cert) {
    validResult.style.display = 'none';
    errorResult.style.display = 'block';
    
    // Update error result details
    document.getElementById('errorForename').textContent = forename;
    document.getElementById('errorSurname').textContent = surname;
    document.getElementById('errorCertNum').textContent = cert;
}

// Setup input change listeners
function setupInputListeners() {
    const inputs = document.querySelectorAll('.editable-field');
    
    inputs.forEach(input => {
        // Track original value
        const originalValue = input.value;
        
        input.addEventListener('input', function() {
            // Add edited class if value changed
            if (this.value !== originalValue) {
                this.classList.add('edited');
            } else {
                this.classList.remove('edited');
            }
        });
        
        // Clear field on focus if it contains default value
        input.addEventListener('focus', function() {
            const defaults = ["Grace", "Okafor", "513-10458661-398825-20230515"];
            if (defaults.includes(this.value)) {
                this.value = '';
                this.classList.add('edited');
            }
        });
        
        // Restore default if empty on blur
        input.addEventListener('blur', function() {
            if (!this.value.trim() && this.id === 'forename') {
                this.value = "Grace";
                this.classList.remove('edited');
            } else if (!this.value.trim() && this.id === 'surname') {
                this.value = "Okafor";
                this.classList.remove('edited');
            } else if (!this.value.trim() && this.id === 'cert') {
                this.value = "513-10458661-398825-20230515";
                this.classList.remove('edited');
            }
        });
    });
}

// Scroll to form function
function scrollToForm() {
    const formSection = document.getElementById('verifyForm');
    formSection.scrollIntoView({ behavior: 'smooth' });
    
    // Focus on first input field
    setTimeout(() => {
        forenameInput.focus();
        forenameInput.select();
    }, 500);
}

// Test function (for debugging)
function testVerification(forename, surname, cert) {
    forenameInput.value = forename;
    surnameInput.value = surname;
    certInput.value = cert;
    
    // Mark as edited
    [forenameInput, surnameInput, certInput].forEach(input => {
        if (input.value && !["Grace", "Okafor", "513-10458661-398825-20230515"].includes(input.value)) {
            input.classList.add('edited');
        }
    });
    
    // Trigger verification
    verifyButton.click();
}

// Keyboard shortcuts for testing
document.addEventListener('keydown', function(event) {
    // Ctrl+1 for default valid certificate
    if (event.ctrlKey && event.key === '1') {
        event.preventDefault();
        testVerification("Grace", "Okafor", "513-10458661-398825-20230515");
    }
    // Ctrl+2 for another valid certificate
    else if (event.ctrlKey && event.key === '2') {
        event.preventDefault();
        testVerification("John", "Smith", "513-10458662-398826-20230620");
    }
    // Ctrl+3 for invalid certificate
    else if (event.ctrlKey && event.key === '3') {
        event.preventDefault();
        testVerification("Test", "Invalid", "123-45678901-234567-20230101");
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    }
});