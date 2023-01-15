import React from "react";
import axios from "axios";
export const Menu = (props) => {
  const [text, setText] = React.useState();
  const [data, setData] = React.useState();

  const handleText = (txt) => {
    console.log(text);
    return setText(youtube_parser(txt));
  };
  const handleData = (dataArg) => {
    setData(dataArg);
  };
  const youtube_parser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };
  const run = async () => {
    axiosApi();
    console.log(text);
  };

  const axiosApi = () => {
    const options = {
      method: "GET",
      url: "https://youtube-video-download-info.p.rapidapi.com/dl",
      params: { id: text },
      headers: {
        "X-RapidAPI-Key": "e367ccd301mshf84b571123e23b0p178fafjsn8c72bcc63cbc",
        "X-RapidAPI-Host": "youtube-video-download-info.p.rapidapi.com"
      }
    };

    axios
      .request(options)
      .then(function (response) {
        handleData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div>
      <div>
        <h1 className="heading">َضع رابط يوتيوب</h1>
        <input
          className="URL-input"
          type="text"
          id="txtval"
          onChange={(e) => handleText(e.target.value)}
        />
        <button className="convert-button" id="linkid" onClick={run}>
          تحميل
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", margin: 5 }}>
        <center>
          <h3 style={{ color: "red" }}>َ{data?.title}</h3>
          <img src={data?.thumb} width={"100%"} height={270} alt="" />
          <a href={data?.link[17][0]}>
            <button className="convert-button" id="linkid">
              تنزيل
            </button>
          </a>
        </center>
      </div>
    </div>
  );
};
