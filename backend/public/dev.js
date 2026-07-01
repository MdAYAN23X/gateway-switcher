const output = document.getElementById("output");

async function call(url){

    const res = await fetch(url);

    const data = await res.json();

    output.textContent =
        JSON.stringify(data,null,4);

}

document
.getElementById("healthBtn")
.onclick = ()=>{

    call("/api/health");

};

document
.getElementById("configBtn")
.onclick = ()=>{

    call("/api/config");

};