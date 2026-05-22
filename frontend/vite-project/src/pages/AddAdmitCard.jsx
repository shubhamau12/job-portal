import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function AddAdmitCard() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const editData =
    location.state
      ?.admitCard;

  const [formData,
    setFormData] =
    useState({

      title:
        editData?.title ||
        "",

      howToCheckAdmitCard:
        editData?.howToCheckAdmitCard ||
        "",

      examDate:
        editData?.examDate ||
        "",

      admitCard:
        editData?.admitCard ||
        "",

      downloadAdmitCard:
        editData?.downloadAdmitCard ||
        "",

      downloadExamCityDetails:
        editData?.downloadExamCityDetails ||
        "",

      downloadExamCityNotice:
        editData?.downloadExamCityNotice ||
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

        if (
          editData?._id
        ) {

          await axios.put(
           `${import.meta.env.VITE_API_URL}/api/admit-cards/${editData._id}`,
            formData
          );

          alert(
            "Admit Card Updated Successfully"
          );

        } else {

          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/admit-cards`,
            formData
          );

          alert(
            "Admit Card Added Successfully"
          );
        }
          navigate("/admit-cards"
        );

      } catch (
        error
      ) {

        console.log(
          error
        );

        alert(
          "Something went wrong"
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
          "40px",
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
            "0 4px 15px rgba(0,0,0,0.12)",
        }}
      >

        <h1
          style={{
            textAlign:
              "center",
            color:
              "#0d5aa7",
            marginBottom:
              "30px",
          }}
        >
          {editData
            ? "Update Admit Card"
            : "Add Admit Card"}
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <input
            type="text"
            name="title"
            placeholder="Exam Title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            style={inputStyle}
          />

          <textarea
            name="howToCheckAdmitCard"
            placeholder="About Exam"
            value={
              formData.howToCheckAdmitCard
            }
            onChange={
              handleChange
            }
            style={{
              ...inputStyle,
              height:
                "120px",
            }}
          />

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
            style={inputStyle}
          />

          <input
            type="text"
            name="admitCard"
            placeholder="Admit Card Text"
            value={
              formData.admitCard
            }
            onChange={
              handleChange
            }
            style={inputStyle}
          />

          <input
            type="text"
            name="downloadAdmitCard"
            placeholder="Admit Card Link"
            value={
              formData.downloadAdmitCard
            }
            onChange={
              handleChange
            }
            style={inputStyle}
          />

          <input
            type="text"
            name="downloadExamCityDetails"
            placeholder="Exam City Link"
            value={
              formData.downloadExamCityDetails
            }
            onChange={
              handleChange
            }
            style={inputStyle}
          />

          <input
            type="text"
            name="downloadExamCityNotice"
            placeholder="Notice Link"
            value={
              formData.downloadExamCityNotice
            }
            onChange={
              handleChange
            }
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width:
                "100%",
              background:
                "#0d5aa7",
              color:
                "white",
              border:
                "none",
              padding:
                "16px",
              borderRadius:
                "10px",
              fontSize:
                "18px",
              cursor:
                "pointer",
              fontWeight:
                "bold",
            }}
          >
            {editData
              ? "Update Admit Card"
              : "Add Admit Card"}
          </button>

        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width:
    "100%",
  padding:
    "16px",
  marginBottom:
    "20px",
  border:
    "1px solid #ccc",
  borderRadius:
    "10px",
  fontSize:
    "16px",
  boxSizing:
    "border-box",
};

export default AddAdmitCard;