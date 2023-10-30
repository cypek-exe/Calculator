const error_field           = document.getElementById('error_field');

export const select         = document.getElementById('select');
export const first_number   = document.getElementById('first_number');
export const second_number  = document.getElementById('second_number');
export const result_element = document.getElementById('result');

function display_new_error(text) {
  error_field.innerHTML += `<div><strong>Błąd: </strong>${text}</div>`;
}

export function are_values_completed() {
  if (first_number.value === '' || second_number.value === '') {
    display_new_error('Wszystkie pola muszą być uzupełnione')
  }
  return first_number.value !== '' && second_number.value !== '';
}

function values_validation() {
  let is_there_no_error = true;

  const first_number_n  = +first_number.value;
  const second_number_n = +second_number.value;

  switch (select.value) {
    case 'opt_4':
      if (second_number_n === 0) {
        display_new_error('Nie można dzielić przez zero (0).');
        is_there_no_error = false;
      }
      break;
    case 'opt_6':
      if (second_number_n === 0) {
        display_new_error('Liczba podpierwiastkowa nie może być równy zero (0).');
        is_there_no_error = false;
      }
      break;
    case 'opt_7':
      if (first_number_n <= 0) {
        display_new_error('Podstawa logarytmu musi być większa od zera (0).');
        is_there_no_error = false;
      } else if (first_number_n === 1) {
        display_new_error('Podstawa logarytmu musi być różna od jeden (1).');
        is_there_no_error = false;
      } else if (second_number_n <= 0) {
        display_new_error('Liczba logarytmowana musi być większa od zera (0).');
        is_there_no_error = false;
      }
      break;
  }
  return is_there_no_error;
}


export function equal() {  
  if (are_values_completed() && values_validation()) {

    let result;

    const first_number_n  = +first_number.value;
    const second_number_n = +second_number.value;

    switch (select.value) {
      case 'opt_1':
        result = first_number_n + second_number_n;
        break;
      case 'opt_2':
        result = first_number_n - second_number_n
        break;
      case 'opt_3':
        result = first_number_n * second_number_n;
        break;
      case 'opt_4':
        result = first_number_n / second_number_n;
        break;
      case 'opt_5':
        result = Math.pow(first_number_n, second_number_n)
        break;
      case 'opt_6':
        result = Math.pow(second_number_n, 1 / first_number_n);
        break;
      case 'opt_7':
        result = Math.log(second_number_n) / Math.log(first_number_n);
        break;
    }

    if (result === Infinity) result_element.textContent = '∞';
    else                     result_element.textContent = result;

    return result;
  }
};