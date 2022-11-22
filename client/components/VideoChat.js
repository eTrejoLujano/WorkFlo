import React, { useEffect, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

import styled from "styled-components";

const VideoChat = () => {
  const [video, setVideo] = useState(null);
  useEffect(() => {}, []);

  console.log();
  return (
    <VideoContainer>
      <ReactMediaRecorder
        video
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <video src={mediaBlobUrl} controls autoPlay loop />
          </div>
        )}
      />
    </VideoContainer>
  );
};

export default VideoChat;

const VideoContainer = styled.div`
  height: 200px;
  width: 200px;
  border: 1px solid black;
`;
