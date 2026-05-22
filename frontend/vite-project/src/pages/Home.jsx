import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  getAllJobs,
  getCSJobs,
  deleteJob,
} from "../services/jobService";

function Home() {

  const navigate =
    useNavigate();

  const [jobs, setJobs] =
    useState([]);

  const [
    activeTab,
    setActiveTab,
  ] = useState("all");

  const isAdmin =
    !!localStorage.getItem(
      "token"
    );

  // Load Jobs
  const loadJobs =
    async () => {

      try {

        let data;

        if (
          activeTab ===
          "cs"
        ) {

          data =
            await getCSJobs();

        } else {

          data =
            await getAllJobs();
        }

        setJobs(data);

      } catch (
        error
      ) {

        console.log(
          error
        );
      }
    };

  useEffect(() => {

    loadJobs();

  }, [activeTab]);

  // Delete Job
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this job?"
        );

      if (
        !confirmDelete
      )
        return;

      try {

        await deleteJob(
          id
        );

        alert(
          "Job Deleted Successfully"
        );

        loadJobs();

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

  // Edit Job
  const handleEdit =
    (job) => {

      navigate(
        "/admin",
        {
          state: {
            job,
          },
        }
      );
    };

  // Logout
  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      navigate("/");

      window.location.reload();
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
          gap:
            "20px",
          marginBottom:
            "40px",
        }}
      >

        <h1
          style={{
            color:
              "#0d5aa7",
            fontSize:
              "42px",
            margin: 0,
          }}
        >
          Government Job
          Portal
        </h1>

        <div>

          {!isAdmin ? (

            <button
              onClick={() =>
                navigate(
                  "/login"
                )
              }
              style={{
                background:
                  "linear-gradient(135deg, #0d5aa7, #1d74c9)",
                color:
                  "white",
                border:
                  "none",
                padding:
                  "14px 24px",
                borderRadius:
                  "12px",
                cursor:
                  "pointer",
                fontSize:
                  "16px",
                fontWeight:
                  "bold",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              🔐 Admin Login
            </button>

          ) : (

            <>
              <button
                onClick={() =>
                  navigate(
                    "/admin"
                  )
                }
                style={buttonStyle}
              >
                Add Job
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/add-admit-card"
                  )
                }
                style={{
                  ...buttonStyle,
                  background:
                    "#dc3545",
                }}
              >
                Add Admit Card
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/add-result"
                  )
                }
                style={{
                  ...buttonStyle,
                  background:
                    "#6f42c1",
                }}
              >
                Add Result
              </button>

              <button
                onClick={
                  handleLogout
                }
                style={{
                  ...buttonStyle,
                  background:
                    "red",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Menu */}
      <div
        style={{
          display:
            "flex",
          justifyContent:
            "center",
          gap:
            "20px",
          flexWrap:
            "wrap",
          marginBottom:
            "40px",
        }}
      >

        <button
          onClick={() =>
            setActiveTab(
              "all"
            )
          }
          style={{
            ...tabStyle,
            background:
              activeTab ===
              "all"
                ? "#0d5aa7"
                : "#e9ecef",
            color:
              activeTab ===
              "all"
                ? "white"
                : "#333",
          }}
        >
          📋 All Jobs
        </button>

        <button
          onClick={() =>
            setActiveTab(
              "cs"
            )
          }
          style={{
            ...tabStyle,
            background:
              activeTab ===
              "cs"
                ? "#198754"
                : "#e9ecef",
            color:
              activeTab ===
              "cs"
                ? "white"
                : "#333",
          }}
        >
          💻 CS Jobs
        </button>

        <button
          onClick={() =>
            navigate(
              "/admit-cards"
            )
          }
          style={{
            ...tabStyle,
            background:
              "#dc3545",
            color:
              "white",
          }}
        >
          🎫 Admit Cards
        </button>

        <button
          onClick={() =>
            navigate(
              "/results"
            )
          }
          style={{
            ...tabStyle,
            background:
              "#6f42c1",
            color:
              "white",
          }}
        >
          📄 Results
        </button>

      </div>

      {/* Jobs Table */}
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
          cellPadding="20"
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
                Post Name
              </th>

              <th>
                Last Date
              </th>

              <th>
                Job Details
              </th>

              {isAdmin && (
                <th>
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>

            {jobs.map(
              (job) => (

                <tr
                  key={
                    job._id
                  }
                  style={{
                    borderBottom:
                      "1px solid #ddd",
                  }}
                >
                  <td>
                    {job.postName}
                  </td>

                  <td>
                    {job.lastDate}
                  </td>

                  <td>
                    <Link
                      to={`/job/${job._id}`}
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
                            job
                          )
                        }
                        style={{
                          ...actionButton,
                          background:
                            "#007bff",
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            job._id
                          )
                        }
                        style={{
                          ...actionButton,
                          background:
                            "red",
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

const buttonStyle = {
  marginRight:
    "10px",
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
  background:
    "#0d5aa7",
};

const tabStyle = {
  border:
    "none",
  padding:
    "15px 28px",
  borderRadius:
    "14px",
  cursor:
    "pointer",
  fontSize:
    "18px",
  fontWeight:
    "bold",
};

const actionButton = {
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
};

export default Home;