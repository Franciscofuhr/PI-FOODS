import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, getDiets } from "../../redux/actions";

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    diets: [],
    image: "",
    healthScore: null,
    summary: "",
    steps: "",
  });
  const handleInputChange = (e) => {
    if (e.target.name == "healthScore") {
      setNewRecipe({
        ...newRecipe,
        [e.target.name]: parseInt(e.target.value),
      });
    }
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRecipe(newRecipe)); //crear reducer que cree una receta en actions
    console.log(newRecipe);
    alert("You created a recipe!");
    setNewRecipe({
      title: "",
      diets: [],
      image: "",
      healthScore: null,
      summary: "",
      steps: "",
    });
  };
  const handleCheck = (e) => {
    if (e.target.checked) {
      setNewRecipe({
        ...newRecipe,
        diets: [...newRecipe.diets, e.target.value],
      });
    }
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title of the recipe"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <input
            type="text"
            name="image"
            placeholder="URL of the photo"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <input
            type="text"
            name="summary"
            placeholder="Summary of the recipe"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          Add Steps
          <input
            type="text"
            placeholder="number of steps"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          {diets
            ? diets.map((diet) => {
                return (
                  <span key={`${diet.name}`}>
                    <input
                      key={`${diet.id}`}
                      type="checkbox"
                      value={`${diet.name}`}
                      name={`${diet.name}`}
                      onChange={(e) => handleCheck(e)}
                    />
                    {diet.name}
                  </span>
                );
              })
            : null}
        </div>
        <div>
          {newRecipe.title && newRecipe.summary ? (
            <button type="submit">CREATE</button>
          ) : null}
        </div>
      </form>
    </div>
  );
};
export default CreateRecipe;
