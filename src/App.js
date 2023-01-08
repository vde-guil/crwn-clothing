import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Signin from "./routes/sign-in/sign-in.component";

function Shop() {
  return <h1>Shop Page</h1>
}

function App() {
	
	return (
		<div className='App'>
      <Routes>
        <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="sign-in" element={<Signin />} />

        </Route>

      </Routes>
		</div>
	);
}

export default App;
