import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  getAllAnswerKeys,
  deleteAnswerKey,
} from "../services/answerKeyService";

function AnswerKeyList() {

  const navigate =
    useNavigate();

  const [answerKeys,
    setAnswerKeys] =
    useState([]);

  const isAdmin =
    !!localStorage.getItem(
      "token"
    );

  const loadAnswerKeys =
    async () => {

      try {

        const data =
          await getAllAnswerKeys();

        setAnswerKeys(
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

  useEffect(() => {
    loadAnswerKeys();
  }, []);

  // Delete
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this Answer Key?"
        );

      if (
        !confirmDelete
      )
        return;

      try {

        await deleteAnswerKey(
          id
        );

        alert(
          "Answer Key Deleted Successfully"
        );

        loadAnswerKeys();

      } catch (
        error
      ) {

        console.log(
          error
        );

        alert(
          "Delete Failed"
        );
      }
    };

  // Edit
  const handleEdit =
    (
      answerKey
    ) => {

      navigate(
        "/add-answer-key",
        {
          state: {
            answerKey,
          },
        }
      );
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

      {/* Header */}
      <div
        style={{
          display:
            "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          flexWrap:
            "wrap",

          marginBottom:
            "30px",
        }}
      >
        <h1
          style={{
            color:
              "#0d5aa7",

            margin:
              0,
          }}
        >
          📘 Answer Keys
        </h1>

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
          }}
        >
          ← Back
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          overflowX:
            "auto",

          background:
            "white",

          borderRadius:
            "20px",

          padding:
            "20px",

          boxShadow:
            "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <table
          width="100%"
          cellPadding="18"
          style={{
            borderCollapse:
              "collapse",

            textAlign:
              "center",
          }}
        >
          <thead>
            <tr
              style={{
                background:
                  "#0d5aa7",

                color:
                  "white",
              }}
            >
              <th>
                Title
              </th>

              <th>
                Answer Key
              </th>

              {isAdmin && (
                <th>
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>

            {answerKeys.map(
              (
                item
              ) => (
                <tr
                  key={
                    item._id
                  }
                  style={{
                    borderBottom:
                      "1px solid #ddd",
                  }}
                >
                  <td>
                    {
                      item.title ||
                      "No Title"
                    }
                  </td>

                  <td>
                    <Link
                      to={`/answer-key/${item._id}`}
                      style={{
                        color:
                          "green",

                        fontWeight:
                          "bold",

                        textDecoration:
                          "none",
                      }}
                    >
                      View Details
                    </Link>
                  </td>

                  {isAdmin && (
                    <td>

                      <button
                        onClick={() =>
                          handleEdit(
                            item
                          )
                        }
                        style={{
                          background:
                            "#007bff",

                          color:
                            "white",

                          border:
                            "none",

                          padding:
                            "8px 14px",

                          marginRight:
                            "10px",

                          borderRadius:
                            "8px",

                          cursor:
                            "pointer",
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            item._id
                          )
                        }
                        style={{
                          background:
                            "red",

                          color:
                            "white",

                          border:
                            "none",

                          padding:
                            "8px 14px",

                          borderRadius:
                            "8px",

                          cursor:
                            "pointer",
                        }}
                      >
                        Delete
                      </button>

                    </td>
                  )}

                </tr>
              )
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AnswerKeyList;