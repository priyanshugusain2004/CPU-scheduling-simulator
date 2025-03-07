let processes = [];
let selectedAlgorithm = "fcfs";

function selectAlgorithm() {
    selectedAlgorithm = document.getElementById("schedulingAlgorithm").value;
    alert("Selected Algorithm: " + selectedAlgorithm.toUpperCase());
}

function toggleTimeQuantum() {
    let algo = document.getElementById("schedulingAlgorithm").value;
    document.getElementById("timeQuantumLabel").style.display = (algo === "roundRobin" || algo === "mlfq") ? "inline" : "none";
    document.getElementById("timeQuantum").style.display = (algo === "roundRobin" || algo === "mlfq") ? "inline" : "none";

    document.getElementById("priorityLabel").style.display = (algo === "priority") ? "inline" : "none";
    document.getElementById("priority").style.display = (algo === "priority") ? "inline" : "none";
}

function addProcess() {
    let processId = document.getElementById("processId").value;
    let arrivalTime = parseInt(document.getElementById("arrivalTime").value);
    let burstTime = parseInt(document.getElementById("burstTime").value);
    let priority = document.getElementById("priority").value ? parseInt(document.getElementById("priority").value) : null;

    if (processId && !isNaN(arrivalTime) && !isNaN(burstTime)) {
        let process = { processId, arrivalTime, burstTime, priority };
        processes.push(process);
        displayProcesses();
    } else {
        alert("Please enter valid process details.");
    }
}

function deleteProcess(index) {
    processes.splice(index, 1);
    displayProcesses();
}

function displayProcesses() {
    let table = document.getElementById("processTable");
    table.innerHTML = "";
    processes.forEach((p, index) => {
        let row = `<tr>
            <td>${p.processId}</td>
            <td>${p.arrivalTime}</td>
            <td>${p.burstTime}</td>
            <td>${p.priority !== null ? p.priority : '-'}</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td><button class="delete-btn" onclick="deleteProcess(${index})">🗑️</button></td>
        </tr>`;
        table.innerHTML += row;
    });
}

function runScheduling() {
    let ganttChart = document.getElementById("ganttChart");
    let timeline = document.getElementById("timeline");
    
    ganttChart.innerHTML = "";
    timeline.innerHTML = "";

    let totalTime = processes.reduce((sum, p) => sum + p.burstTime, 0);
    let currentTime = 0;

    processes.forEach((p, index) => {
        let widthPercent = (p.burstTime / totalTime) * 100;
        let bar = document.createElement("div");
        bar.classList.add("gantt-bar", `p${index % 5 + 1}`);
        bar.style.width = "0%";
        bar.innerText = p.processId;

        ganttChart.appendChild(bar);

        let timeLabel = document.createElement("span");
        timeLabel.innerText = currentTime;
        timeline.appendChild(timeLabel);

        setTimeout(() => {
            bar.style.width = `${widthPercent}%`;
        }, currentTime * 1000);
        
        currentTime += p.burstTime;
    });

    let finalTimeLabel = document.createElement("span");
    finalTimeLabel.innerText = currentTime;
    timeline.appendChild(finalTimeLabel);
}
