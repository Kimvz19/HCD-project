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

document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('chatInput');

    function autoResize() {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    // Trigger bij invoer
    textarea.addEventListener('input', autoResize);

    // Initiale check (bijv. als er al tekst in staat)
    autoResize();
});


document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.querySelector('button:nth-of-type(2)'); // tweede knop = copy
    const copyMessage = document.getElementById('copyMessage');
    const chatInput = document.getElementById('chatInput');

    copyBtn.addEventListener('click', (e) => {
        e.preventDefault(); // voorkom standaard gedrag

        // Kopieer tekst uit de textarea
        const text = chatInput.value;
        navigator.clipboard.writeText(text).then(() => {
            // Laat de gekopieerd-message zien
            copyMessage.style.display = 'inline';
        });
    });

    // Verberg de melding als ergens anders wordt geklikt
    document.addEventListener('click', (e) => {
        if (!copyBtn.contains(e.target)) {
            copyMessage.style.display = 'none';
        }
    });
});

