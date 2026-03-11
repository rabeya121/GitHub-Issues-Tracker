// -----------------------------LOGINPAGE---------------------------------

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


// ----------------INDEX.HTML Start---------------------------
//  LOAD ISSUES 

let allIssues = []

async function loadIssues() {

document.getElementById("loader").style.display = "flex"

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

const data = await res.json()

allIssues = data.data

document.getElementById("loader").style.display = "none"

displayIssues(allIssues)

}

loadIssues()

function updateIssueCount(issues) {

    document.querySelector("h3.font-bold").innerText =
        issues.length + " Issues";

}



// // DISPLAY ISSUES 

 
function displayIssues(issues) {
    updateIssueCount(issues)
    const container = document.getElementById("issueContainer");
    container.innerHTML = "";

    issues.forEach(issue => {
        const div = document.createElement("div");

        //  DATE
        const date = new Date(issue.createdAt).toLocaleDateString();
        const shortDescription = issue.description ? issue.description.slice(0, 80) + "..." : "";

        // PRIORITY ICON
        let statusIcon = issue.priority?.toLowerCase() === "low" ? "./assets/Closed.png" : "./assets/Open.png";

        // BORDER COLOR 
        const borderColor = issue.status?.toLowerCase() === "open" ? "border-green-500" : "border-purple-500";

        // PRIORITY COLOR 
        let priorityColor = "bg-gray-200 text-gray-600 font-semibold uppercase";
        const priority = issue.priority?.toLowerCase();
        if (priority === "high") priorityColor = "bg-red-100 text-red-600 font-semibold uppercase";
        else if (priority === "medium") priorityColor = "bg-yellow-100 text-yellow-700 font-semibold uppercase";

        //-------------------LABEL (BUG + HELP WANTED / ENHANCEMENT)------------------
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
            labelBadges = `<span class="badge bg-red-200 text-red-700 font-medium gap-1">
                        <i class="fa-solid fa-bug"></i> BUG
                   </span>
                   <span class="badge  bg-yellow-200 text-yellow-600 font-medium gap-1">
                        <i class="fa-solid fa-life-ring"></i> HELP WANTED
                   </span>`;
        }

        document.getElementById("modalLabel").innerHTML = labelBadges;

        

        // ------CARD STYLE------
        div.className = `
            bg-white p-4 rounded-lg shadow
            border-t-4 ${borderColor}
            cursor-pointer
            hover:shadow-lg
            transition
        `;

        // ------CARD HTML------
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



//  FILTER ISSUES BASED ON STATUS

function filterIssues(status) {

    const filtered = allIssues.filter(issue => issue.status === status)

    displayIssues(filtered)

}



//--------------SEARCH----------------------

async function searchIssue() {

    const text = document.getElementById("searchInput").value

    const res = await fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
    )

    const data = await res.json()

    displayIssues(data.data)

}



// ----------------MODAL-----------------


async function openModal(issue) {

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issue.id}`
)

const data = await res.json()

const singleIssue = data.data


document.getElementById("modalTitle").innerText = singleIssue.title;
document.getElementById("modalDescription").innerText = singleIssue.description;


// DATE
const date = new Date(singleIssue.createdAt).toLocaleDateString()


// STATUS
const status = singleIssue.status.toLowerCase();

let badgeColor = "bg-green-600";
let dotColor = "bg-green-500";
let statusText = "Opened";

if(status === "closed"){
    badgeColor = "bg-purple-600";
    dotColor = "bg-purple-500";
    statusText = "Closed";
}

// STATUS BADGE
const statusBadge = document.getElementById("modalStatus");
statusBadge.className = `px-3 py-1 rounded-full text-xs text-white ${badgeColor}`;
statusBadge.innerText = statusText;

// AUTHOR
document.getElementById("modalAuthor").innerText =
"Opened by " + singleIssue.author;


// DATE
document.getElementById("modalDate").innerText = date;


// ASSIGNEE
document.getElementById("modalAssignee").innerText = singleIssue.assignee || "Unassigned";


// -------------------LABEL (BUG + HELP WANTED / ENHANCEMENT)------------------

let labelBadges = "";
let labels = [];

if (Array.isArray(singleIssue.label)) {
    labels = singleIssue.label.map(l => l.toLowerCase());
} else if (singleIssue.label) {
    labels = [singleIssue.label.toLowerCase()];
}

if (labels.includes("enhancement")) {
    labelBadges = `
    <span class="bg-green-200 text-green-700 text-xs px-2 py-1 rounded flex items-center gap-1">
        <i class="fa-solid fa-lightbulb"></i> ENHANCEMENT
    </span>`;
} else {
    labelBadges = `
    <span class="bg-red-200 text-red-600 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
        <i class="fa-solid fa-bug"></i> BUG
    </span>

    <span class="bg-yellow-200 text-yellow-600 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
        <i class="fa-solid fa-life-ring"></i> HELP WANTED
    </span>`;
}

 document.getElementById("modalLabel").innerHTML = labelBadges;


// -----------------Priority section-------------------

let priorityColor = "bg-gray-200 text-gray-600 font-semibold uppercase";

const priority = singleIssue.priority?.toLowerCase();

if (priority === "high") {
    priorityColor = "bg-red-600 text-white font-semibold uppercase";
}
else if (priority === "medium") {
    priorityColor = "bg-yellow-600 text-white font-semibold uppercase";
}

const priorityBadge = document.getElementById("modalPriority");

priorityBadge.className =
`px-3 py-1 rounded-full text-xs inline-block ${priorityColor}`;

priorityBadge.innerText = singleIssue.priority;


document.getElementById("issueModal").showModal()

}


// ------------------BUTTON-TAB -------------------------

function activeTab(tab) {

    document.getElementById("allTab").classList.remove("btn-primary")
    document.getElementById("openTab").classList.remove("btn-primary")
    document.getElementById("closedTab").classList.remove("btn-primary")

    document.getElementById(tab).classList.add("btn-primary")

}


function closeModal(){
    document.getElementById("issueModal").close()
}