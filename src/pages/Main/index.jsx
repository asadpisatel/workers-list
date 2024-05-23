import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import errorEmoji from "../../assets/emoji/flying-saucer.png";
import { Link } from "react-router-dom";
import "./style.css";

export default function Main() {
  const loadingElements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [dataFromChild, setDataFromChild] = useState("alphabetically");
  const [departmentFromChild, setDepartmentFromChild] = useState("All");
  const [searchContent, setSearchContent] = useState("");

  const [loading, setLoading] = useState(false);

  function handleDataFromChild(childData) {
    setDataFromChild(childData);
  }

  function handleTabValueFromChild(tabValue) {
    setDepartmentFromChild(tabValue);
  }

  function handleSearchFromChild(searchValue) {
    setSearchContent(searchValue);
  }

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/users/search?q=${searchContent}&limit=100`
      );
      const fetchedData = await res.json();

      if (fetchedData.users !== undefined && fetchedData.users.length > 0) {
        let arrayOfUsers;
        if (departmentFromChild === "All") {
          arrayOfUsers = fetchedData.users;
        } else {
          arrayOfUsers = fetchedData.users.filter(
            (item) => item.company.department === departmentFromChild
          );
        }

        if (dataFromChild === "alphabetically") {
          arrayOfUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
        } else if (dataFromChild === "by-age") {
          arrayOfUsers.sort((a, b) => a.age - b.age);
        }

        console.log(fetchedData);
        setData(arrayOfUsers);
        setLoading(false);
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [dataFromChild, departmentFromChild, searchContent]);

  return (
    <div className="container">
      <Navbar
        sendDataToParent={handleDataFromChild}
        getTabValueFromChild={handleTabValueFromChild}
        getSearchValueFromChild={handleSearchFromChild}
      />
      {loading ? (
        <ul className="workers">
          {loadingElements.map((index) => (
            <li key={index} className="loading-item">
              <div className="loading-img"></div>
              <div>
                <div className="loading-name"></div>
                <div className="loading-profession"></div>
              </div>
            </li>
          ))}
        </ul>
      ) : error ? (
        <div className="error-page">
          <img src={errorEmoji} alt="Emoji of alien" />
          <h2>Какой-то сверхразум все сломал</h2>
          <p>Постараемся быстро починить</p>
          <button onClick={() => window.location.reload()}>
            Попробовать снова
          </button>
        </div>
      ) : (
        <ul className="workers">
          {data.map((dataItem) =>
            dataItem !== undefined ? (
              <Link key={dataItem.id} to={`/profile/${dataItem.id}`}>
                <li>
                  <div>
                    <img className="avatar" src={dataItem.image} alt="Avatar" />
                    <div>
                      <div className="name">
                        {dataItem.firstName + " "}
                        {dataItem.lastName}
                      </div>
                      <div className="profession">
                        {dataItem.company.department}
                      </div>
                    </div>
                  </div>
                  <p>
                    {dataFromChild === "by-age" ? dataItem.age + " лет" : null}
                  </p>
                </li>
              </Link>
            ) : null
          )}
        </ul>
      )}
    </div>
  );
}
