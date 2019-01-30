const lostWord_HTML = document.querySelector(".lost_word_wrapper");

const word = "Emancypacja";

const upWord = word.toUpperCase();
const readyWord = [...upWord];

let tableOfSelectedLettersIndex = [];

let wins = 0;
let looses = 0;

function checkIfWins() {
   if (wins >= readyWord.length) console.log("wygrałeś");
   else return;
}

//create array of indexes unique typed letters to count wins
function checkIndex(index) {
   if (tableOfSelectedLettersIndex.includes(index)) {
      return;
   } else {
      tableOfSelectedLettersIndex.push(index);
      wins++;
      checkIfWins();
   }
}

// check if stop the game
function checkIfLooses() {
   if (looses >= 10) console.log("przegrałeś, figurant wisi");
   else return;
}

//rendering divs assigned to word letters
for (let i = 0; i < readyWord.length; i++) {
   const div_HTML = document.createElement("div");
   div_HTML.className = "letter";
   div_HTML.id = i;
   lostWord_HTML.appendChild(div_HTML);
}

//check if typed letter fits to password and render html elements
window.addEventListener("keydown", function(e) {
   if (wins === readyWord.length || looses >= 10) return;
   else {
      const actualType = e.key.toUpperCase();

      if (readyWord.includes(actualType)) {
         readyWord.forEach((item, index) => {
            if (item === actualType) {
               document.getElementById(index).textContent = readyWord[index];
               checkIndex(index);
            }
         });
      } else {
         document.querySelector(".missing_words").textContent += actualType;
         looses++;
         document.querySelector(`[data-set = "${looses}"`).style.display =
            "block";
         checkIfLooses();
      }
   }
});
