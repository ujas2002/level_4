/* eslint-disable no-undef */

const todoList = require("../todo");
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
const { all, markComplete, add, overDue, duetoday, duelater } = todoList();

describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "todo1",
      completed: false,
      dueDate: today,
    });
    add({
      title: "todo2",
      completed: false,
      dueDate: yesterday,
    });
    add({
      title: "todo3",
      completed: false,
      dueDate: tomorrow,
    });
  });
  test("add", () => {
    const count = all.length;
    add({
      title: "todo4",
      completed: true,
      dueDate: today,
    });
    expect(all.length).toBe(count + 1);
  });
  test("markComplete", () => {
    expect(all[0].completed).toBe(false);
    markComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("overdue_items", () => {
    let overdue_list = overDue();
    expect(overdue_list.length).toBe(1);
    expect(overdue_list[0]).toBe(all[1]);
  });
  test("dueToday_items", () => {
    let dueToday_list = duetoday();
    expect(dueToday_list.length).toBe(2);
    expect(dueToday_list[0]).toBe(all[0]);
    expect(dueToday_list[1]).toBe(all[3]);
  });
  test("dueLater_items", () => {
    let dueLater_list = duelater();
    expect(dueLater_list.length).toBe(1);
    expect(dueLater_list[0]).toBe(all[2]);
  });
});
