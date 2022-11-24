import '../index.css';
import Dentistries from '../Dentistries/Dentistries';
import Appointments from '../Appointments/Appointments';
import './Landing.css';

const Landing = () => {
  return (
    <main className='landing-page'>
      <div className='content' id="dentistries">
          <Dentistries />
      </div>
      <div className='content' id="appointments">
          <Appointments />
      </div>
      <div className='content' id="footer">
          (C) Dentistimo AB Etd. 2022
      </div>
    </main>
  )
}

export default Landing
