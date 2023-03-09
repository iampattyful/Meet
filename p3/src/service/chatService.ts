import { Knex } from "knex";
import { knex } from "../db";
export class ChatService {
  constructor(protected knex: Knex) {}
  async getChatRoomGroup(userId: number) {
    const rows = await knex("message")
      .join(
        function () {
          this.join("group", "group_id", "=", "group.id")
            .select("group_id")
            .from("message")
            .where("matched_user_id1", userId)
            .orWhere("matched_user_id2", userId)
            .max("message.created_at")
            .groupBy("group_id")
            .as("user_message");
        },
        "user_message.max",
        "=",
        "message.created_at"
      )
      .join("group", "group.id", "=", "message.group_id")
      .join("users", function () {
        this.on("users.id", "=", "matched_user_id1");
        // .orOn("users.id","=","matched_user_id2")
      })
      .join("users AS u2", function () {
        this.on("u2.id", "=", "matched_user_id2");
        // .orOn("users.id","=","matched_user_id2")
      })
      .select(
        "user_message.group_id",
        "message.message",
        "user_message.max",
        "matched_user_id1",
        "matched_user_id2",
        "users.username",
        "u2.username AS username2",
        "users.user_icon",
        "u2.user_icon AS user_icon2"
      )
      // .where("user_message.group_id","message.group_id")
      .orderBy("user_message.max", "desc");

    return rows;
  }

  async validUserIdWithGroupId(userId: number, groupId: number) {
    const rows = await knex("group").select("*")
      .where("group.id", groupId)
      .andWhere(
        function() {
          this.where("group.matched_user_id1", userId).orWhere("group.matched_user_id2", userId)
        }
      )

    return rows.length > 0
  }

  async getRoomMess(userId: number, groupId: number) {
    const rows = await knex("group")
      .join("message", "message.group_id", "=", "group.id")
      .join("users", "users.id", "=", "message.user_id")
      .select(
        "message.message",
        "message.created_at",
        "message.user_id",
        "message.group_id",
        "users.username",
        "users.user_icon"
      )
      .where("group.id", groupId)
      .andWhere("group.matched_user_id1", userId)
      .orWhere("group.matched_user_id2", userId)
      .orderBy("message.created_at", "asc");

    return rows;
  }
  async getFrdUserData(userId: number, groupId: number) {
    const [groupRow] = await knex("group")
      .select("matched_user_id1", "matched_user_id2")
      .where("group.id", groupId);
    if (!groupRow) {
      throw new Error("Not exist this group");
    }
    let frdUserId = Object.values(groupRow).filter(
      (val) => val !== userId
    )[0] as number;

    let [frdUserData] = await knex("users")
      .select("users.username", "users.user_icon")
      .where("id", frdUserId);
    return frdUserData;
  }
}

export let chatService = new ChatService(knex);
