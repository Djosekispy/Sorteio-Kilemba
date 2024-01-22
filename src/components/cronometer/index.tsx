import React, { useState, useEffect } from 'react';
import { calendar } from 'ionicons/icons';
import { IonButton, IonIcon } from '@ionic/react';
import './style.css';

const Cronometer = () => {
  const targetDate = new Date('2024-02-07T12:30:00');
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      // Se a data alvo já passou, retorna 0 para evitar valores negativos.
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); 
  return (
    <div className='all px-3 text-dark'>
      <span className='textTitle p-1'>{timeRemaining.days} Dias restantes <br></br></span>
    <button className="btn time bg-info shadow-sm rounded  text-white ">
    	{timeRemaining.hours} : {timeRemaining.minutes} : {timeRemaining.seconds}
    </button>
    </div>
  );
};

export default Cronometer;
