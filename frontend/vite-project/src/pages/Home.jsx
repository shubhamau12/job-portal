import {
  useCallback,
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
  const fetchJobs =
    useCallback(
      async () => {
        if (
          activeTab ===
          "cs"
        ) {
          return getCSJobs();
        }

        return getAllJobs();
      },
      [activeTab]
    );

  useEffect(() => {
    let isActive =
      true;

    fetchJobs()
      .then((data) => {
        if (isActive) {
          setJobs(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      isActive = false;
    };
  }, [fetchJobs]);

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

        const data =
          await fetchJobs();

        setJobs(data);
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
          "linear-gradient(to bottom, #eef4ff, #ffffff)",
        minHeight:
          "100vh",
        padding:
          "20px",
      }}
    >
      {/* HERO */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#0d5aa7,#1d74c9)",
          borderRadius:
            "25px",
          padding:
            "50px 20px",
          marginBottom:
            "30px",
          textAlign:
            "center",
          position:
            "relative",
          overflow:
            "hidden",
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.15)",
        }}
      >
        {/* Admin Buttons */}
        <div
          style={{
            position:
              "absolute",
            top: "20px",
            right: "20px",
            display:
              "flex",
            gap: "10px",
            flexWrap:
              "wrap",
          }}
        >
          {!isAdmin ? (
            <button
              onClick={() =>
                navigate(
                  "/login"
                )
              }
              style={{
                background:
                  "white",
                color:
                  "#0d5aa7",
                border:
                  "none",
                padding:
                  "12px 20px",
                borderRadius:
                  "10px",
                cursor:
                  "pointer",
                fontWeight:
                  "bold",
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
                style={
                  buttonStyle
                }
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
  onClick={() =>
    navigate(
      "/add-answer-key"
    )
  }
  style={{
    ...buttonStyle,
    background:
      "#fd7e14",
  }}
>
  Add Answer Key
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

        <h1
          style={{
            color:
              "white",
            fontSize:
              "clamp(38px,6vw,60px)",
            margin: 0,
          }}
        >
          🇮🇳 Government Job
        </h1>

        <p
          style={{
            color:
              "#dcecff",
            fontSize:
              "clamp(16px,2vw,24px)",
            marginTop:
              "15px",
            fontStyle:
              "italic",
          }}
        >
          “Your Gateway to
          Secure Government
          Careers”
        </p>
      </div>

      {/* MENU */}
      <div
        style={{
          display:
            "flex",
          justifyContent:
            "center",
          flexWrap:
            "wrap",
          gap: "12px",
          marginBottom:
            "30px",
        }}
      >
        <button
          onClick={() =>
            setActiveTab(
              "all"
            )
          }
          style={{
            ...tabBtn,
            background:
              activeTab ===
              "all"
                ? "#0d5aa7"
                : "#ddd",
            color:
              activeTab ===
              "all"
                ? "white"
                : "black",
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
            ...tabBtn,
            background:
              "#198754",
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
            ...tabBtn,
            background:
              "#dc3545",
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
            ...tabBtn,
            background:
              "#6f42c1",
          }}
        >
          📄 Results
        </button>

     <button
  onClick={() =>
    navigate(
      "/answer-keys"
    )
  }
  style={{
    ...tabBtn,
    background:
      "#fd7e14",
  }}
>
  📝 Answer Key
</button>

      </div>

      {/* JOB TABLE */}
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
                >
                  <td>
                    {
                      job.postName
                    }
                  </td>

                  <td>
                    {
                      job.lastDate
                    }
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
                      View
                      Details
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
                            job._id
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

     {/* FOOTER */}
<div
  style={{
    marginTop: "40px",
    background:
      "linear-gradient(135deg, #0d5aa7, #063970)",
    color: "white",
    padding:
      "40px 20px",
    borderRadius:
      "25px 25px 0 0",
    textAlign:
      "center",
    boxShadow:
      "0 -4px 15px rgba(0,0,0,0.15)",
  }}
>
  <h2
    style={{
      color: "white",
      fontSize: "34px",
      marginBottom:
        "10px",
      fontWeight:
        "bold",
    }}
  >
    📢 Join Us
  </h2>

  <p
    style={{
      color:
        "#dcecff",
      fontSize:
        "18px",
      marginBottom:
        "25px",
    }}
  >
    Follow us for latest
    updates
  </p>

  <div
    style={{
      display:
        "flex",
      justifyContent:
        "center",
      flexWrap:
        "wrap",
      gap: "15px",
      marginBottom:
        "25px",
    }}
  >
    <a
      href="https://youtube.com/@govexaminfo9?si=-t5Dv08i-auWZhGf"
      target="_blank"
      rel="noreferrer"
      style={socialBtn(
        "#FF0000"
      )}
    >
      ▶ YouTube
    </a>

    <a
      href="https://www.facebook.com/share/1JCju5hDHv/?mibextid=wwXIfr"
      target="_blank"
      rel="noreferrer"
      style={socialBtn(
        "#1877F2"
      )}
    >
      👍 Facebook
    </a>

    <a
      href="https://www.instagram.com/apnagovexam?igsh=c2dobmFpMTY3bmF5&utm_source=qr"
      target="_blank"
      rel="noreferrer"
      style={socialBtn(
        "#E4405F"
      )}
    >
      📸 Instagram
    </a>
  </div>

  <hr
    style={{
      border:
        "0.5px solid rgba(255,255,255,0.2)",
      width: "85%",
      margin:
        "20px auto",
    }}
  />

  <p
    style={{
      color:
        "#dcecff",
      fontSize:
        "14px",
      margin: 0,
    }}
  >
    © 2026 Government Job
    Portal | All Rights
    Reserved
  </p>
</div>
        </div>
      
    
  );
}

const buttonStyle = {
  color: "white",
  border: "none",
  padding:
    "12px 20px",
  borderRadius:
    "10px",
  cursor:
    "pointer",
  background:
    "#0d5aa7",
};

const tabBtn = {
  color: "white",
  border: "none",
  padding:
    "14px 22px",
  borderRadius:
    "12px",
  cursor:
    "pointer",
  fontWeight:
    "bold",
};

const socialBtn = (
  color
) => ({
  background:
    color,
  color:
    "white",
  padding:
    "12px 18px",
  borderRadius:
    "10px",
  textDecoration:
    "none",
});

export default Home;