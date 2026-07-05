import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  addAnswerKey,
  updateAnswerKey,
} from "../services/answerKeyService";

function AddAnswerKey() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const editingAnswerKey =
    location.state
      ?.answerKey;

  const [formData,
    setFormData] =
    useState({
      title: "",
      aboutExam: "",
      notificationLink:
        "",
      answerKeyLink:
        "",
      answerKeyNotification:
        "",
    });

  // Load Edit Data
  useEffect(() => {

    if (
      editingAnswerKey
    ) {

      setFormData({
        title:
          editingAnswerKey.title ||
          "",

        aboutExam:
          editingAnswerKey.aboutExam ||
          "",

        notificationLink:
          editingAnswerKey.notificationLink ||
          "",

        answerKeyLink:
          editingAnswerKey.answerKeyLink ||
          "",

        answerKeyNotification:
          editingAnswerKey.answerKeyNotification ||
          "",
      });
    }

  }, [
    editingAnswerKey,
  ]);

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

        if (
          editingAnswerKey
        ) {

          await updateAnswerKey(
            editingAnswerKey._id,
            formData
          );

          alert(
            "Answer Key Updated Successfully"
          );

        } else {

          await addAnswerKey(
            formData
          );

          alert(
            "Answer Key Added Successfully"
          );
        }

        navigate(
          "/answer-keys"
        );

      } catch (
        error
      ) {

        console.log(
          error
        );

        alert(
          "Operation Failed"
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

            textAlign:
              "center",

            marginBottom:
              "30px",
          }}
        >
          {
            editingAnswerKey
              ? "Edit Answer Key"
              : "Add Answer Key"
          }
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

              gap:
                "20px",
            }}
          >

            {/* Title */}
            <input
              type="text"
              name="title"
              placeholder="Title"

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

            {/* About Exam */}
            <textarea
              name="aboutExam"
              placeholder="About Examination"

              rows="5"

              value={
                formData.aboutExam
              }

              onChange={
                handleChange
              }

              style={{
                ...inputStyle,
                resize:
                  "vertical",
              }}
            />

            {/* Download Notification */}
            <input
              type="text"
              name="notificationLink"

              placeholder="Download Notification Link"

              value={
                formData.notificationLink
              }

              onChange={
                handleChange
              }

              style={
                inputStyle
              }
            />

            {/* Download Answer Key */}
            <input
              type="text"
              name="answerKeyLink"

              placeholder="Download Answer Key Link"

              value={
                formData.answerKeyLink
              }

              onChange={
                handleChange
              }

              style={
                inputStyle
              }
            />

            {/* Answer Key Notification */}
            <input
              type="text"
              name="answerKeyNotification"

              placeholder="Download Answer Key Notification Link"

              value={
                formData.answerKeyNotification
              }

              onChange={
                handleChange
              }

              style={
                inputStyle
              }
            />

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
              {
                editingAnswerKey
                  ? "Update Answer Key"
                  : "Add Answer Key"
              }
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding:
    "14px",

  borderRadius:
    "10px",

  border:
    "1px solid #ccc",

  width:
    "100%",

  boxSizing:
    "border-box",
};

export default AddAnswerKey;