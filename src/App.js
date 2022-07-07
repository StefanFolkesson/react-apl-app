import { useEffect,useState } from 'react';
import ElevCard from './ElevCard';

import './App.css';
const API_URL ="/APL-app/readdata.php?hash=tt&anvnamn=stefan&elever";
function App() {
  const [elever, setElever ] = useState([]);
  const sM = async () => { 
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    setElever(data.data);
  }

  useEffect(() => {
    sM();
  },[]);
  return (
    <div>
    {
      elever?.length > 0
      ? (
        <div className='elev'>
          {elever.map((elev) => (
            <ElevCard elev={elev}/>
          ))}
      </div>
  
      ) : (
        <div><h2>no movies</h2></div>
      )
    }
    </div>

  );
}
export default App;