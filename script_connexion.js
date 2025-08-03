const userName = document.getElementById("name");
const userMdp = document.getElementById("mdp");

document.getElementById('inscription-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const userData = JSON.parse(localStorage.getItem("userData")) || [];

    if (userData.length > 0) {
        let index = 0
        userData.forEach(user => {
            if (user.name === userName.value.toUpperCase() && user.mdp === userMdp.value) {
                index++
                localStorage.setItem("currentUser", JSON.stringify(user));
                window.location.href = `${user.race}/profil_${user.race}.html`
            }
        })
        if (index === 0) {
            document.querySelector(".refus").style.display = "block";
        }
    } else {
        document.querySelector(".refus").style.display = "block";
    }
});