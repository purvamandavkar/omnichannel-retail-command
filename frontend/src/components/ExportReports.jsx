import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FileText, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportReports = ({ data, title }) => {
  const { currentTheme } = useTheme();

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title);
    XLSX.writeFile(wb, `${title}_export.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 32);
    
    const tableData = data.map(row => Object.values(row));
    const headers = [Object.keys(data[0] || {})];
    
    doc.autoTable({
      head: headers,
      body: tableData,
      startY: 40,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [128, 90, 213] }
    });
    
    doc.save(`${title}_report.pdf`);
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="flex gap-2">
      <button
        onClick={exportToExcel}
        className={`${currentTheme.card} px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-white/20 transition`}
      >
        <FileText className="w-4 h-4" /> Excel
      </button>
      <button
        onClick={exportToPDF}
        className={`${currentTheme.card} px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-white/20 transition`}
      >
        <Download className="w-4 h-4" /> PDF
      </button>
    </div>
  );
};

export default ExportReports;