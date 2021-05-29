const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');


cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();

    //cuando se selecciona procesar Compra
   // procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });


}

function procesarCompra() {
    // e.preventDefault();
    console.log("procesamos compra");
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "index.html";
        })
    }else{

        let productosLS;
        let total = 0, igv = 0, subtotal = 0;
        var pedido="";
        var items="";
        var cabecera="";
        var flag=true;
        cabecera = cabecera + "*** PEDIDO WEB ***";
        cabecera = cabecera + "\n";
        cabecera = cabecera + "\_________________________\n";
    
        productosLS = compra.obtenerProductosLocalStorage();
        for(let i = 0; i < productosLS.length; i++){
            let element = Number(productosLS[i].precio * productosLS[i].cantidad);
            if (flag){
                console.log("una vez");
                pedido =  pedido + cabecera 
                flag=false;
            } else {
                pedido = "";
            }

            pedido = pedido +
            "Producto : " +
            productosLS[i].titulo +
            "\n" +
            "Cantidad: " +
            productosLS[i].cantidad +
            "\n" +
            "Precio : " +
            productosLS[i].precio +
            "\n" +
            "\_________________________\n";

            total = total + element;
            items = items + pedido;
        }
        
        items = items + "TOTAL:" + "$" + total.toFixed(2);;
        console.log(items);
        return items;

    }
   
    
    
}

