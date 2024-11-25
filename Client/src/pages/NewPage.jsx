import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function NewPage() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!params.id) {
        const res = await axios.post("http://localhost:8000/Vehiculos", {
          name,
          desc,
        });
        console.log(res);
      } else {
        const res = await axios.put(
          `http://localhost:8000/Vehiculos/${params.id}`,
          {
            name,
            desc,
          }
        );
        console.log(res);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }

    e.target.reset();
  };

  useEffect(() => {
    if (params.id) {
      fetchV();
    }

    async function fetchV() {
      const res = await axios.get(
        `http://localhost:8000/Vehiculos/${params.id}`
      );
      setName(res.data.name);
      setDesc(res.data.desc);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div>
        <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold my-4 ">
            {params.id ? "Actualizar" : "Crear"}
          </h1>
          <input
            type="text"
            placeholder="name"
            className="block py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
          />
          <textarea
            placeholder="description"
            rows="3"
            className="block py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          ></textarea>
          <button className="bg-white hover:bg-slate-800 hover:text-white text-slate-800 py-2 px-4 rounded">{params.id ? "Actualizar" : "Crear"}</button>
        </form>

        {params.id && (
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"
            onClick={async () => {
              try {
                const res = await axios.delete(
                  `http://localhost:8000/Vehiculos/${params.id}`
                );
                console.log(res);
                navigate("/");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default NewPage;
