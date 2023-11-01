import '../App.css';

export function Character(props) {
  return (
    <div className='character-card'>
      <img src={props.img} />
      <div className='search--text'>
        <h3>{props.fullName}</h3>
      </div>
    </div>
  );
}
