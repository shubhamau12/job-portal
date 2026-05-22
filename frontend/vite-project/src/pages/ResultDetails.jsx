import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

function ResultDetails() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [result,
    setResult] =
    useState(null);

  useEffect(() => {

    loadResult();

  }, []);

  const loadResult =
    async () => {

      try {

        const response =
          await axios.get(
           `${import.meta.env.VITE_API_URL}/api/results/${id}`
          );

        setResult(
          response.data
        );

      } catch (error) {

        console.log(
          error
        );
      }
    };

  if (!result) {

    return (
      <h2
        style={{
          textAlign:
            "center",
          marginTop:
            "50px",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        background:
          "#eef2f7",
        minHeight:
          "100vh",
        padding:
          "40px 20px",
      }}
    >

      {/* Back Button */}
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
          maxWidth:
            "1000px",
          margin:
            "auto",
          background:
            "white",
          padding:
            "40px",
          borderRadius:
            "20px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.12)",
        }}
      >

        <h1
          style={{
            color:
              "#0d5aa7",
            marginBottom:
              "30px",
          }}
        >
          {result.title}
        </h1>

        {/* About Exam */}
        <h2
          style={{
            color:
              "#0d5aa7",
          }}
        >
          About Exam
        </h2>

        <p
          style={{
            lineHeight:
              "1.8",
            fontSize:
              "17px",
          }}
        >
          {result.aboutExam ||
            "NA"}
        </p>

        <hr />

        {/* Important Dates */}
        <h2
          style={{
            color:
              "#0d5aa7",
          }}
        >
          Important Dates
        </h2>

        <p>
          <strong>
            Exam Date:
          </strong>{" "}
          {result.examDate ||
            "NA"}
        </p>

        <p>
          <strong>
            Result Date:
          </strong>{" "}
          {result.resultDate ||
            "NA"}
        </p>

        <hr />

        {/* Important Links */}
        <h2
          style={{
            color:
              "#0d5aa7",
          }}
        >
          Important Links
        </h2>

        <p>
          <strong>
            Exam Result:
          </strong>{" "}
          {result.examResult ? (
            <a
              href={
                result.examResult
              }
              target="_blank"
              rel="noreferrer"
            >
              Click Here
            </a>
          ) : (
            "NA"
          )}
        </p>

        <p>
          <strong>
            Cutoff List:
          </strong>{" "}
          {result.cutoffList ? (
            <a
              href={
                result.cutoffList
              }
              target="_blank"
              rel="noreferrer"
            >
              Click Here
            </a>
          ) : (
            "NA"
          )}
        </p>

      </div>
    </div>
  );
}

export default ResultDetails;