import { useState } from "react";
import { FaPlusCircle, FaEnvelopeOpenText, FaEdit } from "react-icons/fa";
import ViewContacts from "./ViewContacts";
import AddCoffee from "../components/AddCoffee";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("add-coffee");

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f3f3f3]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#331A15] text-white p-5 space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold rancho-font text-secondary mb-6 text-center md:text-left">
          Dashboard
        </h2>
        <ul className="space-y-4 flex flex-col justify-center text-sm md:text-base">
          <li
            className={`flex items-center gap-2 cursor-pointer ${
              activePage === "add-coffee" && "text-secondary"
            }`}
            onClick={() => setActivePage("add-coffee")}
          >
            <FaPlusCircle />
            Add Coffee
          </li>

            <li
            className={`flex items-center gap-2 cursor-pointer ${
              activePage === "manage-coffee" && "text-secondary"
            }`}
            onClick={() => setActivePage("manage-coffee")}
          >
            <FaEdit />
            Manage Coffee
          </li>

          <li
            className={`flex items-center gap-2 cursor-pointer ${
              activePage === "view-contacts" && "text-secondary"
            }`}
            onClick={() => setActivePage("view-contacts")}
          >
            <FaEnvelopeOpenText />
            View Contact Query
          </li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 md:p-8">
        {activePage === "add-coffee" && <AddCoffee />}
        {activePage === "manage-coffee" && <h2>Manage Coffee</h2>}
        {activePage === "view-contacts" && <ViewContacts />}

      </main>
    </div>
  );
};

export default Dashboard;
