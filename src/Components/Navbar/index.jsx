import { useState } from "react";
import modalIcon from "../../assets/icons/Vector.svg";
import closeModal from "../../assets/icons/close-modal.svg";
import "./style.css";

export default function Navbar({
  sendDataToParent,
  getTabValueFromChild,
  getSearchValueFromChild,
}) {
  const tabs = [
    "All",
    "Marketing",
    "Services",
    "Business Development",
    "Support",
    "Accounting",
    "Product Management",
    "Human Resources",
    "Research and Development",
    "Sales",
    "Legal",
    "Engineering",
  ];

  const [displayModal, setDisplayModal] = useState(false);
  const [sorting, setSorting] = useState("alphabetically");
  const [clickedTab, setClickedTab] = useState("All");
  const [input, setInput] = useState("");

  const onOptionChange = (e) => {
    setSorting(e.target.value);
  };

  function handleDisplayModal(e) {
    e.preventDefault();
    document.body.style.overflow = "hidden";
    setDisplayModal(true);
  }

  function handleHideModal(e) {
    e.preventDefault();
    sendDataToParent(sorting);
    document.body.style.overflow = "auto";
    setDisplayModal(false);
  }

  function handleSelectTab(tabsItem) {
    setClickedTab(tabsItem);
    getTabValueFromChild(tabsItem);
  }

  function handleChangeInput(e) {
    setInput(e.target.value);
    getSearchValueFromChild(input);
  }

  return (
    <nav>
      <div
        className="modal"
        style={{ display: displayModal ? "flex" : "none" }}>
        <div className="modal-container">
          <h2>Сортировка</h2>
          <button onClick={handleHideModal} className="close-modal">
            <img src={closeModal} alt="x" />
          </button>
          <label htmlFor="alphabetically">
            <input
              type="radio"
              name="sorting"
              value={"alphabetically"}
              id="alphabetically"
              checked={sorting === "alphabetically"}
              onChange={onOptionChange}
            />
            По алфавиту
          </label>
          <label htmlFor="by-age">
            <input
              type="radio"
              name="sorting"
              value={"by-age"}
              id="by-age"
              checked={sorting === "by-age"}
              onChange={onOptionChange}
            />
            По возрасту
          </label>
        </div>
      </div>

      <h2>Поиск</h2>
      <form>
        <input
          type="text"
          name="search"
          placeholder="Введите имя..."
          value={input}
          onChange={(e) => handleChangeInput(e)}
        />
        <button onClick={handleDisplayModal}>
          <img src={modalIcon} alt="icon" />
        </button>
      </form>
      <ul>
        {tabs.map((tabsItem, index) => (
          <li
            key={index}
            onClick={() => handleSelectTab(tabsItem)}
            className={
              clickedTab === tabsItem ? "tab-element active" : "tab-element"
            }>
            {tabsItem}
          </li>
        ))}
      </ul>
    </nav>
  );
}
