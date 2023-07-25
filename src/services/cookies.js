// Set a cookie with a name, value, and expiration date
export function setCookie(name, value, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  
  // Get the value of a cookie by its name
  export function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }
  
  // Example usage
//   document.getElementById("set-cookie").addEventListener("click", function() {
//     setCookie("username", "JohnDoe", 7); // Set a cookie named "username" with the value "JohnDoe" that expires in 7 days
//     alert("Cookie 'username' set!");
//   });
  
//   document.getElementById("get-cookie").addEventListener("click", function() {
//     const username = getCookie("username");
//     if (username !== "") {
//       alert("Username: " + username);
//     } else {
//       alert("Username cookie not found!");
//     }
//   });
  