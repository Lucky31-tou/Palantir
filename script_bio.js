let userData = JSON.parse(localStorage.getItem('userData')) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

if (userData.length === 0 || Object.keys(currentUser).length === 0) {
    window.location.href = "acceuil.html";
}

const ID = currentUser.id;
userData = userData.filter(user => user.id !== ID)

const race = currentUser.race;
const sections = document.querySelectorAll("section");
sections.forEach(section => {
    if (section.id !== race) {
        section.style.display = "none";
    }
})

if (race === "elfe") {
    const elfeForm = document.getElementById("bio-elve");
    const elfeLine = document.getElementById("line-elve");
    const elfeKing = document.getElementById("king-elve");
    const elfeAct = document.getElementById("act-elve");
    const elfePassion = document.getElementById("passion-elve");

    elfeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const elfePp = elfeForm.querySelector("input[name='pp']:checked");
        const bio = {
            line: elfeLine.value,
            king: elfeKing.value,
            act: elfeAct.value,
            passion: elfePassion.value,
            pp: elfePp.value,
        }

        currentUser.bio =  bio;
        userData.push(currentUser);
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        window.location.href = "elfe/profil_elfe.html";

    })
}

if (race === "nain") {
    const nainForm = document.getElementById("bio-nain");
    const nainLine = document.getElementById("line-nain");
    const nainKing = document.getElementById("king-nain");
    const nainAct = document.getElementById("act-nain");
    const nainRich = document.getElementById("rich");

    nainForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const nainPp = nainForm.querySelector("input[name='pp']:checked");
        const bio = {
            line: nainLine.value,
            king: nainKing.value,
            act: nainAct.value,
            rich: nainRich.value,
            pp: nainPp.value,
        }

        currentUser.bio =  bio;
        userData.push(currentUser);
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        window.location.href = "nain/profil_nain.html";

    })
}

if (race === "homme") {
    const hommeForm = document.getElementById("bio-man");
    const hommeLine = document.getElementById("line-man");
    const hommeKing = document.getElementById("king-man");
    const hommeAct = document.getElementById("act-man");
    const hommeWar = document.getElementById("war-man");

    hommeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const hommePp = hommeForm.querySelector("input[name='pp']:checked");
        const bio = {
            line: hommeLine.value,
            king: hommeKing.value,
            act: hommeAct.value,
            war: hommeWar.value,
            pp: hommePp.value,
        }

        currentUser.bio =  bio;
        userData.push(currentUser);
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        window.location.href = "homme/profil_homme.html";

    })
}

if (race === "hobbit") {
    const hobbitForm = document.getElementById("boi-hobbit");
    const hobbitLine = document.getElementById("line-hobbit");
    const hobbitKing = document.getElementById("king-hobbit");
    const hobbitAct = document.getElementById("act-hobbit");
    const hobbitLoisir = document.getElementById("loisir");

    hobbitForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const hobbitPp = hobbitForm.querySelector("input[name='pp']:checked");
        const bio = {
            line: hobbitLine.value,
            king: hobbitKing.value,
            act: hobbitAct.value,
            loisir: hobbitLoisir.value,
            pp: hobbitPp.value,
        }

        currentUser.bio =  bio;
        userData.push(currentUser);
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        window.location.href = "hobbit/profil_hobbit.html";

    })
}