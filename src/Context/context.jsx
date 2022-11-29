import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const AppContext = createContext()

function AppProvider({ children }) {
  const [meals, setMeals] = useState(JSON.parse(localStorage.getItem("meals")) || [])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [favs, setFavs] = useState(JSON.parse(localStorage.getItem("fav")) || [])
  const allmealsUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
  const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios(url)
      const updatedData = data.meals.map(meal => {
        return {
          ...meal,
          isFav: false
        }
      })

      updatedData ? setMeals(updatedData) : setMeals([])
    }
    catch (err) {
      console.log(err.response)
    }
    setLoading(false)
  }

  function fetchRandomMeal() {
    fetchMeals(randomMealUrl)
  }

  useEffect(() => {
    console.log("ok")
    fetchMeals(allmealsUrl)
  }, [])

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favs))
  }, [favs])

  useEffect(() => {
    if (!searchTerm) return
    fetchMeals(allmealsUrl)
  }, [searchTerm])

  function selectMeal(idMeal, favMeal) {
    let meal
    favMeal ? meal = favs.find(meal => meal.idMeal === idMeal)
      : meal = meals.find(meal => meal.idMeal === idMeal)
    setSelectedMeal(meal)
    setShowModal(true)
  }

  function toggleFav(idMeal) {
    const alreadyfavs = favs.find(fav => fav.idMeal === idMeal)
    const meal = meals.find(meal => meal.idMeal === idMeal)
    alreadyfavs
      ? setFavs(prevFavs => prevFavs.filter(item => item !== alreadyfavs))
      : setFavs(prevFavs => [...prevFavs, meal])
    setMeals(prevMeals => prevMeals.map(meal => meal.idMeal === idMeal ? { ...meal, isFav: !meal.isFav } : meal));
  }

  function removeFromFavs(idMeal) {
    const updatedFavs = favs.filter(fav => fav.idMeal !== idMeal)
    setFavs(updatedFavs)
  }

  return (
    <AppContext.Provider value={{
      meals, loading, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, setShowModal, toggleFav, favs, removeFromFavs
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default function useGlobalContext() {
  return useContext(AppContext)
}

export { AppProvider }