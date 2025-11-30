const { readData, processRecruitment } = require("../utils/helpers");

const renderPage = (content) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BNCC Elite Team Recruitment</title>
        <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
        <div class="container">
            ${content}
        </div>
    </body>
    </html>
    `;
};

// --- CONTROLLERS ---

const getHome = (req, res) => {
  const html = `
        <div class="text-center">
            <h1>BNCC Elite Team Recruitment</h1>
            <p>Join the most prestigious tech community.</p>
            <div class="result-box">
                <p><strong>Open Positions:</strong><br> Web Development, UI/UX, Business IT Case (BIC)</p>
            </div>
            <hr>
            <a href="/register" class="btn btn-primary">Apply Now</a>
            <br><br>
            <a href="/candidates" class="btn-link">View Candidate List</a>
        </div>
    `;
  res.send(renderPage(html));
};

const getRegisterForm = (req, res) => {
  const html = `
        <a href="/" class="btn-back">&larr; Back to Home</a>
        <div class="text-center">
            <h2>Candidate Registration</h2>
            <p>Please fill in your details accurately.</p>
        </div>
        
        <form action="/register" method="POST">
            <div class="form-group">
                <label>Full Name:</label>
                <input type="text" name="name" required>
            </div>
            
            <div class="form-group">
                <label>NIM:</label>
                <input type="text" name="nim" required>
            </div>

            <div class="form-group">
                <label>GPA (IPK):</label>
                <!-- Menambahkan atribut min dan max di HTML sebagai validasi awal -->
                <input type="number" step="0.01" min="0" max="4.00" name="gpa" placeholder="e.g. 3.50" required>
                <small style="color: #666; font-size: 12px;">Max GPA is 4.00</small>
            </div>
            
            <div class="form-group">
                <label>Choose Division:</label>
                <select name="division">
                    <option value="Web Development">Web Development</option>
                    <option value="UI/UX">UI/UX Design</option>
                    <option value="BIC">Business IT Case (BIC)</option>
                </select>
            </div>
            
            <div class="text-center mt-20">
                <button type="submit" class="btn btn-success">Submit Application</button>
            </div>
        </form>
    `;
  res.send(renderPage(html));
};

const postRegistration = (req, res) => {
  const { name, nim, gpa, division } = req.body;

  if (!name || !nim || !gpa) {
    return res.status(400).send(
      renderPage(`
            <div class="text-center">
                <h2 style="color: red;">Error!</h2>
                <p>All fields are required.</p>
                <a href="/register" class="btn btn-primary">Try Again</a>
            </div>
        `)
    );
  }

  const gpaValue = parseFloat(gpa);
  if (gpaValue < 0 || gpaValue > 4.0) {
    return res.status(400).send(
      renderPage(`
            <div class="text-center">
                <h2 style="color: red;">Invalid GPA!</h2>
                <p>GPA cannot be higher than 4.00 or lower than 0.</p>
                <p>You entered: <strong>${gpaValue}</strong></p>
                <br>
                <a href="/register" class="btn btn-primary">Fix GPA</a>
            </div>
        `)
    );
  }

  const result = processRecruitment({ name, nim, gpa, division });

  let badgeClass = "status-standard";
  if (result.status.includes("Priority")) badgeClass = "status-priority";
  else if (result.status.includes("Eligible")) badgeClass = "status-eligible";

  const html = `
        <div class="text-center">
            <h1 style="color: var(--success-color);">Application Received!</h1>
            <p>Thank you, <strong>${result.name}</strong>.</p>
            
            <div class="result-box">
                <p>Division: <strong>${result.division}</strong></p>
                <p>Status: <span class="badge ${badgeClass}">${result.status}</span></p>
            </div>
            
            <br>
            <a href="/candidates" class="btn btn-primary">See All Candidates</a>
            <br><br>
            <a href="/" class="btn-link">Back to Home</a>
        </div>
    `;
  res.send(renderPage(html));
};

const getCandidates = (req, res) => {
  const allData = readData();

  const tableRows = allData
    .map((candidate, index) => {
      let badgeClass = "status-standard";
      if (candidate.status.includes("Priority")) badgeClass = "status-priority";
      else if (candidate.status.includes("Eligible"))
        badgeClass = "status-eligible";

      return `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${
                  candidate.name
                }</strong><br><small style="color: #666;">${
        candidate.nim
      }</small></td>
                <td>${candidate.division}</td>
                <td>${candidate.gpa}</td>
                <td><span class="badge ${badgeClass}">${
        candidate.status
      }</span></td>
            </tr>
        `;
    })
    .join("");

  const html = `
        <a href="/" class="btn-back">&larr; Back to Home</a>
        <div class="text-center">
            <h1>Recruitment Candidates</h1>
        </div>
        
        ${
          allData.length === 0
            ? '<p class="text-center">No candidates registered yet.</p>'
            : `
            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name / NIM</th>
                            <th>Division</th>
                            <th>GPA</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        `
        }
        
        <div class="text-center mt-20" style="color: #888; font-size: 12px;">
            Total Candidates: ${allData.length}
        </div>
    `;
  res.send(renderPage(html));
};

module.exports = { getHome, getRegisterForm, postRegistration, getCandidates };
