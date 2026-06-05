import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Services from './pages/services/Services';
import Contact from './pages/contact/Contact';
import Blog from './pages/blog/Blog';
import Testimonials from './pages/testimonials/Testimonials';
import BookSession from './pages/book/BookSession';
import Admin from './pages/admin/Admin';
import useGlobalReveal from './hooks/useGlobalReveal';

// Inner component so useGlobalReveal runs inside <Router> context
const AppShell = () => {
  useGlobalReveal();
  return (
    <>
      <Navbar />
      <main className="container my-5">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/about"       element={<About />} />
          <Route path="/services"    element={<Services />} />
          <Route path="/book"        element={<BookSession />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/blog"        element={<Blog />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/admin/*"     element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const App = () => (
  <Router>
    <AppShell />
  </Router>
);

export default App;
