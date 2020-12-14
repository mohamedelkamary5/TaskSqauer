import './App.css';
import {  Route, Switch, BrowserRouter } from 'react-router-dom';

import Logout from './Pages/Logout/Logout';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import AddPost from './Pages/Add/Add';
import UpdatePage from './Pages/Update/Update';
import Error from './Pages/NotFound/NotFound';

function App() {
  return (

    <BrowserRouter>
      <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/home' component={Home} />
          <Route path='/add' component={AddPost} />
          <Route path='/update/:postId' component={UpdatePage} />
          <Route path='/logout' component={Logout} />
          <Route path="*" component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;