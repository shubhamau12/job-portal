import { useNavigate } from "react-router-dom";
import { deleteJob } from "../services/jobService";

function JobCard({
  job,
  refreshJobs,
}) {

  const navigate =
    useNavigate();

  // Check admin login
  const isAdmin =
    !!localStorage.getItem(
      "token"
    );

  // Delete Job
  const handleDelete =
    async () => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this job?"
      );

    if (
      !confirmDelete
    )
      return;

    try {

      await deleteJob(
        job._id
      );

      alert(
        "Job Deleted Successfully"
      );

      refreshJobs();

    } catch (error) {

      console.log(
        error
      );

      alert(
        "Delete failed"
      );
    }
  };

  // Edit Job
  const handleEdit =
    () => {

    navigate(
      "/admin",
      {
        state: {
          job,
        },
      }
    );
  };

  // Hide buttons for normal user
  if (!isAdmin)
    return null;

  return (
    <div
      style={{
        display:
          "flex",
        gap: "10px",
        justifyContent:
          "center",
      }}
    >

      <button
        onClick={
          handleEdit
        }
        style={{
          background:
            "#007bff",
          color:
            "white",
          border:
            "none",
          padding:
            "8px 15px",
          cursor:
            "pointer",
          borderRadius:
            "5px",
        }}
      >
        Edit
      </button>

      <button
        onClick={
          handleDelete
        }
        style={{
          background:
            "red",
          color:
            "white",
          border:
            "none",
          padding:
            "8px 15px",
          cursor:
            "pointer",
          borderRadius:
            "5px",
        }}
      >
        Delete
      </button>

    </div>
  );
}

export default JobCard;