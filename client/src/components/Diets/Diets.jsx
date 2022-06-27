import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../../redux/actions";

const Diets = () => {
  const dispatch = useDispatch();
  let diets = useSelector((state) => state.diets);
  useEffect(() => {
    dispatch(getDiets());
  }, []);
  return (
    <div>
      {diets
        ? diets.map((diet) => {
            return (
              <span>
                <h2>{diet.name}</h2>
                <h6>{diet.information}</h6>
              </span>
            );
          })
        : null}
    </div>
  );
};

export default Diets;
