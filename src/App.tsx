import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { UserList, UserDetail } from 'components'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={UserList} />
        <Route path="/:id" component={UserDetail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
