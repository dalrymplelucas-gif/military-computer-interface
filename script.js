// Military Computer Interface - Code.HS JavaScript
// TACOPS System v2.1 - Tactical Operations Command

// Canvas setup for radar display
function setupRadar() {
    const canvas = document.getElementById("radarCanvas");
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;
    
    // Clear canvas
    ctx.fillStyle = "#0a0e27";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw radar circles
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 3) * i, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Draw crosshairs
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 10);
    ctx.lineTo(centerX, centerY + radius + 10);
    ctx.moveTo(centerX - radius - 10, centerY);
    ctx.lineTo(centerX + radius + 10, centerY);
    ctx.stroke();
    
    // Draw radar sweep
    ctx.strokeStyle = "rgba(0, 255, 0, 0.3)";
    ctx.lineWidth = 2;
    const angle = (Date.now() / 50) % (Math.PI * 2);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
    );
    ctx.stroke();
    
    // Draw random contacts
    ctx.fillStyle = "#ff0000";
    for (let i = 0; i < 5; i++) {
        const contactAngle = (Math.random() * Math.PI * 2);
        const contactDistance = Math.random() * radius;
        const x = centerX + Math.cos(contactAngle) * contactDistance;
        const y = centerY + Math.sin(contactAngle) * contactDistance;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Center dot
    ctx.fillStyle = "#00ff00";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
    ctx.fill();
}

// Command processing system
function processCommand(command) {
    const output = document.getElementById("output");
    const commands = {
        "STATUS": getSystemStatus,
        "SCAN": performAreaScan,
        "WEAPONS": weaponsSystem,
        "ALERT": redAlert,
        "COMMS": communications,
        "INTEL": intelReport,
        "DEPLOY": deployUnits,
        "HELP": showHelp
    };
    
    const cmd = command.toUpperCase().trim();
    
    if (commands[cmd]) {
        const result = commands[cmd]();
        addToTerminal(result);
    } else {
        addToTerminal("COMMAND NOT RECOGNIZED: " + command);
    }
}

// Add text to terminal output
function addToTerminal(text) {
    const output = document.getElementById("output");
    const p = document.createElement("p");
    p.textContent = "> " + text;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
}

// Command responses
function getSystemStatus() {
    return "SYSTEM STATUS: ALL SYSTEMS OPERATIONAL | POWER: 100% | COMMS: ACTIVE | SECURITY: GREEN";
}

function performAreaScan() {
    return "AREA SCAN COMPLETE: 15 CONTACTS DETECTED | NEAREST CONTACT: 2.3 NAUTICAL MILES | THREAT LEVEL: MODERATE";
}

function weaponsSystem() {
    return "WEAPONS SYSTEMS ONLINE | MISSILE COUNT: 24 | CANNON: 4500 ROUNDS | JAMMING: ACTIVE";
}

function redAlert() {
    document.getElementById("alertLevel").textContent = "RED";
    document.getElementById("alertLevel").style.color = "#ff0000";
    return "RED ALERT ACTIVATED | ALL PERSONNEL TO BATTLE STATIONS | SHIELDS AT MAXIMUM";
}

function communications() {
    return "OPENING SECURE COMMUNICATIONS CHANNEL | ENCRYPTION: AES-256 | SIGNAL STRENGTH: EXCELLENT";
}

function intelReport() {
    return "INTELLIGENCE REPORT: MULTIPLE THREATS DETECTED IN SECTOR 3 | RECOMMEND IMMEDIATE ACTION | MORE INFO: CLASSIFIED";
}

function deployUnits() {
    return "DEPLOYING UNITS | ALPHA SQUADRON EN ROUTE | ETA: 15 MINUTES | BRAVO SQUADRON STANDING BY";
}

function showHelp() {
    return "AVAILABLE COMMANDS: STATUS, SCAN, WEAPONS, ALERT, COMMS, INTEL, DEPLOY, HELP";
}

// Send command from input
function sendCommand(cmd) {
    const input = document.getElementById("commandInput");
    input.value = cmd;
    processCommand(cmd);
    input.value = "";
}

// Clear terminal
function clearTerminal() {
    document.getElementById("output").innerHTML = "";
    addToTerminal("TERMINAL CLEARED | READY FOR NEW COMMANDS");
}

// Update system time
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById("time").textContent = hours + ":" + minutes + ":" + seconds;
}

// Handle Enter key in terminal
document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("commandInput");
    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            processCommand(this.value);
            this.value = "";
        }
    });
    
    // Initialize
    setupRadar();
    updateTime();
    setInterval(updateTime, 1000);
    setInterval(setupRadar, 50);
    
    addToTerminal("SYSTEM READY | AWAITING COMMAND INPUT");
});
