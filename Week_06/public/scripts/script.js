async function fetchUser() {
  const response = await fetch("/users"); // Replace with your API endpoint
  const data = await response.json();

  const userList = document.getElementById("user-list");

  data.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.classList.add("user"); // Add a CSS class for styling

    // Create elements for title, author, etc. and populate with book data
    const usernameElement = document.createElement("h2");
    usernameElement.textContent = user.username;

    const emailElement = document.createElement("p");
    emailElement.textContent = `By: ${user.email}`;

    // ... add more elements for other book data (optional)

    userItem.appendChild(usernameElement);
    userItem.appendChild(emailElement);
    // ... append other elements

    userList.appendChild(userItem);
  });
}

fetchUser(); // Call the function to fetch and display book data