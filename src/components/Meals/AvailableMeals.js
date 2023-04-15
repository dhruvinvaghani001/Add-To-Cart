import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealIteam from "./MealIteam/MealIteam";
import RingSpinner from "../UI/RingSpinner";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoaing, setIsloading] = useState();
  const [httperror, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsloading(true);
      const response = await fetch(
        "https://fir-5b228-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      console.log(data);

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setIsloading(false);
      setMeals(loadedMeals);
    };

    fetchMeals().catch((error) => {
      setIsloading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoaing) {
    return (
      <ul className={classes.spinner}>
        <RingSpinner></RingSpinner>
      </ul>
    );
  }
  if (!isLoaing && httperror) {
    return (
      <ul className={classes.spinner}>
        <p>{httperror}</p>
      </ul>
    );
  }

  const mealsList = meals.map((iteam) => (
    <MealIteam
      id={iteam.id}
      key={iteam.id}
      name={iteam.name}
      description={iteam.description}
      price={iteam.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul className={classes.spinner}>{setHttpError && setHttpError}</ul>

        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
