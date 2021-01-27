import { BrowserRouter as Router, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/orderProcessing/CartScreen'
import SignIn from './screens/SingInScreen'
import SignUp from './screens/SignUpScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/orderProcessing/ShippingScreen'
import PaymentScreen from './screens/orderProcessing/PaymentScreen'
import PlaceOrderScreen from './screens/orderProcessing/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/adminScreens/UserListScreen'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeOrder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/admin/users' component={UserListScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
