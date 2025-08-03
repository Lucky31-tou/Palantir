const nameHomme = document.getElementById("name");
const liLine = document.getElementById("line");
const liKing = document.getElementById("king");
const liDonation = document.getElementById("donation");
const liWar = document.getElementById("war");

let userData = JSON.parse(localStorage.getItem('userData')) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

if (userData.length === 0 || Object.keys(currentUser).length === 0) {
    window.location.href = "../acceuil.html"; // J'ai supposé que acceuil.html est dans le dossier parent
}

nameHomme.innerText = `${currentUser.name}`
liLine.innerText = `Mon sang : ${currentUser.bio.line}`;
liKing.innerText = `Mon allégence : ${currentUser.bio.king}`;
liDonation.innerText = `Mon engagement au Trône que je sers : ${currentUser.bio.act}`;
liWar.innerText = `Le conflit que j'ai du affronter : ${currentUser.bio.war}`;

const searchList = document.querySelector(".search-list");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const postAmi = document.querySelector(".post-ami")

const friendList = document.querySelector(".friend-list");

searchBtn.addEventListener("click", () => {
    if (searchInput.value.length !== 0) {
        postAmi.style.display = "none";
        friendList.style.display = "none";
        searchList.style.display = "flex";
        searchList.innerHTML = ""; // Vider les résultats précédents

        // 1. Utiliser Array.find() pour trouver l'utilisateur. C'est plus propre.
        const userSearch = userData.find(user => user.name === searchInput.value.toUpperCase());

        // 2. Mettre à jour le DOM une seule fois, après la recherche.
        if (!userSearch || currentUser.name === userSearch.name || currentUser.following?.includes(userSearch.id)) {
            searchList.innerHTML = "<p>Le Palantír ne perçoit nulle âme répondant à cet appel.</p>"
        } else {
            searchList.innerHTML = `
            <div class="profil" id="search-result-profile">
                <img src="../${userSearch.race}/photo_profil.jpg" alt="Photo de profil" class="photo-profil">
                <h2 id="name">${userSearch.name}</h2>
                <ul>
                    <li id="line">${userSearch.bio.line}</li>
                    <li id="king">${userSearch.bio.king}</li>
                    <li id="act">${userSearch.bio.act}</li>
                </ul>
                <h3>Souhaites-tu que le Palantír tisse un lien entre vos esprits ?</h3>
                <div class="btn-accept">
                    <button id="btn-accept-friend" class="btn-accept-profil">Je choisis de marcher à tes côtés.</button>
                    <button id="btn-refuse-friend" class="btn-accept-profil">Que le destin me garde de cette union.</button>
                </div>
            </div>
            `;

            // 3. Ajouter les écouteurs d'événements après avoir créé les boutons
            document.getElementById("btn-accept-friend").addEventListener('click', () => {
                // On utilise .filter() pour créer un nouveau tableau sans les utilisateurs concernés
                // C'est la manière correcte de "supprimer" des éléments.
                let updatedUserData = userData.filter(u => u.id !== currentUser.id && u.id !== userSearch.id);

                // Mettre à jour les objets currentUser et userSearch
                (currentUser.following ??= []).push(userSearch.id);
                (userSearch.follower ??= []).push(currentUser.id);

                // Rajouter les versions à jour dans le tableau
                updatedUserData.push(currentUser);
                updatedUserData.push(userSearch);

                // Sauvegarder les données mises à jour
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                localStorage.setItem("userData", JSON.stringify(updatedUserData));
                userData = updatedUserData; // Mettre à jour la variable locale aussi

                // Remettre l'affichage par défaut
                postAmi.style.display = "flex";
                searchList.style.display = "none";
                searchList.innerHTML = "";
            });

            document.getElementById("btn-refuse-friend").addEventListener('click', () => {
                postAmi.style.display = "flex";
                searchList.style.display = "none";
                searchList.innerHTML = "";
            });
        }
    }
});

