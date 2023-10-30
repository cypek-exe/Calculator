import {
  select,
  first_number,
  second_number,
  result_element,
  equal
} from './math-utils.js';

// history
let history = [];
let history_records;

// class used to create an history elements object
class History_element {
  constructor(
    first_number, 
    second_number, 
    operation, 
    result
  ) {
    this.first_number  = first_number;
    this.second_number = second_number;
    this.operation     = operation;
    this.result        = result;
  }
};

function is_local_storage_enabled() {
  return (typeof(Storage) !== "undefined") && navigator.cookieEnabled;
};

function get_math_operation(data) {
  switch (data.operation) {
    case 'opt_1':
      return `${data.first_number} + ${data.second_number}`;
      break;
    case 'opt_2':
      return `${data.first_number} - ${data.second_number}`;
      break;
    case 'opt_3':
      return`${data.first_number} × ${data.second_number}`;
      break;
    case 'opt_4':
      return `${data.first_number} ÷ ${data.second_number}`;
      break;
    case 'opt_5':
      return `${data.first_number} <sup>${data.second_number}</sup>`;
      break;
    case 'opt_6':
      return `<sup>${data.first_number}</sup>√${data.second_number}`;
      break;
    case 'opt_7':
      return `log<sub>${data.first_number}</sub> ${data.second_number}`;
      break;
  }
};

function render_history_element(history_element) {
  history_field.innerHTML += `
    <div class="history_record">
      <span>
        ${get_math_operation(history_element)} = ${
          history_element.result === Infinity ? '∞' : history_element.result
        }
      </span>
      <span>
        <input type="button" value="Usuń" class="delete_history_element_button">
        <input type="button" value="Przywróć" class="restore_button">
      </span>
    </div>
    `;
  history_records = document.getElementsByClassName('history_record');
};


export function add_to_history() {
  const result = equal();
  if (typeof(result) === 'number') {

    const first_number_n  = +first_number.value;
    const second_number_n = +second_number.value;

    history.push(new History_element(
      first_number_n,
      second_number_n,
      select.value,
      result
    ));

    render_history_element(history.at(-1));

    if (is_local_storage_enabled()) {
      const json_value = JSON.stringify(history);
      localStorage.setItem('history', json_value);
    }
  }
};

export function delete_history_element(index) {
  history.splice(index, 1);

  history_records[index].remove();

  if (is_local_storage_enabled()) {
    const json_value = JSON.stringify(history);
    localStorage.setItem('history', json_value);
  } 
};

export function restore(index) {
  first_number.value         = history[index].first_number;
  second_number.value        = history[index].second_number;
  select.value               = history[index].operation;
  if (history[index].result === Infinity)
    result_element.textContent = '∞';
  else
    result_element.textContent = history[index].result;
};

export function load_history() {
  if (is_local_storage_enabled()) {
    if (localStorage.getItem('history') === null) {
      localStorage.setItem('history', JSON.stringify([]));
    } else {
      try {
        const data = JSON.parse(localStorage.getItem('history'));

        history = data.map(el => {
          const {
            first_number,
            second_number,
            operation,
            result
          } = el;

          return new History_element(
            first_number,
            second_number,
            operation,
            result
          )
        });

      } catch (error) {
        localStorage.setItem('history', JSON.stringify([]));
      }
      

      for (const history_element of history) {
        render_history_element(history_element);
      }
    }
  }
};

export function get_button_index(button_element) {
  const history_record = 
    button_element
    .parentElement
    .parentElement

  for (let index = 0; index < history_records.length; index++) {
    if (history_records[index] === history_record) return index;
  }
};