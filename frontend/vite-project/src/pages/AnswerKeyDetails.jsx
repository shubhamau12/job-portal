import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getAnswerKeyById,
} from "../services/answerKeyService";

function AnswerKeyDetails() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [answerKey,
    setAnswerKey] =
    useState(null);

  useEffect(() => {

    const loadAnswerKey =
      async () => {

        try {

          const data =
            await getAnswerKeyById(
              id
            );

          setAnswerKey(
            data
          );

        } catch (
          error
        ) {

          console.log(
            error
          );
        }
      };

    loadAnswerKey();

  }, [id]);

  if (!answerKey) {
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

  const tableStyle = {
    width: "100%",
    borderCollapse:
      "collapse",
    background:
      "white",
    borderRadius:
      "14px",
    overflow:
      "hidden",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom:
      "30px",
  };

  const thStyle = {
    background:
      "#0d5aa7",
    color:
      "white",
    padding:
      "16px",
    textAlign:
      "center",
    fontSize:
      "18px",
  };

  const tdStyle = {
    padding:
      "16px",
    border:
      "1px solid #ddd",
    textAlign:
      "center",
    fontSize:
      "16px",
  };

  return (
    <div
      style={{
        background:
          "#f4f6f9",

        minHeight:
          "100vh",

        padding:
          "20px",
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
            "12px 22px",

          borderRadius:
            "10px",

          cursor:
            "pointer",

          marginBottom:
            "20px",
        }}
      >
        ← Back
      </button>

      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #0d5aa7, #1d74c9)",

          color:
            "white",

          padding:
            "30px",

          borderRadius:
            "18px",

          textAlign:
            "center",

          marginBottom:
            "30px",

          boxShadow:
            "0 6px 16px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize:
              "36px",
          }}
        >
          📘 {
            answerKey.title ||
            "Answer Key"
          }
        </h1>

        <p
          style={{
            marginTop:
              "10px",

            fontSize:
              "18px",
          }}
        >
          Download Latest
          Answer Key &
          Notifications
        </p>
      </div>

      {/* About Examination */}
      <h2
        style={{
          color:
            "#0d5aa7",
        }}
      >
        About Examination
      </h2>

      <div
        style={{
          background:
            "white",

          padding:
            "20px",

          borderRadius:
            "14px",

          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)",

          marginBottom:
            "30px",
        }}
      >
        <p
          style={{
            lineHeight:
              "1.8",

            fontSize:
              "16px",
          }}
        >
          {
            answerKey.aboutExam ||
            "No Details Available"
          }
        </p>
      </div>

      {/* Important Links */}
      <h2
        style={{
          color:
            "#0d5aa7",
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
            <th
              style={
                thStyle
              }
            >
              Link Name
            </th>

            <th
              style={
                thStyle
              }
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td
              style={
                tdStyle
              }
            >
              Download
              Notification
            </td>

            <td
              style={
                tdStyle
              }
            >
              {answerKey.notificationLink ? (
                <a
                  href={
                    answerKey.notificationLink
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
                  }}
                >
                  Download
                </a>
              ) : (
                "Not Available"
              )}
            </td>
          </tr>

          <tr>
            <td
              style={
                tdStyle
              }
            >
              Download
              Answer Key
            </td>

            <td
              style={
                tdStyle
              }
            >
              {answerKey.answerKeyLink ? (
                <a
                  href={
                    answerKey.answerKeyLink
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
                  }}
                >
                  Download
                </a>
              ) : (
                "Not Available"
              )}
            </td>
          </tr>

          <tr>
            <td
              style={
                tdStyle
              }
            >
              Answer Key
              Notification
            </td>

            <td
              style={
                tdStyle
              }
            >
              {answerKey.answerKeyNotification ? (
                <a
                  href={
                    answerKey.answerKeyNotification
                  }
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color:
                      "#dc3545",
                    fontWeight:
                      "bold",
                    textDecoration:
                      "none",
                  }}
                >
                  Download
                </a>
              ) : (
                "Not Available"
              )}
            </td>
          </tr>

        </tbody>
      </table>

    </div>
  );
}

export default AnswerKeyDetails;