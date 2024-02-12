import { useRef, useState } from 'react'
import { useBrighttiStreaming, useBrighttiStreamingEvent, useStreamerFetcher } from '@brightti/react'
import { 
  QueueDisconnectedEvent,
  InitialSettingsEvent,
  DataChannelOpenEvent,
  PlayStreamEvent,
  StatsReceivedEvent,
  StreamPreConnectEvent,
  StreamPreDisconnectEvent,
  StreamLoadingEvent,
  StreamReconnectEvent,
  VideoInitializedEvent,
  QueueConnectingEvent,
  QueueConnectedEvent
} from '@brightti/streaming'


export const Streaming: React.FC = () => {
  const videoParent = useRef<HTMLDivElement>(null)
  const streamer = useBrighttiStreaming()
  const fetcher = useStreamerFetcher()

  const [streamingState, setStreamingState] = useState<string>('starting...')
  const [readyToStream, setReadyToStream] = useState<boolean>(false)


  useBrighttiStreamingEvent("queueConnecting", (e: QueueConnectingEvent) => {
    console.log('Connecting to queue')
    setStreamingState('Connecting...')
  })

  useBrighttiStreamingEvent('queueConnected', (e: QueueConnectedEvent) => {
    console.log('Connected to queue waiting for asignation')
    setStreamingState('waiting streamer assignation...')
  })

  useBrighttiStreamingEvent("queueDisconnected", (e: QueueDisconnectedEvent) => {
    console.log('disconected from queue', e.data)

    if (!e.data.errorOnDisconnect) {
      setStreamingState('Streamer assigned, starting connection...')
    } else {
      setStreamingState('Error on queue, pleace retry later')
    }
  })

  useBrighttiStreamingEvent("initialSettings", (e: InitialSettingsEvent) => {
    console.log("initialSettings", e.data)
  })

  useBrighttiStreamingEvent("dataChannelOpen", (e: DataChannelOpenEvent) => {
    console.log("dataChannelOpen", e.data)
  })

  useBrighttiStreamingEvent("playStream", (e: PlayStreamEvent) => {
    console.log("playStream")
  })

  useBrighttiStreamingEvent("statsReceived", (e: StatsReceivedEvent) => {
    console.log("statsReceived", e.data)
  })

  useBrighttiStreamingEvent("streamConnect", (e: StreamPreConnectEvent) => {
    console.log("streamConnect")
  })

  useBrighttiStreamingEvent("streamDisconnect", (e: StreamPreDisconnectEvent) => {
    console.log("streamDisconnect")
  })

  useBrighttiStreamingEvent("streamLoading", (e: StreamLoadingEvent) => {
    console.log("streamLoading")
  })

  useBrighttiStreamingEvent("streamReconnect", (e: StreamReconnectEvent) => {
    console.log("streamReconnect")
  })

  useBrighttiStreamingEvent("videoInitialized", (e: VideoInitializedEvent) => {
    console.log("videoInitialized")

    if (videoParent.current) {
      streamer?.setVideoElementParent(videoParent.current)
      setReadyToStream(true)
    }
  })

  useBrighttiStreamingEvent('playStream', (e: PlayStreamEvent) => {
    // example how to send requests to the streamer
    setTimeout(() => {
      fetcher.sendRequest<string>({type: "prueba", body: {hola: "asas"}}, (response) => {
        console.log(response)
      })
    }, 5000)
  })

  return (
    <div
        style={{
            width: '100%',
            height: '100%',
            position: 'relative'
        }}
    >
        <div
            style={{
                width: '100%',
                height: '100%'
            }}
            ref={videoParent}
        />
        {!readyToStream && (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}
            >
                <div>{streamingState}</div>
            </div>
        )}
    </div>
);
}