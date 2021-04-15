class Customer{
    constructor(name,age)
    {
        this.name = name;
        this.age = age;

        this.projects_list = [];

        if (typeof name === 'undefined') { this.name = "Невідомий замовник"; }
    }
}

let global_customers_list = new Array();

function find_customer(name, age)
{
    for(let customer of global_customers_list)
    {
        if(name === customer.name && age === customer.age) return customer;
    }
    return -1;
}

function add_customer(name,age)
{
    let customer = new Customer(name,age);
    global_customers_list.push(customer);
    return customer;
}

function remove_customer(name,age)
{
    for(let id = 0;id<global_customers_list.length;id++)
    {
        let customer = global_customers_list[id];

        if(customer.name === name && customer.age === age)
        {
            global_customers_list.splice(id,1);
            return 1;
        }
    }
    return -1;
}

function edit_customer(name,age,new_name,new_age)
{
    for(let id = 0;id<global_customers_list.length;id++)
    {
        let customer = global_customers_list[id];

        if(customer.name === name && customer.age === age)
        {
            global_customers_list[id].name = new_name;
            global_customers_list[id].age = new_age;
            return 1;
        }
    }
    return -1;
}

function customers_list()
{
    console.log(`\nСписок всіх замовників: `);
    for(let id = 0;id<global_customers_list.length;id++)
    {
        let customer = global_customers_list[id];
        
        console.log(`Ім'я замовника: ${customer.name}, вік: ${customer.age}`);
    }
    console.log();
    return global_customers_list;
}

exports.find_customer            = find_customer;
exports.add_customer             = add_customer;
exports.remove_customer          = remove_customer;
exports.edit_customer            = edit_customer;
exports.customers_list           = customers_list;

