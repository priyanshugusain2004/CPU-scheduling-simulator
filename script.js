document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;

    function spawnCircle() {
        const circle = document.createElement("div");
        circle.classList.add("moving-circle");

        // Random size
        const size = Math.random() * 50 + 30;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;

        // Random position
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        circle.style.left = `${posX}px`;
        circle.style.top = `${posY}px`;

        // Random color
        const colors = ["rgba(0, 255, 0, 0.6)", "rgba(0, 128, 255, 0.6)", "rgba(255, 0, 255, 0.6)", "rgba(255, 165, 0, 0.6)"];
        circle.style.background = colors[Math.floor(Math.random() * colors.length)];

        body.appendChild(circle);

        // Remove circle after animation
        setTimeout(() => {
            circle.remove();
        }, 6000);
    }

    // Spawn circles at an interval
    setInterval(spawnCircle, 500);
});
