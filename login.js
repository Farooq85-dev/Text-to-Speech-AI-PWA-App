//Initialize Toastr;
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-full-width",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}


const login = () => {
    let emailL = document.querySelector("#emailL").value;
    let passwordL = document.querySelector("#passwordL").value;
    var localStorageData = JSON.parse(localStorage.getItem("userData"));
    if (!localStorageData) {
        toastr.info("Please register yourself first.");
        return;
    }
    if (localStorageData.email !== emailL) {
        toastr.error("Invalid email.");
        return;
    } else if (localStorageData.password !== passwordL) {
        toastr.error("invalid password.");
        return;
    } else {
        toastr.success("Login Successfully.");
        location.pathname = "/ai.html";
    }
}
loginBtn.addEventListener('click', login);


var icon2 = document.querySelector("#icon2");
icon2.addEventListener("click", () => {
    let passwordL = document.querySelector("#passwordL");
    if (passwordL.type === "password") {
        passwordL.type = "text";
        icon2.src = "/images/eye-regular.svg";
    } else {
        passwordL.type = "password";
        icon2.src = "/images/eye-slash-regular.svg";
    }
})

// Theme Toggler Js
const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark")
})

//Registered Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
    navigator.serviceWorker.ready.then((swReg) => {
        var options = {
            message: "This is message body.",
            icon: "/images/icons/icon-512x512.png",
        }
        swReg.showNotification("This is message title.", options);
    })
}