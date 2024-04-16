export default async function chat(user_message) {
  let data = {"content":user_message};
  const response = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: data
  }); // update this to use the custom api endpoint
  const message = await response.json();
  console.log(message);
  return message;
}