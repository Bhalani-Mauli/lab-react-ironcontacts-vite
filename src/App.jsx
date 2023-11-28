import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";

function App() {
  const [contactsList, setContactsList] = useState(contacts.slice(0, 5));
  const [otherContacts, setOtherContacts] = useState(
    contacts.slice(5, contacts.length)
  );

  const addRandomContact = () => {
    const randomNumber = Math.floor(Math.random() * otherContacts.length);
    const randomContact = otherContacts[randomNumber];

    contactsList.push(randomContact);
    otherContacts.splice(randomNumber, 1);
    const newArray = [...contactsList];
    console.log(randomContact);

    setContactsList(newArray);
  };

  const sortByName = () => {
    setContactsList((prevContacts) =>
      [...prevContacts].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const sortByPopularity = () => {
    setContactsList((prevContacts) =>
      [...prevContacts].sort(
        (a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)
      )
    );
  };

  const deleteContact = (index) => {
    setContactsList((prevContacts) => {
      const updatedContacts = [...prevContacts];
      updatedContacts.splice(index, 1);
      return updatedContacts;
    });
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort By Name</button>
      <button onClick={sortByPopularity}>Sort By Popularity</button>
      <table id="contacts-table">
        <tr>
          <th>
            <b>Picture</b>
          </th>
          <th>
            <b>Name</b>
          </th>
          <th>
            <b>Popularity</b>
          </th>
          <th>
            <b>Won Oscar</b>
          </th>
          <th>
            <b>Won Emmy</b>
          </th>
        </tr>
        {contactsList.map((eachContact, index) => {
          return (
            <tr>
              <td>
                <img src={eachContact.pictureUrl} alt="Foto" width="100px" />
              </td>
              <td>{eachContact.name}</td>
              <td>{eachContact.popularity}</td>
              <td>{eachContact.wonOscar && "🏆"}</td>
              <td>{eachContact.wonEmmy && "🌟"}</td>
              <td>
                <button
                  onClick={() => {
                    deleteContact(index);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
