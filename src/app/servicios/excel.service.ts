import { Injectable } from '@angular/core';
import * as fs from 'file-saver';
import { ImagePosition, Workbook } from 'exceljs';
import { LOGO } from './logo';
import { ABECEDARIO } from './abecedario';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private _workbook!: Workbook
  constructor() { }

  async downloadExcel(titulos:any,datos:any,titulo:any,hoja:any){
    this._workbook = new Workbook();
    await this.create_sheet(titulos,datos,hoja);
    this._workbook.xlsx.writeBuffer().then((data)=>{
      const blob=new Blob([data])
      fs.saveAs(blob,titulo);
    });
  }
  private async create_sheet(titulos:any,datos:any,hoja:any) {
    const sheet = this._workbook.addWorksheet(hoja);

    //Estilo de encabezados
    const font = { bold:true };
    const eeasaCell=sheet.getCell('D1');
    eeasaCell.font=font;
    eeasaCell.value='EMPRESA ELÉCTRICA AMBATO REGIONAL CENTRO NORTE S.A';

    const dam1=sheet.getCell('A2');
    dam1.font=font;
    dam1.value='DAMA116 (Víctor Hugo)';
    
    const dam2=sheet.getCell('A3');
    dam2.font=font;
    dam2.value='DAMA117 (Shopping Ambato)';

    const ingresoTitle=sheet.getCell('E3');
    ingresoTitle.font=font;
    ingresoTitle.value='INGRESO DE LAS INTERRUPCIONES DE SERVICIO';

    const agente=sheet.getCell('E4');
    agente.font=font;
    agente.value='AGENTE:';

    const mes=sheet.getCell('E5');
    mes.font=font;
    mes.value='MES:';

    const potencia=sheet.getCell('E6');
    potencia.font=font;
    potencia.value='Potencia Nominal Instalada';

    const agenteVal=sheet.getCell('G4');
    agenteVal.font=font;
    agenteVal.value='E.E. AMBATO';

    const mesVal=sheet.getCell('G5');
    mesVal.font=font;
    mesVal.value='JUN_2021';

    const potenciaVal=sheet.getCell('G6');
    potenciaVal.font=font;
    potenciaVal.value='448449';

    const title=sheet.getCell('A7');
    title.font={
      bold:true,
      color: { argb: 'ffffff' }
    };
    title.value='INTERRUPCIONES DEL SERVICIO ELÉCTRICO';

    //Estilo blanco excel
    const abecedario=ABECEDARIO;
    for (let i = 0; i < abecedario.length; i++) {
      sheet.getCell(abecedario[i]+'1').fill={
        type: 'pattern',
        pattern:'solid',
        fgColor: {argb:'ffffff'},
        bgColor:{argb:'ffffff'}
      };
      sheet.getCell(abecedario[i]+'2').fill={
        type: 'pattern',
        pattern:'solid',
        fgColor: {argb:'ffffff'},
        bgColor:{argb:'ffffff'}
      };
      sheet.getCell(abecedario[i]+'3').fill={
        type: 'pattern',
        pattern:'solid',
        fgColor: {argb:'ffffff'},
        bgColor:{argb:'ffffff'}
      };
      sheet.getCell(abecedario[i]+'4').fill={
        type: 'pattern',
        pattern:'solid',
        fgColor: {argb:'ffffff'},
        bgColor:{argb:'ffffff'}
      };
      sheet.getCell(abecedario[i]+'5').fill={
        type: 'pattern',
        pattern:'solid',
        fgColor: {argb:'ffffff'},
        bgColor:{argb:'ffffff'}
      };
      sheet.getCell(abecedario[i]+'6').fill={
        type: 'pattern',
        pattern:'solid',
        fgColor: {argb:'ffffff'},
        bgColor:{argb:'ffffff'}
      };
      sheet.getCell(abecedario[i]+'7').fill={
        type: 'pattern',
        pattern:'solid',
        fgColor: {argb:'143e78'},
        bgColor:{argb:'143e78'}
      };
    }

    const logoId = this._workbook.addImage({
      base64: LOGO,
      extension: 'png',
    });
    const position: ImagePosition = {
      tl: { col: 3, row: 3 },
      ext: { width: 50, height: 50 },
    };

    sheet.addImage(logoId, position);
    // Añadir encabezados
    const headerRow = sheet.getRow(9);
    headerRow.font=font;
    headerRow.values =titulos;

    // Añadir valores de la tabla
    for (let i = 0; i < datos.length; i++) {
     let dataRow=sheet.getRow(10+i);
     dataRow.values=datos[i];
    }

  }
}
