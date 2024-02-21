import { LiveKitRoomProps, useLiveKitRoom } from "@livekit/components-react";
import { WifiOff } from "lucide-react";
import { Button } from "../ui/button";

interface OfflineVideoProps {
  username: string;
  token: string;
}

export const OfflineVideo = ({ username, token }: OfflineVideoProps) => {
  const props = {
    token,
    serverUrl: process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!,
  };
  const { room } = useLiveKitRoom(props);
  const handleStream = () => {
    room?.localParticipant.setCameraEnabled(true);
    room?.localParticipant.setMicrophoneEnabled(true);
  };
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <WifiOff className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground">{username} is offline</p>
      <Button onClick={handleStream}>Click to go live</Button>
    </div>
  );
};
