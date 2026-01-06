import { bubbleSort, insertionSort, selectionSort, quickSort, mergeSort, radixSort, bucketSort } from "./sorting.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded");

    // 🔹 Selecting Elements
    const algorithmSelect = document.getElementById("algo-select");
    const generateArrayBtn = document.getElementById("generate-array");
    const sortBtn = document.getElementById("start-sort");
    const resetBtn = document.getElementById("reset-sort");
    const barsContainer = document.querySelector(".array-container");
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // 🔹 Theme Handling
    function applyTheme() {
        const currentTheme = localStorage.getItem("theme") || "light";
        body.classList.toggle("dark-mode", currentTheme === "dark");
        themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";
    }

    if (themeToggle) {
        applyTheme();
        themeToggle.addEventListener("click", function () {
            const newTheme = body.classList.toggle("dark-mode") ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
        });
    }

    // Ensure theme persists across page navigation
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => setTimeout(applyTheme, 100));
    });

    // 🔹 Generate New Array
    function generateNewArray() {
        barsContainer.innerHTML = "";
        let numBars = document.getElementById("array-size").value;
        let barArray = [];

        for (let i = 0; i < numBars; i++) {
            let value = Math.floor(Math.random() * 100) + 1;
            barArray.push(value);

            let bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = `${value * 3}px`;
            barsContainer.appendChild(bar);
        }
        console.log("New array generated:", barArray);
    }

    if (generateArrayBtn) generateArrayBtn.addEventListener("click", generateNewArray);

    // 🔹 Sorting Functionality
    if (sortBtn) {
        sortBtn.addEventListener("click", async function () {
            if (!algorithmSelect) return;
            sortBtn.disabled = generateArrayBtn.disabled = true;
            let algorithm = algorithmSelect.value;

            if (algorithm === "bubble") await bubbleSort();
            else if (algorithm === "insertion") await insertionSort();
            else if (algorithm === "selection") await selectionSort();
            else if (algorithm === "quick") await quickSort();
            else if (algorithm === "merge") await mergeSort(document.querySelectorAll(".bar"), 0, document.querySelectorAll(".bar").length - 1);
            else if (algorithm === "radix") await radixSort();
            else if (algorithm === "bucket") await bucketSort();

            sortBtn.disabled = generateArrayBtn.disabled = false;
        });
    }

    if (resetBtn) resetBtn.addEventListener("click", generateNewArray);

    // 🔹 Chatbot Functionality
    const chatbot = document.getElementById("chatbot-container");
    const chatbotButton = document.getElementById("chatbot-button");
    const userInput = document.getElementById("user-input"); // ✅ Fixed ID
    const chatbox = document.getElementById("chatbox");
    const messagesDiv = document.getElementById("messages"); // ✅ Added correct messages div
    const sendButton = document.getElementById("send-message"); // ✅ Ensured correct ID

    function toggleChatbot() {
        chatbot.style.display = chatbot.style.display === "block" ? "none" : "block";
    }

    if (chatbotButton) chatbotButton.addEventListener("click", toggleChatbot);

    async function sendMessage() {
        if (!userInput || !messagesDiv) return;
        let message = userInput.value.trim();
        if (!message) return;

        let userMessage = document.createElement("p");
        userMessage.textContent = "You: " + message;
        userMessage.style.fontWeight = "bold";
        messagesDiv.appendChild(userMessage); // ✅ Fixed appending to correct div

        try {
            const response = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            let botMessage = document.createElement("p");
            botMessage.textContent = "Chatbot: " + (data.reply || "Sorry, I didn't understand that.");
            botMessage.style.color = "blue";
            messagesDiv.appendChild(botMessage); // ✅ Fixed appending to correct div
        } catch (error) {
            console.error("Error:", error);
            let errorMessage = document.createElement("p");
            errorMessage.textContent = "Chatbot: Error connecting to server.";
            errorMessage.style.color = "red";
            messagesDiv.appendChild(errorMessage); // ✅ Fixed appending to correct div
        }

        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        userInput.value = "";
    }

    if (sendButton) sendButton.addEventListener("click", sendMessage);

    generateNewArray(); // Initial call to generate array
});
