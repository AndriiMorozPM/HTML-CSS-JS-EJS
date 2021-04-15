class Executor{
    constructor(name,age)
    {
        this.name = name;
        this.age = age;

        this.projects_list = [];

        if (typeof name === 'undefined') { this.name = "Невідомий виконавець"; }
    }
}

let global_executors_list = new Array();

function find_executor(name, age)
{
    for(let executor of global_executors_list)
    {
        if(name === executor.name && age === executor.age) return executor;
    }
    return -1;
}

function add_executor(name,age)
{
    let executor = new Executor(name,age);
    global_executors_list.push(executor);
    return executor;
}

function remove_executor(name,age)
{
    for(let id = 0;id<global_executors_list.length;id++)
    {
        let executor = global_executors_list[id];

        if(executor.name === name && executor.age === age)
        {
            global_executors_list.splice(id,1);
            return 1;
        }
    }
    return -1;
}

function edit_executor(name,age,new_name,new_age)
{
    for(let id = 0;id<global_executors_list.length;id++)
    {
        let executor = global_executors_list[id];

        if(executor.name === name && executor.age === age)
        {
            global_executors_list[id].name = new_name;
            global_executors_list[id].age = new_age;
            return 1;
        }
    }
    return -1;
}

function executors_list()
{
    console.log(`\nСписок всіх виконавців: `);
    for(let id = 0;id<global_executors_list.length;id++)
    {
        let executor = global_executors_list[id];
        
        console.log(`Ім'я виконавця: ${executor.name}, вік: ${executor.age}`);
    }
    console.log();
    return global_executors_list;
}

exports.find_executor            = find_executor;
exports.add_executor             = add_executor;
exports.remove_executor          = remove_executor;
exports.edit_executor            = edit_executor;
exports.executors_list           = executors_list;