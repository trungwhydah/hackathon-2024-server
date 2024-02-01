import axios from "axios";

const config = {
  method: "post",
  url: "https://api.mymidjourney.ai/api/v1/midjourney/imagine",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer <your-token>",
  },
  data: {
    prompt:
      "https://storage.googleapis.com/assets-fygito-dev/images/user_id/1706753124-test-minh-nguyen.jpeg Vietnamese style, Nghê Văn Miếu style art, temple behind, smart, winner education reward, 1800 century, Vietnam",
  },
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
