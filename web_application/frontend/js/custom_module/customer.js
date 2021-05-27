let last_customer_id = 0;
let customers_list = new Array();

class Customer 
{
    constructor(name, age, id)
    {
        this.id = id;
        this.age = age;
        this.name = name;

        if(id === ""||typeof id === 'undefined') this.id = ++last_customer_id;
        if(age === "" || typeof age === 'undefined') this.age = "Невідомий вік";
        if(name === "" || typeof name === 'undefined') this.name = "Невідоме ім'я";
    }
}

function add_customer(name, age, id)
{
    let customer = new Customer(name, age, id);
    customers_list.push(customer);

    return customer;
}

function remove_customer(id)
{
    for(let i = 0;i<customers_list.length;i++)
    {
        let customer = customers_list[i];
        if(customer.id === id)
        {
            customers_list.splice(i,1);
            return 1;
        }
    }
    return -1;
}

function get_customers_list()
{
    return customers_list;
}

function set_customers_list(data)
{
    if(!data || data.length < 1) return;

    for (let element of data)
    {
        add_customer(element.name,element.age,element.id);
    }
}

function get_customer_by_id(id)
{
    for(let i = 0;i<customers_list.length;i++)
    {
        let customer = customers_list[i];
        if(customer.id === id) return customer;
    }
    return -1;
}

function find_customers(search)
{
    let result = [];
    search = search.toLowerCase();

    for(let customer of customers_list)
    {
        let attributes = [customer.name, customer.age];
        for (let attr of attributes)
        {
            if(attr.toLowerCase().includes(search))
            {
                result.push(customer);
                break;
            }
        }
    }
    return result;
}

function print_customers_list()
{
    console.log("\nСписок усіх замовників:");
    for(let i = 0;i<customers_list.length;i++)
    {
        let customer = customers_list[i];
        console.log("\t" + "Ім'я замовника: " + customer.name);
        console.log("\t" + "Вік замовника: " + customer.age);
        console.log("\t" + "ID: " + customer.id);
    }
}