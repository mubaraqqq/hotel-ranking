import axios from "axios";

exports.handler = async function (event: any, context: any) {
  console.log(event);
  console.log(context);
  try {
    const { lat, lng } = event.queryStringParameters;
    // const response = await axios.get(`${process.env.TODO_BASE_URL}/${id}`);
    const res = await axios.request({
      method: "GET",
      url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse",
      params: {
        lat: lat,
        lon: lng,
        "accept-language": "en",
        polygon_threshold: "0.0",
      },
      headers: {
        "X-RapidAPI-Key": "a2a93b20a9mshd63fdbc1d1e4213p1b6f20jsn0f1693ce22e0",
        "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
      },
    });
    return {
      statusCode: 200,
      body: res,
    };
  } catch (err: any) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
