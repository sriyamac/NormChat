export async function chat(user_message) {
  const response = await fetch(""); // update this to use the custom api endpoint
  const message = await response.json();
  console.log(message);
}