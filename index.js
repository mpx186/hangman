const lostWord_HTML = document.querySelector(".lost_word_wrapper");

//FETCH //waiting for API_KEY from wordnik.com to create call for random word.. 
const word = "Telephone";
////////////////////////////////////////////////////////////////////////////////

const upWord = word.toUpperCase();
const readyWord = [...upWord];

let SelectedLettersIndex = [];

let wins = 0;
let looses = 0;

// check if stop the game - wins
function checkIfWins() {
   if (wins >= readyWord.length) {
      document.querySelector(".won").style.display = "block";
   } else return;
}

// check if stop the game - lost
function checkIfLooses() {
   if (looses >= 10) {
      document.querySelector(".lost").style.display = "block";
   } else return;
}

//create array of indexes unique typed letters to count wins
function checkIndex(index) {
   if (SelectedLettersIndex.includes(index)) {
      return;
   } else {
      SelectedLettersIndex.push(index);
      wins++;
      checkIfWins();
   }
}

//rendering divs assigned to letters
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
