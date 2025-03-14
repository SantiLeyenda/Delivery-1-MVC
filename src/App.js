import React, { useState } from "react";
import "./App.css";
import UserSelection from "./views/UserSelection";
import LibraryView from "./views/LibraryView";
import ProfesorView from "./views/ProfesorView";
import AdministradorView from "./views/AdministradorView";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Library System</h1>
        {selectedUser ? (
          selectedUser.rol === "profesor" ? (
            <ProfesorView user={selectedUser} />
          ) : selectedUser.rol === "administrador" ? (
            <AdministradorView user={selectedUser} />
          ) : (
            <LibraryView user={selectedUser} />
          )
        ) : (
          <UserSelection onSelectUser={setSelectedUser} />
        )}
      </header>
    </div>
  );
}

export default App;
