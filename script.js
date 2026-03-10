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

displayIssues(allIssues)

}

loadIssues()



// ================= DISPLAY ISSUES =================

function displayIssues(issues) {

const container = document.getElementById("issueContainer")

container.innerHTML = ""

issues.forEach(issue => {

const div = document.createElement("div")



// ===== PRIORITY BASED ICON =====

let statusIcon=""

if(issue.priority === "LOW"){
statusIcon="./assets/Closed.png"
}else{
statusIcon="./assets/Open.png"
}


// ===== BORDER COLOR =====

const borderColor =
issue.status === "open"
? "border-green-500"
: "border-purple-500"


// ===== PRIORITY COLOR =====

let priorityColor="bg-gray-200 text-gray-600"

if(issue.priority==="HIGH"){
priorityColor="bg-red-100 text-red-600"
}
else if(issue.priority==="MEDIUM"){
priorityColor="bg-yellow-100 text-yellow-700"
}
else{
priorityColor="bg-gray-200 text-gray-600"
}


// ===== CARD STYLE =====

div.className = `
bg-white p-4 rounded-lg shadow
border-t-4 ${borderColor}
cursor-pointer
hover:shadow-lg
transition
`


// ===== CARD HTML =====

div.innerHTML = `

<div class="flex justify-between items-center mb-2">

<div class="flex items-center gap-2">

<img src="${statusIcon}" class="w-5 h-5">

</div>

<span class="text-xs px-3 py-1 rounded-full ${priorityColor}">
${issue.priority}
</span>

</div>


<h3 class="font-semibold text-sm mb-2">
${issue.title}
</h3>


<p class="text-xs text-gray-500 mb-3">
${issue.description}
</p>


<div class="flex gap-2 mb-3">

<span class="badge badge-error">BUG</span>
<span class="badge badge-warning">HELP WANTED</span>

</div>


<div class="border-t pt-3 text-xs text-gray-400">

<p>#1 by ${issue.author}</p>

<p>${issue.createdAt}</p>

</div>

`

div.onclick = () => openModal(issue)

container.appendChild(div)

})

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
document.getElementById("modalAuthor").innerText = "Author: " + issue.author
document.getElementById("modalPriority").innerText = "Priority: " + issue.priority
document.getElementById("modalLabel").innerText = "Label: " + issue.label
document.getElementById("modalDate").innerText = "Created: " + issue.createdAt

document.getElementById("issueModal").showModal()

}



// ================= ACTIVE TAB =================

function activeTab(tab) {

document.getElementById("allTab").classList.remove("btn-active")
document.getElementById("openTab").classList.remove("btn-active")
document.getElementById("closedTab").classList.remove("btn-active")

document.getElementById(tab).classList.add("btn-active")

}