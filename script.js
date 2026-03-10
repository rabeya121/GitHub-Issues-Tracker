// ================= LOGIN =================

function login() {

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    if (username === "admin" && password === "admin123") {

        localStorage.setItem("login", true)
        window.location.href = "index.html"

    } else {

        alert("Invalid Credentials")

    }

}



// ================= LOAD ISSUES =================

let allIssues = []

async function loadIssues() {

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

    const data = await res.json()

    allIssues = data.data

    document.querySelector("h3.font-bold").innerText =
        allIssues.length + " Issues";

    displayIssues(allIssues)

}

loadIssues()



// // ================= DISPLAY ISSUES =================

// function displayIssues(issues) {

// const container = document.getElementById("issueContainer")

// container.innerHTML = ""

// issues.forEach(issue => {

// const div = document.createElement("div")

// // ===== DATE FORMAT =====
// const date = new Date(issue.createdAt).toLocaleDateString()


// const shortDescription = issue.description.slice(0, 80) + "..."


// // ===== LABEL BADGES =====
// let labelBadges = "";

// const label = issue.label?.toLowerCase() || "";

// // যদি label ENHANCEMENT হয়
// if(label === "enhancement"){
//     labelBadges = `<span class="badge badge-success gap-1">
//         <i class="fa-solid fa-lightbulb"></i> ENHANCEMENT
//     </span>`;
// } else {
//     // সব অন্য label এর জন্য BUG + HELP WANTED
//     labelBadges = `
//     <span class="badge badge-error gap-1">
//         <i class="fa-solid fa-bug"></i> BUG
//     </span>
//     <span class="badge badge-warning gap-1">
//         <i class="fa-solid fa-life-ring"></i> HELP WANTED
//     </span>`;
// }
// // ===== PRIORITY BASED ICON =====

// let statusIcon = "";

// if(issue.priority.toLowerCase() === "low"){
//     statusIcon = "./assets/Closed.png";
// }else{
//     statusIcon = "./assets/Open.png";
// }


// // ===== BORDER COLOR =====

// const borderColor =
// issue.status === "open"
// ? "border-green-500"
// : "border-purple-500"


// // ===== PRIORITY COLOR =====

// let priorityColor="bg-gray-200 text-gray-600"

// if(issue.priority==="HIGH"){
// priorityColor="bg-red-100 text-red-600"
// }
// else if(issue.priority==="MEDIUM"){
// priorityColor="bg-yellow-100 text-yellow-700"
// }
// else{
// priorityColor="bg-gray-200 text-gray-600"
// }


// // ===== CARD STYLE =====

// div.className = `
// bg-white p-4 rounded-lg shadow
// border-t-4 ${borderColor}
// cursor-pointer
// hover:shadow-lg
// transition
// `


// // ===== CARD HTML =====

// div.innerHTML = `

// <div class="flex justify-between items-center mb-2">

// <div class="flex items-center gap-2">

// <img src="${statusIcon}" class="w-5 h-5">

// </div>

// <span class="text-xs px-3 py-1 rounded-full ${priorityColor}">
// ${issue.priority}
// </span>

// </div>


// <h3 class="font-semibold text-sm mb-2">
// ${issue.title}
// </h3>


// <p class="text-xs text-gray-500 mb-3">
// ${shortDescription}
// </p>


// <div class="flex gap-2 mb-3">
// ${labelBadges}
// </div>


// <div class="border-t pt-3 text-xs text-gray-400">

// <p>${issue.author}</p>

// <p>${date}</p>

// </div>

// `

// div.onclick = () => openModal(issue)

// container.appendChild(div)

// })

// }
// 
function displayIssues(issues) {
    const container = document.getElementById("issueContainer");
    container.innerHTML = "";

    issues.forEach(issue => {
        const div = document.createElement("div");

        // ===== DATE =====
        const date = new Date(issue.createdAt).toLocaleDateString();
        const shortDescription = issue.description ? issue.description.slice(0, 80) + "..." : "";

        // ===== PRIORITY ICON =====
        let statusIcon = issue.priority?.toLowerCase() === "low" ? "./assets/Closed.png" : "./assets/Open.png";

        // ===== BORDER COLOR =====
        const borderColor = issue.status?.toLowerCase() === "open" ? "border-green-500" : "border-purple-500";

        // ===== PRIORITY COLOR =====
        let priorityColor = "bg-gray-200 text-gray-600 font-semibold uppercase";
        const priority = issue.priority?.toLowerCase();
        if (priority === "high") priorityColor = "bg-red-100 text-red-600 font-semibold uppercase";
        else if (priority === "medium") priorityColor = "bg-yellow-100 text-yellow-700 font-semibold uppercase";

        // ===== LABEL BADGES LOGIC =====
        let labelBadges = "";
        let labels = [];

        if (Array.isArray(issue.label)) {
            labels = issue.label.map(l => l.toLowerCase());
        } else if (issue.label) {
            labels = [issue.label.toLowerCase()];
        }

        if (labels.includes("enhancement")) {
            labelBadges = `<span class="badge bg-green-100 text-green-700 font-medium gap-1">
                        <i class="fa-solid fa-lightbulb"></i> ENHANCEMENT
                   </span>`;
        } else {
            labelBadges = `<span class="badge bg-red-100 text-red-700 font-medium gap-1">
                        <i class="fa-solid fa-bug"></i> BUG
                   </span>
                   <span class="badge  bg-yellow-100 text-yellow-600 font-medium gap-1">
                        <i class="fa-solid fa-life-ring"></i> HELP WANTED
                   </span>`;
        }

        // ===== CARD STYLE =====
        div.className = `
            bg-white p-4 rounded-lg shadow
            border-t-4 ${borderColor}
            cursor-pointer
            hover:shadow-lg
            transition
        `;

        // ===== CARD HTML =====
        div.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-2">
                    <img src="${statusIcon}" class="w-5 h-5">
                </div>
                <span class="text-xs px-3 py-1 rounded-full ${priorityColor}">
                    ${issue.priority || "N/A"}
                </span>
            </div>

            <h3 class="font-bold text-sm mb-2 truncate">
                ${issue.title || "Untitled"}
            </h3>

            <p class="text-xs text-gray-500 mb-3">
                ${shortDescription}
            </p>

            <div class="flex gap-2 mb-3">
                ${labelBadges}
            </div>

            <div class="border-t pt-3 text-xs text-gray-400">
                <p>#1 by ${issue.author || "Unknown"}</p>
                <p>${date}</p>
            </div>
        `;

        div.onclick = () => openModal(issue);
        container.appendChild(div);
    });
}



// ================= FILTER =================

function filterIssues(status) {

    const filtered = allIssues.filter(issue => issue.status === status)

    displayIssues(filtered)

}



// ================= SEARCH =================

async function searchIssue() {

    const text = document.getElementById("searchInput").value

    const res = await fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
    )

    const data = await res.json()

    displayIssues(data.data)

}



// ================= MODAL =================

function openModal(issue) {

document.getElementById("modalTitle").innerText = issue.title

document.getElementById("modalDescription").innerText = issue.description

document.getElementById("modalAuthor").innerText =
"Opened by " + issue.author


document.getElementById("modalAssignee").innerText =
issue.author


// DATE
const date = new Date(issue.createdAt).toLocaleDateString()

document.getElementById("modalDate").innerText = date



// ===== LABEL (BUG + HELP WANTED) =====

document.getElementById("modalLabel").innerHTML = `
<span class="bg-red-100 text-red-600 text-xs px-2 py-1 rounded flex items-center gap-1">
<i class="fa-solid fa-bug"></i> BUG
</span>

<span class="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded flex items-center gap-1">
<i class="fa-solid fa-life-ring"></i> HELP WANTED
</span>
`





// ===== PRIORITY BADGE =====

let priorityColor = "bg-gray-200 text-gray-600 font-semibold uppercase";

const priority = issue.priority?.toLowerCase();

if (priority === "high") {
    priorityColor = "bg-red-600 text-white font-semibold uppercase";
}
else if (priority === "medium") {
    priorityColor = "bg-yellow-600 text-white font-semibold uppercase";
}

const priorityBadge = document.getElementById("modalPriority");

priorityBadge.className =
`px-3 py-1 rounded-full text-xs inline-block ${priorityColor}`;

priorityBadge.innerText = issue.priority;


document.getElementById("issueModal").showModal()

}



// ================= ACTIVE TAB =================

function activeTab(tab) {

    document.getElementById("allTab").classList.remove("btn-active")
    document.getElementById("openTab").classList.remove("btn-active")
    document.getElementById("closedTab").classList.remove("btn-active")

    document.getElementById(tab).classList.add("btn-active")

}


function closeModal(){
    document.getElementById("issueModal").close()
}