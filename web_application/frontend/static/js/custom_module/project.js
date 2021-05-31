let last_project_id = 0;
let projects_list = new Array();

class Project
{
    Constructor(name, executor, customer, condition, id)
    {
        this.name = name;
        this.executor = executor;
        this.customer = customer;
        this.condition = condition;
        this.id = id;

        if (id === "" || typeof id === 'undefined') this.id = ++last_project_id;
        if (name === "" || typeof name === 'undefined') this.name = "Невідома назва проєкту";
        if (executor === "" || typeof executor === 'undefined') this.executor = "Невідомий виконавець";
        if (customer === "" || typeof customer === 'undefined') this.customer = "Невідомий замовник"; 
        if (condition === 0 || typeof condition === 'undefined') this.condition = "Незавершений проєкт"; 
        if (condition === 1) this.condition = "Завершений проєкт"; 
    }
}

function add_project(name,executor,customer,condition,id)
{
    condition = 0;
    let project = new Project(name,executor,customer,condition,id);
    projects_list.push(project);

    return project;
}

function add_finished_project(name,executor,customer,condition,id)
{
    condition = 1;
    let project = new Project(name,executor,customer,condition,id);
    projects_list.push(project);

    return project;
}

function remove_project(id)
{
    for(let i = 0;i<projects_list.length;i++)
    {
        let project = projects_list[i];
        if(project.id === id && project.condition === "Незавершений проєкт")
        {
            let name = project.name;
            let condition = 1;
            let id = project.id;
            let customer = project.customer;
            let executor = project.executor;
            add_project(name,executor,customer,condition,id);
            projects_list.splice(i,1);
            return 1;
        }
        else if (project.id === id && project.condition === "Завершений проєкт")
        {
            projects_list.splice(i,1);
            return 1;
        }
    }
    return -1;
}

function get_projects_list(finished)
{
    if(finished) 
    {
        let finished_projects_list = new Array();
        for(let i = 0;i<projects_list.length;i++)
        {
            let project = projects_list[i];
            if(project.condition === "Завершений проєкт")
            {
                finished_projects_list.push(project);
            }
        }
        return finished_projects_list;
    }
    else return projects_list;
}

function get_projects_list(data,finished)
{
    if(!data||data.length < 1) return;
    for(let element of data)
    {
        if(finished)
        {
            add_project(element.name,element.executor,element.customer,1,element.id);
        }
        else add_project(element.name,element.executor,element.customer,0,element.id);
    }
}

function get_all_projects_list(data)
{
    if(!data||data.length < 1) return;
    for(let element of data)
    {

        add_project(element.name,element.executor,element.customer,element.condition,element.id);
    }
}

function get_project_by_id(id,finished)
{
    let list = projects_list;
    for(let i = 0;i<list.length;i++)
    {
        let project = list[i];
        if(project.id === id) return project;
    }
    return -1;
}

function edit_project(new_name,new_exec,new_cust,new_cond,id)
{
    for(let i = 0;i<list.length;i++)
    {
        let project = list[i];
        if(project.id === id)
        {
            if(new_cond === 1)
            {
                project.name = new_name;
                project.executor = new_exec;
                project.customer = new_cust;
                project.condition = "Завершений проєкт";
            }
            else 
            {
                project.name = new_name;
                project.executor = new_exec;
                project.customer = new_cust;
                project.condition = "Незавершений проєкт";
            }
        }
    }
    return -1;
}

function find_projects(search)
{
    let result = [];
    let list = projects_list;
    search = search.toLowerCase();
    for(let project of list)
    {
        let attributes = [project.name,project.executor,project.customer];
        for(let attr of attributes)
        {
            if(attr.toLowerCase().includes(search))
            {
                result.push(patient);
                break;
            }
        }
    }
    return result;
}

function print_projects_list(finished)
{
    let list = projects_list;
    let type = finished ? "завершених" : "";
    console.log("\n"+"Список "+type+" проєктів:");
    for(let i = 0;i<list.length;i++)
    {
        if(finished)
        {
            let item = list[i];
            if(item.condition === "Завершений проєкт")
            {
                console.log("\t" + "Назва проєкту: " + item.name);
                console.log("\t" + "Виконавець проєкту: " + item.executor);
                console.log("\t" + "Замовник проєкту: " + item.customer);
                console.log("\t" + "Стан проєкту: " + item.condition);
                console.log("\t" + "ID: " + item.id);
            }
        }
        else
        {
            let item = list[i];
            if(item.condition === "Незавершений проєкт")
            {
                console.log("\t" + "Назва проєкту: " + item.name);
                console.log("\t" + "Виконавець проєкту: " + item.executor);
                console.log("\t" + "Замовник проєкту: " + item.customer);
                console.log("\t" + "Стан проєкту: " + item.condition);
                console.log("\t" + "ID: " + item.id);
            }
        }
    }
}


