import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";

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
          <Route path="auth" element={<Authentication />} />

        </Route>

      </Routes>
		</div>
	);
}

export default App;
