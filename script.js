let tasks = [];
document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();

    let taskName = document.getElementById("taskName").value;
    let subject = document.getElementById("subject").value;
    let dueDate = document.getElementById("dueDate").value;

    let task = { taskName, subject, dueDate };
    tasks.push(task);

    displayTasks(tasks);
});

const displayTasks = (taskArray) => {
    let table = document.getElementById("taskTable");
    table.innerHTML = "";

    taskArray.forEach(({ taskName, subject, dueDate }) => {
        let row = `
        <tr>
            <td>${taskName}</td>
            <td>${subject}</td>
            <td>${dueDate}</td>
        </tr>`;
        table.innerHTML += row;
    });
};
fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
.then(res => res.json())
.then(data => {
    data.forEach(item => {
        tasks.push({
            taskName: item.title,
            subject: "API",
            dueDate: "2026-05-10"
        });
    });
    displayTasks(tasks);
});
document.getElementById("filterSubject").addEventListener("change", function () {
    let value = this.value;

    if (value === "All") {
        displayTasks(tasks);
    } else {
        let filtered = tasks.filter(t => t.subject === value);
        displayTasks(filtered);
    }
});

function sortTasks() {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    displayTasks(tasks);
}