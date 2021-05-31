let last_executor_id = 0;
let executors_list = new Array();

class Executor 
{
    constructor(name, age, id)
    {
        this.id = id;
        this.age = age;
        this.name = name;

        if(id === ""||typeof id === 'undefined') this.id = ++last_executor_id;
        if(age === "" || typeof age === 'undefined') this.age = "Невідомий вік";
        if(name === "" || typeof name === 'undefined') this.name = "Невідоме ім'я";
    }
}

function add_executor(name, age, id)
{
    let executor = new Executor(name, age, id);
    executors_list.push(executor);

    return executor;
}

function remove_executor(id)
{
    for(let i = 0;i<executors_list.length;i++)
    {
        let executor = executors_list[i];
        if(executor.id === id)
        {
            executors_list.splice(i,1);
            return 1;
        }
    }
    return -1;
}

function get_executors_list()
{
    return executors_list;
}

function set_executors_list(data)
{
    if(!data || data.length < 1) return;

    for (let element of data)
    {
        add_executor(element.name,element.age,element.id);
    }
}

function get_executor_by_id(id)
{
    for(let i = 0;i<executors_list.length;i++)
    {
        let executor = executors_list[i];
        if(executor.id === id) return executor;
    }
    return -1;
}

function find_executors(search)
{
    let result = [];
    search = search.toLowerCase();

    for(let executor of executors_list)
    {
        let attributes = [executor.name, executor.age];
        for (let attr of attributes)
        {
            if(attr.toLowerCase().includes(search))
            {
                result.push(executor);
                break;
            }
        }
    }
    return result;
}

function print_executors_list()
{
    console.log("\nСписок усіх виконавців:");
    for(let i = 0;i<executors_list.length;i++)
    {
        let executor = executors_list[i];
        console.log("\t" + "Ім'я виконавця: " + executor.name);
        console.log("\t" + "Вік виконавця: " + executor.age);
        console.log("\t" + "ID: " + executor.id);
    }
}