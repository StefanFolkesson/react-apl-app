import ElevRappRow from "./ElevRappRow";


const ElevRappCard = ({elever}) => {

return (
    <div>
    { elever?.length > 0
        ? (
          <div className='data'>
            {elever.map((elev) => (
              <ElevRappRow elev={elev}/>
            ))}
        </div>
    
        ) : (
          <div><h2>Allt rapporterat</h2></div>
        )}
  </div>
)
        }
export default ElevRappCard;
