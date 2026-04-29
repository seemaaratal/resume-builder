function generateResume() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let objective = document.getElementById("objective").value;
  let skills = document.getElementById("skills").value;
  let education = document.getElementById("education").value;
  let projects = document.getElementById("projects").value;

  let photoInput = document.getElementById("photo");
  let imageURL = "";

  if (photoInput && photoInput.files.length > 0) {
    imageURL = URL.createObjectURL(photoInput.files[0]);
  }

  let resumeHTML = `
    <div class="resume-box">
      ${imageURL ? `<img src="${imageURL}" width="100" style="border-radius:50%">` : ""}
      <h2>${name}</h2>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>

      <hr>

      <h3>Objective</h3>
      <p>${objective}</p>

      <h3>Skills</h3>
      <ul><li>${skills}</li></ul>

      <h3>Education</h3>
      <p>${education}</p>

      <h3>Projects</h3>
      <p>${projects}</p>
    </div>
  `;

  document.getElementById("resume").innerHTML = resumeHTML;
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let objective = document.getElementById("objective").value;
  let skills = document.getElementById("skills").value.split(",");
  let education = document.getElementById("education").value;
  let projects = document.getElementById("projects").value;

  // HEADER BOX
doc.setFillColor(41, 128, 185);
doc.rect(0, 0, 210, 30, "F");

doc.setTextColor(255, 255, 255);

// Name
doc.setFontSize(18);
doc.text(name, 10, 15);

// Email
doc.setFontSize(11);
doc.text(email, 10, 22);

// Phone
doc.text("Phone: " + phone, 10, 28);

// 🔻 Move below header
let y = 40;

// Reset color for rest
doc.setTextColor(0, 0, 0);


  // 🔹 Objective Section
y += 10;

doc.setFontSize(14);
doc.setTextColor(41, 128, 185);
doc.text("Objective", 10, y);

doc.line(10, y + 2, 80, y + 2);

y += 10;

doc.setFontSize(11);
doc.setTextColor(0, 0, 0);

doc.text(objective, 12, y);
y += 10;

  // 🔹 Skills Section
  // Skills
doc.setFontSize(14);
doc.setTextColor(41, 128, 185);
doc.text("Skills", 10, y);

doc.line(10, y + 2, 60, y + 2);

y += 10;

doc.setFontSize(11);
doc.setTextColor(0, 0, 0);

// SPLIT SKILLS PROPERLY
let skillsArray = document.getElementById("skills").value.split(",");

for (let i = 0; i < skillsArray.length; i++) {
  let skill = skillsArray[i].trim();
  if (skill !== "") {
    doc.text(" - " + skill, 12, y);
    y += 7;
  }
}

// 🔹 Education Section
y += 10;

doc.setFontSize(14);
doc.setTextColor(41, 128, 185);
doc.text("Education", 10, y);

doc.line(10, y + 2, 80, y + 2);

y += 10;

doc.setFontSize(11);
doc.setTextColor(0, 0, 0);

// ✅ SMART SPLIT (comma + new line)
let educationInput = document.getElementById("education").value;
let educationArray = educationInput.split(/,|\n/);

for (let i = 0; i < educationArray.length; i++) {
  let edu = educationArray[i].trim();
  if (edu !== "") {
    doc.text("- " + edu, 12, y);
    y += 7;
  }
}

 // 🔹 Projects Section
y += 5;

doc.setFontSize(14);
doc.setTextColor(41, 128, 185);
doc.text("Projects", 10, y);

doc.line(10, y + 2, 70, y + 2);

y += 10;

doc.setFontSize(11);
doc.setTextColor(0, 0, 0);

// ✅ SMART SPLIT (comma + space + new line)
let projectInput = document.getElementById("projects").value;
let projectArray = projectInput.split(/,|\n/);

for (let i = 0; i < projectArray.length; i++) {
  let proj = projectArray[i].trim();
  if (proj !== "") {
    doc.text("- " + proj, 12, y);
    y += 7;
  }
}

  // Save
  doc.save("Resume.pdf");
}