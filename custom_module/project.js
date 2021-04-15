class Project{
    constructor(name,theme,type)
    {
        this.name = name;
        this.theme = theme;
        this.type = "незавершений";

        if (typeof name === 'undefined') { this.name = "Невідомий проект"; }
        if (typeof theme === 'undefined') { this.name = "Невідома тема"; }
    }
}

function find_project_cust(name,theme,customer)
{
    if(customer.projects_list.length === 0) return -1;
    for (let id = 0;id<customer.projects_list.length;id++)
    {
        let project = customer.projects_list[id];

        if(name === project.name && theme === project.theme) return project;
    }
    return -1;
}

function find_project_exec(name,theme,executor)
{
    if(executor.projects_list.length === 0) return -1;
    for (let id = 0;id<executor.projects_list.length;id++)
    {
        let project = executor.projects_list[id];

        if(name === project.name && theme === project.theme) return project;
    }
    return -1;
}

function add_project(name,theme,executor,customer)
{
    let project = new Project(name,theme);

    executor.projects_list.push(project);
    customer.projects_list.push(project);
}

function remove_project(name,theme,customer,executor)
{
    let project_e = find_project_exec(name,theme,executor);
    let project_c = find_project_cust(name,theme,customer);

    if(project_e === -1 || project_c === -1) return -1;

    let id = customer.projects_list.indexOf(project_c);
    customer.projects_list.splice(id,1);
    id = executor.projects_list.indexOf(project_e);
    executor.projects_list.splice(id,1);
}

function edit_project(name,theme,customer,executor,new_name,new_theme)
{
    let project_e = find_project_exec(name,theme,executor);
    let project_c = find_project_cust(name,theme,customer);

    if(project_e === -1 || project_c === -1) return -1;

    let id = customer.projects_list.indexOf(project_c);
    customer.projects_list[id].name = new_name;
    customer.projects_list[id].theme = new_theme;
    id = executor.projects_list.indexOf(project_e);
    executor.projects_list[id].name = new_name;
    executor.projects_list[id].theme = new_theme;
}

function project_completed(name,theme,customer,executor)
{
    let project_e = find_project_exec(name,theme,executor);
    let project_c = find_project_cust(name,theme,customer);

    if(project_e === -1 || project_c === -1) return -1;

    let id = customer.projects_list.indexOf(project_c);
    customer.projects_list[id].type = "завершений";
    id = customer.projects_list.indexOf(project_e);
    executor.projects_list[id].type = "завершений";

    console.log(`Проект ${name} завершено!`);
}

function get_projects_list_cust(customer)
{
    console.log("\n" + `Список усіх проектів замовника ${customer.name}:`);
    if(customer.projects_list.length === 0) return -1;
    for(let id = 0;id<customer.projects_list.length;id++)
    {
        let project = customer.projects_list[id];
        console.log(`\tНазва проекту: ${project.name}, тема: ${project.theme}; проект ${project.type};`);
    }
}

function get_projects_list_exec(executor)
{
    console.log("\n" + `Список усіх проектів виконавця ${executor.name}:`);
    if(executor.projects_list.length === 0) return -1;
    for(let id = 0;id<executor.projects_list.length;id++)
    {
        let project = executor.projects_list[id];
        console.log(`\tНазва проекту: ${project.name}, тема: ${project.theme}; проект ${project.type};`);
    }
}

function get_uncompleted_projects_list_cust(customer)
{
    console.log("\n" + `Список усіх невиконаних проектів замовника ${customer.name}:`);
    if(customer.projects_list.length === 0) return -1;
    for(let id = 0;id<customer.projects_list.length;id++)
    {
        let project = customer.projects_list[id];
        if(project.type === "незавершений") console.log(`\tНазва проекту: ${project.name}, тема: ${project.theme};`);
    }
}

function get_uncompleted_projects_list_exec(executor)
{
    console.log("\n" + `Список усіх незавершених проектів виконавця ${executor.name}:`);
    if(executor.projects_list.length === 0) return -1;
    for(let id = 0;id<executor.projects_list.length;id++)
    {
        let project = executor.projects_list[id];
        if(project.type === "незавершений") console.log(`\tНазва проекту: ${project.name}, тема: ${project.theme};`);
    }
}


exports.find_project_exec                   = find_project_exec;
exports.find_project_cust                   = find_project_cust;
exports.add_project                         = add_project;
exports.remove_project                      = remove_project;
exports.edit_project                        = edit_project;
exports.project_completed                   = project_completed;
exports.get_projects_list_exec              = get_projects_list_exec;
exports.get_projects_list_cust              = get_projects_list_cust;
exports.get_uncompleted_projects_list_exec  = get_uncompleted_projects_list_exec;
exports.get_uncompleted_projects_list_cust  = get_uncompleted_projects_list_cust;