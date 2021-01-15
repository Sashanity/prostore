import Container from '@material-ui/core/Container'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container><h1>Welcome to ProStore!</h1></Container>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
