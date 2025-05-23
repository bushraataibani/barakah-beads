import "./styles/counter.css"
import { GrPowerReset } from "react-icons/gr";
import { FiMinus, FiPlus } from 'react-icons/fi';
import './styles/counter.css';
import { useEffect, useState } from "react";
import ChangeTitleModal from "./ChangeTitleModal";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [tasbih, setTasbih] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [lapLimit, setLapLimit] = useState('33')
  const [round, setRound] = useState(0)

  function handleIncrement() {
    setCount(prevCount => prevCount + 1);
  }

  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  }

  const handleReset = () => {
    setCount(0);
  }

  const handleTasbih = () => {
    setShowModal(true);
  }

  useEffect(() => {
    if (count > 0 && count % Number(lapLimit) === 0) {
      setRound(prevRound => prevRound + 1);
    }
  }, [count, lapLimit]);


  console.log('round', round)

  return (
    <div className='counter-layout'>
      <div className='counter-wrapper'>
        {!tasbih ? <div className="counter-title" onClick={() => handleTasbih()}>
          Add Dhikr Title
        </div> :
          <div className="counter-title" onClick={() => handleTasbih()}>{tasbih}</div>}
        <div className='counter-circle' onClick={() => handleIncrement()}>
          <div className='count'>{count}</div>
        </div>
        <div className='progress-panel'>
          <div className='progress-details'>
            <div>Rounds: </div>
            <div>{round}</div>
          </div>
          <div className="progress-details">
            <div>Count: </div>
            <div>{count} / {lapLimit}</div>
          </div>
        </div>
        <div className="controls">
          <button onClick={() => handleReset()} disabled={!tasbih}><GrPowerReset /></button>
          <button onClick={() => handleDecrement()} disabled={!tasbih}><FiMinus /></button>
          <button onClick={() => handleIncrement()} disabled={!tasbih}><FiPlus /></button>
        </div>
      </div>
      {showModal && <ChangeTitleModal showModal={showModal} setShowModal={setShowModal} setTasbih={setTasbih} tasbih={tasbih} setLapLimit={setLapLimit} lapLimit={lapLimit} />}
    </div>
  );
}

export default Counter;