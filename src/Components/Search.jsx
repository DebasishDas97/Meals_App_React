import { useState } from "react"
import useGlobalContext from "../Context/context"

export default function Search() {
  const [text, setText] = useState("")
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext()

  function handleChange(e) {
    setText(e.target.value)
  }

  function submitSearch(e) {
    e.preventDefault()
    text && setSearchTerm(text)
  }

  function handleRandomMeal() {
    setSearchTerm("")
    fetchRandomMeal()
  }

  return (
    <header className="search-container">
      <form onSubmit={submitSearch}>
        <input type="text" className="form-input" placeholder="Search Meal" value={text} onChange={handleChange} />
        <button className="btn" type="submit">Search</button>
        <button className="btn btn-hipster" onClick={handleRandomMeal}>Suprise Me!🎊</button>
      </form>
    </header>
  )
}