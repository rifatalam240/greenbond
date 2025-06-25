import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyTips = () => {
  const [myTips, setMyTips] = useState([]);
  const [userEmail, setUserEmail] = useState("demo.user@example.com"); // user email সরাসরি দিতে পারো অথবা props, context থেকে নিতে পারো
  const navigate = useNavigate();

  useEffect(() => {
    if (userEmail) {
      fetch(
        `https://garden-server-eight.vercel.app/tips/mytips?email=${userEmail}`
      )
        .then((res) => res.json())
        .then((data) => setMyTips(data))
        .catch((err) => console.error(err));
    }
  }, [userEmail]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://garden-server-eight.vercel.app/tips/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your tip has been deleted.", "success");
              setMyTips(myTips.filter((tip) => tip._id !== id));
            }
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-semibold">📂 My Garden Tips</h2>
      {myTips.length === 0 ? (
        <p>No tips shared yet.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myTips.map((tip) => (
              <tr key={tip._id}>
                <td>{tip.title}</td>
                <td>{tip.category}</td>
                <td>{tip.availability}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline mr-2"
                    onClick={() => navigate(`/updatetip/${tip._id}`)}
                  >
                    ✏️ Update
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleDelete(tip._id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyTips;
