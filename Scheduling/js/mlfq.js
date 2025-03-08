let processes = [
    { id: "P1", burst: 5, queue: 1 },
    { id: "P2", burst: 10, queue: 1 },
    { id: "P3", burst: 15, queue: 2 },
];

function startSimulation() {
    let queueElements = [
        document.getElementById("queue1"),
        document.getElementById("queue2"),
        document.getElementById("queue3"),
    ];

    let index = 0;

    function moveProcess() {
        if (index < processes.length) {
            let process = processes[index];
            let queueIndex = process.queue - 1;
            let processDiv = document.createElement("div");

            processDiv.className = "process";
            processDiv.innerText = process.id;
            processDiv.style.background = queueIndex === 0 ? "cyan" : queueIndex === 1 ? "orange" : "red";

            queueElements[queueIndex].appendChild(processDiv);

            setTimeout(() => {
                processDiv.remove();
                process.queue = process.queue < 3 ? process.queue + 1 : 3; // Move to lower queue
                index++;
                moveProcess();
            }, 2000);
        }
    }

    moveProcess();
}
