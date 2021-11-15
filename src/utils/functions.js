function integerToRoman(num) {
  if (typeof num !== "number") return false;

  var digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman_num = "",
    i = 3;
  while (i--) roman_num = (key[+digits.pop() + i * 10] || "") + roman_num;
  return Array(+digits.join("") + 1).join("M") + roman_num;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function GetPlanets(planetsArray) {
  if (!Array.isArray(planetsArray)) return planetsArray;
  var r = /[1-9]\d{0,1}/;

  const planets = [
    "Tatooine",
    "Alderaan",
    "Yavin IV",
    "Hoth",
    "Dagobah",
    "Bespin",
    "Endor",
    "Naboo",
    "Coruscant",
    "Kamino",
    "Geonosis",
    "Utapau",
  ];

  const arrayPlanets = planetsArray.map((element) => {
    return element.match(r);
  });

  const planetsIds = arrayPlanets.map((element) => {
    return element[0];
  });

  const planetsNames = planetsIds.map((element) => {
    return planets[parseInt(element, 10) - 1];
  });

  return planetsNames.join(", ");
}

const funcs = { getModalStyle, integerToRoman, GetPlanets };

export default funcs;
