const notification = document.getElementById("notification-container");
const message = document.getElementById("notification");
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    // 1. stop the page from reloading instantly
    e.preventDefault();


    // collecting all field
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const msgContent = document.getElementById("message").value.trim();
    const phoneNo = document.getElementById("phone-no").value.trim();

    if (!username && !email && !msgContent && !phoneNo) {
        alert("please fill in all fields");
    }

    // 2. prepare the form data to send in the background

    const formData = new FormData(form);

    try {
        //3. send the data to formspree using fetch
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // 4. show success notification if formspree accepted it 
            notification.style.display = "block";
            message.textContent = `Message sent successfully`;
            form.reset();
        } else {
            alert("Oops! there was a problem submitting your form");
        }   
    } catch (error) {
        console.error("Error submitting form:", error);
    }
});

// close button for the notification message
const closebtn = document.getElementById("close");
closebtn.onclick = function () {
    notification.style.display = "none";
}