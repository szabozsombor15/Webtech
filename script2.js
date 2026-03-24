function searchUser() {
    const input = document.getElementById("searchInput").value;
    const resultsDiv = document.getElementById("results");

    if (input.trim() === "") {
        alert("Adj meg egy felhasználónevet!");
        return;
    }

    resultsDiv.innerHTML = "";

    fetch(`https://api.github.com/search/users?q=${input}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Hiba a lekérés során!");
            }
            return response.json();
        })
        .then(data => {
            data.items.forEach(user => {

                const card = document.createElement("div");
                card.className = "col-3";

                card.innerHTML = `
                    <div class="card">
                        <img src="${user.avatar_url}" width="100%">
                        <h3>${user.login}</h3>
                        <a href="${user.html_url}" target="_blank">Profil megnyitása</a>
                    </div>
                `;

                resultsDiv.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Hiba:", error);
            alert("Hiba történt!");
        });
}

function loadNavbar() {
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        })
        .catch(error => console.error("Navbar hiba:", error));
}
function searchRepo() {
    const input = document.getElementById("repoInput").value;
    const resultsDiv = document.getElementById("repoResults");

    if (input.trim() === "") {
        alert("Adj meg egy repository nevet!");
        return;
    }

    resultsDiv.innerHTML = "";

    fetch(`https://api.github.com/search/repositories?q=${input}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Hiba történt!");
            }
            return response.json();
        })
        .then(data => {
            data.items.forEach(repo => {

                const card = document.createElement("div");
                card.className = "col-3";

                card.innerHTML = `
                    <div class="card">
                        <h3>${repo.name}</h3>
                        <p>${repo.owner.login}</p>
                        <a href="${repo.html_url}" target="_blank">Megnyitás</a>
                    </div>
                `;

                resultsDiv.appendChild(card);
            });
        })
        .catch(error => {
            console.error(error);
            alert("Hiba történt!");
        });
}
