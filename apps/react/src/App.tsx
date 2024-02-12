import { BrighttiStreamingProvider } from "@brightti/react"
import { Streaming } from "./Streaming"


export const App: React.FC = () => {
  return (
    <BrighttiStreamingProvider config={{
      AutoConnect: true, // autoconect to queue and then streaming, default: false
      Mode: 'test', // point to staging or production, default: production
      AutoConnectQueue: true, // autoconnect to queue. (if AutoConnect its set to true, AutoConnectQueue not take effect). default: false
      AutoConnectStreaming: true, // autoconnect to streaming when queue finish. (if AutoConnect its set to true, AutoConnectStreaming not take effect). default: false
      AutoPlayVideo: true, // When video is ready automatically start playing (some browsers fails whitout interaction, use StartVideoMuted true to autoplay whitout human interaction), default: true
      StartVideoMuted: true, // start the video without audio, default: false
      HoveringMouse: false, // Either locked mouse, where the pointer is consumed by the video and locked to it, or hovering mouse, where the mouse is not consumed. default: false
    }}>
      <Streaming />
    </BrighttiStreamingProvider>
  )
}

