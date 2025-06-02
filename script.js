// QR Code Toggle Function
function toggleQR() {
    const qrContainer = document.getElementById('qrCodeContainer');
    if (qrContainer.style.display === 'none') {
        qrContainer.style.display = 'block';
    } else {
        qrContainer.style.display = 'none';
    }
}

// Calculator Type Toggle
function toggleCalculatorType() {
    const calculatorType = document.getElementById('calculatorType').value;
    const distanceCalculator = document.getElementById('distanceCalculator');
    const dailyCalculator = document.getElementById('dailyCalculator');

    if (calculatorType === 'distance') {
        distanceCalculator.style.display = 'block';
        dailyCalculator.style.display = 'none';
    } else {
        distanceCalculator.style.display = 'none';
        dailyCalculator.style.display = 'block';
    }
}

// Distance-based Fare Calculator
function calculateFare() {
    const fromCity = document.getElementById('fromCity').value;
    const toCity = document.getElementById('toCity').value;
    
    if (!fromCity || !toCity) {
        alert('Please select both cities');
        return;
    }

    if (fromCity === toCity) {
        alert('Please select different cities');
        return;
    }

    // Distance mapping (in kilometers)
    const distances = {
        'Mumbai': 650,
        'Pune': 550,
        'Nagpur': 150,
        'Nashik': 450,
        'Thane': 630,
        'Kolhapur': 700,
        'Amravati': 0,
        'Solapur': 500,
        'Dhule': 350,
        'Latur': 400,
        'Wardha': 80,
        'Akola': 50,
        'Jalna': 300,
        'Panvel': 640
    };

    const fromDistance = distances[fromCity];
    const toDistance = distances[toCity];
    const totalDistance = Math.abs(fromDistance - toDistance);
    const ratePerKm = 5.33;
    const fare = Math.round(totalDistance * ratePerKm);

    const fareResult = document.getElementById('fareResult');
    document.getElementById('fareAmount').textContent = fare.toLocaleString('en-IN');
    fareResult.style.display = 'block';
}

// Daily Rate Calculator
function calculateDailyFare() {
    const numberOfDays = parseInt(document.getElementById('numberOfDays').value);
    
    if (isNaN(numberOfDays) || numberOfDays < 1) {
        alert('Please enter a valid number of days');
        return;
    }

    const dailyRate = 600;
    const totalFare = numberOfDays * dailyRate;

    const dailyFareResult = document.getElementById('dailyFareResult');
    document.getElementById('dailyFareAmount').textContent = totalFare.toLocaleString('en-IN');
    dailyFareResult.style.display = 'block';
}

// Initialize calculator type on page load
document.addEventListener('DOMContentLoaded', function() {
    toggleCalculatorType();
    
    // Add event listeners for city selection
    const fromCitySelect = document.getElementById('fromCity');
    const toCitySelect = document.getElementById('toCity');
    
    if (fromCitySelect && toCitySelect) {
        fromCitySelect.addEventListener('change', function() {
            if (this.value === toCitySelect.value) {
                alert('Please select different cities');
                this.value = '';
            }
        });
        
        toCitySelect.addEventListener('change', function() {
            if (this.value === fromCitySelect.value) {
                alert('Please select different cities');
                this.value = '';
            }
        });
    }
});

// User Information Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const userInfoForm = document.getElementById('userInfoForm');
    
    // Load saved user information if it exists
    loadUserInformation();

    // Handle form submission
    userInfoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const userData = {
            name: document.getElementById('userName').value,
            phone: document.getElementById('userPhone').value,
            email: document.getElementById('userEmail').value,
            address: document.getElementById('userAddress').value,
            city: document.getElementById('userCity').value
        };

        // Save to localStorage
        localStorage.setItem('userInformation', JSON.stringify(userData));

        // Show success message
        showAlert('Information saved successfully!', 'success');
    });
});

// Function to load saved user information
function loadUserInformation() {
    const savedData = localStorage.getItem('userInformation');
    if (savedData) {
        const userData = JSON.parse(savedData);
        document.getElementById('userName').value = userData.name || '';
        document.getElementById('userPhone').value = userData.phone || '';
        document.getElementById('userEmail').value = userData.email || '';
        document.getElementById('userAddress').value = userData.address || '';
        document.getElementById('userCity').value = userData.city || '';
    }
}

// Function to show alert messages
function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insert alert before the form
    const form = document.getElementById('userInfoForm');
    form.parentNode.insertBefore(alertDiv, form);

    // Remove alert after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

