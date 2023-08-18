let svless = 0;
export var apiurl = "http://127.0.0.1:3005/";

if (svless == 1){
apiurl = "https://dolphine-fastify.vercel.app/";
}
if(svless == 2){
    apiurl = "http://dolphine.servegame.com:3005/"
}
if(svless == 3){
    apiurl = "http://119.59.100.49/";
}
export var imgurl = apiurl+"images/shopitems/"

//sv