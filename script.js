console.log("Script Loaded");
let grandTotal = 0;

/* Quotation Number */
document.getElementById("quoteNo").innerHTML =
"QT-" + Math.floor(Math.random() * 10000);

/* Today's Date */
document.getElementById("today").innerHTML =
new Date().toLocaleDateString();

function addItem(){

    let client =
    document.getElementById("clientName").value;

    let project =
    document.getElementById("projectName").value;

    let location =
    document.getElementById("location").value;

    document.getElementById("clientDisplay").innerHTML =
    `
    <p><strong>Client:</strong> ${client}</p>
    <p><strong>Project:</strong> ${project}</p>
    <p><strong>Location:</strong> ${location}</p>
    <hr>
    `;

    let item =
    document.getElementById("itemName").value;

    let qty =
    Number(document.getElementById("quantity").value);

    let price =
    Number(document.getElementById("price").value);

    let amount = qty * price;

    grandTotal += amount;

    let table =
    document.getElementById("quotationTable");

    let row = table.insertRow();

    row.insertCell(0).innerHTML = item;
    row.insertCell(1).innerHTML = qty;
    row.insertCell(2).innerHTML =
    "₦" + price.toLocaleString();
    row.insertCell(3).innerHTML =
    "₦" + amount.toLocaleString();

    

    updateTotals();


}

function updateTotals(){

    document.getElementById("total").innerHTML =
    "Total: ₦" + grandTotal.toLocaleString();
}