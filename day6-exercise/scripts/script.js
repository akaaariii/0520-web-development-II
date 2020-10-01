const listDiv = document.querySelector('.list');
const submitBtn = document.querySelector('#btn-submit');
const showBtn = document.querySelector('#btn-show');
const availabilities = document.querySelector('.custom-select');

let employees = [
    {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        joinDate: '',
        address: '',
        availability: ''
    }
]

// Get Multiple Selected Availability Option
availabilities.addEventListener('change', getSelectedOptions);
function getSelectedOptions(){
    let options = [], option;
    for(let i=0; i < availabilities.options.length; i++){
        option = availabilities.options[i];
        if(option.selected){
            options.push(option.value);
        }
    }
    let result = options.toString();
    return result;
}

const table = document.createElement('table');
table.classList.add('table', 'table-bordered');
const displayHeader = () => {
    let headers = Object.keys(employees[0]);
    const tr = document.createElement('tr');
    headers.forEach(h => {
        const th = document.createElement('th');
        const thText = document.createTextNode(h.toUpperCase());
        th.appendChild(thText);
        tr.appendChild(th);
    })
    // Create blank cell
    const th = document.createElement('th');
    const thText = document.createTextNode('');
    th.appendChild(thText);
    tr.appendChild(th);
    table.appendChild(tr);
    listDiv.appendChild(table);
}

const displayBody = () => {
    for(let i=1; i < employees.length; i++){
        const rowI = table.insertRow();
        rowI.setAttribute('id', employees[i].id);
        rowI.insertCell().textContent = employees[i].id;
        rowI.insertCell().textContent = employees[i].firstName;
        rowI.insertCell().textContent = employees[i].lastName;
        rowI.insertCell().textContent = employees[i].email;
        rowI.insertCell().textContent = employees[i].joinDate;
        rowI.insertCell().textContent = employees[i].address;
        rowI.insertCell().textContent = employees[i].availability;

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('type', 'submit');
        deleteBtn.classList.add('btn', 'btn-secondary');
        deleteBtn.innerText = 'Delete';
        rowI.insertCell().appendChild(deleteBtn);
        deleteBtn.addEventListener('click', deleteItem);  
    }
    listDiv.appendChild(table);
}

function deleteItem(e){
    const id = e.target.parentElement.parentElement.id;
    const deleteRow = document.getElementById(id);
    deleteRow.remove();
    
    for(let i=0; i<employees.length; i++){
        if(employees[i].id === id){
            employees.splice(i, 1);
        }
    }
}

showBtn.addEventListener('click', () => {
    table.innerHTML = '';
    displayHeader();
    displayBody();
})

submitBtn.addEventListener('click', e => {
    e.preventDefault();
    const fName = document.querySelector('#fName').value;
    const lName = document.querySelector('#lName').value;
    const email = document.querySelector('#email').value;
    const jDate = document.querySelector('#joined-date').value.replaceAll('-', '/');
    const city = document.querySelector('#city').value;
    const zip = document.querySelector('#zip').value;
    const avail = getSelectedOptions();

    let n1 = new Date().getTime();
    let n2 = parseInt(Math.random() * 21);
    let idNum = `${n1}${n2}`;

    let newEmployee = {
        id: idNum,
        firstName: fName,
        lastName: lName,
        email: email,
        joinDate: new Date(jDate).toLocaleDateString('en-US'),
        address: `${city}, ${zip}`,
        availability: avail
    }
    employees.push(newEmployee);
    document.querySelector('form').reset();
})