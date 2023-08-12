let svless = 2;
export var apiurl = "http://127.0.0.1:3005/";

if (svless == 1){
apiurl = "https://dolphine-fastify.vercel.app/";
}
if(svless == 2){
    apiurl = "http://dolphine.servegame.com:3005/"
}
export var imgurl = apiurl+"images/shopitems/"

//sv