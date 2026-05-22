import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

function ResultList() {

  const navigate =
    useNavigate();

  const [
    results,
    setResults,
  ] = useState([]);

  const isAdmin =
    !!localStorage.getItem(
      "token"
    );

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults =
    async () => {

      try {

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/results`
          );

        setResults(
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

  // DELETE
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this result?"
        );

      if (
        !confirmDelete
      )
        return;

      try {

        await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/results/${id}`
        );

        alert(
          "Result Deleted Successfully"
        );

        loadResults();

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

  // EDIT
  const handleEdit =
    (result) => {

      navigate(
        "/add-result",
        {
          state: {
            result,
          },
        }
      );
    };

  return (
    <div
      style={{
        padding:
          "40px",
        background:
          "#eef2f7",
        minHeight:
          "100vh",
      }}
    >

      {/* Back Button */}
      <button
        onClick={() =>
          navigate("/")
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

      <h1
        style={{
          color:
            "#6f42c1",
          marginBottom:
            "30px",
          fontSize:
            "42px",
        }}
      >
        All Results
      </h1>

      <table
        border="1"
        width="100%"
        cellPadding="20"
        style={{
          borderCollapse:
            "collapse",
          textAlign:
            "center",
          background:
            "white",
        }}
      >
        <thead>
          <tr
            style={{
              background:
                "#6f42c1",
              color:
                "white",
            }}
          >
            <th>
              Title
            </th>

            <th>
              Exam Date
            </th>

            <th>
              Result Date
            </th>

            <th>
              Details
            </th>

            {isAdmin && (
              <th>
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>

          {results.map(
            (result) => (
              <tr
                key={
                  result._id
                }
              >
                <td>
                  {result.title ||
                    "Result"}
                </td>

                <td>
                  {result.examDate ||
                    "NA"}
                </td>

                <td>
                  {result.resultDate ||
                    "NA"}
                </td>

                <td>
                  <Link
                    to={`/result/${result._id}`}
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
                          result
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
                          result._id
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
  );
}

export default ResultList;