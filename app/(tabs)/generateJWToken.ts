import * as Token from "@pixlrlte/pixlr-sdk";

const CLIENT_KEY = '6783652c59c0ed0a63cd6024';
const CLIENT_SECRET = 'c8436ccaec144269a4535a3cbfb601b1';

type AccentNames = 'ash' | 'brown' | 'coral' | 'pink' | 'rose' | 'red' | 'plum' | 'maroon' | 'purple' | 'lavender' | 'denim' | 'blue' | 'teal' | 'green' | 'lime' | 'mustard';
type WorkspaceNames = 'dark' | 'iron' | 'steel' | 'light';
type ToolNames = 'arrange' | 'crop' | 'cutout' | 'liquify' | 'adjust' | 'effect' | 'filter' | 'ai' | 'retouch' | 'paint' | 'add-text' | 'add-element' | 'frame' | 'marquee' | 'lasso' | 'wand' | 'clone' | 'heal' | 'detail' | 'toning' | 'temper' | 'focus' | 'disperse' | 'pen' | 'fill' | 'draw' | 'shape' | 'eraser' | 'replace' | 'gradient' | 'text' | 'zoom' | 'hand';
type Formats = 'png' | 'jpeg' | 'webp' | 'pxz' | 'pdf';

interface BaseSettings {
  referrer?: string;
  icon?: string;
  accent?: AccentNames;
  workspace?: WorkspaceNames;
  tabLimit?: number;
  blockOpen?: boolean;
  disabledTools?: ToolNames[];
  exportFormats?: Formats[];
}

interface BasePayload {
  mode: "http" | "embedded";
  settings?: BaseSettings;
}

interface EmbeddedPayload extends BasePayload {
  mode: "embedded";
  origin: string;
}

interface HttpPayload extends BasePayload {
  mode: "http";
  openUrl: string;
  saveUrl: string;
  follow?: boolean;
}

export type PixlrPayloadJWT = EmbeddedPayload | HttpPayload;

/**
 * Create a JWT token for our api call
@@ -8,16 +43,15 @@ import { Token, type PixlrPayloadJWT } from "@pixlrlte/pixlr-sdk";
 * @param payload API settings and data we want to send to the API
 */
export async function createToken(payload: PixlrPayloadJWT) {
  const tokenService = new Token({
    clientKey: CLIENT_KEY,
    clientSecret: CLIENT_SECRET,
  });

  await Token
  .generate({ clientKey: CLIENT_KEY, clientSecret: CLIENT_SECRET })
  .createToken(payload);

  tokenService.createToken(payload);


  const secret = new TextEncoder().encode(CLIENT_SECRET);
  const alg = "HS256";

  const jwt = await new s({ ...payload })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("1h")
    .setSubject(CLIENT_KEY)
    .sign(secret);

  return jwt; 
}