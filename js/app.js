import {
  select,
  first_number,
  second_number,
  equal,
  are_values_completed
} from './math-utils.js';

import {
  add_to_history,
  delete_history_element,
  restore,
  load_history,
  get_button_index
} from './history-utils.js';

// fields
const history_field = document.getElementById('history_field')

// select, button
const equal_button          = document.getElementById('equal_button');
const reverse_button        = document.getElementById('reverse_button');
const add_to_history_button = document.getElementById('add_to_history_button')

// functions
const refresh_select = () => {
  switch (select.value) {
    case 'opt_1':
      first_number .placeholder = "składnik";
      second_number.placeholder = "składnik";
      break;
    case 'opt_2':
      first_number .placeholder = "odjemna";
      second_number.placeholder = "odjemnik";
      break;
    case 'opt_3':
      first_number .placeholder = "czynnik";
      second_number.placeholder = "czynnik";
      break;
    case 'opt_4':
      first_number .placeholder = "dzielna";
      second_number.placeholder = "dzielnik";
      break;
    case 'opt_5':
      first_number .placeholder = "podstawa potęgi";
      second_number.placeholder = "wykładnik potęgi";
      break;
    case 'opt_6':
      first_number .placeholder = "stopień pierwiastka";
      second_number.placeholder = "liczba podpierwiastkowa";
      break;
    case 'opt_7':
      first_number .placeholder = "podstawa logarytmu";
      second_number.placeholder = "liczba logarytmowana";
      break;
  }
}

const reverse = () => {
  if (are_values_completed()) {
    // swapping variables using destructuring
    [
      first_number .value,
      second_number.value
    ] = [
      second_number.value,
      first_number .value
    ]
    equal();
  }
}


refresh_select()
load_history();

// Events
select               .addEventListener('change', refresh_select);
equal_button         .addEventListener('click', equal);
reverse_button       .addEventListener('click', reverse);
add_to_history_button.addEventListener('click', add_to_history);
history_field        .addEventListener('click', event => {
  const target = event.target;

  if (target.classList.contains('delete_history_element_button')) {
    const index = get_button_index(target);
    return delete_history_element(index);
  }
  if (target.classList.contains('restore_button')) {
    const index = get_button_index(target);
    return restore(index);
  }
});