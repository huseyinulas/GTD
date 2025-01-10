import { useGTD } from '../context/GTDContext';
import {
  Container,
  Button
} from '../styles/components/DataManagement.styles';

const DataManagement = () => {
  const { tasks, projects, clearAllData, importData } = useGTD();

  const handleExport = () => {
    const data = {
      tasks,
      projects,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gtd-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          const success = importData(data);
          if (success) {
            alert('Data imported successfully!');
            window.location.reload();
          } else {
            alert('Failed to import data. Please check the file format.');
          }
        } catch (error) {
          console.error('Error parsing import file:', error);
          alert('Failed to parse import file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container>
      <h3>Data Management</h3>
      <Button onClick={handleExport}>Export Data</Button>
      <label>
        <Button as="span">Import Data</Button>
        <input
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleImport}
        />
      </label>
      <Button 
        onClick={() => {
          if (window.confirm('Are you sure you want to clear all data?')) {
            clearAllData();
            window.location.reload();
          }
        }}
        style={{ backgroundColor: '#dc3545' }}
      >
        Reset All Data
      </Button>
    </Container>
  );
};

export default DataManagement; 