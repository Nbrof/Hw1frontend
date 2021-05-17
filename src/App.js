import React from "react"
import './App.css';
import {Route, Link, Switch} from "react-router-dom"
import Display from "./Display"
import Form from "./Form"

function App() {

 const url = "http://localhost:4000"

 const [places, setPlaces] = React.useState([])

 const emptyPlace = {
   name: "",
   description: "",
   img: "",
 };

//  name: String,
//  img: String,
//  description: String,

const [selectedPlace, setSelectedPlace] = React.useState(emptyPlace)

//This gets the places

const getPlaces = () => {

  fetch(url + "/places/")
    .then((response) => response.json())
    .then((data) => {
      setPlaces(data);
    });
};

React.useEffect(() => {
  getPlaces();
}, []);

//handle create for the form
const handleCreate = (newPlace) => {
  fetch(url + "/places/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlace),
  }).then(() => getPlaces());
};

//handleUpdate
const handleUpdate = (place) => {
  fetch(url + "/places/" + place._id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(place),
  }).then(() => getPlaces());
};

//function for updating places
const selectPlace = (place) => {
  setSelectedPlace(place);
};

//deleted individual places
const deletePlace = (place) => {
  fetch(url + "/places/" + place._id, {
    method: "delete"
  })
  .then(() => {
    getPlaces()
  })
}

  return (
    <div className="App">
    <h1>Places Website!</h1>
      <hr />
      <Link to="/create">
        <button>Add a favorite place!</button>
      </Link>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display 
              {...rp} 
              places={places} 
              selectPlace={selectPlace}
              deletePlace={deletePlace} />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                place={emptyPlace}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form 
              {...rp} 
              label="update" 
              place={selectedPlace} 
              handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
