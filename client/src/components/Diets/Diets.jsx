import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../../redux/actions";
import c from "./Diets.module.css";

const Diets = () => {
  const dispatch = useDispatch();
  let diets = useSelector((state) => state.diets);
  useEffect(() => {
    dispatch(getDiets());
  }, []);
  return (
    <div className={c.background}>
      <div className={c.showdiets}>
        {diets
          ? diets.map((diet) => {
              return (
                <div key={diet.name} className={c.cardscontainer}>
                  <h2 className={c.name}>{diet.name}</h2>
                  <h6 className={c.information}>{diet.information}</h6>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Diets;
