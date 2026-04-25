// Login Verification
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === '1234') {
        alert('Login successful!');
    } else {
        alert('Login failed! Incorrect username or password.');
    }
}

// PDF Upload Functionality
function uploadPDF() {
    const fileInput = document.getElementById('pdfUpload');
    const file = fileInput.files[0];

    if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = function(event) {
            const pdfData = event.target.result;
            const pdfName = file.name;
            localStorage.setItem(pdfName, pdfData);
            displayPDFs();
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid PDF file.');
    }
}

// Display PDFs in Grid
function displayPDFs() {
    const container = document.getElementById('pdfContainer');
    container.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const pdfName = localStorage.key(i);
        const pdfData = localStorage.getItem(pdfName);
        
        const pdfElement = document.createElement('div');
        pdfElement.innerHTML = `
            <h4>${pdfName}</h4>
            <iframe src="${pdfData}" width="200" height="200"></iframe>
            <button onclick="downloadPDF('${pdfName}')">Download PDF</button>
            <button onclick="deletePDF('${pdfName}')">Delete PDF</button>
        `;
        container.appendChild(pdfElement);
    }
}

// View PDF
function viewPDF(name) {
    const pdfData = localStorage.getItem(name);
    const win = window.open();
    win.document.write('<iframe width="100%" height="100%" src="' + pdfData + '"></iframe>');
}

// Download PDF
function downloadPDF(name) {
    const pdfData = localStorage.getItem(name);
    const a = document.createElement('a');
    a.href = pdfData;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Delete PDF
function deletePDF(name) {
    localStorage.removeItem(name);
    displayPDFs();
}

// Initial function to display PDFs on load
window.onload = function() {
    displayPDFs();
};
