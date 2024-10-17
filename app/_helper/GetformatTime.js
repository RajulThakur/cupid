function GetformatTime() {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    //only show minutes and hours
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  console.log(formattedTime);
  return formattedTime;
}
export default GetformatTime;
