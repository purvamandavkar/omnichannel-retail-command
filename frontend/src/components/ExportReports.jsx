import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FileText, Download } from 'lucide-react';

// Dynamic imports to avoid build failures
let XLSX = null;
let jsPDF = null;
let autoTable = null;

const ExportReports = ({ data, title, filename }) => {
  const { currentTheme } = useTheme();

  if (!data || data.length === 0) return null;

  const exportToExcel = async () => {
    if (!XLSX) {
      XLSX = await import('xlsx');
    }
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title);
    XLSX.writeFile(wb, `${filename || title}_${new Date().toISOString().slice(0,19)}.xlsx`);
  };

  const exportToPDF = async () => {
    if (!jsPDF) {
      const module = await import('jspdf');
      jsPDF = module.default;
      const autoTableModule = await import('jspdf-autotable');
      autoTable = autoTableModule.default;
    }
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 32);
    
    const headers = [Object.keys(data[0])];
    const tableData = data.map(row => Object.values(row));
    
    autoTable(doc, {
      head: headers,
      body: tableData,
      startY: 40,
      theme: 'striped',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [128, 90, 213], textColor: 255 }
    });
    
    doc.save(`${filename || title}_${new Date().toISOString().slice(0,19)}.pdf`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={exportToExcel}
        className={`${currentTheme.card} px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 hover:bg-white/20 transition`}
      >
        <FileText className="w-3 h-3" /> Excel
      </button>
      <button
        onClick={exportToPDF}
        className={`${currentTheme.card} px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 hover:bg-white/20 transition`}
      >
        <Download className="w-3 h-3" /> PDF
      </button>
    </div>
  );
};

export default ExportReports;