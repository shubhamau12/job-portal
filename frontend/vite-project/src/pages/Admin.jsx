import { useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  addJob,
  updateJob,
} from "../services/jobService";

const getInitialFormData = (editJob) => ({
  postName: "",
  totalVacancies: "",
  ageLimit: "",
  minimumQualification:
    "",
  selectionProcess:
    "",
  location: "",
  lastDate: "",
  eligibilityCriteria:
    "",
  category: "CS",

  notificationDate:
    "",
  applicationStartDate:
    "",
  applicationLastDate:
    "",
  examDate: "",
  admitCardDate: "",

  generalFee: "",
  obcFee: "",
  scstFee: "",
  pwdFee: "",

  applyOnlineLink:
    "",
  notificationPdf: "",

  positions: [
    {
      positionName:
        "",
      qualification:
        "",
      numberOfPosts:
        "",
    },
  ],
  ...(editJob
    ? {
        ...editJob,
        positions:
          editJob.positions
            ?.length
            ? editJob.positions
            : [
                {
                  positionName:
                    "",
                  qualification:
                    "",
                  numberOfPosts:
                    "",
                },
              ],
      }
    : {}),
});

function Admin() {
  const navigate =
    useNavigate();
  const location =
    useLocation();

  const editJob =
    location.state?.job;

  const [formData, setFormData] =
    useState(() =>
      getInitialFormData(
        editJob
      )
    );

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handlePositionChange =
    (index, e) => {
      const updated = [
        ...formData.positions,
      ];

      updated[index][
        e.target.name
      ] = e.target.value;

      setFormData({
        ...formData,
        positions:
          updated,
      });
    };

  const addPosition =
    () => {
      setFormData({
        ...formData,
        positions: [
          ...formData.positions,
          {
            positionName:
              "",
            qualification:
              "",
            numberOfPosts:
              "",
          },
        ],
      });
    };

  const removePosition =
    (index) => {
      const updated =
        formData.positions.filter(
          (_, i) =>
            i !== index
        );

      setFormData({
        ...formData,
        positions:
          updated,
      });
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        if (editJob) {
          await updateJob(
            editJob._id,
            formData
          );

          alert(
            "Job Updated Successfully"
          );
        } else {
          await addJob(
            formData
          );

          alert(
            "Job Added Successfully"
          );
        }

        navigate("/");
      } catch (error) {
        console.log(
          error
        );
        alert(
          "Something went wrong"
        );
      }
    };

  const styles = {
    page: {
      background:
        "#f4f6f9",
      minHeight:
        "100vh",
      padding:
        "40px 20px",
    },

    container: {
      maxWidth:
        "1200px",
      margin:
        "auto",
      background:
        "white",
      borderRadius:
        "20px",
      padding:
        "40px",
      boxShadow:
        "0 4px 20px rgba(0,0,0,0.1)",
    },

    heading: {
      textAlign:
        "center",
      color:
        "#0d5aa7",
      marginBottom:
        "30px",
      fontSize:
        "38px",
    },

    section: {
      marginTop:
        "30px",
    },

    sectionTitle: {
      color:
        "#0d5aa7",
      borderBottom:
        "2px solid #ddd",
      paddingBottom:
        "8px",
      marginBottom:
        "20px",
    },

    grid: {
      display:
        "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(280px,1fr))",
      gap: "20px",
    },

    input: {
      padding:
        "12px",
      border:
        "1px solid #ccc",
      borderRadius:
        "10px",
      fontSize:
        "16px",
      width: "100%",
      boxSizing:
        "border-box",
    },

    textarea: {
      padding:
        "12px",
      border:
        "1px solid #ccc",
      borderRadius:
        "10px",
      fontSize:
        "16px",
      minHeight:
        "100px",
      width: "100%",
      boxSizing:
        "border-box",
    },

    positionCard: {
      background:
        "#f8f9fa",
      padding:
        "20px",
      borderRadius:
        "12px",
      marginBottom:
        "20px",
      border:
        "1px solid #ddd",
    },

    addButton: {
      background:
        "green",
      color:
        "white",
      border: "none",
      padding:
        "12px 20px",
      borderRadius:
        "10px",
      cursor:
        "pointer",
      fontSize:
        "16px",
    },

    removeButton: {
      background:
        "red",
      color:
        "white",
      border: "none",
      padding:
        "10px 15px",
      borderRadius:
        "8px",
      cursor:
        "pointer",
      marginTop:
        "10px",
    },

    submitButton: {
      background:
        "#0d5aa7",
      color:
        "white",
      border: "none",
      padding:
        "15px 30px",
      borderRadius:
        "12px",
      fontSize:
        "18px",
      cursor:
        "pointer",
      width: "100%",
      marginTop:
        "30px",
    },
  };

  return (
    <div
      style={
        styles.page
      }
    >
      <div
        style={
          styles.container
        }
      >
        <h1
          style={
            styles.heading
          }
        >
          {editJob
            ? "Edit Job"
            : "Add New Job"}
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <div style={styles.section}>
  <h2 style={styles.sectionTitle}>
    Basic Details
  </h2>

  <div style={styles.grid}>
    <input
      name="postName"
      placeholder="Post Name"
      value={formData.postName}
      onChange={handleChange}
      style={styles.input}
    />

    <input
      name="totalVacancies"
      placeholder="Total Vacancies"
      value={formData.totalVacancies}
      onChange={handleChange}
      style={styles.input}
    />

    <input
      name="ageLimit"
      placeholder="Age Limit"
      value={formData.ageLimit}
      onChange={handleChange}
      style={styles.input}
    />

    <input
      name="minimumQualification"
      placeholder="Minimum Qualification"
      value={formData.minimumQualification}
      onChange={handleChange}
      style={styles.input}
    />

    <input
      name="selectionProcess"
      placeholder="Selection Process"
      value={formData.selectionProcess}
      onChange={handleChange}
      style={styles.input}
    />

    <input
      name="location"
      placeholder="Location"
      value={formData.location}
      onChange={handleChange}
      style={styles.input}
    />

    {/* Last Date with Title */}
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Last Date
      </label>

      <input
        type="date"
        name="lastDate"
        value={formData.lastDate}
        onChange={handleChange}
        style={styles.input}
      />
    </div>

    <select
      name="category"
      value={formData.category}
      onChange={handleChange}
      style={styles.input}
    >
      <option value="CS">
        Computer Science
      </option>

      <option value="Banking">
        Banking
      </option>

      <option value="Railway">
        Railway
      </option>
    </select>
  </div>

  <br />

  <textarea
    name="eligibilityCriteria"
    placeholder="Eligibility Criteria"
    value={formData.eligibilityCriteria}
    onChange={handleChange}
    style={styles.textarea}
  />
</div>

          <div style={styles.section}>
  <h2 style={styles.sectionTitle}>
    Important Dates
  </h2>

  <div style={styles.grid}>

    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Notification Date
      </label>

      <input
        type="date"
        name="notificationDate"
        value={formData.notificationDate}
        onChange={handleChange}
        style={styles.input}
      />
    </div>

    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Application Start Date
      </label>

      <input
        type="date"
        name="applicationStartDate"
        value={formData.applicationStartDate}
        onChange={handleChange}
        style={styles.input}
      />
    </div>

    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Application Last Date
      </label>

      <input
        type="date"
        name="applicationLastDate"
        value={formData.applicationLastDate}
        onChange={handleChange}
        style={styles.input}
      />
    </div>

    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Exam Date
      </label>

      <input
        type="date"
        name="examDate"
        value={formData.examDate}
        onChange={handleChange}
        style={styles.input}
      />
    </div>

    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Admit Card Date
      </label>

      <input
        type="date"
        name="admitCardDate"
        value={formData.admitCardDate}
        onChange={handleChange}
        style={styles.input}
      />
    </div>

  </div>
</div>

          <div
            style={
              styles.section
            }
          >
            <h2
              style={
                styles.sectionTitle
              }
            >
              Fee Details
            </h2>

            <div
              style={
                styles.grid
              }
            >
              <input name="generalFee" placeholder="General Fee" value={formData.generalFee} onChange={handleChange} style={styles.input} />
              <input name="obcFee" placeholder="OBC Fee" value={formData.obcFee} onChange={handleChange} style={styles.input} />
              <input name="scstFee" placeholder="SC/ST Fee" value={formData.scstFee} onChange={handleChange} style={styles.input} />
              <input name="pwdFee" placeholder="PWD Fee" value={formData.pwdFee} onChange={handleChange} style={styles.input} />
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Important Links
            </h2>

            <div style={styles.grid}>
              <input name="applyOnlineLink" placeholder="Apply Online Link" value={formData.applyOnlineLink} onChange={handleChange} style={styles.input} />

              <input name="notificationPdf" placeholder="Notification PDF Link" value={formData.notificationPdf} onChange={handleChange} style={styles.input} />
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Positions
            </h2>

            {formData.positions.map(
              (
                position,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  style={
                    styles.positionCard
                  }
                >
                  <div
                    style={
                      styles.grid
                    }
                  >
                    <input name="positionName" placeholder="Position Name" value={position.positionName} onChange={(e) => handlePositionChange(index, e)} style={styles.input} />

                    <input name="qualification" placeholder="Qualification" value={position.qualification} onChange={(e) => handlePositionChange(index, e)} style={styles.input} />

                    <input name="numberOfPosts" placeholder="No. of Posts" value={position.numberOfPosts} onChange={(e) => handlePositionChange(index, e)} style={styles.input} />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removePosition(
                        index
                      )
                    }
                    style={
                      styles.removeButton
                    }
                  >
                    Remove
                  </button>
                </div>
              )
            )}

            <button
              type="button"
              onClick={
                addPosition
              }
              style={
                styles.addButton
              }
            >
              + Add Position
            </button>
          </div>

          <button
            type="submit"
            style={
              styles.submitButton
            }
          >
            {editJob
              ? "Update Job"
              : "Add Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
