// Afficher les posts et en créer de nouveaux 
const createPost = document.getElementById("create-new-post");
const newPost = document.getElementById("new-post-btn")
const addPost = document.getElementById("add");
const noAddPost = document.getElementById("no-add");
const newPostText = document.getElementById("new-post-text");
const postContainer = document.getElementById("post-container");

let userPost = JSON.parse(localStorage.getItem("userPost")) || [];

const createPostList = () => {
    postContainer.innerHTML = "";
    userPost.forEach(post => {
        if (post[0] === currentUser.id || currentUser.following?.includes(post[0])) {
            const userP = userData.find(user => user.id === post[0]);
            addNewPost(userP, post[1]);
        }

    });
}

const deletePost = (buttonEl, text) => {
    const postIndex = userPost.findIndex(post => post[1] === text);

    userPost.splice(postIndex, 1);
    localStorage.setItem("userPost", JSON.stringify(userPost));

    buttonEl.parentElement.parentElement.remove();
}

function addNewPost(user, text) {
    const newArticle = document.createElement("article");
    newArticle.className = "post";
    newArticle.innerHTML = `
        <div class="post-header">
            <img src="../${user.race}/photo_profil.jpg" alt="Photo de profil" class="post-avatar">
            <span class="post-author">${user.name}</span>
            ${currentUser.id === user.id ? 
                '<button class="delete-post">Supprimer les échos de votre histoire</button>' : 
                ''}
        </div>
        <div class="post-content">
            <p>${text}</p>
        </div>
    `;
    postContainer.appendChild(newArticle);

    if (currentUser.id === user.id) {
        const deletePostBtn = newArticle.querySelector(".delete-post");
        deletePostBtn.addEventListener("click", () => deletePost(deletePostBtn, text));
    }
}

newPost.addEventListener("click", () => createPost.showModal());
addPost.addEventListener("click", () => {
    createPost.close();

    userPost.unshift([currentUser.id, newPostText.value]);
    localStorage.setItem("userPost", JSON.stringify(userPost));
    createPostList();
});

createPostList();
noAddPost.addEventListener("click", () => createPost.close());

// Voir abonner abonner et abonnement
const friendBtn = document.getElementById("friend");
const aboneBtn = document.getElementById("abone");

const deleteFriend = (buttonEl, user, follow) => {
    // .filter() ne modifie pas le tableau original, il en retourne un nouveau.
    // Il faut donc réassigner le résultat pour que la suppression soit effective.
    if (follow === 1) {
        // On retire 'user' de la liste "following" de currentUser
        currentUser.following = currentUser.following.filter(id => id !== user.id);
        // On retire 'currentUser' de la liste "follower" de user
        user.follower = user.follower.filter(id => id !== currentUser.id);
    } else {
        // On retire 'user' de la liste "follower" de currentUser
        currentUser.follower = currentUser.follower.filter(id => id !== user.id);
        // On retire 'currentUser' de la liste "following" de user
        user.following = user.following.filter(id => id !== currentUser.id);
    }
    let updatedUserData = userData.filter(u => u.id !== currentUser.id && u.id !== user.id);

    // Rajouter les versions à jour dans le tableau
    updatedUserData.push(currentUser);
    updatedUserData.push(user);

    // Sauvegarder les données mises à jour
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    userData = updatedUserData; // Mettre à jour la variable locale aussi

    buttonEl.parentElement.remove();
}

const remplir = (listeId, follow) => {
    postAmi.style.display = "none";
    searchList.style.display = "none";
    friendList.style.display = "flex";
    friendList.innerHTML = "";
    listeId.forEach(id => {
        const userP = userData.find(user => user.id === id);

        const newFriend = document.createElement("div");
        newFriend.className = "post-header";
        // On ne peut pas passer un objet complexe (userP) directement dans un onclick via innerHTML.
        // L'objet serait converti en une chaîne de caractères "[object Object]", ce qui ne fonctionnerait pas.
        // La meilleure approche est de créer le bouton séparément et d'ajouter un écouteur d'événement.
        newFriend.innerHTML = `
            <img src="../${userP.race}/photo_profil.jpg" alt="Photo de profil" class="post-avatar">
            <span class="post-author">${userP.name} : ${userP.bio.king}</span>
            <button>Briser le lien de vos esprits</button>
        `;

        friendList.appendChild(newFriend);

        // On sélectionne le bouton qu'on vient de créer et on lui attache l'événement.
        // Cette méthode préserve la référence à l'objet 'userP'.
        const deleteButton = newFriend.querySelector('button');
        deleteButton.addEventListener('click', () => deleteFriend(deleteButton, userP, follow));
    })
    const buttonP = document.createElement("button");
    buttonP.id = "leave";
    buttonP.innerText = "Que ton regard revienne à toi";
    friendList.appendChild(buttonP);
    document.getElementById("leave").addEventListener("click", () => {
        friendList.style.display = "none";
        postAmi.style.display = "flex";
    })
}

friendBtn.addEventListener("click", () => remplir(currentUser.following || [], 1));
aboneBtn.addEventListener("click", () => remplir(currentUser.follower || [], 0));
