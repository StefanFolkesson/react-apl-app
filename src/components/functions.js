
export function checkData(arr,data) {
    let returnelement=true;
    data.forEach(element => {
        console.log(arr[element]);
        if(arr[element] == null){
            returnelement = element;
        }
    });
    return returnelement;
}

export function loadLS(name){
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
      }, '')  
}

export function saveLS(name, value, days = 7, path = '/') {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
}