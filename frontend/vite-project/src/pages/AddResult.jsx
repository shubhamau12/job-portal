import {
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function AddResult() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  // Get Edit Data
  const editData =
    location.state
      ?.result;

  const [formData,
    setFormData] =
    useState({

      title:
        editData?.title ||
        "",

      aboutExam:
        editData?.aboutExam ||
        "",

      examResult:
        editData?.examResult ||
        "",

      cutoffList:
        editData?.cutoffList ||
        "",

      examDate:
        editData?.examDate ||
        "",

      resultDate:
        editData?.resultDate ||
        "",
    });

  const handleChange =
    (e) => {

      setFormData({
        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        // UPDATE RESULT
        if (
          editData?._id
        ) {

          await axios.put(
              `${import.meta.env.VITE_API_URL}/api/results/${editData._id}`,
            formData
          );

          alert(
            "Result Updated Successfully"
          );

        }

        // ADD RESULT
        else {

          await axios.post(
          `${import.meta.env.VITE_API_URL}/api/results`,
            formData
          );

          alert(
            "Result Added Successfully"
          );
        }

        navigate(
          "/results"
        );

      } catch (
        error
      ) {

        console.log(
          error
        );

        alert(
          "Failed to save result"
        );
      }
    };

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
      <div
        style={{
          maxWidth:
            "900px",
          margin:
            "auto",
          background:
            "white",
          padding:
            "40px",
          borderRadius:
            "20px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >

        {/* Back Button */}
        <button
          onClick={() =>
            navigate(
              "/results"
            )
          }
          style={{
            background:
              "#0d5aa7",
            color:
              "white",
            border:
              "none",
            padding:
              "10px 20px",
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

        <h1
          style={{
            color:
              "#0d5aa7",
            marginBottom:
              "30px",
            textAlign:
              "center",
          }}
        >
          {editData
            ? "Update Result"
            : "Add Result"}
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <div
            style={{
              display:
                "grid",
              gap: "20px",
            }}
          >

            <input
              type="text"
              name="title"
              placeholder="Result Title"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />

            <textarea
              name="aboutExam"
              placeholder="About Exam"
              value={
                formData.aboutExam
              }
              onChange={
                handleChange
              }
              rows="5"
              style={{
                ...inputStyle,
                resize:
                  "none",
              }}
            />

            <input
              type="text"
              name="examResult"
              placeholder="Exam Result Link"
              value={
                formData.examResult
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />

            <input
              type="text"
              name="cutoffList"
              placeholder="Cutoff List Link"
              value={
                formData.cutoffList
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />

            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap:
                  "20px",
              }}
            >
              <div>
                <label>
                  Exam Date
                </label>

                <input
                  type="date"
                  name="examDate"
                  value={
                    formData.examDate
                  }
                  onChange={
                    handleChange
                  }
                  style={{
                    ...inputStyle,
                    marginTop:
                      "8px",
                  }}
                />
              </div>

              <div>
                <label>
                  Result Date
                </label>

                <input
                  type="date"
                  name="resultDate"
                  value={
                    formData.resultDate
                  }
                  onChange={
                    handleChange
                  }
                  style={{
                    ...inputStyle,
                    marginTop:
                      "8px",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                background:
                  "#0d5aa7",
                color:
                  "white",
                border:
                  "none",
                padding:
                  "15px",
                borderRadius:
                  "10px",
                cursor:
                  "pointer",
                fontSize:
                  "18px",
                fontWeight:
                  "bold",
              }}
            >
              {editData
                ? "Update Result"
                : "Add Result"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width:
    "100%",
  padding:
    "14px",
  borderRadius:
    "10px",
  border:
    "1px solid #ccc",
  boxSizing:
    "border-box",
};

export default AddResult;