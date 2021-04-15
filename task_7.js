const mod = require('./custom_module');

/////////////////////////////////ЗАМОВНИКИ/////////////////////////////////

let cust_1 = mod.add_customer("Замовник 1","26");
let cust_2 = mod.add_customer("Замовник 2","49");

mod.customers_list();

mod.remove_customer("Замовник 2","49");

mod.customers_list();

console.log("Змінюю назву 'замовник 1' на 'замовник 3'")
mod.edit_customer("Замовник 1","26","Замовник 3","22");

mod.customers_list();

let cust_3 = mod.add_customer("Замовник 4","36");

mod.customers_list();

let find_cust = mod.find_customer("Замовник 5","34");
console.log(`Пошук замовника 5: ${find_cust !== -1 ? "знайдено" : "не знайдено"}`);
find_cust = mod.find_customer("Замовник 4","36");
console.log(`Пошук замовника 4: ${find_cust !== -1 ? "знайдено" : "не знайдено"}`);

/////////////////////////////////ВИКОНАВЦІ/////////////////////////////////

let exec_1 = mod.add_executor("Виконавець 1","19");
let exec_2 = mod.add_executor("Виконавець 2","33");

mod.executors_list();

mod.remove_executor("Виконавець 1","19");

mod.executors_list();

console.log("Змінюю назву 'виконавець 2' на 'виконавець 1'")
mod.edit_executor("Виконавець 2","33","Виконавець 1","27");

mod.executors_list();

let exec_3 = mod.add_executor("Виконавець 2","20");

mod.executors_list();

let find_exec = mod.find_executor("Виконавець 1","27");
console.log(`Пошук виконавця 1: ${find_exec !== -1 ? "знайдено" : "не знайдено"}`);
find_exec = mod.find_executor("Виконавець 3","40");
console.log(`Пошук виконавця 3: ${find_exec !== -1 ? "знайдено" : "не знайдено"}`);

///////////////////////////////////ПРОЕКТИ//////////////////////////////////

let prj_1 = mod.add_project("Проект 1","Тема 1",exec_2,cust_2);
let prj_2 = mod.add_project("Проект 2","Тема 2",exec_3,cust_3);
let prj_3 = mod.add_project("Проект 3","Тема 3",exec_2,cust_3);
let prj_4 = mod.add_project("Проект 4","Тема 4",exec_3,cust_2);

mod.get_projects_list_exec(exec_2);
mod.get_projects_list_exec(exec_3);

let find_prj = mod.find_project_cust("Проект 4","Тема 4",cust_2);
console.log(`Пошук проекту 4: ${find_prj !== -1 ? "знайдено" : "не знайдено"}`);
find_prj = mod.find_project_cust("Проект 6","Тема 6",cust_3);
console.log(`Пошук проекту 6: ${find_prj !== -1 ? "знайдено" : "не знайдено"}`);

mod.edit_project("Проект 1","Тема 1",cust_2,exec_2,"Проект 5","Тема 5");

mod.remove_project("Проект 4","Тема 4",cust_2,exec_3)

mod.get_projects_list_exec(exec_2);
mod.get_projects_list_exec(exec_3);

mod.get_projects_list_cust(cust_2);
mod.get_projects_list_cust(cust_3);

mod.project_completed("Проект 5","Тема 5",cust_2,exec_2);
mod.project_completed("Проект 2","Тема 2",cust_3,exec_3);

mod.get_uncompleted_projects_list_cust(cust_3);
mod.get_uncompleted_projects_list_cust(cust_2);

mod.get_uncompleted_projects_list_exec(exec_3);
mod.get_uncompleted_projects_list_exec(exec_2);


