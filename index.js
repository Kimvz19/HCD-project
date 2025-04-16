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

// js itemsssssss

document.addEventListener("DOMContentLoaded", () => {
    const mainTextarea = document.querySelector("textarea#chatInput");
    const allLabels = document.querySelectorAll(".card label input[type='checkbox']");
    const copyButton = document.querySelector(".control-chat button:nth-of-type(2)");
    const resetButton = document.querySelector(".control-chat button:nth-of-type(1)");
    const copyMessage = document.getElementById("copyMessage");

    let selectedPhrases = [];

    // ✅ Checkbox-klik gedrag
    allLabels.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const text = checkbox.parentElement.textContent.trim();

            if (checkbox.checked) {
                selectedPhrases.push(text);
            } else {
                selectedPhrases = selectedPhrases.filter(item => item !== text);
            }

            mainTextarea.value = selectedPhrases.join(" ");
            autoResizeTextarea(mainTextarea);
        });
    });

    // ✅ Auto-resize textarea
    function autoResizeTextarea(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    // Trigger initial resize
    autoResizeTextarea(mainTextarea);

    // Resize live bij typen
    mainTextarea.addEventListener("input", () => autoResizeTextarea(mainTextarea));

    // ✅ Kopieerknop
    copyButton.addEventListener("click", (e) => {
        e.preventDefault();
        const textToCopy = mainTextarea.value;

        navigator.clipboard.writeText(textToCopy).then(() => {
            copyMessage.style.display = "inline";
        });
    });

    // ✅ Verberg melding bij klik ergens anders
    document.addEventListener("click", (e) => {
        if (!copyButton.contains(e.target)) {
            copyMessage.style.display = "none";
        }
    });

    // ✅ Reset knop
    resetButton.addEventListener("click", () => {
        allLabels.forEach((checkbox) => {
            checkbox.checked = false;
        });

        selectedPhrases = [];
        mainTextarea.value = "";
        autoResizeTextarea(mainTextarea);
    });
});


// js dots voor nagivatie carousel
const carousel = document.querySelector(".carousel-scroll");
const cards = document.querySelectorAll(".card");
const dotsContainer = document.querySelector(".carousel-dots");

// Maak dots aan
cards.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.dataset.index = index;
  dot.addEventListener("click", () => {
    carousel.scrollTo({
      left: cards[index].offsetLeft,
      behavior: "smooth"
    });
  });
  dotsContainer.appendChild(dot);
});

// Update actieve dot op scroll
carousel.addEventListener("scroll", () => {
  const scrollLeft = carousel.scrollLeft;
  const cardWidth = cards[0].offsetWidth + 16; // 16 = gap

  const index = Math.round(scrollLeft / cardWidth);
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
});
