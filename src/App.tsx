import Navigation from './components/Navigation';
import Intro from './components/Intro';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import ContactMeForm from './components/ContactMeForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
      <Navigation />
      <Intro />
      <Projects />
      <Experience />
      <ContactMeForm />
      <Footer />
    </div>
  );
}
