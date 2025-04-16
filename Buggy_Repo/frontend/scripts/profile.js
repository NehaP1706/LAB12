console.log("profile.js loaded");

let searchTerm = ""; // Store the current search term

async function loadUsers() {
  console.log("loadUsers called, searchTerm:", searchTerm);
  try {
    const res = await fetch("/users");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const users = await res.json();
    console.log("Users fetched:", users);

    const list = document.getElementById("userList");
    list.innerHTML = "";

    // Filter users based on the current search term
    const filteredUsers = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update user count
    const userCountsElement = document.getElementById("userCounts");
    if (userCountsElement) {
      userCountsElement.textContent = `Total users: ${filteredUsers.length}`;
      console.log("userCounts updated to:", filteredUsers.length);
    } else {
      console.error("userCounts element not found");
    }

    // Render the filtered user list
    filteredUsers.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.username}: ${user.bio}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = async () => {
        try {
          console.log("Deleting user:", user._id);
          const res = await fetch(`/users/${user._id}`, { method: "DELETE" });
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          loadUsers(); // Refresh with current search term
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      };

      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading users:", error);
    const userCountsElement = document.getElementById("userCounts");
    if (userCountsElement) {
      userCountsElement.textContent = "Error loading users";
    }
  }
}

// Search input event listener
const searchElement = document.getElementById("search");
if (searchElement) {
  searchElement.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    console.log("Search input:", searchTerm);
    loadUsers();
  });
} else {
  console.error("search element not found");
}

// Form submission for adding a user
const userFormElement = document.getElementById("userForm");
if (userFormElement) {
  userFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const username = document.getElementById("username").value;
    const bio = document.getElementById("bio").value;

    try {
      const res = await fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, bio })
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      e.target.reset();
      loadUsers(); // Refresh with current search term
    } catch (error) {
      console.error("Error adding user:", error);
    }
  });
} else {
  console.error("userForm element not found");
}

// Initial load
loadUsers();