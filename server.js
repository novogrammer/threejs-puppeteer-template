const express = require('express');

const puppeteer = require('puppeteer');



const app = express();

app.use(express.static("public"));

// app.get('/', function (req, res) {
//   res.send('Hello World');
// });


app.listen(3000);



async function main() {
  const url = "http://localhost:3000/";
  const API_CAPTURE_URL="/api/capture";

  const args=[
    "--no-sandbox",
    "--use-gl=swiftshader",
    // "--use-gl=angle",
    "--enable-webgl",
  ];

  const browser = await puppeteer.launch({
    args,
    headless: true,
    dumpio: true,
    defaultViewport: { width: 400, height: 300 },
  });



  // process.kill(process.pid, "SIGINT");

  app.get(API_CAPTURE_URL,async (req,res)=>{
    const page = await browser.newPage();

    await page.goto(url);
    // await page.waitForNetworkIdle();

    const result = await page.evaluate(async ()=>{
      await window.app.setupPromise;
      return window.app.draw();
    });
    await page.close();

    console.log("result :",result);

    res.json({result});

  });
  console.log(`begin ${API_CAPTURE_URL}`);
}

main();

