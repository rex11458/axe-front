import { stringify } from "qs";
import request from "../utils/request";

export async function query() {
  return request("/api/users", []);
}

export async function queryNotices() {
  return request("/api/users", []);
}

export async function queryProducts() {
  return request("/api/products", []);
}

export async function queryFunds(params){

  return request("/api/funds",{
    method:'POST',
    body:{}
  });
}

export async function submitBuy(params){
  return request("./api/submitbuy",{
    method:'POST',
    body:params
  });
}
