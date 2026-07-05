import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getJobById,
} from "../services/jobService";

function JobDetails() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [job, setJob] =
    useState(null);

  useEffect(() => {
    const loadJob =
      async () => {

      try {

        const data =
          await getJobById(
            id
          );

        setJob(data);

      } catch (error) {

        console.log(
          error
        );
      }
    };

    loadJob();
  }, [id]);

  if (!job) {
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
      "10px",
    overflow:
      "hidden",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom:
      "30px",
  };

  const thStyle = {
    background:
      "#0d5aa7",
    color:
      "white",
    padding:
      "14px",
    textAlign:
      "center",
    fontSize:
      "18px",
  };

  const tdStyle = {
    padding:
      "14px",
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
            "16px",
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
            "25px",
          borderRadius:
            "12px",
          marginBottom:
            "30px",
          textAlign:
            "center",
          boxShadow:
            "0 3px 12px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize:
              "38px",
          }}
        >
          {
            job.postName
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
          Last Date:
          {" "}
          <strong>
            {
              job.lastDate
            }
          </strong>
        </p>
      </div>

      {/* Important Dates */}
      <h2
        style={{
          color:
            "#0d5aa7",
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
              Application Start
            </th>

            <th style={thStyle}>
              Last Date
            </th>

            <th style={thStyle}>
              Exam Date
            </th>

            <th style={thStyle}>
              Admit Card
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={tdStyle}>
              {
                job.applicationStartDate
              }
            </td>

            <td style={tdStyle}>
              {
                job.applicationLastDate
              }
            </td>

            <td style={tdStyle}>
              {
                job.examDate ||
                "Coming Soon"
              }
            </td>

            <td style={tdStyle}>
              {
                job.admitCardDate ||
                "Coming Soon"
              }
            </td>
          </tr>
        </tbody>
      </table>

      {/* Application Fee */}
      <h2
        style={{
          color:
            "#0d5aa7",
        }}
      >
        Application Fee
      </h2>

      <table
        style={
          tableStyle
        }
      >
        <thead>
          <tr>
            <th style={thStyle}>
              General
            </th>

            <th style={thStyle}>
              OBC
            </th>

            <th style={thStyle}>
              SC/ST
            </th>

            <th style={thStyle}>
              PWD
            </th>

            <th style={thStyle}>
              Age Limit
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={tdStyle}>
              ₹
              {
                job.generalFee
              }
            </td>

            <td style={tdStyle}>
              ₹
              {
                job.obcFee
              }
            </td>

            <td style={tdStyle}>
              ₹
              {
                job.scstFee
              }
            </td>

            <td style={tdStyle}>
              ₹
              {
                job.pwdFee
              }
            </td>

            <td style={tdStyle}>
              {
                job.ageLimit
              }{" "}
              Years
            </td>
          </tr>
        </tbody>
      </table>

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
        <tbody>
          <tr>
            <td style={tdStyle}>
              Apply Online
            </td>

            <td style={tdStyle}>
              <a
                href={
                  job.applyOnlineLink
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
                Apply Here
              </a>
            </td>
          </tr>

          <tr>
            <td style={tdStyle}>
              Download Notification
            </td>

            <td style={tdStyle}>
              <a
                href={
                  job.notificationPdf
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
                Download PDF
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Positions */}
      <h2
        style={{
          color:
            "#0d5aa7",
        }}
      >
        Position &
        Qualification
      </h2>

      <table
        style={
          tableStyle
        }
      >
        <thead>
          <tr>
            <th style={thStyle}>
              Position
            </th>

            <th style={thStyle}>
              Qualification
            </th>

            <th style={thStyle}>
              No. of Posts
            </th>
          </tr>
        </thead>

        <tbody>
          {job.positions?.map(
            (
              position,
              index
            ) => (
              <tr
                key={
                  index
                }
              >
                <td style={tdStyle}>
                  {
                    position.positionName
                  }
                </td>

                <td style={tdStyle}>
                  {
                    position.qualification
                  }
                </td>

                <td style={tdStyle}>
                  {
                    position.numberOfPosts
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

    </div>
  );
}

export default JobDetails;
