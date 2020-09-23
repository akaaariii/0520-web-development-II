onload = function() {
    const item = document.querySelector('#item');
    const quantity = document.querySelector('#quantity');
    const state = document.querySelector('#state');
    const deliveryType = document.querySelectorAll('input[name=delivery]');
    const submitBtn = document.querySelector('#submit');

    submitBtn.addEventListener('click', function(e){
        e.preventDefault();
        let deliveryFee;
        for(const d of deliveryType){
            if(d.checked){
                deliveryFee = d.value;
                break;
            }
        }
        let amountWithQuantity = item.value * quantity.value;
        let stateValue = state.value;
        let taxAmount = getRateAmount(amountWithQuantity, stateValue)
        let totalAmount = taxAmount + amountWithQuantity + parseFloat(deliveryFee);
        displayReport(taxAmount, totalAmount);
    });

    function getRateAmount(amountWithQuantity, stateValue){
        let amount;
        switch(stateValue){
            case "bc":
                amount = (amountWithQuantity * 12)/100;
                break;
            case "ab":
                amount = (amountWithQuantity * 5)/100;
                break;
            case "qc":
                amount = (amountWithQuantity * 5)/100;
                break;
            default:
                console.log("Wrong state");
                break;
        }
        return amount;
    }

    function displayReport(taxAmount, totalAmount){
        const reportDiv = document.querySelector('#report');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');
        const p1Text = document.createTextNode(`The Date of Order = ${formatDate(new Date())}`);
        p1.appendChild(p1Text);
        const p2Text = document.createTextNode(`Tax Amount = $ ${taxAmount}`);
        p2.appendChild(p2Text);
        const p3Text = document.createTextNode(`Total Amount = $ ${totalAmount}`);
        p3.appendChild(p3Text);

        reportDiv.appendChild(p1);
        reportDiv.appendChild(p2);
        reportDiv.appendChild(p3);
    }

    function formatDate(d){
        let minutes;
        if(d.getMinutes() < 10){
            minutes = `0${d.getMinutes()}`;
        } else {
            minutes = d.getMinutes();
        }
        return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${minutes}`;
    }
}