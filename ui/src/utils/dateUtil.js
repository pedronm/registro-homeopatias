function formatDate(dataIn){
  let data = new Date(dataIn)
  let day = data.getDate().toString().padStart(2, '0');
  let month = (data.getMonth() + 1).toString().padStart(2, '0');
  let year = data.getFullYear();
  let hours = data.getHours().toString().padStart(2, '0');
  let minutes = data.getMinutes().toString().padStart(2, '0');
  let seconds = data.getSeconds().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export {
  formatDate,
}