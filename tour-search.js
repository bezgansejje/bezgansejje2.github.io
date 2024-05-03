function incrementValue(selectId) {
  var select = document.getElementById(selectId);
  select.selectedIndex = Math.min(select.selectedIndex + 1, select.options.length - 1);
}

function decrementValue(selectId) {
  var select = document.getElementById(selectId);
  select.selectedIndex = Math.max(select.selectedIndex - 1, 0);
}