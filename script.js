// =========================
// FAQ-SATROM QUOTATION SYSTEM PRO FINAL
// =========================
console.log("SCRIPT LOADED");
// ===== QUOTE NUMBER (STABLE) =====
let quoteNo = localStorage.getItem("quoteNo");

if (!quoteNo) {
  quoteNo = "QT-" + Math.floor(Math.random() * 1000000);
  localStorage.setItem("quoteNo", quoteNo);
}

document.getElementById("quoteNo").innerText = quoteNo;

// ===== DATE (STABLE) =====
let today = localStorage.getItem("today");

if (!today) {
  today = new Date().toLocaleDateString();
  localStorage.setItem("today", today);
}

document.getElementById("today").innerText = today;

// ===== DATA =====
let items = JSON.parse(localStorage.getItem("items")) || [];
let clientSaved = JSON.parse(localStorage.getItem("client")) || null;
let quotations = JSON.parse(localStorage.getItem("quotations")) || [];

// =========================
// CLIENT SAVE
// =========================
function saveClient() {
  let name = document.getElementById("clientName").value;
  let project = document.getElementById("projectName").value;
  let location = document.getElementById("location").value;

  if (!name || !project || !location) {
    alert("Fill all client details");
    return;
  }

  let client = { name, project, location };

  localStorage.setItem("client", JSON.stringify(client));
  clientSaved = client;

  document.getElementById("clientDisplay").innerHTML = `
    <h3>Client Details</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Project:</strong> ${project}</p>
    <p><strong>Location:</strong> ${location}</p>
    <hr>
  `;

  document.getElementById("clientName").disabled = true;
  document.getElementById("projectName").disabled = true;
  document.getElementById("location").disabled = true;
}

// =========================
// ADD ITEM
// =========================
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

  localStorage.setItem("items", JSON.stringify(items));

  renderTable();
  calculateTotal();

  document.getElementById("itemName").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
}

// =========================
// DELETE ITEM
// =========================
function deleteItem(index) {
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  renderTable();
  calculateTotal();
}

// =========================
// RENDER TABLE
// =========================
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
        <td><button onclick="deleteItem(${index})">Delete</button></td>
      </tr>
    `;
  });
}

// =========================
// TOTAL CALCULATION
// =========================
function calculateTotal() {
  let total = items.reduce((sum, item) => sum + item.amount, 0);

  document.getElementById("total").innerText =
    "Total: ₦" + total.toLocaleString();
}

// =========================
// RESTORE ON LOAD
// =========================
window.onload = function () {
  renderTable();
  calculateTotal();
  renderDashboard();

  if (clientSaved) {
    document.getElementById("clientDisplay").innerHTML = `
      <h3>Client Details</h3>
      <p><strong>Name:</strong> ${clientSaved.name}</p>
      <p><strong>Project:</strong> ${clientSaved.project}</p>
      <p><strong>Location:</strong> ${clientSaved.location}</p>
      <hr>
    `;

    document.getElementById("clientName").disabled = true;
    document.getElementById("projectName").disabled = true;
    document.getElementById("location").disabled = true;
  }
};

// =========================
// SAVE QUOTATION
// =========================
function saveQuotation() {
  let client = JSON.parse(localStorage.getItem("client"));
  let items = JSON.parse(localStorage.getItem("items")) || [];

  if (!client || items.length === 0) {
    alert("Add client and items before saving");
    return;
  }

  let total = items.reduce((sum, item) => sum + item.amount, 0);

  let newQuote = {
    id: "QT-" + Date.now(),
    date: new Date().toLocaleDateString(),
    client,
    items,
    total
  };

  quotations.push(newQuote);

  localStorage.setItem("quotations", JSON.stringify(quotations));

  renderDashboard();

  alert("Quotation Saved Successfully!");
}

// =========================
// DASHBOARD
// =========================
function renderDashboard() {
  let dashboard = document.getElementById("dashboard");
  if (!dashboard) return;

  let sorted = [...quotations].reverse();

  dashboard.innerHTML = "";

  sorted.forEach((q, index) => {
    dashboard.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
        <h3>${q.id}</h3>
        <p><strong>Client:</strong> ${q.client.name}</p>
        <p><strong>Project:</strong> ${q.client.project}</p>
        <p><strong>Total:</strong> ₦${q.total.toLocaleString()}</p>
        <p><strong>Date:</strong> ${q.date}</p>

        <button onclick="openQuotation(${index})">Open</button>
      </div>
    `;
  });
}

// =========================
// OPEN QUOTATION (FIXED)
// =========================
function openQuotation(index) {
  let sorted = [...quotations].reverse();
  let q = sorted[index];

  if (!q) {
    alert("Quotation not found");
    return;
  }

  let content = document.getElementById("invoiceContent");

  content.innerHTML = `
    <h2>FAQ-SATROM ENTERPRISES LTD</h2>

    <p><strong>Quotation ID:</strong> ${q.id}</p>
    <p><strong>Date:</strong> ${q.date}</p>

    <hr>

    <h3>Client Details</h3>
    <p><strong>Name:</strong> ${q.client.name}</p>
    <p><strong>Project:</strong> ${q.client.project}</p>
    <p><strong>Location:</strong> ${q.client.location}</p>

    <hr>

    <h3>Items</h3>
    <table border="1" width="100%">
      <tr>
        <th>Item</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Amount</th>
      </tr>
      ${q.items.map(item => `
        <tr>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>₦${item.price}</td>
          <td>₦${item.amount}</td>
        </tr>
      `).join("")}
    </table>

    <h2>Total: ₦${q.total.toLocaleString()}</h2>
  `;

  document.getElementById("dashboard").style.display = "none";
  document.getElementById("invoiceView").style.display = "block";
}

// =========================
// CLOSE INVOICE
// =========================
function closeInvoice() {
  document.getElementById("invoiceView").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}

// =========================
// PDF EXPORT (FULL)
// =========================
function downloadPDF() {

  const client = JSON.parse(localStorage.getItem("client")) || {};

  const notes = document.getElementById("notes").value;

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  let rows = "";

  items.forEach(item => {
    rows += `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>₦${Number(item.price).toLocaleString()}</td>
        <td>₦${Number(item.amount).toLocaleString()}</td>
      </tr>
    `;
  });

  const pdfContent = `
    <div style="padding:20px;font-family:Arial,sans-serif;">

      <h1 style="text-align:center;">
        FAQ-SATROM ENTERPRISES LTD
      </h1>

      <p><strong>Quotation No:</strong> ${quoteNo}</p>
      <p><strong>Date:</strong> ${today}</p>

      <hr>

      <h3>Client Details</h3>

      <p><strong>Name:</strong> ${client.name || ""}</p>
      <p><strong>Project:</strong> ${client.project || ""}</p>
      <p><strong>Location:</strong> ${client.location || ""}</p>

      <hr>

      <h3>Items</h3>

      <table border="1" width="100%" cellspacing="0" cellpadding="5">
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Unit Price</th>
          <th>Amount</th>
        </tr>

        ${rows}
      </table>

      <div style="
        margin-top:20px;
        text-align:right;
        font-size:20px;
        font-weight:bold;
      ">
        Total: ₦${total.toLocaleString()}
      </div>

      <div style="margin-top:30px;">
        <h3>Notes</h3>

        <div style="
          border:1px solid #ccc;
          padding:10px;
          white-space:pre-wrap;
        ">
          ${notes}
        </div>
      </div>

      <div style="margin-top:40px;">
        <p><strong>Prepared By:</strong></p>
        <p>FAQ-SATROM ENTERPRISES LTD</p>
      </div>

    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = pdfContent;

  html2pdf()
    .set({
      margin: 10,
      filename: `Quotation-${quoteNo}.pdf`,
      image: {
        type: "jpeg",
        quality: 1
      },
      html2canvas: {
        scale: 2,
        useCORS: true
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      },
      pagebreak: {
        mode: ["css", "legacy"]
      }
    })
    .from(container)
    .save();
}
function resetQuotation() {
  localStorage.removeItem("items");
  localStorage.removeItem("client");

  items = [];
  clientSaved = null;

  document.getElementById("clientName").disabled = false;
  document.getElementById("projectName").disabled = false;
  document.getElementById("location").disabled = false;

  document.getElementById("clientName").value = "";
  document.getElementById("projectName").value = "";
  document.getElementById("location").value = "";

  document.getElementById("clientDisplay").innerHTML = "";
  renderTable();
  calculateTotal();

  alert("Ready for new quotation");
}
function clearItems() {
  items = [];
  localStorage.removeItem("items");

  renderTable();
  calculateTotal();

  alert("Items cleared");
}