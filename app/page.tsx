"use client";

import { useEffect, useState } from "react";

type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
};
type FollowUp = {
  id: number;
  customerId: number;
  date: string;
  note: string;
  status: "Pending" | "Completed";
};
type Appointment = {
  id: number;
  customerId: number;
  date: string;
  time: string;
  note: string;
  status: "Scheduled" | "Completed" | "Cancelled";
};
type Sale = {
  id: number;
  customerId: number;
  amount: number;
  date: string;
  note: string;
};
export default function Home() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
const [customersLoaded, setCustomersLoaded] = useState(false);

useEffect(() => {
  const savedCustomers = localStorage.getItem("knowbase-customers");
const savedFollowUps = localStorage.getItem("knowbase-followups");
const savedAppointments = localStorage.getItem("knowbase-appointments");
const savedSales = localStorage.getItem("knowbase-sales");
  if (savedCustomers) {
    setCustomers(JSON.parse(savedCustomers));
  }
  if (savedFollowUps) {
    setFollowUps(JSON.parse(savedFollowUps));
}
if (savedAppointments) {
  setAppointments(JSON.parse(savedAppointments));
}
if (savedSales) {
  setSales(JSON.parse(savedSales));
}

  setCustomersLoaded(true);
}, []);

useEffect(() => {
  if (customersLoaded) {
    localStorage.setItem("knowbase-customers", JSON.stringify(customers));
  }
}, [customers, customersLoaded]);
useEffect(() => {
  if (customersLoaded) {
    localStorage.setItem("knowbase-followups", JSON.stringify(followUps));
  }
}, [followUps, customersLoaded]);
useEffect(() => {
  if (customersLoaded) {
    localStorage.setItem(
      "knowbase-appointments",
      JSON.stringify(appointments)
    );
  }
}, [appointments, customersLoaded]);

useEffect(() => {
  if (customersLoaded) {
    localStorage.setItem(
      "knowbase-sales",
      JSON.stringify(sales)
    );
  }
}, [sales, customersLoaded]);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showAddSale, setShowAddSale] = useState(false);
  const [saleCustomerId, setSaleCustomerId] = useState<number | null>(null);
const [saleAmount, setSaleAmount] = useState("");
const [saleNote, setSaleNote] = useState("");
  const [showAddFollowUp, setShowAddFollowUp] = useState(false);
const [followUpCustomerId, setFollowUpCustomerId] = useState<number | null>(null);
const [followUpDate, setFollowUpDate] = useState("");
const [followUpNote, setFollowUpNote] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  function addCustomer() {
    if (!name.trim() || !phone.trim()) {
      alert("Please enter customer name and phone number.");
      return;
    }

    const newCustomer: Customer = {
      id: Date.now(),
      name,
      phone,
      email,
      notes,
    };

    setCustomers([...customers, newCustomer]);

    setName("");
    setPhone("");
    setEmail("");
    setNotes("");

    setShowAddCustomer(false);
  }
  function addFollowUp() {
  if (followUpCustomerId === null || !followUpDate.trim()) {
    alert("Please select a customer and follow-up date.");
    return;
  }

  const newFollowUp: FollowUp = {
    id: Date.now(),
    customerId: followUpCustomerId,
    date: followUpDate,
    note: followUpNote,
    status: "Pending",
  };

  setFollowUps([...followUps, newFollowUp]);

  setFollowUpCustomerId(null);
  setFollowUpDate("");
  setFollowUpNote("");
  setShowAddFollowUp(false);
}

 function addSale() {
  const customerId = prompt("Enter customer ID:");
  const amount = prompt("Enter sale amount:");
  const date = prompt("Enter sale date (YYYY-MM-DD):");

  if (!customerId || !amount || !date) {
    alert("Please enter customer ID, amount and date.");
    return;
  }

  const newSale: Sale = {
    id: Date.now(),
    customerId: Number(customerId),
    amount: Number(amount),
    date,
    note: "",
  };

  setSales([...sales, newSale]);

  alert("Sale added successfully!");
}
function deleteSale(id: number) {
  setSales(sales.filter((sale) => sale.id !== id));
}

function deleteCustomer(id: number) {
    setCustomers(customers.filter((customer) => customer.id !== id));
  }
function editCustomer(id: number) {
  const customer = customers.find((customer) => customer.id === id);

  if (!customer) return;

  const newName = prompt("Customer name:", customer.name);
  if (newName === null) return;

  const newPhone = prompt("Phone number:", customer.phone);
  if (newPhone === null) return;

  const newEmail = prompt("Email:", customer.email);
  if (newEmail === null) return;

  const newNotes = prompt("Notes:", customer.notes);
  if (newNotes === null) return;

  if (!newName.trim() || !newPhone.trim()) {
    alert("Customer name and phone number are required.");
    return;
  }

  setCustomers(
    customers.map((customer) =>
      customer.id === id
        ? {
            ...customer,
            name: newName.trim(),
            phone: newPhone.trim(),
            email: newEmail.trim(),
            notes: newNotes.trim(),
          }
        : customer
    )
  );
}
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-800 bg-slate-900 p-6">

        <h1 className="text-2xl font-bold">
          KnowBase <span className="text-cyan-400">AI</span>
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Business Guardian
        </p>

        <nav className="mt-10 space-y-2">

          <NavButton
            label="Dashboard"
            active={activePage === "Dashboard"}
            onClick={() => setActivePage("Dashboard")}
          />

          <NavButton
            label="Customers"
            active={activePage === "Customers"}
            onClick={() => setActivePage("Customers")}
          />

          <NavButton
            label="Follow-ups"
            active={activePage === "Follow-ups"}
            onClick={() => setActivePage("Follow-ups")}
          />

          <NavButton
            label="Appointments"
            active={activePage === "Appointments"}
            onClick={() => setActivePage("Appointments")}
          />
          <NavButton
  label="Sales"
  active={activePage === "Sales"}
  onClick={() => setActivePage("Sales")}
/>

          <NavButton
            label="AI Assistant"
            active={activePage === "AI Assistant"}
            onClick={() => setActivePage("AI Assistant")}
          />

          <NavButton
            label="Reports"
            active={activePage === "Reports"}
            onClick={() => setActivePage("Reports")}
          />

        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <section className="ml-64 min-h-screen p-8">

        {activePage === "Dashboard" && (
          <Dashboard
  customersCount={customers.length}
  followUpsCount={followUps.filter(
    (followUp) => followUp.status === "Pending"
  ).length}
  appointments={appointments}
  sales={sales}
/>
        )}

        {activePage === "Customers" && (
          <CustomersPage
            customers={customers}
            showAddCustomer={showAddCustomer}
            setShowAddCustomer={setShowAddCustomer}
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            notes={notes}
            setNotes={setNotes}
            addCustomer={addCustomer}
            deleteCustomer={deleteCustomer}
editCustomer={editCustomer}          />
        )}

        {activePage === "Follow-ups" && (
  <FollowUpsPage
    followUps={followUps}
    setFollowUps={setFollowUps}
    customers={customers}
  />
)}

        {activePage === "Appointments" && (
  <AppointmentsPage
    appointments={appointments}
    setAppointments={setAppointments}
    customers={customers}
  />
)}

       {activePage === "AI Assistant" && (
  <AIAssistantPage
    customers={customers}
    followUps={followUps}
    appointments={appointments}
    sales={sales}
  />
)}
        {activePage === "Sales" && (
  <SalesPage
    sales={sales}
    setSales={setSales}
    customers={customers}
    showAddSale={showAddSale}
    setShowAddSale={setShowAddSale}
    addSale={addSale}
    deleteSale={deleteSale}
  />
)}

        {activePage === "Reports" && (
          <ReportsPage
  customers={customers}
  followUps={followUps}
  appointments={appointments}
  sales={sales}
/>
        )}

      </section>
    </main>
  );
}


/* =========================
   SIDEBAR BUTTON
========================= */

function NavButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl px-4 py-3 text-left font-medium ${
        active
          ? "bg-cyan-400 text-slate-950"
          : "text-slate-300 hover:bg-slate-800"
      }`}
    >
      {label}
    </button>
  );
}


/* =========================
   DASHBOARD
========================= */

function SalesPage({
  sales,
  setSales,
  customers,
  showAddSale,
  setShowAddSale,
    addSale,
    deleteSale,
}: {
  sales: Sale[];
  setSales: (sales: Sale[]) => void;
  customers: Customer[];
  showAddSale: boolean;
  setShowAddSale: (show: boolean) => void;
    addSale: () => void;
    deleteSale: (id: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">SALES MANAGEMENT</p>
          <h2 className="mt-1 text-3xl font-bold">Sales</h2>
        </div>

        <button
         onClick={addSale}
          className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
        >
          + Add Sale
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Total Sales</p>
          <p className="mt-2 text-3xl font-bold">{sales.length}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Customers</p>
          <p className="mt-2 text-3xl font-bold">{customers.length}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Status</p>
          <p className="mt-2 text-xl font-bold text-cyan-400">Ready</p>
        </div>
      </div>
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900">
  <div className="border-b border-slate-800 p-6">
    <h3 className="text-xl font-bold">Sales History</h3>
    <p className="mt-1 text-sm text-slate-400">
      Your recorded sales
    </p>
  </div>

  {sales.length === 0 ? (
    <div className="p-6 text-slate-400">
      No sales recorded yet.
    </div>
  ) : (
    <div className="divide-y divide-slate-800">
      {sales.map((sale) => (
        <div
          key={sale.id}
          className="flex items-center justify-between p-6"
        >
          <div>
            <p className="font-semibold">
              Customer: {customers.find((c) => c.id === sale.customerId)?.name ?? "Unknown Customer"}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Date: {sale.date}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-cyan-400">
              {sale.amount}
            </p>
            <p className="text-sm text-slate-400">
              Sale Amount
            </p>
            <button
  onClick={() => deleteSale(sale.id)}
  className="mt-3 rounded-xl border border-red-500 px-4 py-2 text-red-400"
>
  Delete
</button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
}
function Dashboard({
  customersCount,
  followUpsCount,
  appointments,
  sales,
}: {
  customersCount: number;
  followUpsCount: number;
  appointments: Appointment[];
  sales: Sale[];
}) {
  return (
    <div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            Good morning 👋
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            Business Dashboard
          </h2>
        </div>

        <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm">
          My Business
        </button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

        <StatCard
          title="Customers"
          value={customersCount.toString()}
          description="Total customers"
        />

        <StatCard
  title="Follow-ups"
  value={followUpsCount.toString()}
  description="Pending follow-ups"
/>

        <StatCard
          title="Appointments"
          value={appointments.filter(
  (appointment) =>
    appointment.status === "Scheduled" &&
    new Date(`${appointment.date}T${appointment.time}`) > new Date()
).length.toString()}
          description="Upcoming appointments"
        />

        <StatCard
          title="Sales"
          value={`Rs ${sales
  .filter((sale) => {
    const saleDate = new Date(sale.date);
    const now = new Date();

    return (
      saleDate.getMonth() === now.getMonth() &&
      saleDate.getFullYear() === now.getFullYear()
    );
  })
  .reduce((total, sale) => total + sale.amount, 0)}`}
          description="This month"
        />

      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <p className="text-sm font-semibold text-cyan-400">
          BUSINESS GUARDIAN AI
        </p>

        <h3 className="mt-2 text-2xl font-bold">
          How can I help your business today?
        </h3>

        <p className="mt-2 text-slate-400">
          Ask KnowBase AI about your customers, sales,
          appointments or follow-ups.
        </p>

        <div className="mt-6 flex gap-3">

          <input
            type="text"
            placeholder="Ask your business assistant..."
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
          />

          <button className="rounded-xl bg-cyan-400 px-6 font-semibold text-slate-950">
            Ask AI
          </button>

        </div>

      </div>

    </div>
  );
}


/* =========================
   CUSTOMERS PAGE
========================= */

function CustomersPage({
  customers,
  showAddCustomer,
  setShowAddCustomer,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  notes,
  setNotes,
  addCustomer,
  deleteCustomer,
editCustomer,
}: {
  customers: Customer[];
  showAddCustomer: boolean;
  setShowAddCustomer: (value: boolean) => void;

  name: string;
  setName: (value: string) => void;

  phone: string;
  setPhone: (value: string) => void;

  email: string;
  setEmail: (value: string) => void;

  notes: string;
  setNotes: (value: string) => void;

  addCustomer: () => void;
  deleteCustomer: (id: number) => void;
editCustomer: (id: number) => void;}) {
    const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter((customer) => {
    const query = searchTerm.toLowerCase().trim();

    if (!query) return true;

    return (
      customer.name.toLowerCase().includes(query) ||
      customer.phone.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query)
    );
  });
  return (
    <div>

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-cyan-400">
            CUSTOMER MANAGEMENT
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            Customers
          </h2>

          <p className="mt-2 text-slate-400">
            Manage your business customers in one place.
          </p>
        </div>

        <button
          onClick={() => setShowAddCustomer(true)}
          className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
        >
          + Add Customer
        </button>

      </div>


      {/* ADD CUSTOMER FORM */}

      {showAddCustomer && (
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h3 className="text-xl font-bold">
            Add New Customer
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Customer name *"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number *"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />

            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />

          </div>

          <div className="mt-6 flex gap-3">

            <button
              onClick={addCustomer}
              className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
            >
              Save Customer
            </button>

            <button
              onClick={() => setShowAddCustomer(false)}
              className="rounded-xl border border-slate-700 px-5 py-3"
            >
              Cancel
            </button>

          </div>

        </div>
      )}


      {/* CUSTOMER LIST */}

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900">

        <div className="border-b border-slate-800 p-6">

          <h3 className="text-xl font-bold">
            Customer List
          </h3>

         <p className="mt-1 text-sm text-slate-400">
  {searchTerm.trim()
    ? `${filteredCustomers.length} matching customer${filteredCustomers.length !== 1 ? "s" : ""}`
    : `${customers.length} customer${customers.length !== 1 ? "s" : ""}`}
</p>
          <div className="mt-4">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search customers by name, phone or email..."
    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
  />
</div>

        </div>


        {filteredCustomers.length === 0 ? (

          <div className="p-10 text-center">

            <div className="text-4xl">👥</div>

            <h4 className="mt-4 text-lg font-semibold">
              {customers.length === 0 ? "No customers yet" : "No matching customers"}
            </h4>

            <p className="mt-2 text-slate-400">
              {customers.length === 0
  ? "Add your first customer to get started."
  : "Try adjusting your search."}
            </p>

          </div>

        ) : (

          <div className="divide-y divide-slate-800">

            {filteredCustomers.map((customer) => (

              <div
                key={customer.id}
                className="flex items-center justify-between p-6"
              >

                <div>

                  <h4 className="font-semibold">
                    {customer.name}
                  </h4>

                  <p className="text-xs text-cyan-400">
  ID: {customer.id}
</p>

                  <p className="mt-1 text-sm text-slate-400">
                    📱 {customer.phone}
                  </p>

                  {customer.email && (
                    <p className="text-sm text-slate-400">
                      ✉️ {customer.email}
                    </p>
                  )}

                  {customer.notes && (
                    <p className="mt-2 text-sm text-slate-500">
                      {customer.notes}
                    </p>
                  )}

                </div>
<button
  onClick={() => editCustomer(customer.id)}
  className="rounded-lg border border-cyan-400 px-3 py-2 text-sm text-cyan-400 hover:bg-cyan-400 hover:text-slate-950"
>
  Edit
</button>
                <button
                  onClick={() => deleteCustomer(customer.id)}
                  className="rounded-lg border border-red-900 px-3 py-2 text-sm text-red-400 hover:bg-red-950"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}
function FollowUpsPage({
  followUps,
  setFollowUps,
  customers,
}: {
  followUps: FollowUp[];
  setFollowUps: (value: FollowUp[]) => void;
  customers: Customer[];
}) {
 const [showForm, setShowForm] = useState(false);
const [selectedCustomerId, setSelectedCustomerId] = useState("");
const [followUpDate, setFollowUpDate] = useState("");
const [followUpNote, setFollowUpNote] = useState("");
const getFollowUpStatus = (followUp: FollowUp) => {
  if (followUp.status === "Completed") {
    return "Completed";
  }

  const today = new Date().toISOString().split("T")[0];

  if (followUp.date < today) {
    return "Overdue";
  }

  if (followUp.date === today) {
    return "Due Today";
  }

  return "Upcoming";
};
 
return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-cyan-400">CUSTOMER FOLLOW-UPS</p>
          <h2 className="mt-1 text-3xl font-bold">
            Follow-ups
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Manage your customer follow-ups and reminders.
          </p>
        </div>

        <button
  onClick={() => setShowForm(!showForm)}
  className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
>
  {showForm ? "Cancel" : "+ Add Follow-up"}
</button>
{showForm && (
  <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900 p-5">
    <h3 className="text-lg font-semibold mb-4">Add Follow-up</h3>

    <div className="grid gap-4">
      <select
        value={selectedCustomerId}
        onChange={(e) => setSelectedCustomerId(e.target.value)}
        className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3"
      >
        <option value="">Select Customer</option>

        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name} - {customer.phone}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={followUpDate}
        onChange={(e) => setFollowUpDate(e.target.value)}
        className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3"
      />

      <textarea
        value={followUpNote}
        onChange={(e) => setFollowUpNote(e.target.value)}
        placeholder="Follow-up note"
        rows={3}
        className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3"
      />

      <button
        onClick={() => {
          if (!selectedCustomerId || !followUpDate || !followUpNote.trim()) {
            alert("Please fill all fields.");
            return;
          }

          const newFollowUp: FollowUp = {
            id: Date.now(),
            customerId: Number(selectedCustomerId),
            date: followUpDate,
            note: followUpNote.trim(),
            status: "Pending",
          };

          setFollowUps([...followUps, newFollowUp]);

          setSelectedCustomerId("");
          setFollowUpDate("");
          setFollowUpNote("");
          setShowForm(false);
        }}
        className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
      >
        Save Follow-up
      </button>
    </div>
  </div>
)}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900">
        {followUps.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-4xl">📅</div>

            <h3 className="mt-4 text-lg font-semibold">
              No follow-ups yet
            </h3>

            <p className="mt-2 text-slate-400">
              Add your first customer follow-up to get started.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {followUps.map((followUp) => {
              const customer = customers.find(
                (c) => c.id === followUp.customerId
              );

              return (
                <div
                  key={followUp.id}
                  className="flex items-center justify-between p-6"
                >
                  <div>
                    <h3 className="font-semibold">
                      {customer?.name || "Unknown customer"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      📅 {followUp.date}
                    </p>

                    <p className="mt-2 text-sm text-slate-300">
                      {followUp.note}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
  onClick={() => {
    setFollowUps(
      followUps.map((item) =>
        item.id === followUp.id
          ? {
              ...item,
              status:
                item.status === "Pending" ? "Completed" : "Pending",
            }
          : item
      )
    );
  }}
  className="rounded-full border border-yellow-700 px-3 py-1 text-xs text-yellow-400 hover:bg-yellow-900"
>
  {getFollowUpStatus(followUp)}
</button>

                    <button
                      onClick={() => {
  setFollowUps(
    followUps.filter((item) => item.id !== followUp.id)
  );
}}
                        
                      className="rounded-lg border border-red-900 px-3 py-2 text-sm text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


/* =========================
   STAT CARD
========================= */

function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>

    </div>
  );
}
function AppointmentsPage({
  appointments,
  setAppointments,
  customers,
}: {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  customers: Customer[];
}) {
  const [showForm, setShowForm] = useState(false);

  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentNote, setAppointmentNote] = useState("");

  function addAppointment() {
    if (
      !selectedCustomerId ||
      !appointmentDate ||
      !appointmentTime
    ) {
      alert("Please select customer, date and time.");
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now(),
      customerId: Number(selectedCustomerId),
      date: appointmentDate,
      time: appointmentTime,
      note: appointmentNote.trim(),
      status: "Scheduled",
    };

    setAppointments([...appointments, newAppointment]);

    setSelectedCustomerId("");
    setAppointmentDate("");
    setAppointmentTime("");
    setAppointmentNote("");
    setShowForm(false);
  }

  return (
    <div className="space-y-6">

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-cyan-400">
            CUSTOMER APPOINTMENTS
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            Appointments
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Schedule and manage your customer appointments.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
        >
          {showForm ? "Cancel" : "+ Add Appointment"}
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <h3 className="mb-5 text-xl font-semibold">
            Add Appointment
          </h3>

          <div className="grid gap-4 md:grid-cols-2">

            <select
              value={selectedCustomerId}
              onChange={(e) =>
                setSelectedCustomerId(e.target.value)
              }
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3"
            >
              <option value="">Select Customer</option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.name} - {customer.phone}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={appointmentDate}
              onChange={(e) =>
                setAppointmentDate(e.target.value)
              }
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3"
            />

            <input
              type="time"
              value={appointmentTime}
              onChange={(e) =>
                setAppointmentTime(e.target.value)
              }
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3"
            />

            <textarea
              value={appointmentNote}
              onChange={(e) =>
                setAppointmentNote(e.target.value)
              }
              placeholder="Appointment note"
              rows={3}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 md:col-span-2"
            />

          </div>

          <button
            onClick={addAppointment}
            className="mt-5 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
          >
            Save Appointment
          </button>
        </div>
      )}

      <div className="space-y-4">

        {appointments.length === 0 ? (
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
            <p className="text-slate-400">
              No appointments yet.
            </p>
          </div>
        ) : (
          appointments.map((appointment) => {
            const customer = customers.find(
              (c) => c.id === appointment.customerId
            );

            return (
              <div
                key={appointment.id}
                className="rounded-xl border border-slate-700 bg-slate-900 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">

                  <div>
                    <h3 className="text-lg font-semibold">
                      {customer?.name || "Unknown Customer"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {appointment.date} at {appointment.time}
                    </p>

                    {appointment.note && (
                      <p className="mt-3 text-sm text-slate-300">
                        {appointment.note}
                      </p>
                    )}
                  </div>

                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-400">
                    {appointment.status}
                  </span>
                  <div className="flex gap-2 mt-4">
  {appointment.status === "Scheduled" && (
    <>
      <button
        onClick={() =>
          setAppointments((current) =>
            current.map((item) =>
              item.id === appointment.id
                ? { ...item, status: "Completed" }
                : item
            )
          )
        }
        className="rounded-lg bg-green-500 px-3 py-2 text-sm font-semibold text-white"
      >
        Complete
      </button>

      <button
        onClick={() =>
          setAppointments((current) =>
            current.map((item) =>
              item.id === appointment.id
                ? { ...item, status: "Cancelled" }
                : item
            )
          )
        }
        className="rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white"
      >
        Cancel
      </button>
    </>
  )}

  <button
    onClick={() => {
      if (confirm("Delete this appointment?")) {
        setAppointments((current) =>
          current.filter((item) => item.id !== appointment.id)
        );
      }
    }}
    className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-semibold text-white"
  >
    Delete
  </button>
</div>
                 

                </div>
              </div>
            );
          })
        )}

      </div>
    </div>
  );
}

/* =========================
   COMING SOON
========================= */

function AIAssistantPage({
  customers,
  followUps,
  appointments,
  sales,
}: {
  customers: Customer[];
  followUps: FollowUp[];
  appointments: Appointment[];
  sales: Sale[];
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function askAI(customQuestion?: string) {
    const q = (customQuestion ?? question).toLowerCase().trim();

    if (!q) {
      setAnswer("Please enter a question first.");
      return;
    }

    if (
      q.includes("how many customers") ||
      q.includes("number of customers") ||
      q.includes("customers do i have")
    ) {
      setAnswer(`You currently have ${customers.length} customer(s).`);
      return;
    }

    if (
      q.includes("upcoming appointments") ||
      q.includes("appointments") ||
      q.includes("appointment")
    ) {
      const upcoming = appointments.filter(
        (appointment) =>
          appointment.status === "Scheduled" &&
          new Date(`${appointment.date}T${appointment.time}`) >= new Date()
      );

      if (upcoming.length === 0) {
        setAnswer("You have no upcoming appointments.");
      } else {
        setAnswer(
          `You have ${upcoming.length} upcoming appointment(s).`
        );
      }
      return;
    }

    if (
      q.includes("overdue") ||
      q.includes("follow-ups") ||
      q.includes("follow ups")
    ) {
      if (
  q.includes("overdue") ||
  q.includes("follow-ups") ||
  q.includes("follow ups")
) {
  const today = new Date();

  const overdue = followUps.filter(
    (followUp) =>
      followUp.status === "Pending" &&
      new Date(followUp.date) < today
  );

  if (overdue.length === 0) {
    setAnswer("You have no overdue follow-ups.");
  } else {
    const overdueDetails = overdue
      .map((followUp, index) => {
        const customer = customers.find(
          (customer) => customer.id === followUp.customerId
        );

        return `${index + 1}. ${
          customer?.name || "Unknown customer"
        } — ${followUp.note} (${followUp.date})`;
      })
      .join("\n");

    setAnswer(
      `You have ${overdue.length} overdue follow-up(s):\n${overdueDetails}`
    );
  }

  return;
}
    }

    if (
      q.includes("total sales") ||
      q.includes("sales") ||
      q.includes("revenue")
    ) {
      const totalSales = sales.reduce(
        (total, sale) => total + sale.amount,
        0
      );

      setAnswer(`Your total sales are ${totalSales}.`);
      return;
    }

  
  // BUSINESS GUARDIAN — BUSINESS HEALTH & DAILY PRIORITIES

if (
  q.includes("what should i do today") ||
  q.includes("what should i do") ||
  q.includes("business health") ||
  q.includes("business status") ||
  q.includes("how is my business") ||
  q.includes("what needs attention") ||
  q.includes("priorities") ||
  q.includes("priority")
) {
  const today = new Date();

  // Count overdue follow-ups
  const overdueCount = followUps.filter(
    (followUp) =>
      followUp.status === "Pending" &&
      new Date(followUp.date) < today
  ).length;

  // Count upcoming appointments
  const upcomingCount = appointments.filter(
    (appointment) =>
      appointment.status === "Scheduled" &&
      new Date(
        `${appointment.date}T${appointment.time}`
      ) >= today
  ).length;

  // Calculate total sales
  const totalSales = sales.reduce(
    (total, sale) => total + sale.amount,
    0
  );

 // Build business priorities
const priorities: string[] = [];

// Overdue follow-ups
if (overdueCount > 0) {
  const overdueDetails = followUps
    .filter(
      (followUp) =>
        followUp.status === "Pending" &&
        new Date(followUp.date) < today
    )
    .map((followUp, index) => {
      const customer = customers.find(
        (customer) => customer.id === followUp.customerId
      );

      return `🔴 Follow up with ${
        customer?.name || "Unknown customer"
      } — ${followUp.note || "No note"} — due ${followUp.date}`;
    });

  priorities.push(...overdueDetails);
}

// Upcoming appointments
if (upcomingCount > 0) {
  const upcomingDetails = appointments
    .filter(
      (appointment) =>
        appointment.status === "Scheduled" &&
        new Date(
          `${appointment.date}T${appointment.time}`
        ) >= today
    )
    .map((appointment) => {
      const customer = customers.find(
        (customer) => customer.id === appointment.customerId
      );

      return `📅 Appointment with ${
        customer?.name || "Unknown customer"
      } — ${appointment.date} at ${appointment.time}`;
    });

  priorities.push(...upcomingDetails);
}

// Customers
if (customers.length === 0) {
  priorities.push(
    "🟡 You currently have no customers. Focus on bringing in your first customers."
  );
} else {
  priorities.push(
    `👥 You currently have ${customers.length} customer(s).`
  );
}

// Sales
if (totalSales === 0) {
  priorities.push(
    "🟡 No sales have been recorded yet. Focus on converting your existing leads/customers."
  );
} else {
  priorities.push(
    `💰 Your recorded sales total is ${totalSales.toLocaleString()}.`
  );
}

let healthStatus = "🟢 Your business looks stable.";

if (overdueCount >= 3) {
  healthStatus =
    "🔴 Your business needs attention because several follow-ups are overdue.";
} else if (overdueCount > 0) {
  healthStatus =
    "🟡 Your business is active, but you have follow-ups that need attention.";
} else if (upcomingCount > 0) {
  healthStatus =
    "🟢 Your business looks active with upcoming appointments.";
}

setAnswer(
  `${healthStatus}\n\nToday's priorities:\n${priorities
    .map((priority, index) => `${index + 1}. ${priority}`)
    .join("\n")}`
);

return;
}
  setAnswer(
      "I can currently answer questions about customers, appointments, follow-ups and sales."
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-cyan-400">BUSINESS INTELLIGENCE</p>

        <h2 className="mt-1 text-3xl font-bold">
          AI Assistant
        </h2>

        <p className="mt-2 text-slate-400">
          Ask questions about your customers, follow-ups,
          appointments and sales.
        </p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10 text-xl">
            🤖
          </div>

          <div>
            <h3 className="font-semibold">
              KnowBase AI
            </h3>

            <p className="text-sm text-slate-400">
              Your Business Guardian
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
          <p className="font-medium">
            How can I help you today?
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Ask me about your business data, customers,
            appointments, follow-ups or sales.
          </p>
        </div>

        {answer && (
          <div className="mt-4 rounded-lg border border-cyan-700 bg-cyan-950/30 p-4">
            <p className="text-sm text-cyan-300">
              KnowBase AI
            </p>

            <p className="mt-2 whitespace-pre-line">
  {answer}
</p>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askAI();
              }
            }}
            placeholder="Ask KnowBase AI something..."
            className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <button
            type="button"
            onClick={() => askAI()}
            className="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950"
          >
            Ask AI
          </button>
        </div>

        <div className="mt-6">
          <h3 className="mb-3 font-semibold">
            Quick Questions
          </h3>

          <div className="grid gap-3 md:grid-cols-2">
            <button
              type="button"
              onClick={() =>
                askAI("How many customers do I have?")
              }
              className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-left hover:border-cyan-400"
            >
              How many customers do I have?
            </button>

            <button
              type="button"
              onClick={() =>
                askAI("Show my upcoming appointments.")
              }
              className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-left hover:border-cyan-400"
            >
              Show my upcoming appointments.
            </button>

            <button
              type="button"
              onClick={() =>
                askAI("Which follow-ups are overdue?")
              }
              className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-left hover:border-cyan-400"
            >
              Which follow-ups are overdue?
            </button>

            <button
              type="button"
              onClick={() =>
                askAI("What are my total sales?")
              }
              className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-left hover:border-cyan-400"
            >
              What are my total sales?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function ComingSoon({
  
  title,
}: {
  title: string;
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">

      <div className="text-center">

        <div className="text-5xl">🚀</div>

        <h2 className="mt-5 text-3xl font-bold">
          {title}
        </h2>

        <p className="mt-3 text-slate-400">
          This module will be built next.
        </p>

      </div>

    </div>
  );
}
function ReportsPage({
  customers,
  followUps,
  appointments,
  sales,
}: {
  customers: Customer[];
  followUps: FollowUp[];
  appointments: Appointment[];
  sales: Sale[];
}) {
  const totalSales = sales.reduce(
    (total, sale) => total + sale.amount,
    0
  );

  const pendingFollowUps = followUps.filter(
    (followUp) => followUp.status === "Pending"
  ).length;

  const overdueFollowUps = followUps.filter(
    (followUp) =>
      followUp.status === "Pending" &&
      new Date(followUp.date) < new Date()
  ).length;

  const scheduledAppointments = appointments.filter(
    (appointment) => appointment.status === "Scheduled"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;

  const averageSale =
    sales.length > 0 ? totalSales / sales.length : 0;

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-3xl font-bold">
          Business Reports
        </h2>

        <p className="mt-1 text-slate-400">
          Your business performance at a glance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Total Customers
          </p>

          <p className="mt-2 text-3xl font-bold">
            {customers.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Total Sales
          </p>

          <p className="mt-2 text-3xl font-bold">
            {totalSales.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Average Sale
          </p>

          <p className="mt-2 text-3xl font-bold">
            {averageSale.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Scheduled Appointments
          </p>

          <p className="mt-2 text-3xl font-bold">
            {scheduledAppointments}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Completed Appointments
          </p>

          <p className="mt-2 text-3xl font-bold">
            {completedAppointments}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Pending Follow-ups
          </p>

          <p className="mt-2 text-3xl font-bold">
            {pendingFollowUps}
          </p>

          {overdueFollowUps > 0 && (
            <p className="mt-2 text-sm text-red-400">
              {overdueFollowUps} overdue
            </p>
          )}
        </div>

      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

        <h3 className="text-xl font-semibold">
          Business Overview
        </h3>

        <div className="mt-4 space-y-3 text-sm">

          <p>
            You currently have{" "}
            <span className="font-semibold text-cyan-400">
              {customers.length}
            </span>{" "}
            customer(s).
          </p>

          <p>
            Your recorded sales total{" "}
            <span className="font-semibold text-cyan-400">
              {totalSales.toLocaleString()}
            </span>.
          </p>

          <p>
            You have{" "}
            <span className="font-semibold text-cyan-400">
              {scheduledAppointments}
            </span>{" "}
            scheduled appointment(s).
          </p>

          <p>
            You have{" "}
            <span className="font-semibold text-cyan-400">
              {pendingFollowUps}
            </span>{" "}
            pending follow-up(s).
          </p>

          {overdueFollowUps > 0 && (
            <p className="text-red-400">
              ⚠️ You have {overdueFollowUps} overdue follow-up(s) that need attention.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}