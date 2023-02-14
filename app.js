let errorField = document.getElementById("errorField");
let firstNumber;
let secondNumber;
let select;
let result;

function refreshSelect() { // * Function displaying appropriate placeholder for <input type="number"> tags, depending on <select> tag
  firstNumber = document.forms[0][0];
  secondNumber = document.forms[0][2];
  select = document.getElementById("select").value;
  if (select == "d1") {
    firstNumber.placeholder = "składnik";
    secondNumber.placeholder = "składnik";
  } if (select == "d2") {
    firstNumber.placeholder = "odjemna";
    secondNumber.placeholder = "odjemnik";
  } else if (select == "d3") {
    firstNumber.placeholder = "czynnik";
    secondNumber.placeholder = "czynnik";
  } else if (select == "d4") {
    firstNumber.placeholder = "dzielna";
    secondNumber.placeholder = "dzielnik";
  } else if (select == "d5") {
    firstNumber.placeholder = "podstawa potęgi";
    secondNumber.placeholder = "wykładnik potęgi";
  } else if (select == "d6") {
    firstNumber.placeholder = "stopień pierwiastka";
    secondNumber.placeholder = "liczba podpierwiastkowa";
  } else if (select == "d7") {
    firstNumber.placeholder = "podstawa logarytmu";
    secondNumber.placeholder = "liczba logarytmowana";
  }
}
refreshSelect();

function equal() { // * The function called after pressing the "Oblicz" button; performs a mathematical operation
  if (document.forms[0][0].value === "" || document.forms[0][2].value === "") {
    errorField.innerHTML += "<div><strong>Błąd: </strong>Wszystkie pola muszą być uzupełnione</div>";
  } else {
    firstNumber = parseFloat(document.forms[0][0].value);
    secondNumber = parseFloat(document.forms[0][2].value);
    result = document.getElementById("result");
    select = document.getElementById("select").value;
    if (select == "d1") result.innerHTML = firstNumber + secondNumber;
    if (select == "d2") result.innerHTML = firstNumber - secondNumber;
    if (select == "d3") result.innerHTML = firstNumber * secondNumber;
    if (select == "d4") {
      if (secondNumber == 0) {
        errorField.innerHTML += "<div><strong>Błąd: </strong>Nie można dzielić przez zero (0).</div>";
        result.innerHTML = "";
      } else result.innerHTML = firstNumber / secondNumber;
    }
    if (select == "d5") result.innerHTML = Math.pow(firstNumber, secondNumber);
    if (select == "d6") {
      if (secondNumber == 0) {
        errorField.innerHTML += "<div><strong>Błąd: </strong>Liczba podpierwiastkowa nie może być równy zero (0).";
        result.innerHTML = "";
      } else result.innerHTML = Math.pow(secondNumber, 1/firstNumber);
    }
    if (select == "d7") {
      if (firstNumber <= 0) {
        errorField.innerHTML += "<div><strong>Błąd: </strong>Podstawa logarytmu musi być większa od zera (0).</div>";
        result.innerHTML = "";
      } else if (firstNumber == 1) {
        errorField.innerHTML += "<div><strong>Błąd: </strong>Podstawa logarytmu musi być różna od jeden (1).</div>";
        result.innerHTML = "";
      } else if (secondNumber <= 0) {
        errorField.innerHTML += "<div><strong>Błąd: </strong>Liczba logarytmowana musi być większa od zera (0).</div>";
        result.innerHTML = "";
      } else result.innerHTML = Math.log(secondNumber) / Math.log(firstNumber);
    }

    if (result.innerHTML == "NaN") {
      errorField.innerHTML = "<div><strong>Błąd: </strong>Niezidentyfikowany błąd.</div>";
      result.innerHTML == ""
    }
    if (result.innerHTML == "Infinity") result.innerHTML = "∞";
  }
}

function reverse() { // * A function that swaps the values of two <input type="number"> fields
  if (document.forms[0][0].value === "" || document.forms[0][2].value === "") {
    errorField.innerHTML += "<div><strong>Błąd: </strong>Wszystkie pola muszą być uzupełnione.</div>";
  } else {
    firstNumber = parseFloat(document.forms[0][0].value);
    secondNumber = parseFloat(document.forms[0][2].value);
    let numbers = [firstNumber, secondNumber];
    firstNumber = document.forms[0][0];
    secondNumber = document.forms[0][2];
    firstNumber.value = numbers[1];
    secondNumber.value = numbers[0];
    equal();
  }
}

const docHistory = document.getElementById("docHistory");
let history = [];
let i;
if (typeof(Storage) !== "undefined" && navigator.cookieEnabled) {
  if (localStorage.getItem("historyLength") === null) localStorage.setItem("historyLength", 0);
  i = parseInt(localStorage.getItem("historyLength"));
} else i = 0;
function addToHistory() { // * A function that allows you to add mathematical operations to the history
  if (document.forms[0][0].value === "" || document.forms[0][2].value === "") {
    errorField.innerHTML += "<div><strong>Błąd: </strong>Wszystkie pola muszą być uzupełnione.</div>";
  } else {
    equal();

    firstNumber = parseFloat(document.forms[0][0].value);
    secondNumber = parseFloat(document.forms[0][2].value);
    select = (document.forms[0][1].value);

    if ((select == "d1") || (select == "d2") || (select == "d3") || (select == "d4" && secondNumber !== 0) || (select == "d5" && firstNumber !== 0) || (select == "d6" && secondNumber !== 0) || (select == "d7" && firstNumber > 0 && firstNumber !== 1 && secondNumber > 0)) {
      if (typeof(Storage) !== "undefined" && navigator.cookieEnabled) {
        localStorage.setItem("history" + i, firstNumber + " " + select + " " + secondNumber + " " + result.innerHTML);
        localStorage.setItem("historyLength", parseInt(localStorage.getItem("historyLength")) + 1); // Used when reading data from localstorage
      } else {
        history.push(firstNumber + " " + select + " " + secondNumber + " " + result.innerHTML);
      }
    }
    
    if (select == "d1") {
      mathOperation = " + ";
    } else if (select == "d2") {
      mathOperation = " - ";
    } else if (select == "d3") {
      mathOperation = " × ";
    } else if (select == "d4") {
      if (secondNumber == 0) result.innerHTML = "";
      else {
        docHistory.innerHTML += "<div id='history" + i + "' class='historyRecord'><span>" + HistoryRecord(i)[0] + " ÷ " + HistoryRecord(i)[2] + " = " + HistoryRecord(i)[3] + "</span><span><input type='button' value='Usuń' onclick='deleteHistoryElement(" + i + ")'><input type='button' value='Przywróć' onclick='restore(" + i + ")'></span></div>";
      }
    } else if (select == "d5") {
      if (firstNumber == 0) result.innerHTML = "";
      else {
        docHistory.innerHTML += "<div id='history" + i + "' class='historyRecord'><span>" + HistoryRecord(i)[0] + "<sup>" + HistoryRecord(i)[2] + "</sup> = " + HistoryRecord(i)[3] + "</span><span><input type='button' value='Usuń' onclick='deleteHistoryElement(" + i + ")'><input type='button' value='Przywróć' onclick='restore(" + i + ")'></span></div>";
      }
    } else if (select == "d6") {
      if (secondNumber == 0) result.innerHTML = "";
      else {
        docHistory.innerHTML += "<div id='history" + i + "' class='historyRecord'><span><sup>" + HistoryRecord(i)[0] + "</sup>√" + HistoryRecord(i)[2]  + " = " + HistoryRecord(i)[3] + "</span><span><input type='button' value='Usuń' onclick='deleteHistoryElement(" + i + ")'><input type='button' value='Przywróć' onclick='restore(" + i + ")'></span></div>";
      }
    } else if (select == "d7") {
      if (firstNumber <= 0) result.innerHTML = "";
      else if (firstNumber == 1) result.innerHTML = "";
      else if (secondNumber <= 0) result.innerHTML = "";
      else {
        docHistory.innerHTML += "<div id='history" + i + "' class='historyRecord'><span>log<sub>" + HistoryRecord(i)[0] + "</sub> " + HistoryRecord(i)[2] + " = " + HistoryRecord(i)[3] + "</span><span><input type='button' value='Usuń' onclick='deleteHistoryElement(" + i + ")'><input type='button' value='Przywróć' onclick='restore(" + i + ")'></span></div>";
      }
    }
    
    if (select == "d1" || select == "d2" || select == "d3") {
      docHistory.innerHTML += "<div id='history" + i + "' class='historyRecord'><span>" + HistoryRecord(i)[0] + mathOperation + HistoryRecord(i)[2] + " = " + HistoryRecord(i)[3] + "</span><span><input type='button' value='Usuń' onclick='deleteHistoryElement(" + i + ")'><input type='button' value='Przywróć' onclick='restore(" + i + ")'></span></div>";
    }
    if ((select == "d1") || (select == "d2") || (select == "d3") || (select == "d4" && secondNumber !== 0) || (select == "d5" && firstNumber !== 0) || (select == "d6" && secondNumber !== 0) || (select == "d7" && firstNumber > 0 && firstNumber !== 1 && secondNumber > 0)) i++;
  }
}

function deleteHistoryElement(historyID) { // * A function that removes an item from history
  if (typeof(Storage) !== "undefined" && navigator.cookieEnabled) {
    document.getElementById("history" + historyID).remove();
    localStorage.removeItem("history" + historyID);
  } else {
    document.getElementById("history" + historyID).remove();
    history[historyID] = "";
  }
}

function restore(historyID) { // * A function that restores an item from history
  firstNumber = document.forms[0][0];
  select = document.forms[0][1];
  secondNumber = document.forms[0][2];
  result = document.getElementById("result");
  firstNumber.value = HistoryRecord(historyID)[0];
  select.value = HistoryRecord(historyID)[1];
  secondNumber.value = HistoryRecord(historyID)[2];
  result.innerHTML = HistoryRecord(historyID)[3];
}

function HistoryRecord(historyID) { // * Function used to retrieve a history item (in the form of an array) by its ID
  if (typeof(Storage) !== "undefined" && navigator.cookieEnabled) {
    return localStorage.getItem("history" + historyID).split(" ");
  } else {
    return history[historyID].toString().split(" ");
  }
}

if (typeof(Storage) !== "undefined" && navigator.cookieEnabled) { // * Checking for previous history items
  for (let i = 0; i <= parseInt(localStorage.getItem("historyLength")); i++) {
    let j = i + 1;
    if (localStorage.getItem("history" + j) !== null) {
      if (HistoryRecord(j)[1] == "d1") mathOperation = " + ";
      else if (HistoryRecord(j)[1] == "d2") mathOperation = " - ";
      else if (HistoryRecord(j)[1] == "d3") mathOperation = " × ";
      else if (HistoryRecord(j)[1] == "d4") mathOperation = " ÷ ";
      else if (HistoryRecord(j)[1] == "d5") docHistory.innerHTML += "<div id='history" + j + "' class='historyRecord'><span>" + HistoryRecord(j)[0] + "<sup>" + HistoryRecord(j)[2] + "</sup> = " + HistoryRecord(j)[3] + "</span><span><input type='button' value='Usuń' onclick='deleteHistoryElement(" + j + ")'><input type='button' value='Przywróć' onclick='restore(" + j + ")'></span></div>";
      else if (HistoryRecord(j)[1] == "d6") docHistory.innerHTML += "<div id='history" + j + "' class='historyRecord'><span><sup>" + HistoryRecord(j)[0] + "</sup>√" + HistoryRecord(j)[2]  + " = " + HistoryRecord(j)[3] + "</span><span><input type='button' value='Usuń' onclick='deleteHistoryElement(" + j + ")'><input type='button' value='Przywróć' onclick='restore(" + j + ")'></span></div>";
      else if (HistoryRecord(j)[1] == "d7") docHistory.innerHTML += "<div id='history" + j + "' class='historyRecord'><span>log<sub>" + HistoryRecord(j)[0] + "</sub> " + HistoryRecord(j)[2] + " = " + HistoryRecord(j)[3] + "</span><span><input type='button' value='Usuń' onclick='deleteHistoryElement(" + j + ")'><input type='button' value='Przywróć' onclick='restore(" + j + ")'></span></div>";
      
      if (HistoryRecord(j)[1] == "d1" || HistoryRecord(j)[1] == "d2" || HistoryRecord(j)[1] == "d3" || HistoryRecord(j)[1] == "d4") {
        docHistory.innerHTML += "<div id='history" + j + "' class='historyRecord'><span>" + HistoryRecord(j)[0] + mathOperation + HistoryRecord(j)[2] + " = " + HistoryRecord(j)[3] + "</span><span><input type='button' value='Usuń' onclick='deleteHistoryElement(" + j + ")'><input type='button' value='Przywróć' onclick='restore(" + j + ")'></span></div>";
      }
    }
  }
}

// * Checking if scripts and cookies work
document.getElementById("checking_the_script").innerHTML = "";
if (typeof(Storage) !== "undefined" && navigator.cookieEnabled) {
} else {
  errorField.innerHTML += "<div><strong>Błąd: </strong>Pliki cookies są wyłączone lub local storage nie jest obsłygiwany.<br>Zobacz <a href='https://www.polskieradio.pl/13/53/artykul/675787,jak-wlaczyc-obsluge-plikow-cookie-w-swojej-przegladarce' target='_blank'>jak włączyć ciasteczka</a>.</div>";
}
