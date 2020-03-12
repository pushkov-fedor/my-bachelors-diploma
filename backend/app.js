const express = require("express");
const { spawn } = require("child_process");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const vbs = spawn("C:\\Windows\\SysWOW64\\wscript.exe", [
    "C:\\my-bachelors-diploma\\test.vbs"
  ]);
  setInterval(() => res.send(`${JSON.stringify(vbs)}`), 6000);
  //   res.send("Hello World");
});

app.listen(port, () => console.log(`Example app is listening on port ${port}`));
