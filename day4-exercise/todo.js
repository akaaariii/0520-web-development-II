$(function(){
    const ul = $('<ul></ul>');
    $('#btn-add').prop('disabled', true);
    
    $('#input-todo').keyup(function(){
        $('#btn-add').prop('disabled', false);
    })

    const addTodo = (e) => {
        e.preventDefault();
        let newTodo = $('#input-todo').val();
        const li = $('<li></li>');
        li.text(newTodo);
        ul.append(li);
        $('#list-container').append(ul);
        $('#input-todo').val('');
        $('#btn-add').prop('disabled', true);
    }

    const deleteTodo = (e) => {
        const item = e.target;
        console.log(item);
        item.classList.toggle('completed');
    }

    $('#btn-add').click(addTodo);
    $('#list-container').click(deleteTodo);
})