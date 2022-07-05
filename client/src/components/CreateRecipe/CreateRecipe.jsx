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
    const filterdiet = newRecipe.diet;
    console.log(filterdiet);
    console.log(e.target.name);
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
        diet: filterdiet.filter((d) => d !== e.target.name),
      });
      console.log(newRecipe.diet);
    }
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={c.backgroundcreate}>
      <div className={c.createcontainer}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={c.inputsanderrors}>
            <h3>Title</h3>
            <input
              type="text"
              name="title"
              placeholder="Title of the recipe"
              onChange={(e) => handleInputChange(e)}
              className={c.shortinput}
            />
            {errors.title ? (
              <div className={c.errors}>{errors.title}</div>
            ) : null}
          </div>
          <div className={c.inputsanderrors}>
            <h3>HealthScore</h3>
            <input
              type="text"
              name="healthScore"
              placeholder="Health Score"
              onChange={(e) => handleInputChange(e)}
              className={c.shortinput}
            />
            {errors.healthScore ? (
              <div className={c.errors}>{errors.healthScore}</div>
            ) : null}
          </div>
          <div className={c.inputsanderrors}>
            <h3>Image</h3>
            <input
              type="text"
              name="image"
              placeholder="URL of the photo"
              onChange={(e) => handleInputChange(e)}
              className={c.shortinput}
            />
            {errors.image ? (
              <div className={c.errors}>{errors.image}</div>
            ) : null}
          </div>

          <div className={c.inputsanderrors}>
            <h3>Summary</h3>
            <textarea
              className={c.longinput}
              type="text"
              name="summary"
              placeholder="Summary of the recipe"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.summary ? (
              <div className={c.errors}>{errors.summary}</div>
            ) : null}
          </div>

          <div className={c.inputsanderrors}>
            <h3>Steps</h3>
            <textarea
              className={c.longinput}
              type="text"
              name="steps"
              placeholder="number of steps"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.steps ? (
              <div className={c.errors}>{errors.steps}</div>
            ) : null}
          </div>
          <div className={c.inputsanderrors}>
            <h3>Diets</h3>
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
                        className={c.checkbox}
                      />
                      {diet.name}
                    </span>
                  );
                })
              : null}
          </div>
          <div>
            {!errors.title && !errors.summary ? (
              <button type="submit" className={c.createbutton}>
                CREATE
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateRecipe;
