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
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

const signUp = () => {
    let emailS = document.querySelector("#emailS").value;
    // Regular expression for a simple email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordS = document.querySelector("#passwordS").value;
    let cPasswordS = document.querySelector("#cPasswordS").value;
    if (emailS === "") {
        toastr.error("Please eneter email.");
        return;
    } if (!emailRegex.test(emailS)) {
        toastr.error("Invalid email.");
        return;
    } if (passwordS === "") {
        toastr.error("Please type password.");
        return;
    } if (cPasswordS === "") {
        toastr.error("Please Re-type password.")
        return;
    } if (passwordS.length < 6 && cPasswordS.length < 6) {
        toastr.info("Passwrord must be at least 6 character.");
        return;
    } if (passwordS !== cPasswordS) {
        toastr.info("Please match the password.");
        return;
    } else {
        toastr.success("Registered Successfully.");
        var userData = {
            email: emailS,
            password: passwordS,
            confirmpassword: cPasswordS,
        }
    }
    localStorage.setItem("userData", JSON.stringify(userData));
    location.pathname = "/login.html";

}

signupBtn.addEventListener("click", signUp);

var icon1 = document.querySelector("#icon1");

icon1.addEventListener("click", () => {
    let passwordS = document.querySelector("#passwordS");
    if (passwordS.type === "password") {
        passwordS.type = "text";
        icon1.src = "/images/eye-regular.svg";
    } else {
        passwordS.type = "password";
        icon1.src = "/images/eye-slash-regular.svg";
    }
})

var icon2 = document.querySelector("#icon2");
icon2.addEventListener("click", () => {
    let cPasswordS = document.querySelector("#cPasswordS");
    if (cPasswordS.type === "password") {
        cPasswordS.type = "text";
        icon2.src = "/images/eye-regular.svg";
    } else {
        cPasswordS.type = "password";
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

