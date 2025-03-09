
function Admin() {


  return (
    <main className="mt-40 w-full h-screen flex">
      <aside className="w-1/6 h-screen border-2 border-blue-700">

        <ul className="text-center text-2xl gap-4 flex flex-col font-bold"> 
          <li><button className="cursor-pointer hover:text-orange-500 ease-in-out duration-300">Vehículos</button></li>
          <li><button className="cursor-pointer hover:text-orange-500 ease-in-out duration-300">Repuestos</button></li>
          <li><button className="cursor-pointer hover:text-orange-500 ease-in-out duration-300">Usuarios</button></li>
          <li><button className="cursor-pointer hover:text-orange-500 ease-in-out duration-300">PDF</button></li>
        </ul>

      </aside>
      <section className="w-5/6 h-screen border-2 border-red-700"></section>
    </main>
  )


}

export default Admin;
