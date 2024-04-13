import PDFDocument from "pdfkit";


const buildPDF = (pdfData ,dataCallback, endCallback) =>{
    const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });
    doc.on('data',dataCallback);
    doc.on('end',endCallback);
    doc.fontSize(20).text(`Hello`);
    doc.text(pdfData);
    doc.end();
    
}

export { buildPDF };

