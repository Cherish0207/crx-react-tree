let express = require("express");
let app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.get("/getChildren", (req, res) => {
  let data = req.query;
  setTimeout(function () {
    res.json({
      code: 0,
      data: [
        {
          name: data.name + "的儿子1",
          key: `${data.key}-1`,
          type: "folder",
          collapsed: true,
        },
        {
          name: data.name + "的儿子2",
          key: `${data.key}-2`,
          type: "folder",
          collapsed: true,
        },
      ],
    });
  }, 2000);
});
app.listen(3000, () => {
  console.log(`接口服务器在${3000}上启动`);
});
