import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, getDiets } from "../../redux/actions";
import c from "./CreateRecipes.module.css";

const CreateRecipe = () => {
  const dispatch = useDispatch();

  const diets = useSelector((state) => state.diets);

  const [newRecipe, setNewRecipe] = useState({
    title: "",
    diet: [],
    image: "",
    healthScore: null,
    summary: "",
    steps: "",
  });

  const [errors, setErrors] = useState({
    title: "Enter the name of the recipe",

    image: "Would be nice to show how you recipe looks",
    healthScore: "The healthScore must be a number between 0 and 100",
    summary: "Would be nice if you tell us a little bit of this recipe",
    steps: "Would be nice if you tell us how to do it ourselves",
  });

  const validator = (e) => {
    // meter al estado y modificar a partir de ahi
    // le paso por parametro e
    let validations = {};
    const beNumber = /(^\d{1,10}$)/;
    const property = e.target.name;
    const value = e.target.value;

    if (property === "title" && !value) {
      return (validations[property] = "Enter the name of the recipe");
    }
    if (
      property === "healthScore" &&
      (value < 0 || value > 100 || !beNumber.test(value) || !value)
    ) {
      return (validations[property] =
        "The healthScore must be a number between 0 and 100");
    }
    if (property === "summary" && !value) {
      return (validations.summary =
        "Would be nice if you tell us a little bit of this recipe");
    }
    if (property === "steps" && !value) {
      return (validations.steps =
        "Would be nice if you tell us how to do it ourselves");
    }
    if (property === "image" && !value) {
      return (validations.image = "Would be nice to show how you recipe looks");
    }
    validations[property] = "";

    return validations[property];
  };

  const handleInputChange = (e) => {
    // console.log(e.target.value);
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
    // console.log(validator(e));
    // console.log(e.target.value);

    setErrors({ ...errors, [e.target.name]: validator(e) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRecipe(newRecipe)); //crear reducer que cree una receta en actions
    console.log(newRecipe);
    alert("You created a recipe!");
    setNewRecipe({
      title: "",
      diet: [],
      image: "",
      healthScore: null,
      summary: "",
      steps: "",
    });
  };

  const handleCheck = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setNewRecipe({
        ...newRecipe,
        diet: [...newRecipe.diet, e.target.name],
      });

      console.log(newRecipe);
    } else {
      //en caso de sacar chequear y despues deschequear para sacarlo
      setNewRecipe({
        ...newRecipe,
        diet: newRecipe.diet.filter((e) => e === e.target.name),
      });
    }
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={c.backgroundcreate}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title of the recipe"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.title ? <span>{errors.title}</span> : null}
        </div>
        <div>
          <input
            type="text"
            name="healthScore"
            placeholder="Health Score"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        {errors.healthScore ? <span>{errors.healthScore}</span> : null}
        <div>
          <input
            type="text"
            name="image"
            placeholder="URL of the photo"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        {errors.image ? <span>{errors.image}</span> : null}

        <div>
          <textarea
            type="text"
            name="summary"
            placeholder="Summary of the recipe"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        {errors.summary ? <span>{errors.summary}</span> : null}

        <div>
          Steps
          <input
            type="text"
            name="steps"
            placeholder="number of steps"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.steps ? <span>{errors.steps}</span> : null}
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
          {!errors.title && !errors.summary ? (
            <button type="submit">CREATE</button>
          ) : null}
        </div>
      </form>
    </div>
  );
};
export default CreateRecipe;
