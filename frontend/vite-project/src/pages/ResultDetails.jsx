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

  const [result, setResult] =
    useState(null);

  useEffect(() => {
    loadResult();
  }, [id]);

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
      } catch (
        error
      ) {
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

  // TABLE CSS
  const tableStyle = {
    width: "100%",
    borderCollapse:
      "collapse",
    background:
      "white",
    borderRadius:
      "16px",
    overflow:
      "hidden",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.1)",
    marginBottom:
      "35px",
  };

  const thStyle = {
    background:
      "#0d5aa7",
    color:
      "white",
    padding:
      "18px",
    textAlign:
      "center",
    fontSize:
      "24px",
    fontWeight:
      "bold",
  };

  const tdStyle = {
    padding:
      "18px",
    border:
      "1px solid #ddd",
    textAlign:
      "center",
    fontSize:
      "20px",
  };

  return (
    <div
      style={{
        background:
          "#eef2f7",
        minHeight:
          "100vh",
        padding:
          "40px",
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
            "12px 24px",
          borderRadius:
            "10px",
          cursor:
            "pointer",
          fontSize:
            "18px",
          marginBottom:
            "20px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        ← Back
      </button>

      {/* Header */}
      <div
        style={{
          background:
            "#0d5aa7",
          color:
            "white",
          padding:
            "35px",
          borderRadius:
            "20px",
          marginBottom:
            "35px",
          textAlign:
            "center",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize:
              "56px",
            fontWeight:
              "bold",
          }}
        >
          {
            result.title
          }
        </h1>

        <p
          style={{
            marginTop:
              "15px",
            fontSize:
              "30px",
          }}
        >
          Result Date:
          {" "}
          <strong>
            {
              result.resultDate
            }
          </strong>
        </p>
      </div>

      {/* About Exam */}
      <h2
        style={{
          color:
            "#0d5aa7",
          fontSize:
            "48px",
          marginBottom:
            "20px",
        }}
      >
        About Exam
      </h2>

      <div
        style={{
          background:
            "white",
          padding:
            "25px",
          borderRadius:
            "16px",
          boxShadow:
            "0 3px 12px rgba(0,0,0,0.1)",
          marginBottom:
            "35px",
          fontSize:
            "22px",
          lineHeight:
            "1.8",
        }}
      >
        {
          result.aboutExam
        }
      </div>

      {/* Important Dates */}
      <h2
        style={{
          color:
            "#0d5aa7",
          fontSize:
            "48px",
          marginBottom:
            "20px",
        }}
      >
        Important Dates
      </h2>

      <table
        style={
          tableStyle
        }
      >
        <thead>
          <tr>
            <th style={thStyle}>
              Exam Date
            </th>

            <th style={thStyle}>
              Result Date
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={tdStyle}>
              {
                result.examDate
              }
            </td>

            <td style={tdStyle}>
              {
                result.resultDate
              }
            </td>
          </tr>
        </tbody>
      </table>

      {/* Important Links */}
      <h2
        style={{
          color:
            "#0d5aa7",
          fontSize:
            "48px",
          marginBottom:
            "20px",
        }}
      >
        Important Links
      </h2>

      <table
        style={
          tableStyle
        }
      >
        <thead>
          <tr>
            <th style={thStyle}>
              Link Name
            </th>

            <th style={thStyle}>
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={tdStyle}>
              Exam Result
            </td>

            <td style={tdStyle}>
              <a
                href={
                  result.examResult
                }
                target="_blank"
                rel="noreferrer"
                style={{
                  color:
                    "green",
                  fontWeight:
                    "bold",
                  textDecoration:
                    "none",
                  fontSize:
                    "20px",
                }}
              >
                Click Here
              </a>
            </td>
          </tr>

          <tr>
            <td style={tdStyle}>
              Cutoff List
            </td>

            <td style={tdStyle}>
              <a
                href={
                  result.cutoffList
                }
                target="_blank"
                rel="noreferrer"
                style={{
                  color:
                    "#0d5aa7",
                  fontWeight:
                    "bold",
                  textDecoration:
                    "none",
                  fontSize:
                    "20px",
                }}
              >
                Download PDF
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ResultDetails;