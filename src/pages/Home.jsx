import About from '../components/About';
import CookieLineup from '../components/CookieLineup';

function Home({ cookies }) {
  return (
    <>
      <About />
      <CookieLineup cookies={cookies} />
    </>
  );
}

export default Home;