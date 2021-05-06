import logo from './logo.svg';
import './App.css';
import CollapseExpandExample from './Component/CollapseExpandExample'

const list = [
  { id: 1, name: 'Eggs' },
  { id: 2, name: 'Bread' },
]

function App() {
  return (
    <div className="App">
      <CollapseExpandExample list={list} />
    </div>
  );
}

export default App;
