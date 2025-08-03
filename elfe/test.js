import { phase } from 'lune';

const now = new Date();
const moon = phase(now);

console.log(moon.phase);       // nom de la phase (0 = nouvelle lune, 0.5 = pleine lune)
console.log(moon.illuminated); // pourcentage éclairé