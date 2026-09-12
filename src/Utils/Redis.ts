import { createClient } from "redis";

export class Redis {
  private client = createClient({
    url: "redis://Talha:Redis@11@colorful-fly-volleyball-13013.db.redis.io:19106",
    username: "Talha",
    password: "Redis@11",
  });

  static connectToRedis() {
    new Redis().client.connect().then(() => {
      console.log("connected with redis");
    });
  }

  static async setvalue(key: string, value: string, expire_at :number=100) {
    try {
      let options: any = {};
      if (expire_at) {
        options = {
          Ex: expire_at,
        };
      }
      await new Redis().client.set(key, value, options);
    } catch (e) {
      throw ("server not connected !please try again");
    }
  }

  static async getvalue(key: string) {
    try {
      return await new Redis().client.get(key);
    } catch (e) {
      throw ("server not connected !please try again");
    }
  }
  static async delvalue(key: string) {
    try {
      await new Redis().client.del(key);
    } catch (e) {
      throw ("server not connected !please try again");
    }
  }
}
