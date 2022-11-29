import useGlobalContext from "../Context/context"
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs"

export default function Meals() {
  const { meals, loading, selectMeal, toggleFav } = useGlobalContext();

  if (loading) {
    return <section className="section">
      <h4>Loading....</h4>
    </section>
  }

  if (meals.length < 1) {
    return <section className="section">
      <h4>Sorry🙇‍♂️!!No items found.</h4>
    </section>
  }
  console.log(meals)
  return (
    <section className="section-center">
      {
        meals.map(meal => {
          const { idMeal, strMeal: title, strMealThumb: image, isFav } = meal
          return (
            <article key={meal.idMeal} className="single-meal">
              <img src={image} alt="meal-image" className="img" onClick={() => selectMeal(idMeal)} />
              <footer>
                <h5>{title}</h5>
                <button className="like-btn" id={idMeal} onClick={() => toggleFav(idMeal)}>
                  {!isFav ? <BsHandThumbsUp /> : <BsHandThumbsUpFill />}
                </button>
              </footer>
            </article>
          )
        })
      }
    </section>
  )
}