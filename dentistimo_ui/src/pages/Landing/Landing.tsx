import '../index.css';
import Dentistries from '../Dentistries/Dentistries';
import './Landing.css';

const Landing = () => {
  return (
    <>
    <main className='landing-page'>
      <div id="dentistries">
          <Dentistries />
      </div>
    </main>
    <div className='content' id="footer">
          (C) Dentistimo AB Etd. 2022
    </div>
    </>
  )
}

export default Landing
