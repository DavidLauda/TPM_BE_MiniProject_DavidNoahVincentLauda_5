const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../data/data.json");

const readData = () => {
  // Cek jika file belum ada, buat array kosong
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, "[]");
  }
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Fungsi Logika Seleksi BNCC
const processRecruitment = (candidateData) => {
  const currentData = readData();

  // Logika Unik: Filter berdasarkan IPK (GPA)
  // Syarat Project: Menggunakan arrow function & logic [cite: 17]
  let recruitmentStatus = "Standard Review";
  const gpaValue = parseFloat(candidateData.gpa);

  if (gpaValue >= 3.8) {
    recruitmentStatus = "Priority Candidate (Fast Track)";
  } else if (gpaValue >= 3.0) {
    recruitmentStatus = "Eligible for Interview";
  } else {
    recruitmentStatus = "Pending Approval";
  }

  const newCandidate = {
    id: `BNCC-${Date.now()}`, // ID Unik
    ...candidateData,
    status: recruitmentStatus,
    registrationDate: new Date().toLocaleDateString(),
  };

  currentData.push(newCandidate);
  writeData(currentData);

  return newCandidate;
};

module.exports = { readData, processRecruitment };
