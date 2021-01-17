import { BrowserRouter as Router, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
