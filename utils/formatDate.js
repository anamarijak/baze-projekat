let months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

module.exports =  date => {
  //dobavimo date object
  let newDate = new Date(date);
  console.log(newDate.toDateString());
  console.log(newDate.toTimeString());
  console.log(newDate.getDay());
  return newDate.toDateString().slice(4);
}