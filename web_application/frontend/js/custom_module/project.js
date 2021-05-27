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




