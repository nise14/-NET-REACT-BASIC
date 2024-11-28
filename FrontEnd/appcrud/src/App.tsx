import { BrowserRouter, Route, Routes } from "react-router-dom"
import { List } from "./components/List"
import { NewEmployee } from "./components/NewEmployee"
import { EditEmployee } from "./components/EditEmployee"

function App() {

  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/newemployee" element={<NewEmployee />} />
        <Route path="/editemployee/:id" element={<EditEmployee />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
