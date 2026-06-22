// ===== QUOTE NUMBER =====
document.getElementById("quoteNo").innerText =
  "QT-" + Math.floor(Math.random() * 1000000);

// ===== DATE =====
document.getElementById("today").innerText =
  new Date().toLocaleDateString();

// ===== DATA STORAGE =====
let items = [];

// ===== SAVE CLIENT INFO =====
function saveClient() {
  let name = document.getElementById("clientName").value;
  let project = document.getElementById("projectName").value;
  let location = document.getElementById("location").value;

  document.getElementById("clientDisplay").innerHTML = `
    <h3>Client Details</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Project:</strong> ${project}</p>
    <p><strong>Location:</strong> ${location}</p>
    <hr>
  `;
}

// ===== ADD ITEM =====
function addItem() {
  let name = document.getElementById("itemName").value;
  let qty = parseFloat(document.getElementById("quantity").value);
  let price = parseFloat(document.getElementById("price").value);

  if (!name || !qty || !price) {
    alert("Fill all item fields");
    return;
  }

  let amount = qty * price;

  items.push({ name, qty, price, amount });

  renderTable();
  calculateTotal();

  document.getElementById("itemName").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
}

// ===== RENDER TABLE =====
function renderTable() {
  let tbody = document.getElementById("tableBody");

  tbody.innerHTML = "";

  items.forEach((item, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>₦${item.price}</td>
        <td>₦${item.amount}</td>
      </tr>
    `;
  });
}

// ===== TOTAL =====
function calculateTotal() {
  let total = items.reduce((sum, item) => sum + item.amount, 0);

  document.getElementById("total").innerText =
    "Total: ₦" + total.toLocaleString();
}
function saveClient() {
  let name = document.getElementById("clientName").value;
  let project = document.getElementById("projectName").value;
  let location = document.getElementById("location").value;

  document.getElementById("clientDisplay").innerHTML = `
    <h3>Client Details</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Project:</strong> ${project}</p>
    <p><strong>Location:</strong> ${location}</p>
    <hr>
  `;
}