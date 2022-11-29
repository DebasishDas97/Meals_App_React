import useGlobalContext from "../Context/context"
export default function Modal() {
  const { selectedMeal, setShowModal } = useGlobalContext()
  const { strMeal: title, strMealThumb: image, strInstructions: instructions, strSource: source } = selectedMeal

  return (
    <aside className='modal-overlay'>
      <div className='modal-container'>
        <img src={image} alt="meal-image" className="img modal-img" />
        <div className="modal-content">
          <h3>{title}</h3>
          <p><b>Cooking Instructions</b></p>
          <p>{instructions}</p>
          <a href={source} target="_blank">Original Source</a>
          <button className="btn btn-hipster close-btn" onClick={() => setShowModal(false)}>Close</button>
        </div>
      </div>
    </aside>

  )
}