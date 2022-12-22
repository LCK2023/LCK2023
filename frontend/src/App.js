import { Routes, Route } from 'react-router-dom'

import PlayerDetail from './components/PlayerDetail/PlayerDetail';

function App() {
  return (
    <Routes>
      <Route path="/player/:nickname" element={<PlayerDetail />}/>
    </Routes>
  );
}

export default App;
