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
  