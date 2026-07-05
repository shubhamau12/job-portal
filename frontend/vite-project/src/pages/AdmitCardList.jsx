import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

function AdmitCardList() {
  const navigate =
    useNavigate();

  const [
    admitCards,
    setAdmitCards,
  ] = useState([]);

  const isAdmin =
    !!localStorage.getItem(
      "token"
    );

  const fetchAdmitCards =
    useCallback(
    async () => {
      const response =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admit-cards`
        );

      return response.data;
    },
    []
    );

  useEffect(() => {
    let isActive =
      true;

    fetchAdmitCards()
      .then((data) => {
        if (isActive) {
          setAdmitCards(
            data
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      isActive =
        false;
    };
  }, [fetchAdmitCards]);

  // Delete Admit Card
  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this admit card?"
        );

      if (
        !confirmDelete
      )
        return;

      try {
        await axios.delete(
         `${import.meta.env.VITE_API_URL}/api/admit-cards/${id}`
        );

        alert(
          "Admit Card Deleted Successfully"
        );

        const data =
          await fetchAdmitCards();

        setAdmitCards(
          data
        );
      } catch (error) {
        console.log(error);

        alert(
          "Delete Failed"
        );
      }
    };

  // Edit Admit Card
  const handleEdit =
    (card) => {
      navigate(
        "/add-admit-card",
        {
          state: {
            admitCard:
              card,
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
            "#0d5aa7",
          marginBottom:
            "30px",
        }}
      >
        All Admit Cards
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
                "#0d5aa7",
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
              Admit Card
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
          {admitCards.map(
            (card) => (
              <tr
                key={
                  card._id
                }
              >
                <td>
                  {card.title ||
                    "Admit Card"}
                </td>

                <td>
                  {card.examDate ||
                    "NA"}
                </td>

                <td>
                  {card.admitCard ||
                    "Available Soon"}
                </td>

                <td>
                  <Link
                    to={`/admit-card/${card._id}`}
                    style={{
                      color:
                        "green",
                      fontWeight:
                        "bold",
                      textDecoration:
                        "none",
                    }}
                  >
                    View
                    Details
                  </Link>
                </td>

                {isAdmin && (
                  <td>
                    <button
                      onClick={() =>
                        handleEdit(
                          card
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
                        cursor:
                          "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          card._id
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

export default AdmitCardList;
