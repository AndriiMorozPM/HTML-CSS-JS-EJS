let search = "";
let divider = `<li><hr class="dropdown-divider"></li>`;

async function create_element() 
{
    let target = location.pathname.substring(1);
    target = target.substring(0, target.length - 1);

    switch (target) 
    {
 
       case "executor": $("#executor_title").text("Додавання нового виконавця");
                        $("#executor_yes").text("Додати");
                        break;
       case "customer":   $("#customer_title").text("Додавання нового замовника");
                        $("#customer_yes").text("Додати");
                        break;
       case "project":  $("#project_title").text("Додавання нового проєкту");
                        $("#project_yes").text("Додати");
                        prepare_executors_for_dropdown(target);
                        prepare_customers_for_dropdown(target);
                        break;
    }
    $(`#${target}_yes`).attr("onclick", `modal_update_${target}s(true)`);
    $(`#modal_${target}s`).modal('show');
}

async function edit_element (element) 
{
    let item;
    let target = location.pathname.substring(1);
    target = target.substring(0, target.length - 1);
 
    let id = parseInt($(element).closest("tr").children().first().text());
 
    $(`#${target}_title`).text("Редагування даних");
    $(`#${target}_yes`).text("Оновити дані");
 
    switch (target) {
 
       case "executor": item = get_executor_by_id(id);
                        $("#executor_name").val(item.name);
                        $("#executor_age").val(item.age);
                        break;
       case "customer":   item = get_customer_by_id(id);
                        $("#customer_name").val(item.name);
                        $("#customer_age").val(item.age);
                        break;
       case "project":  item = get_project_by_id(id);
                        $("#project_name").val(item.name);
                        $("#project_executor").val(item.executor);
                        $("#project_customer").text(item.customer);
                        $("#project_condition").text(item.condition);
                        prepare_executors_for_dropdown(target);
                        prepare_customers_for_dropdown(target);
                        break;
 
    }
 
    $(`#${target}_yes`).attr("onclick", `modal_update_${target}s(false, ${id})`);
    $(`#modal_${target}s`).modal('show');
}

function find_element (element) 
{
    let search = $(element).val();
    let target = location.pathname.substring(1);
    let search_list = [];
 
    switch (target) {
 
       case "executors": search_list = find_executors(search); break;
       case "customers": search_list = find_customers(search); break;
       case "projects": search_list = find_projects(search); break;
 
    }
 
    display_data(search_list);
}

function delete_element (item) 
{
    let button;
    let message;
    let target = location.pathname.substring(1);
    let id = parseInt($(item).closest("tr").children().first().text());
 
    switch (target) {
 
       case "executors":
          message = "Ви дійсно хочете видалити цього виконавця";
          button = "Видалити";
          break;
 
       case "customers":
          message = "Ви дійсно хочете видалити цього замовника";
          button = "Звільнити";
          break;
 
       case "projects":
          message = "Ви дійсно хочете видалити цей проєкт";
          button = "Виписати";
          break;
    }
    
    modal_confirm_create("Повідомлення",
                         `${message}?`,
                         `${button}`,
                         "Відміна",
                         "delete", id);
 
    $(`#modal_confirm`).modal('show');
}

function display_data (search_list) {

    let data;
    let additional_attr = "";
    let target = location.pathname.substring(1);
 
    switch (target) {
 
       case "executors":      data = get_executors_list();
                              break;
       case "customers":      data = get_customers_list();
                              break;
       case "projects":       data = get_all_projects_list();
                              break;
    }

    if (search_list) { data = search_list; }

    clear_table(data.length === 0);

    $("#total_count").text(`Загальна кількість: ${data.length}`);

    eval(`display_${target}_data(${additional_attr}data)`);
}

function display_executors_data (data) 
{
    for (let element of data) {
    
       let block = 
      `<tr>
          <td> <span class="m-2">${element.id}</span> </td>
          <td>${element.name}</td>
          <td>${element.age}</td>
          <td>${get_icon_code()}</td>
       </tr>`;
 
       $("#table").append(block);
    }
}

function display_customers_data (data) 
{
    for (let element of data) {
       
       let block =
      `<tr>
          <td> <span class="m-2">${element.id}</span> </td>
          <td>${element.name}</td>
          <td>${element.age}</span> </td>
          <td>${get_icon_code()}</td>
       </tr>`;
 
       $("#table").append(block);
    }
}

function display_projects_data (is_finished, data) 
{
    for (let element of data) {
       
       let block =
      `<tr>
          <td> <span class="m-2">${element.id}</span> </td>
          <td>${element.name}</td>
          <td class="fit"> <span class="m-2">${element.executor}</span> </td>
          <td>${element.customer}</td>
          <td>${element.condition}</td>
          <td>${get_icon_code(is_finished)}</td>
       </tr>`;
 
       $("#table").append(block);
 
    }
}

function modal_confirm() 
{
    let page = location.pathname.substring(1);
 
    let target = $("#modal_confirm").attr("target");
    let src = $("#modal_confirm").attr("src");
 
    switch (target) 
    {
       case "delete":
          let id = parseInt(src);
          page = page.substr(0, page.length - 1);
          eval(`remove_${page}(${id})`);
          display_data();
          save_data();
          break;
    }
}

function modal_confirm_create (title, message, yes, no, target, src) 
{
    $(`#modal_confirm_title`).text(title);
    $(`#modal_confirm_message`).text(message);
    $(`#modal_confirm_yes`).text(yes);
    $(`#modal_confirm_no`).text(no);
    $("#modal_confirm").attr("target", target);
    $("#modal_confirm").attr("src", src);
}

function modal_update_executors (added_new, id) 
{
    let name = $("#executor_name").val();
    let age = $("#executor_age").val();
 
    if (added_new) { add_executor(name, age);      }
    else           { edit_executor(id, name, age); }
 
    display_data();
    clear_input();
    save_data();
}

function modal_update_customers (added_new, id) 
{
    let name = $("#customer_name").val();
    let age = $("#customer_age").val();
 
    if (added_new) { add_customer(name, age);      }
    else           { edit_customer(id, name, age); }
 
    display_data();
    clear_input();
    save_data();
}

function modal_update_projects (added_new, id) 
{
    let name = $("#project_name").val();
    let executor = $("#project_executor").val();
    let customer = $("#project_customer").text();
    let condition = $("#project_condition").text();
 
    executor = executor === "Виберіть виконавця"  ? "Не призначено"  : executor;
    customer = customer === "Виберіть замовника" ? "Не встановлено" : customer;
 
    if (added_new) { add_project(name,executor,customer,condition); }
    else           { edit_project(name,executor,customer,condition,id); }
 
    display_data();
    clear_input();
    save_data();
}

function set_executor (element) 
{
    let executor = $(element).text();
 
    executor = executor === ". . ." ? "Виберіть виконавця" : executor;
 
    $("#project_executor").text(executor); 
}

function set_customer (element) 
{
    let customer = $(element).text();
 
    customer = customer === ". . ." ? "Виберіть замовника:" : customer;
 
    $("#project_customer").text(customer);
}

function prepare_executors_for_dropdown (target) 
{
    let list = $(`#${target}_executors_list`);
 
    get_data("executors").then((result) => {
 
       if (result.length != 0) {
          
          list.find("li:not(:first)").remove();
          list.append(divider);
 
          for (let item of result) {
             list.append(`<li><span class="dropdown-item" ` +
                         `onclick="set_executor(this)">${item.name}</span></li>`);
          }
       }
    });
}

function prepare_customers_for_dropdown (target) 
{
    let list = $(`#${target}_customers_list`);
 
    get_data("customers").then((result) => {
 
       if (result.length != 0) {
          
          list.find("li:not(:first)").remove();
          list.append(divider);
 
          for (let item of result) {
             list.append(`<li><span class="dropdown-item" ` +
                         `onclick="set_customer(this)">${item.name}</span></li>`);
          }
       }
    });
}

function clear_table (table_is_empty) 
{
    let target = location.pathname.substring(1);
    let span = (target === "executors") ? 4 :
               (target === "customers") ? 5 : 6;
 
    $("#table tbody").empty();
 
    let block =
   `<tr class="text-center text-secondary" id="table_empty">
       <td colspan="${span}"> <span class="mx-5 fs-4">Немає даних для відображення</span> </td>
    </tr>`;
 
    if (table_is_empty) { $("#table tbody").append(block); }
    else                { $("#table_empty").remove();      } 
}

function clear_input() 
{
    let target = location.pathname.substring(1);
 
    switch (target) {
       
       case "executors": $("#executor_name").val("");
                         $("#executor_age").val("");
                         break;
       case "customers": $("#customer_name").val("");
                         $("#customer_age").val("");
                         break;
       case "projects":  $("#project_name").val("");
                         $("#project_executor").text("Виберіть виконавця");
                         $("#project_customer").text("Виберіть замовника");
                         $("#project_condition").val("Виберіть стан проєкту");
                         $(`#project_executors_list`).find("li:not(:first)").remove();
                         $(`#project_customers_list`).find("li:not(:first)").remove();
                         break;
    }
}

function get_icon_code (only_delete) 
{
    const icon_edit = 
   `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-pencil-square btn-control mx-1" viewBox="0 0 16 16" onclick="edit_element(this)">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg>`;

    const icon_delete = 
   `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-trash btn-control mx-1" viewBox="0 0 16 16" onclick="delete_element(this)">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>`;

    const icons =
   `<span class="d-flex mx-2">
       ${!only_delete ? icon_edit : ""}${icon_delete}
    </span>`;
 
    return icons;
}

function delay (time) {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
          resolve();
       }, time);
    });
}

$(document).on("hidden.bs.modal", () => { clear_input(); });


jQuery(async () => {

    await load_data();
    display_data();
 
});