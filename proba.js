// // System.arraycopy(alphabet, 0, chars[0], 0, alphabet.length);

// let alphabet=['A','B','C','D','E','F','G','H','I','J', 'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','`','_','.',',']
// let shifrlangan=``
// let key=''

//     for (let i = 0; i < key.length(); i++){
// let chars=[]
//         chars[i+1][0] = key.charAt(i);
//     }
//         for (int i = 1; i <= key.length(); i++){
//             for (int j = 1; j < alphabet.length; j++){
//                 chars[i][j] = alphabet[((key.charAt(i - 1) + j)-'A')%30];
//             }
//         }
//         for (int i = 0; i <= key.length(); i++) {
//             System.out.print(i);
//             for (int j = 0; j < alphabet.length; j++){
//                 System.out.print("|" + chars[i][j]);
//             }
//             System.out.println();
//         }
//         StringBuilder encodedString = new StringBuilder();
//         for (int i = 1; i <= text.length(); i++){
//             for (int j = 0; j < alphabet.length; j++){
//                 if (i >= key.length()){
//                     if (chars[i - key.length()][j] == text.charAt(i - 1)){
//                         encodedString.append(chars[0][j]);
//                     }
//                 }
//                 else {
//                     if (chars[i][j] == text.charAt(i - 1))
//                         encodedString.append(chars[0][j]);
//                 }
//             }
//         }


//         System.out.println("Deshifrlangan matn: " + encodedString);

/*
The MIT License (MIT)
Copyright (c) 2017 Eduardo Henrique Vieira dos Santos
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function stringToIntList(string)
{
  let s = new Array();
  for (let i = 0; i < string.length; i++) {
    s[i] = string.charCodeAt(i);
  }
  return s;
}
function intsToCharList(integers)
{
  let ints = new Array();
  for (let i = 0; i < integers.length; i++) {
    ints[i] = String.fromCharCode(integers[i]);
  }
  return ints;
}
function encrip(text, key, cipher)
{
  text = stringToIntList(text.value);
  key = stringToIntList(key.value);
  let table = makeTable();
  let keyChar = 0;
  let message = new Array();
  while(message.length<text.length) {
    for(let i = 0; i < text.length; i++) {
      let row = table[0].indexOf(key[keyChar]);
      let col = table[0].indexOf(text[i]);
      message[message.length] = table[row][col];
      if (keyChar<key.length-1) {
        keyChar++;
      } else {
        keyChar = 0;
      }
    }
  }
  message = intsToCharList(message).join("");
  cipher.value = message;
}
function decrip(text, key, cipher)
{
  cipher = stringToIntList(cipher.value);
  key = stringToIntList(key.value);
  let table = makeTable();
  let keyChar = 0;
  let message = new Array();
  while (message.length<cipher.length) {
    for (let i = 0; i < cipher.length; i++) {
      let row = table[0].indexOf(key[keyChar]);
      let col = table[row].indexOf(cipher[i]);
      message[message.length] = table[0][col];
      if (keyChar<key.length-1) {
        keyChar++;
      } else {
        keyChar = 0;
      }
    }
  }
  message = intsToCharList(message).join("");
  text.value = message;

}
function makeTable()
{
  let table = new Array();
  let minASCII = parseInt(document.getElementById('minASCII').value);
  let maxASCII = parseInt(document.getElementById('maxASCII').value);
  let i = 0;
  while (i+minASCII < maxASCII) {
    let line = new Array();
    for (let j = 0; j < maxASCII - minASCII; j++) {
      if (j+i+minASCII >= maxASCII) {
        line[line.length] = (j+i)-(maxASCII-minASCII)+minASCII;
      } else {
        line[line.length] = j+i+minASCII;
      }
    }
    table[table.length] = line;
    i++;
  }
  return table;
}
function printTable()
{
  let t = makeTable();
  document.getElementById("ascii").innerHTML = "";
  for (let i = 0; i < t.length; i++) {
    document.getElementById("ascii").innerHTML = document.getElementById("ascii").innerHTML+
      "<tr><td>"+intsToCharList(t[i]).join("</td><td>")+"</td></tr>";
  }
}