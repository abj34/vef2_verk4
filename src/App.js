import './App.css';
import { Departments, DepartmentForm } from './components/departments/Departments';
import { Department } from './components/departments/Department';
import { Courses } from './components/courses/Courses';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kennsluskráin</h1>
        <Department slug="hagfraedideild"/>
        <Departments title="Nýjustu deildir" text="Fyrsta deild" />
        <DepartmentForm />
        <Courses title="Áfangar" slug="hagfraedideild"/>
      </header>
    </div>
  );
}

export default App;