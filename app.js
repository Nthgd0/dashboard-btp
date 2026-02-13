const API_URL = "https://nthgd0.app.n8n.cloud/webhook-test/dashboard";

function login() {
  const licence = document.getElementById("licence").value;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ licence_key: licence })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem("licence_key", licence);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("error").innerText = "Clé invalide";
    }
  });
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

if (window.location.pathname.includes("dashboard.html")) {
  const entreprise_id = localStorage.getItem("entreprise_id");

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ licence_key })
  })
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("devisTable");

    let total = 0;

    data.devis.forEach(d => {
      total += d.total_ttc;

      table.innerHTML += `
        <tr>
          <td>${d.numero_devis}</td>
          <td>${d.date_devis}</td>
          <td>${d.total_ttc} €</td>
          <td><a href="${d.pdf_url}" target="_blank">Voir PDF</a></td>
        </tr>
      `;
    });

    document.getElementById("count").innerText = data.devis.length;
    document.getElementById("total").innerText = total + " €";
  });
}
