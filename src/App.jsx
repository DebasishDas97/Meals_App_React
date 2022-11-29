import './App.css'
import Favorites from "./Components/Favorites"
import Meals from "./Components/Meals"
import Modal from "./Components/Modal"
import Search from "./Components/Search"
import useGlobalContext from './Context/context'

export default function App() {
  const { showModal, favs } = useGlobalContext()
  return (
    <main>
      <Search />
      {favs.length > 0 && <Favorites />}
      <Meals />
      {showModal && <Modal />}
    </main>
  )
}
