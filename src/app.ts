import { createServer } from "http";
import { envs } from "./config/envs";
import { Server } from "./presentation/server";
import { WssService } from "./presentation/services/wss.service";
import { AppRoutes } from "./presentation/routes";

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
  });

  const httpServer = createServer(server.app);
  WssService.initWss({ path: "/ws", server: httpServer });
  server.setRoutes(AppRoutes.routes)

  // server.start();
  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port: ${envs.PORT}`);
  });
}
