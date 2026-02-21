import { useState } from "react";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header searchValue={search} onSearchChange={setSearch} />
      <Navbar />
      <Home search={search} />
    </>
  );
}

export default App;