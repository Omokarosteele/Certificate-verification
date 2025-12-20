// List of valid certificates (for demonstration)
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
const form = document.getElementById('verificationForm');
const validResult = document.getElementById('validResult');
const errorResult = document.getElementById('errorResult');
const forenameInput = document.getElementById('forename');
const surnameInput = document.getElementById('surname');
const certInput = document.getElementById('cert');

// Initialize page with default verification
document.addEventListener('DOMContentLoaded', function() {
    // Set initial values
    forenameInput.value = "Grace";
    surnameInput.value = "Okafor";
    certInput.value = "513-10458661-398825-20230515";
    
    // Show valid result for default data
    showValidResult();
    
    // Update result details
    updateResultDetails();
    
    // Add event listeners for input changes
    setupInputListeners();
});

// Form submission handler
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
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
    const verifyBtn = form.querySelector('.verify-btn');
    const originalText = verifyBtn.textContent;
    verifyBtn.textContent = 'Verifying...';
    verifyBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Check if certificate is valid
        const isValid = checkCertificate(forename, surname, cert);
        
        // Show appropriate result
        if (isValid) {
            showValidResult();
        } else {
            showErrorResult(forename, surname, cert);
        }
        
        // Reset button
        verifyBtn.textContent = originalText;
        verifyBtn.disabled = false;
        
        // Update result details
        updateResultDetails();
        
        // Scroll to results
        document.querySelector('.results-area').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }, 1000);
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
function showValidResult() {
    validResult.style.display = 'block';
    errorResult.style.display = 'none';
    
    // Update valid result details
    document.getElementById('resultForename').textContent = forenameInput.value;
    document.getElementById('resultSurname').textContent = surnameInput.value;
    document.getElementById('resultCertNum').textContent = certInput.value;
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

// Update result details based on current inputs
function updateResultDetails() {
    const forename = forenameInput.value;
    const surname = surnameInput.value;
    const cert = certInput.value;
    
    // Check if we should show valid or error
    const isValid = checkCertificate(forename, surname, cert);
    
    if (isValid) {
        showValidResult();
    } else {
        // Only show error if fields have been edited from defaults
        const isDefault = forename === "Grace" && surname === "Okafor" && cert === "513-10458661-398825-20230515";
        if (!isDefault) {
            showErrorResult(forename, surname, cert);
        }
    }
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
            
            // Update results in real-time after a short delay
            clearTimeout(this.updateTimeout);
            this.updateTimeout = setTimeout(() => {
                updateResultDetails();
            }, 500);
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
            
            // Update results
            updateResultDetails();
        });
    });
}

// Scroll to form function (for header button)
function scrollToForm() {
    const formSection = document.getElementById('verifyForm');
    formSection.scrollIntoView({ behavior: 'smooth' });
    
    // Focus on first input field
    setTimeout(() => {
        forenameInput.focus();
        forenameInput.select();
    }, 500);
}

// Add a function to test with other valid certificates
function testWithCertificate(forename, surname, cert) {
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
    updateResultDetails();
    
    // Scroll to results
    document.querySelector('.results-area').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Optional: Add keyboard shortcuts for testing
document.addEventListener('keydown', function(event) {
    // Ctrl+1 for default valid certificate
    if (event.ctrlKey && event.key === '1') {
        event.preventDefault();
        testWithCertificate("Grace", "Okafor", "513-10458661-398825-20230515");
    }
    // Ctrl+2 for another valid certificate
    else if (event.ctrlKey && event.key === '2') {
        event.preventDefault();
        testWithCertificate("John", "Smith", "513-10458662-398826-20230620");
    }
    // Ctrl+3 for invalid certificate
    else if (event.ctrlKey && event.key === '3') {
        event.preventDefault();
        testWithCertificate("Test", "Invalid", "123-45678901-234567-20230101");
    }
});