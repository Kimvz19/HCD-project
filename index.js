console.log('hi, its working!');

document.addEventListener("DOMContentLoaded", function () {
    const chatInput = document.getElementById("chatInput");
    const chatLabels = document.querySelectorAll(".chat-ideas label");

    let selectedTexts = [];

    chatLabels.forEach((label) => {
        const checkbox = label.querySelector("input[type='checkbox']");
        const labelText = label.childNodes[0].textContent.trim(); // Alleen de tekst, zonder checkbox

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                // Voeg toe
                selectedTexts.push(labelText);
            } else {
                // Verwijder
                selectedTexts = selectedTexts.filter(text => text !== labelText);
            }

            // Zet alle geselecteerde teksten achter elkaar in het input veld
            chatInput.value = selectedTexts.join(" ");
        });
    });
});

