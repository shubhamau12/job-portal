import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

function AdmitCardDetails() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [card, setCard] =
    useState(null);

  useEffect(() => {
    const loadCard =
      async () => {

      try {

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admit-cards/${id}`
          );

        setCard(
          response.data
        );

      } catch (error) {

        console.log(
          error
        );
      }
    };

    loadCard();
  }, [id]);

  if (!card) {
    return (
      <h2
        style={{
          textAlign:
            "center",
          marginTop:
            "100px",
        }}
      >
        Loading...
      </h2>
    );
  }

  const sectionTitle = {
    color:
      "#0d5aa7",
    marginBottom:
      "15px",
    marginTop:
      "30px",
  };

  const cardStyle = {
    background:
      "white",
    padding:
      "25px",
    borderRadius:
      "15px",
    boxShadow:
      "0 3px 15px rgba(0,0,0,0.1)",
    marginBottom:
      "25px",
  };

  const linkStyle = {
    color:
      "#0d5aa7",
    fontWeight:
      "bold",
    textDecoration:
      "none",
  };

  return (
    <div
      style={{
        background:
          "#f4f6f9",
        minHeight:
          "100vh",
        padding:
          "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth:
            "1000px",
          margin:
            "auto",
        }}
      >
        <button
          onClick={() =>
            navigate(-1)
          }
          style={{
            background:
              "#0d5aa7",
            color:
              "white",
            border:
              "none",
            padding:
              "12px 20px",
            borderRadius:
              "10px",
            cursor:
              "pointer",
            marginBottom:
              "20px",
            fontSize:
              "16px",
          }}
        >
          ← Back
        </button>

        <div
          style={{
            background:
              "#0d5aa7",
            color:
              "white",
            padding:
              "30px",
            borderRadius:
              "15px",
            textAlign:
              "center",
            marginBottom:
              "30px",
          }}
        >
          <h1>
            {card.title ||
              card.postName ||
              "Admit Card"}
          </h1>
        </div>

        <div
          style={
            cardStyle
          }
        >
          <h2
            style={
              sectionTitle
            }
          >
            Important Dates
          </h2>

          <p>
            <strong>
              Application
              Start Date:
            </strong>{" "}
            {
              card.applicationStartDate
            }
          </p>

          <p>
            <strong>
              Exam Date:
            </strong>{" "}
            {card.examDate ||
              "Coming Soon"}
          </p>

          <p>
            <strong>
              Exam City
              Details:
            </strong>{" "}
            {
              card.examCityDetails
            }
          </p>

          <p>
            <strong>
              Admit Card:
            </strong>{" "}
            {card.admitCard ||
              "Available Soon"}
          </p>
        </div>

        <div
          style={
            cardStyle
          }
        >
          <h2
            style={
              sectionTitle
            }
          >
            Important
            Links
          </h2>

          <p>
  <strong>
    Download Admit Card:
  </strong>{" "}

  {card.downloadAdmitCard ? (
    <a
      href={
        card.downloadAdmitCard
      }
      target="_blank"
      rel="noreferrer"
      style={
        linkStyle
      }
    >
      Click Here
    </a>
  ) : (
    "NA"
  )}
</p>

<p>
  <strong>
    Download Exam City
    Details:
  </strong>{" "}

  {card.downloadExamCityDetails ? (
    <a
      href={
        card.downloadExamCityDetails
      }
      target="_blank"
      rel="noreferrer"
      style={
        linkStyle
      }
    >
      Click Here
    </a>
  ) : (
    "NA"
  )}
</p>

<p>
  <strong>
    Download Exam City
    Notice:
  </strong>{" "}

  {card.downloadExamCityNotice ? (
    <a
      href={
        card.downloadExamCityNotice
      }
      target="_blank"
      rel="noreferrer"
      style={
        linkStyle
      }
    >
      Click Here
    </a>
  ) : (
    "NA"
  )}
</p>
        </div>

        <div
          style={
            cardStyle
          }
        >
          <h2
            style={
              sectionTitle
            }
          >
            How To Check
            Admit Card
          </h2>

          <p
            style={{
              lineHeight:
                "1.8",
              fontSize:
                "17px",
            }}
          >
            {
              card.howToCheckAdmitCard
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdmitCardDetails;
