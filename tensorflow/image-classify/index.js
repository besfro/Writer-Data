/*
 * @Name 
 * @Description 
 * @Author clc
 * @Date 2021-10-20 15:09:55
 * @LastEditTime 2021-10-20 15:10:04
 * @Email Lengchars@gmail.com
 */
let net;

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  // Make a prediction through the model on our image.
  const imgEl = document.getElementById('img');
  const result = await net.classify(imgEl);
  console.log(result);
}

app();