let svless = 1;
export var apiurl = "http://127.0.0.1:3005/";

if (svless == 1) {
  apiurl = "https://api.dolphine.online/";
}
if (svless == 2) {
  apiurl = "http://dolphine.servegame.com:3005/";
}
if (svless == 3) {
  apiurl = "https://fish.dolphine.online/";
}
export var imgurl = apiurl + "images/shopitems/";