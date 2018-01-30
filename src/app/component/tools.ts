/**
 * Created by angel on 30/01/2018.
 */

export let revisarFecha = function (fecha: any ) {
  console.log(fecha);
  console.log(fecha.getDay());
  const mes = (fecha.getMonth() + 1 ) < 10 ? '0' + (fecha.getMonth() + 1 ) : (fecha.getMonth() + 1 );
  const dia = fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate();
  return (fecha.getFullYear() + '-' + mes + '-' + dia);
};
export let formatYMDFecha = function (fecha: any) {
  let regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!fecha.match(regEx)) return null;  // Invalid format
  let fecha2  = new Date(fecha);
  fecha2.setDate(fecha2.getDate() + 1);
  return fecha2;
};

export let onPrint = function (title: string, style: string, body: string) {
  let  popupWin;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
          ${style}
          </style>
        </head>
          <body onload="window.print();window.close()">
            ${body}
          </body>
      </html>`
  );
  popupWin.document.close();
}

