const project = require("./project");
const customer = require("./customer");
const executor = require("./executor");

exports.find_project_exec                   = project.find_project_exec;
exports.find_project_cust                   = project.find_project_cust;
exports.add_project                         = project.add_project;
exports.remove_project                      = project.remove_project;
exports.edit_project                        = project.edit_project;
exports.project_completed                   = project.project_completed;
exports.get_projects_list_exec              = project.get_projects_list_exec;
exports.get_projects_list_cust              = project.get_projects_list_cust;
exports.get_uncompleted_projects_list_exec  = project.get_uncompleted_projects_list_exec;
exports.get_uncompleted_projects_list_cust  = project.get_uncompleted_projects_list_cust;

exports.find_customer                       = customer.find_customer;
exports.add_customer                        = customer.add_customer;
exports.remove_customer                     = customer.remove_customer;
exports.edit_customer                       = customer.edit_customer;
exports.customers_list                      = customer.customers_list;

exports.find_executor                       = executor.find_executor;
exports.add_executor                        = executor.add_executor;
exports.remove_executor                     = executor.remove_executor;
exports.edit_executor                       = executor.edit_executor;
exports.executors_list                      = executor.executors_list;