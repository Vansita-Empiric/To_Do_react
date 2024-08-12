import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setItems(items);
    }
  }, []);

  const changeTxt = (e) => {
    setInputValue(e.target.value);
  };

  const add = () => {
    if (inputValue) {
      setItems([...items, { text: inputValue, check: false }]);
      localStorage.setItem(
        "items",
        JSON.stringify([...items, { text: inputValue, check: false }])
      );
      setInputValue("");
    }
  };

  const done = (index) => {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, check: !item.check } : item
      )
    );
    localStorage.setItem(
      "items",
      JSON.stringify(
        items.map((item, i) =>
          i === index ? { ...item, check: !item.check } : item
        )
      )
    );
  };

  const del = (index) => {
    // console.log("Items initially: ", items);

    setItems(items.filter((_, i) => i !== index));

    localStorage.setItem(
      "items",
      JSON.stringify(items.filter((_, i) => i !== index))
    );
    // console.log(
    //   "Items Later: ",
    //   items.filter((_, i) => i !== index)
    // );
  };

  return (
    <>
      <input type="text" onChange={changeTxt} value={inputValue} />
      <button onClick={add}>Submit</button>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            style={{ textDecoration: item.check ? "line-through" : "none" }}
          >
            {item.text}
            <label>
              <input type="checkbox" onChange={() => done(index)} /> ✔
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => del(index)}
                checked={item.check}
              />{" "}
              x
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
