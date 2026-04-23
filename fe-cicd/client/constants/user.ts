import { setMetadata } from "@hengshuai/helper";

/** 爱好 */
export enum USER_HOBBY {
  football = 1,
  basketball,
  pingpong,
  running,
  swimming,
  tennis,
}

setMetadata(USER_HOBBY, {
  football: {
    alias: "hobbies.football",
  },
  basketball: {
    alias: "hobbies.basketball",
  },
  pingpong: {
    alias: "hobbies.pingpong",
  },
  running: {
    alias: "hobbies.running",
  },
  swimming: {
    alias: "hobbies.swimming",
  },
  tennis: {
    alias: "hobbies.tennis",
  },
});

/** 性别 */
export enum USER_SEX {
  male = "male",
  remale = "remale",
}

setMetadata(USER_SEX, {
  male: {
    alias: "common.male",
  },
  remale: {
    alias: "common.remale",
  },
});
