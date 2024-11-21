import { useState } from 'react';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
  const [excelData, setExcelData] = useState([]);
  console.log('excelData :>> ', excelData);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryString = e.target?.result;
        if (binaryString) {
          // Đọc file Excel
          const workbook = XLSX.read(binaryString, { type: 'binary' });

          // Lấy sheet đầu tiên
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Lấy toàn bộ dữ liệu dưới dạng JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          setExcelData(jsonData);

          // Lấy dữ liệu từ các ô cụ thể
          const specificCellC4 = worksheet['C4']?.v;
          const specificCellD4 = worksheet['D4']?.v;

          console.log('Giá trị ô C3:', specificCellC4);
          console.log('Giá trị ô D4:', specificCellD4);
        }
      };

      reader.readAsBinaryString(file); // Đọc file Excel
    }
  };

  return (
    <div className="App">
        <div>
          <h3>Import Excel File</h3>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
          <div>
            <h4>Data:</h4>
            <pre>{JSON.stringify(excelData, null, 2)}</pre>
          </div>
        </div>
    </div>
  );
}

export default App;
