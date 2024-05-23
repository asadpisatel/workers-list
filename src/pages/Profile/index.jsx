import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import star from "../../assets/icons/star.svg";
import phone from "../../assets/icons/phone.svg";
import back from "../../assets/icons/back.svg";
import { Link } from "react-router-dom";
import "./style.css";

export default function Profile() {
  const { id } = useParams();
  const [dataOfUser, setDataOfUser] = useState({});

  async function fetchData() {
    const res = await fetch(`https://dummyjson.com/users/${id}`);
    const data = await res.json();

    if (Object.keys(data).length > 0) {
      setDataOfUser(data);
      console.log(data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      {Object.keys(dataOfUser).length > 0 ? (
        <div>
          <section className="profile">
            <Link className="back-btn" to={"/"}>
              {" "}
              <img src={back} alt="back" />
            </Link>
            <div>
              <img src={dataOfUser.image} alt="Avatar" />
              <h2>
                {dataOfUser.firstName} {dataOfUser.lastName}
              </h2>
              <p>{dataOfUser.company.department}</p>
            </div>
          </section>
          <section className="contact">
            <div className="data-of-birthday">
              <p>
                <img src={star} alt="star" />
                {dataOfUser.birthDate}
              </p>
              <p className="age">{dataOfUser.age} лет</p>
            </div>
            <div className="phone">
              <img src={phone} alt="phone" />
              {dataOfUser.phone}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
