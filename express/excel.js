//Pasul 1 - Transformarea XLSX in JSON
let selectedFile;
// console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data = [{
    "name": "jayanth",
    "data": "scd",
    "abc": "sdef"
}]

//Pasul 2 - Setarea valorilor variabilelor care se repeta

let FurnizorNume = "S.C. Traderia SRL";
let FurnizorCIF = 12318114;
let FurnizorNrRegCom = "J40/5301/2002";
let FurnizorCapital = 200;
let FacturaTaxareInversa = "Nu";
let FacturaTVAIncasare = "Nu";
let FacturaTip = "X";
let FacturaMoneda = "EUR";
let UM = "B";

var ClientNume = "";
var ClientCIF = "";
var ClientTara = "";
var ClientAdresa = "";
var FacturaNumar = "";
var FacturaData = "";
var FacturaScadenta = "";
var LinieNrCrt = "";
var Descriere = "";
var Cantitate = "";
var Pret = "";
var ProcTVA = "";

//Pasul 3 - Crearea unui string gol cu textul din XML
var ContinutXML = "";


document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            //  console.log(workbook);
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                //   console.log(rowObject);
                document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject, undefined, 4)

                //Pasul 4 - Parcurgerea fiecarei facturi
                var FacturiJSON = rowObject;
                var facturi = `<Facturi>`
                for (var i = 0; i < FacturiJSON.length; i++) {
                    facturi += `<Factura>`
                    var factura = FacturiJSON[i];

                    var ClientNume = factura.den_client;
                    var ClientCIF = factura.cif_cnp;
                    var ClientTara = factura.den_centru_profit;
                    var ClientAdresa = factura["Client address (street & building no.)"];
                    var FacturaNumar = factura.numar_document;
                    var FacturaData = factura.data_document;
                    var FacturaScadenta = factura.data_scadenta;
                    var LinieNrCrt = i + 1;
                    var Descriere = "Produs " + i;
                    var Cantitate = factura.cantitate;
                    var Pret = factura.suma_fara_tva;
                    var ProcTVA = factura.cota_tva_ies;
                    var Cont = factura.cont_produs;

                    // Transformam data de tip 2020-07-01 in data de tip SAGA 01.07.2020
                    var facturaDataPrelucrata = FacturaData.split('-')
                    var facturaDataPrelucrataFinala = facturaDataPrelucrata[2] + `.` + facturaDataPrelucrata[1] + `.` + facturaDataPrelucrata[0];
                    FacturaData = facturaDataPrelucrataFinala;

                    // Transformam data de tip 2020-07-01 in data de tip SAGA 01.07.2020
                    var facturaDataScadentaPrelucrata = FacturaScadenta.split('-')
                    var facturaDataScadentaPrelucrataFinala = facturaDataScadentaPrelucrata[2] + `.` + facturaDataScadentaPrelucrata[1] + `.` + facturaDataScadentaPrelucrata[0];
                    FacturaScadenta = facturaDataScadentaPrelucrataFinala;



                    var ContinutXML = `<Antet>
            <FurnizorNume>`+ FurnizorNume + `</FurnizorNume>
            <FurnizorCIF>`+ FurnizorCIF + `</FurnizorCIF>
            <FurnizorNrRegCom>`+ FurnizorNrRegCom + `</FurnizorNrRegCom>
            <FurnizorCapital>`+ FurnizorCapital + `</FurnizorCapital>
            <FurnizorAdresa>` + `</FurnizorAdresa>
            <FurnizorBanca>`+ `</FurnizorBanca>
            <FurnizorIBAN>`+ `</FurnizorIBAN>
            <FurnizorInformatiiSuplimentare>`+ `</FurnizorInformatiiSuplimentare>
            <ClientNume>`+ ClientNume + `</ClientNume>
            <ClientInformatiiSuplimentare>`+ `</ClientInformatiiSuplimentare>
            <ClientCIF>`+ ClientCIF + `</ClientCIF>
            <ClientNrRegCom>`+ `</ClientNrRegCom>
            <ClientJudet>`+ `</ClientJudet>
            <ClientTara>` + ClientTara + `</ClientTara>
            <ClientAdresa>`+ ClientAdresa + `</ClientAdresa>
            <ClientBanca>`+ `</ClientBanca>
            <ClientIBAN>`+ `</ClientIBAN>
            <FacturaNumar>`+ FacturaNumar + `</FacturaNumar>
            <FacturaData>`+ FacturaData + `</FacturaData>
            <FacturaScadenta>`+ FacturaScadenta + `</FacturaScadenta>
            <FacturaTaxareInversa>`+ FacturaTaxareInversa + `</FacturaTaxareInversa>
            <FacturaTVAIncasare>`+ FacturaTVAIncasare + `</FacturaTVAIncasare>
            <FacturaTip>`+ FacturaTip + `</FacturaTip>
            <FacturaInformatiiSuplimentare>`+ `</FacturaInformatiiSuplimentare>              
            <FacturaMoneda>`+ FacturaMoneda + `</FacturaMoneda>
     </Antet>
            <Detalii>
                  <Continut>
                        <Linie>
                              <LinieNrCrt>`+ LinieNrCrt + `</LinieNrCrt>
                              <Descriere>`+ Descriere + `</Descriere>
                              <CodArticolFurnizor></CodArticolFurnizor>
                              <CodArticolClient></CodArticolClient>
                              <CodBare></CodBare>
                              <InformatiiSuplimentare></InformatiiSuplimentare>
                              <UM>`+ UM + `</UM>
                              <Cantitate>`+ Cantitate + `</Cantitate>
                              <Pret>`+ Pret + `</Pret>
                              <Valoare>`+ Cantitate * Pret + `</Valoare>
                              <CotaTVA>`+ ProcTVA + `</CotaTVA>
                              <TVA>`+ ProcTVA / 100 * Cantitate * Pret + `</TVA>
                              <Cont>`+ Cont + `</Cont>
                        </Linie>
                  </Continut>
            </Detalii>
      </Factura>`
                    facturi += ContinutXML;

                }
                facturi += `</Facturi>`
                // var blob = new Blob([facturi], { type: 'text/plain' });
                // var file = new File([blob], "f_12318114_123_17-08-2020_17082020_145400.txt", { type: "text/plain" });

                //Pasul 5 - Transformarea String-ului in fisier XML si descarcarea fisierului
                var hiddenElement = document.createElement('a');

                hiddenElement.href = 'data:attachment/text,' + encodeURI(facturi);
                hiddenElement.target = '_blank';
                hiddenElement.download = 'F_' + FurnizorCIF + '_' + FacturaNumar + '_' + FacturaData + '.xml';
                hiddenElement.click();

                console.log(facturi);
            });
        }
    }
});
