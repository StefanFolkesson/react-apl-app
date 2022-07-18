
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

