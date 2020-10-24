onload = function() {
    const fname = document.querySelector('#fname-input');
    const lname = document.querySelector('#lname-input');
    const email = document.querySelector('#email-input');
    const joinedDate = document.querySelector('#joined-date');
    const city = document.querySelector('#city-input');
    const postalCode = document.querySelector('#pcode-input');
    const availability= document.querySelector('#my-select');
    const submit = document.querySelector('#btn-submit');
    const show = document.querySelector('#btn-show');
    const divList = document.querySelector('#table');
    const table = document.createElement('table');
   

    let employees = [];

    $("#my-select").easySelect({
        buttons: false,
        search: false,
        placeholder: 'Choose Availability',
        placeholderColor: '#524781',
        selectColor: '#524781',
        itemTitle: 'Item Selected',
        showEachItem: true,
        width: '80%',
        dropdownMaxHeight: '450px',
    })

    
    const displayHeader = () => {
        const headers = ["ID", "First Name", "Last Name", "Email", "Joined Date", "City", "Postal Code", "Availabilities"];
        if(checkClasses()){
            const thead = document.createElement('thead');
            const row = thead.insertRow();
            headers.forEach((header) => {
                row.insertCell().textContent = header;
            })
            table.appendChild(thead);
        }
        divList.appendChild(table);
    }

    
    const displayBody = () => {
        const tbody = document.createElement('tbody');
        if(checkClasses()){
            employees.forEach((employee) => {
                const row = tbody.insertRow();
                row.setAttribute('id', employee.id)
                row.insertCell().textContent = employee.id;
                row.insertCell().textContent = employee.fname;
                row.insertCell().textContent = employee.lname;
                row.insertCell().textContent = employee.email;
                row.insertCell().textContent = employee.joinedDate;
                row.insertCell().textContent = employee.city;
                row.insertCell().textContent = employee.postalCode;
                row.insertCell().textContent = employee.availability.join(',');
                row.insertCell().innerHTML = '<button class="btn btn-secondary">-</button>';
            })
        }
        table.appendChild(tbody);
        divList.appendChild(table);
    }

    const displayEmployees = () => {
        divList.innerHTML = '';
        if (employees.length > 0) {
            displayHeader();
            displayBody();
        } else {
            const p = document.createElement('p');
            p.classList.add('text-danger')
            p.textContent = 'No Employee to Show';
            divList.appendChild(p);
        }
    }

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        validateForm();
        if(checkClasses()){
            let newEmployee = {
                id : `${new Date().getTime()}${Math.round(Math.random()*20)}`,
                fname : fname.value,
                lname : lname.value,
                email : email.value,
                joinedDate : joinedDate.value,
                city : city.value,
                postalCode : postalCode.value,
                availability :  $("#my-select").val()
            }
            employees.push(newEmployee);
            document.querySelector('form').reset();
            availability.nextSibling.innerHTML = 'Choose Availability'
            table.innerHTML = '';
        }
    })
    
    show.addEventListener('click', displayEmployees);

    divList.addEventListener('click' , (e) => {
        const id = e.target.parentNode.parentNode.id;
        const empIndex = employees.findIndex(e => e.id === id);
        employees.splice(empIndex, 1);
        table.deleteRow(empIndex+1);
    })

    // Validation
    const ERROR_MESSAGES = {
        requiredFname : 'first name is required',
        requiredLname : 'last name is required',
        requiredEmail : 'email is required',
        validEmail : 'email is not valid',
        requiredJoinedDate : 'joined date is required',
        validDate : 'joined date is not valid',
        requiredCity : 'city name is required',
        requiredPcode : 'postal code is required',
        validPcode : 'postal code is not valid',
        requiredAvailability: 'availability is required'
    }

    const emailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const pcodeformat = /[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]/;

    const validateForm = () => {
        if(fname.value === ''){
            setErrorForm(fname, ERROR_MESSAGES.requiredFname);
        } else {
            setSuccessForm(fname);
        
        }
        if(lname.value === ''){
            setErrorForm(lname, ERROR_MESSAGES.requiredLname);
        } else {
            setSuccessForm(lname);
        }

        if(email.value === '') {
            setErrorForm(email, ERROR_MESSAGES.requiredEmail);
        } else if (!emailformat.test(email.value)){
            setErrorForm(email, ERROR_MESSAGES.validEmail);
        } else {
            setSuccessForm(email);
        }
    
        if(joinedDate.value === '') {
            setErrorForm(joinedDate, ERROR_MESSAGES.requiredJoinedDate);
        } else if (new Date(joinedDate.value + ' 00:00:00') > (new Date(Date.now()))){
            setErrorForm(joinedDate, ERROR_MESSAGES.validDate);
        } else {
            setSuccessForm(joinedDate);
        }

        if(city.value === ''){
            setErrorForm(city, ERROR_MESSAGES.requiredCity);
        } else {
            setSuccessForm(city);
        }
        
        if(postalCode.value === '') {
            setErrorForm(postalCode, ERROR_MESSAGES.requiredPcode);
        } else if (!pcodeformat.test(postalCode.value)){
            setErrorForm(postalCode, ERROR_MESSAGES.validPcode);
        } else {
            setSuccessForm(postalCode);
        }

        // availability
        if(availability.value.length === 0){
            setErrorForm(availability.parentElement, ERROR_MESSAGES.requiredAvailability);
        } else {
            setSuccessForm(availability);
        }
    }

    const setErrorForm = (input, message) => {
        const formGroup = input.parentElement;
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        const small = formGroup.querySelector('small');
        small.textContent = message;
    }
    
    const setSuccessForm = (input) => {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
    }

    const checkClasses = () => {
        const formGroups = document.querySelectorAll('.form-group');
        for(const f of formGroups){
            if(f.classList.contains('error')) {
                return false;
            }
        }
        return true;
    }
}
