const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const plan = document.getElementById("plan");
const month = document.getElementById("month");
const workout = document.getElementById("workout");
const message = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br>
                         Email: ${email.value}<br>
                         Phone Number: ${phone.value}<br>
                         Plan: ${plan.value}<br>
                         Month: ${month.value}<br>
                         Workout: ${workout.value}<br>
                         Message: ${message.value}`;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "harrietwagura477@gmail.com",
        Password : "15F5425679FC15B7AFE350EB002BF1AA6AED",
        To : "harrietwagura477@gmail.com",
        From : "harrietwagura477@gmail.com",
        Subject : plan.value,
        Body : bodyMessage
    }).then(
      message => {
        if (message=="OK") {
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully!",
                icon: "success"
            });
        }
      }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value =="") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if(items[1].value != "") {
            checkEmail();
        }
        items[1].addEventListener("keyup", () => {
            checkEmail();
        })

        item.addEventListener("keyup",() => {
            if (item.value !="") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }

        else {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }
    });

}

}

function checkEmail() {
    const emailRegex = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-txt.email");

    if(!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != "") {
            errorTxtEmail.innerText = "Enter a valid email address";
        }
        else {
            errorTxtEmail.innerText = "Email can't be blank";
        }
    }

    else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}


form.addEventListener("submit",(e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !phone.classList.contains("error") && !plan.classList.contains("error") && !month.classList.contains("error") && !workout.classList.contains("error") && !message.classList.contains("error")) {
        sendEmail();
    }
});