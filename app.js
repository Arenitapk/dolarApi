async function TraerWeb() {
    const resultado = await fetch('https://co.dolarapi.com/v1/cotizaciones')
    if (!resultado.ok) {
        throw new Error("Hubo un error");
    }
    const api = await resultado.json()
    return api
}

async function iniciador() {
    const resultadoApi = await TraerWeb()
    mostrarDivisas(resultadoApi)
    console.log(resultadoApi)
}


function mostrarDivisas(resultadoApi) {

    let contenedorCards = document.getElementById("contenedorCards")

        for (const divisa of resultadoApi) {

            contenedorCards.innerHTML += `<div class="card">
            <div class="contenedorParteAlta">
                <div class="contenedorLogo" style="background-color: #${Math.floor(Math.random()*16777215).toString(16)}">
                    <h2>${divisa.moneda}</h2>
                </div>
                <div class="contenedorNombreDivisa">
                    <h3>${divisa.nombre}</h3>
                </div>
            </div>
            <div class="contenedorParteBaja">
                <div class="contenedorCompraVenta">
                    <p>Compra:</p>
                    <p>Venta:</p>
                    <p>Ultimo Cierre:</p>
                </div>
                <div class="contenedorDatosCompraVentaMasCOP">
                    <div class="contenedorDatosCompraVenta">
                        <p class="pCompra">${divisa.compra}</p>
                        <p class="pVenta">${divisa.venta}</p>
                        <p class="pCierre">${divisa.ultimoCierre}</p>
                    </div>
                    <div class="contenedorCOPGris">
                        <p class="textoGris">(COP)</p>
                        <p class="textoGris">(COP)</p>
                        <p class="textoGris">(COP)</p>
                    </div>
                </div>
            </div>
        </div>`
        }

    let selectDivisas = document.getElementById("selectDivisas")
    let selectDivisa2 = document.getElementById("selectDivisa2")
    let btn = document.getElementById("btn")
    let resultado = document.getElementById("resultado")

    for (const item of resultadoApi) {
        selectDivisas.innerHTML += `<option>${item.nombre}</option>`
        selectDivisa2.innerHTML += `<option>${item.nombre}</option>`
    }

    let input1 = document.getElementById("input1")

    input1.addEventListener("change", function(){
        resultado.innerHTML = ``
    })

    selectDivisas.addEventListener("change", function(){

        resultado.innerHTML = ``

        //objeto que se selcciona en el select1
        let valorDivisa = resultadoApi.find(itemDivisa => itemDivisa.nombre == selectDivisas.value)

    selectDivisa2.addEventListener("change", function(){
        //objeto que se selcciona en el select2
        let valorDivisa2 = resultadoApi.find(itemD => itemD.nombre == selectDivisa2.value)
        //Variable de calculo de resultado

    btn.addEventListener("click", function(evento){
        let resultadoCambioDivisa = (input1.value * valorDivisa.ultimoCierre / valorDivisa2.ultimoCierre).toFixed(2)
        console.log(resultadoCambioDivisa)
        //putting the result in the div
        resultado.innerHTML = `<p style="color: rgb(80, 80, 80);">Resultado(${valorDivisa2.moneda}):</p><h3 style="color: green; margin-top: -5px">$ ${resultadoCambioDivisa}</h3>`
        
    })

    })
})  

}



iniciador()