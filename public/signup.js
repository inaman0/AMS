// Function to toggle visibility of the semester input
function toggleSemesterField() {
    var studentRadio = document.getElementById('student');
    var semesterField = document.getElementById('semester-container');
    
    // Show semester input if student is selected, otherwise hide it
    if (studentRadio.checked) {
        semesterField.style.display = 'block';
        return true;
    } 
    else {
        semesterField.style.display = 'none';
        return false;
    }
}

// Ensure the function is called when the page loads and when the radio buttons change
window.onload = function() {
    // Initialize the visibility on page load based on the initial state of the radio buttons
    toggleSemesterField();

    var radios = document.getElementsByName('role');
    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', toggleSemesterField);
    }
};

