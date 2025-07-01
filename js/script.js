// Global variables
let selectedTemplate = 'professional';

// Navigation functions
function nextStep(step) {
    document.querySelectorAll('.step-content').forEach(el => {
        el.classList.remove('active');
    });
    document.getElementById('step' + step).classList.add('active');
    
    // Update review content if we're on the review step
    if (step === 7) {
        updateReview();
    }
}

function prevStep(step) {
    document.querySelectorAll('.step-content').forEach(el => {
        el.classList.remove('active');
    });
    document.getElementById('step' + (step - 1)).classList.add('active');
}

function validateStep(step) {
    let isValid = true;
    
    // Validate current step
    const stepElement = document.getElementById('step' + step);
    const requiredFields = stepElement.querySelectorAll('input[required], textarea[required]');
    
    requiredFields.forEach(field => {
        const errorElement = field.parentElement.querySelector('.error');
        if (!field.value.trim()) {
            errorElement.classList.add('show');
            isValid = false;
        } else {
            errorElement.classList.remove('show');
        }
    });
    
    // Special validation for email
    if (step === 2) {
        const emailField = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(emailField.value)) {
            emailError.classList.add('show');
            isValid = false;
        } else {
            emailError.classList.remove('show');
        }
    }
    
    // If valid, move to next step
    if (isValid) {
        nextStep(step + 1);
    }
}

function addExperience() {
    const container = document.getElementById('experienceContainer');
    const newItem = document.createElement('div');
    newItem.className = 'experience-item';
    newItem.innerHTML = `
        <div class="form-group">
            <label>Job Title *</label>
            <input type="text" name="expTitle[]" placeholder="e.g. Senior Developer" required>
            <div class="error">Please enter your job title</div>
        </div>
        <div class="form-group">
            <label>Company *</label>
            <input type="text" name="expCompany[]" placeholder="Company Name" required>
            <div class="error">Please enter company name</div>
        </div>
        <div class="form-group">
            <label>Location</label>
            <input type="text" name="expLocation[]" placeholder="City, Country">
        </div>
        <div class="form-group">
            <label>Date Range *</label>
            <input type="text" name="expDate[]" placeholder="e.g. Jan 2020 - Present" required>
            <div class="error">Please enter date range</div>
        </div>
        <div class="form-group">
            <label>Description *</label>
            <textarea name="expDescription[]" placeholder="Describe your responsibilities and achievements..." required></textarea>
            <div class="error">Please enter job description</div>
        </div>
        <button type="button" class="btn btn-secondary" onclick="this.parentElement.remove()">
            <i class="fas fa-trash"></i> Remove
        </button>
    `;
    container.appendChild(newItem);
}

function addEducation() {
    const container = document.getElementById('educationContainer');
    const newItem = document.createElement('div');
    newItem.className = 'education-item';
    newItem.innerHTML = `
        <div class="form-group">
            <label>Degree/Certificate *</label>
            <input type="text" name="eduDegree[]" placeholder="e.g. BSc Computer Science" required>
            <div class="error">Please enter your degree</div>
        </div>
        <div class="form-group">
            <label>Institution *</label>
            <input type="text" name="eduInstitution[]" placeholder="University Name" required>
            <div class="error">Please enter institution name</div>
        </div>
        <div class="form-group">
            <label>Location</label>
            <input type="text" name="eduLocation[]" placeholder="City, Country">
        </div>
        <div class="form-group">
            <label>Date Range</label>
            <input type="text" name="eduDate[]" placeholder="e.g. 2016 - 2020">
        </div>
        <button type="button" class="btn btn-secondary" onclick="this.parentElement.remove()">
            <i class="fas fa-trash"></i> Remove
        </button>
    `;
    container.appendChild(newItem);
}

function updateReview() {
    // Template
    document.getElementById('reviewTemplate').textContent = 
        selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1);
    
    // Personal info
    document.getElementById('reviewName').textContent = 
        document.getElementById('fullName').value || 'Not provided';
    document.getElementById('reviewTitle').textContent = 
        document.getElementById('jobTitle').value || 'Not provided';
    document.getElementById('reviewEmail').textContent = 
        document.getElementById('email').value || 'Not provided';
    document.getElementById('reviewPhone').textContent = 
        document.getElementById('phone').value || 'Not provided';
    document.getElementById('reviewLocation').textContent = 
        document.getElementById('location').value || 'Not provided';
    document.getElementById('reviewSummary').textContent = 
        document.getElementById('summary').value || 'Not provided';
    
    // Experience
    const expContainer = document.getElementById('reviewExperience');
    expContainer.innerHTML = '';
    const expTitles = document.getElementsByName('expTitle[]');
    
    for (let i = 0; i < expTitles.length; i++) {
        const title = expTitles[i].value || `Position ${i+1}`;
        const company = document.getElementsByName('expCompany[]')[i].value || 'Company Name';
        const location = document.getElementsByName('expLocation[]')[i].value || 'City, Country';
        const date = document.getElementsByName('expDate[]')[i].value || 'Jan 2020 - Present';
        const desc = document.getElementsByName('expDescription[]')[i].value || 'Description of responsibilities...';
        
        const expItem = document.createElement('div');
        expItem.className = 'review-item';
        expItem.innerHTML = `
            <p><strong>${title}</strong> at ${company}, ${location} (${date})</p>
            <p>${desc}</p>
        `;
        expContainer.appendChild(expItem);
    }
    
    if (expTitles.length === 0) {
        expContainer.innerHTML = '<p>No work experience provided</p>';
    }
    
    // Education
    const eduContainer = document.getElementById('reviewEducation');
    eduContainer.innerHTML = '';
    const eduDegrees = document.getElementsByName('eduDegree[]');
    
    for (let i = 0; i < eduDegrees.length; i++) {
        const degree = eduDegrees[i].value || `Degree ${i+1}`;
        const institution = document.getElementsByName('eduInstitution[]')[i].value || 'University Name';
        const location = document.getElementsByName('eduLocation[]')[i].value || 'City, Country';
        const date = document.getElementsByName('eduDate[]')[i].value || '2016 - 2020';
        
        const eduItem = document.createElement('p');
        eduItem.innerHTML = `<strong>${degree}</strong> from ${institution}, ${location} (${date})`;
        eduContainer.appendChild(eduItem);
    }
    
    if (eduDegrees.length === 0) {
        eduContainer.innerHTML = '<p>No education information provided</p>';
    }
    
    // Skills
    document.getElementById('reviewSkills').textContent = 
        document.getElementById('skills').value || 'No skills provided';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Template selection
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.template-card').forEach(c => {
                c.classList.remove('selected');
            });
            this.classList.add('selected');
            selectedTemplate = this.dataset.template;
            document.getElementById('selectedTemplate').value = selectedTemplate;
        });
    });

    // File upload
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.addEventListener('click', function() {
            document.getElementById('cvUpload').click();
        });
    }

    const cvUpload = document.getElementById('cvUpload');
    if (cvUpload) {
        cvUpload.addEventListener('change', function() {
            if (this.files.length > 0) {
                uploadArea.innerHTML = `
                    <div class="upload-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <p>${this.files[0].name}</p>
                    <p>Uploaded successfully!</p>
                    <button type="button" class="btn" onclick="document.getElementById('cvUpload').click();">Change File</button>
                `;
            }
        });
    }

    // Form submission
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Simulate form processing
            setTimeout(() => {
                // Show success message
                nextStep(8);
                
                // Set the email in success message
                const email = document.getElementById('email').value || "your email";
                document.getElementById('successEmail').textContent = email;
            }, 1500);
        });
    }

    // Contact button animations
    const contactButtons = document.querySelectorAll('.contact-btn');
    contactButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            const label = btn.querySelector('.contact-label');
            label.style.opacity = '1';
            label.style.right = '75px';
        });
        
        btn.addEventListener('mouseleave', () => {
            const label = btn.querySelector('.contact-label');
            label.style.opacity = '0';
            label.style.right = '70px';
        });
    });

    // Handle form submission status
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    if (status === 'success') {
        nextStep(8);
        document.getElementById('successEmail').textContent = 
            document.getElementById('email')?.value || "your email";
    } else if (status === 'error') {
        alert('There was an error submitting your form. Please try again or contact us directly.');
    }
});
