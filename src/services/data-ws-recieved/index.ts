import { WS_HOST } from "@config";
import WebSocket from "ws";

function connect() {
    const ws = new WebSocket(WS_HOST);

    ws.on("open", () => console.log("[WebSocket] connected"));

    ws.on("message", (message) => {
        const data = JSON.parse(String(message));

        console.log("[WebSocket] recieved", data);
        ws.on("close", () => {
            setTimeout(connect, 1000);
        });
    });
}
connect();
