import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import Replicate from "replicate";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const maleTemplate = [
  [
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706751100-baby-man.png",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706751100-baby-man-2.png",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706751178-DALL·E_2024_01_31_16_01_03_Create_a_refined_illustration_of_a_baby.png",
  ],
  [
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717568-6377268641.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706751363-man-25-nghe-2.png",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717568-7379681333(1).jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706751363-man-25-nghe.png",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706751363-man-nghe-3.png",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717568-7379681333.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717652-2932500238.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706751363-man-25-nghe-2.png",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717652-3747974407(1).jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717652-7611871792.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717718-2101239272.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717718-1737652457.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717718-4150963.jpeg",
  ],
];

const femaleTemplate = [
  [
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706751235-baby-nu-2.png",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706751235-baby-nu.png",
  ],
  [
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717764-8678859156.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717764-7565612096.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706751478-nu-25-nghe.png",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717764-5598508310.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706751478-nu-nghe-2.png",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717874-1238634898.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717874-5598508310.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717874-9058260931.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717874-942748928.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717921-4781510460.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717921-2468069149.jpeg",
    "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706717921-6631954886.jpeg",
  ],
];

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const SwapFace = async function (source_image, target_image) {
  return replicate.run(
    "yan-ops/face_swap:d5900f9ebed33e7ae08a07f17e0d98b4ebc68ab9528a70462afc3899cfe23bab",
    {
      input: {
        weight: 0.5,
        cache_days: 10,
        det_thresh: 0.1,
        request_id: "aa6a2aad-90ec-4c00-b90b-89f4d62e6b84",
        source_image: source_image,
        target_image: target_image,
      },
    }
  );
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/generate-image", async (req, res) => {
  const { image, gender, age } = req.body;
  let templateImage = "";

  if (gender === 0) {
    templateImage =
      maleTemplate[age][getRndInteger(0, maleTemplate[age].length)];
  } else {
    templateImage =
      femaleTemplate[age][getRndInteger(0, femaleTemplate[age].length)];
  }

  var result = await SwapFace(image, templateImage);

  res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
