const userName = document.getElementById("name");
const userMdp = document.getElementById("mdp");
const userMdpc = document.getElementById("mdpc");
const userRace = document.getElementById("race");

document.getElementById('inscription-form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (userMdp.value === userMdpc.value) {
        const userData = JSON.parse(localStorage.getItem("userData")) || [];

        const newUserData = {
            id: Date.now(),
            name: userName.value.toUpperCase(),
            mdp: userMdp.value,
            race: userRace.value,
        };

        userData.push(newUserData);
        
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem("currentUser", JSON.stringify(newUserData));
        window.location.href = 'bio.html';
    } else {
        document.querySelector(".refus").style.display = "block";
    }
});