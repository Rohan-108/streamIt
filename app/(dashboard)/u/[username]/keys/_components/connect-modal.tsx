"use client";
import { toast } from "sonner";
import { ElementRef, useRef, useState, useTransition } from "react";
import { IngressInput } from "livekit-server-sdk";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { createIngress } from "@/actions/ingress";
const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);
type IngressType = typeof RTMP | typeof WHIP;
export const ConnectModal = () => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);
  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success("Ingress Created");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("something went wrong"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current
            connection
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={onSubmit} variant="primary">
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
