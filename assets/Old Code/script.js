let sidebar = document.querySelector(".sidebar");
let navToggle = document.querySelector(".toggle-btn");
let getAlerts = document.querySelector(".alert-box");

// Toggle Sidebar
navToggle.addEventListener("click", ()=> {
    sidebar.classList.toggle("open");
    toggleIcon(); // calling the function
});

getAlerts.addEventListener("click", ()=> {
    sidebar.classList.toggle("open");
});

// Toggle Icon 
function toggleIcon() {
    if (sidebar.classList.contains("open")) {
        // include code to change src from x to y
    } else {
        // include code to change src from y to x
    }
}

// Toggle Dashboard
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const contents = document.querySelectorAll('.content');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all nav links
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked nav link
            this.classList.add('active');

            // Hide all content sections
            contents.forEach(content => content.classList.remove('active'));
            // Show the target content section
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // Set default active content
    navLinks[0].classList.add('active');
    contents[0].classList.add('active');
});


// beach alert accordion menu opening and closing
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        button.classList.toggle('active');
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});
