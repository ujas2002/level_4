const todoList = () => {
  let all = [];
  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };

  var dateToday = new Date();
  const today = formattedDate(dateToday);

  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markComplete = (index) => {
    all[index].completed = true;
  };

  const overDue = () => {
    let overdue_list = all.filter((item) => item.dueDate < today);
    return overdue_list;
  };

  const duetoday = () => {
    let dueToday_list = all.filter((item) => item.dueDate === today);
    return dueToday_list;
  };

  const duelater = () => {
    let dueLater_list = all.filter((item) => item.dueDate > today);
    return dueLater_list;
  };

  const toDisplayableList = (list) => {
    let display_list = list.map((item) => {
      let completionStatus = item.completed ? "[x]": "[ ]";
      let displayedDate = item.dueDate === today ? "" : item.dueDate;
      return `${completionStatus} ${item.title} ${displayedDate}`.trim();
    });
    let output_string = display_list.join("\n");
    return output_string;
  };

  return {
    all,
    add,
    markComplete,
    overDue,
    duetoday,
    duelater,
    toDisplayableList,
  };
};

module.exports = todoList;
