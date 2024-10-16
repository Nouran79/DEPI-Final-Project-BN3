import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { Slide } from '../Styles/slide';
import swal from "sweetalert2";
import { MdOutlineEmojiFlags } from "react-icons/md";

export function Flags () {
  const [flags, setflag] = useState([]);
  const navigate = useNavigate();

  // Fetch flags from the backend
  useEffect(() => {
    axios
      .get('http://localhost:8000/flags') 
      .then((response) => setflag(response.data))
      .catch((error) => console.log('Error fetching Flag:', error));
  }, []);

  // Delete flag function
  const handleDelete = (flagId) => {
    swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this Flag? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/Flags/${flagId}`)
          .then((response) => {
            setflag((prevflags) => prevflags.filter((flag) => flag._id !== flagId));
            swal.fire({
              title: "Success",
              text: response.data.message || "Flag deleted successfully.",
              icon: "success",
              confirmButtonText: "OK"
            });
          })
          .catch((error) => {
            console.error("Error deleting Flag: ", error);
            swal.fire({
              title: "Error",
              text: "Failed to delete Flag. Please try again.",
              icon: "error",
              confirmButtonText: "OK"
            });
          });
      }
    });
  };

  // Update flag function
  const handleUpdate = (flagId) => {
    navigate(`/Change_Flag/${flagId}`);
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <Slide />

      <div className="flex flex-col items-center mb-10 mt-10 w-full px-4 sm:px-0">
        {/* Header with Flag Icon */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-green-700 p-5 rounded-xl shadow-lg mb-8">
          <MdOutlineEmojiFlags className="text-4xl text-white" />
          <div>
            <p className="text-white text-lg">Flags</p>
            <p className="text-white text-2xl font-bold">{flags.length}</p>
          </div>
        </div>

        {/* Flag Table */}
        <div className="w-full sm:w-2/3 bg-white rounded-md p-6 sm:p-10 m-2 sm:m-5 shadow-lg overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-gray-600 font-semibold border-b">
                <th className="p-2 sm:p-4">Flag Emojis</th>
                <th className="p-2 sm:p-4">Country Name</th>
                <th className="p-2 sm:p-4">ID</th>
                <th className="p-2 sm:p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {flags.map((flag) => (
                <tr key={flag._id} className="border-b hover:bg-gray-100">
                  <td className="p-2 sm:p-4">{flag.flagEmojis}</td>
                  <td className="p-2 sm:p-4">{flag.actualCountryName}</td>
                  <td className="p-2 sm:p-4">{flag.createdById}</td>
                  <td className="p-2 sm:p-4">
                    <div className="flex gap-2">
                      {/* Update (Edit) Icon */}
                      <button onClick={() => handleUpdate(flag._id)}>
                        <MdEdit className="text-indigo-500 hover:text-indigo-700 text-xl cursor-pointer" />
                      </button>

                      {/* Delete Icon */}
                      <button onClick={() => handleDelete(flag._id)}>
                        <MdDelete className="text-red-500 hover:text-red-700 text-xl cursor-pointer" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
