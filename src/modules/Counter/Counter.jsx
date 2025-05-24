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
  const [round, setRound] = useState(0);

  function handleIncrement() {
    if (tasbih) {
      setCount(prevCount => prevCount + 1);
    } else {
      alert("Please add dikhr to start tasbih")
    }
  }

  const handleDecrement = () => {
    setCount(prevCount => Math.max(0, prevCount - 1));
  };

  const handleReset = () => {
    setCount(0);
    setRound(0);
  }

  const handleTasbih = () => {
    setShowModal(true);
  }

  useEffect(() => {
    const numericLimit = Number(lapLimit);
    const newRound = Math.floor(count / numericLimit);
    setRound(newRound);
  }, [count, lapLimit]);

  useEffect(() => {
    if (tasbih) {
      const existingData = JSON.parse(localStorage.getItem('tasbihData')) || {};
      const updatedData = {
        ...existingData,
        [tasbih]: { count, round, lapLimit }
      };
      localStorage.setItem('tasbihData', JSON.stringify(updatedData));
    }
  }, [count, round, lapLimit, tasbih]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasbihData')) || {};
    if (tasbih && saved[tasbih]) {
      const { count, round, lapLimit } = saved[tasbih];
      setCount(count);
      setRound(round);
      setLapLimit(lapLimit);
    }
  }, [tasbih]);

  return (
    <>
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
              <div>Tasbih: </div>
              <div>{count} / {lapLimit}</div>
            </div>
          </div>
          <div className="controls">
            <button onClick={() => handleReset()} disabled={!tasbih}><GrPowerReset /></button>
            <button onClick={() => handleDecrement()} disabled={!tasbih}><FiMinus /></button>
            <button onClick={() => handleIncrement()}><FiPlus /></button>
          </div>
        </div>
        {showModal && <ChangeTitleModal showModal={showModal} setShowModal={setShowModal} setTasbih={setTasbih} setLapLimit={setLapLimit} setCount={setCount} setRound={setRound} tasbih={tasbih} lapLimit={lapLimit} />}
      </div >
      <footer className="footer">
        © {new Date().getFullYear()} All rights reserved by <span className="footer-name">Bushra Taibani</span>
      </footer>
    </>
  );
}

export default Counter;