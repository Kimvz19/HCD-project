console.log('hi, its working!');

document.addEventListener("DOMContentLoaded", () => {

    // ⭐️ Variabelen
    const chatInput = document.getElementById("chatInput");
    const allCheckboxes = document.querySelectorAll(".card label input[type='checkbox']");
    const copyButton = document.querySelector(".control-chat button:nth-of-type(2)");
    const resetButton = document.querySelector(".control-chat button:nth-of-type(1)");
    const copyMessage = document.getElementById("copyMessage");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const carousel = document.querySelector(".carousel-scroll");
    const cards = document.querySelectorAll(".card");
    const dotsContainer = document.querySelector(".carousel-dots");

    let selectedPhrases = [];

    // aangevinkte inputs worden toegevoegd aan de array = selectedPhrases
    allCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const text = checkbox.parentElement.textContent.trim();

            if (checkbox.checked) {
                selectedPhrases.push(text);
            } else {
                selectedPhrases = selectedPhrases.filter(item => item !== text);
            }

            chatInput.value = selectedPhrases.join(" ");
            autoResizeTextarea(chatInput);
        });
    });


    // Resizing textarea op basis van chatInput
    function autoResizeTextarea(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    chatInput.addEventListener("input", () => autoResizeTextarea(chatInput));
    autoResizeTextarea(chatInput);
  
    // ⭐️ copy & reset ⭐️//
    copyButton.addEventListener("click", (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(chatInput.value).then(() => {
            copyMessage.style.display = "inline";
            
            // Hide message after 2 seconds
            setTimeout(() => {
                copyMessage.style.display = "none";
            }, 2000);
        });
    });

    document.addEventListener("click", (e) => {
        if (!copyButton.contains(e.target)) {
            copyMessage.style.display = "none";
        }
    });

    // ✅ Reset
    resetButton.addEventListener("click", () => {
        allCheckboxes.forEach(checkbox => checkbox.checked = false);
        selectedPhrases = [];
        chatInput.value = "";
        autoResizeTextarea(chatInput);
    });

    // claude ai : https://claude.ai/share/9172fb17-f704-4b55-b13c-4265729b8468
    // for filter & carousel
    // ✅ Filter A-Z en Z-A 
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Prevent form submission since buttons are inside a form
            e.preventDefault();
            
            const filterType = btn.dataset.filter;
            console.log(`🔁 Filter button clicked: ${filterType}`);
            
            // Update active state on filter buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            cards.forEach(card => {
                const ul = card.querySelector("ul");
                if (!ul) return;

                // Store current checkbox states and text content
                const items = Array.from(ul.querySelectorAll("li"));
                const itemData = items.map(item => {
                    const checkbox = item.querySelector("input[type='checkbox']");
                    const label = item.querySelector("label");
                    return {
                        element: item,
                        text: label ? label.textContent.trim() : "",
                        checked: checkbox ? checkbox.checked : false
                    };
                });

                // Sort the data
                itemData.sort((a, b) => {
                    return filterType === "az" 
                        ? a.text.localeCompare(b.text, 'nl', {sensitivity: 'base'}) 
                        : b.text.localeCompare(a.text, 'nl', {sensitivity: 'base'});
                });

                // Clear and rebuild the list
                ul.innerHTML = '';
                itemData.forEach(data => {
                    // Clone the original element to preserve event listeners
                    const clonedItem = data.element.cloneNode(true);
                    
                    // Restore checkbox state
                    const checkbox = clonedItem.querySelector("input[type='checkbox']");
                    if (checkbox) checkbox.checked = data.checked;
                    
                    // Re-add change event listener
                    if (checkbox) {
                        checkbox.addEventListener("change", () => {
                            const text = checkbox.parentElement.textContent.trim();
                            
                            if (checkbox.checked) {
                                selectedPhrases.push(text);
                            } else {
                                selectedPhrases = selectedPhrases.filter(item => item !== text);
                            }
                            
                            chatInput.value = selectedPhrases.join(" ");
                            autoResizeTextarea(chatInput);
                        });
                    }
                    
                    ul.appendChild(clonedItem);
                });
            });
        });
    });



    // ✅ Carousel dots
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

    carousel.addEventListener("scroll", () => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 16; // 16 = gap
        const index = Math.round(scrollLeft / cardWidth);

        document.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    });
    
    // Add user-generated phrases from chat input to custom phrases list
    const chatTextarea = document.querySelector(".chat-text");
    const addButton = document.querySelector(".icon-left");
    const confirmButton = document.querySelector(".icon-right");
    
    if (addButton && confirmButton && chatTextarea) {
        confirmButton.addEventListener("click", () => {
            const customText = chatTextarea.value.trim();
            if (customText) {
                const customPhrasesList = document.querySelector(".card:first-child ul");
                if (customPhrasesList) {
                    // Create new list item with checkbox
                    const newItem = document.createElement("li");
                    const newLabel = document.createElement("label");
                    const newCheckbox = document.createElement("input");
                    newCheckbox.type = "checkbox";
                    
                    newLabel.appendChild(newCheckbox);
                    newLabel.appendChild(document.createTextNode(` ${customText}`));
                    newItem.appendChild(newLabel);
                    customPhrasesList.appendChild(newItem);
                    
                    // Add event listener to new checkbox
                    newCheckbox.addEventListener("change", () => {
                        if (newCheckbox.checked) {
                            selectedPhrases.push(customText);
                        } else {
                            selectedPhrases = selectedPhrases.filter(item => item !== customText);
                        }
                        chatInput.value = selectedPhrases.join(" ");
                        autoResizeTextarea(chatInput);
                    });
                    
                    // Clear the input field
                    chatTextarea.value = "";
                }
            }
        });
    }
});