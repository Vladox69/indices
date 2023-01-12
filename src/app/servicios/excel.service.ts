import { Injectable } from '@angular/core';
import * as fs from 'file-saver';
import { ImagePosition, Workbook } from 'exceljs';
import { LOGO } from './logo';
import { ABECEDARIO } from './abecedario';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  private _workbook!: Workbook;
  constructor() {}

  async downloadExcel(titulos: any, datos: any, titulo: any, hoja: any) {
    this._workbook = new Workbook();
    await this.create_sheet(titulos, datos, hoja);
    this._workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, titulo);
    });
  }

  private async create_sheet(titulos: any, datos: any, hoja: any) {
    const sheet = this._workbook.addWorksheet(hoja);

    //Estilo de encabezados
    const font = { bold: true };
    const eeasaCell = sheet.getCell('D1');
    eeasaCell.font = font;
    eeasaCell.value = 'EMPRESA ELÉCTRICA AMBATO REGIONAL CENTRO NORTE S.A';

    const dam1 = sheet.getCell('A2');
    dam1.font = font;
    dam1.value = 'DAMA116 (Víctor Hugo)';

    const dam2 = sheet.getCell('A3');
    dam2.font = font;
    dam2.value = 'DAMA117 (Shopping Ambato)';

    const ingresoTitle = sheet.getCell('E3');
    ingresoTitle.font = font;
    ingresoTitle.value = 'INGRESO DE LAS INTERRUPCIONES DE SERVICIO';

    const agente = sheet.getCell('E4');
    agente.font = font;
    agente.value = 'AGENTE:';

    const mes = sheet.getCell('E5');
    mes.font = font;
    mes.value = 'MES:';

    const potencia = sheet.getCell('E6');
    potencia.font = font;
    potencia.value = 'Potencia Nominal Instalada';

    const agenteVal = sheet.getCell('G4');
    agenteVal.font = font;
    agenteVal.value = 'E.E. AMBATO';

    const mesVal = sheet.getCell('G5');
    mesVal.font = font;
    mesVal.value = 'JUN_2021';

    const potenciaVal = sheet.getCell('G6');
    potenciaVal.font = font;
    potenciaVal.value = '448449';

    const title = sheet.getCell('A7');
    title.font = {
      bold: true,
      color: { argb: 'ffffff' },
    };
    title.value = 'INTERRUPCIONES DEL SERVICIO ELÉCTRICO';

    //Estilo blanco excel
    const abecedario = ABECEDARIO;
    for (let i = 0; i < abecedario.length; i++) {
      sheet.getCell(abecedario[i] + '1').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffffff' },
        bgColor: { argb: 'ffffff' },
      };
      sheet.getCell(abecedario[i] + '2').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffffff' },
        bgColor: { argb: 'ffffff' },
      };
      sheet.getCell(abecedario[i] + '3').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffffff' },
        bgColor: { argb: 'ffffff' },
      };
      sheet.getCell(abecedario[i] + '4').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffffff' },
        bgColor: { argb: 'ffffff' },
      };
      sheet.getCell(abecedario[i] + '5').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffffff' },
        bgColor: { argb: 'ffffff' },
      };
      sheet.getCell(abecedario[i] + '6').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffffff' },
        bgColor: { argb: 'ffffff' },
      };
      sheet.getCell(abecedario[i] + '7').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '143e78' },
        bgColor: { argb: '143e78' },
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
    headerRow.font = font;
    headerRow.values = titulos;

    // Añadir valores de la tabla
    for (let i = 0; i < datos.length; i++) {
      let dataRow = sheet.getRow(10 + i);
      dataRow.values = datos[i];
    }
  }

  async downloadExcelSisdat() {
    this._workbook = new Workbook();
    await this.createSheetSisdat();
    this._workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, 'Sisdat.xlsx');
    });
  }

  private async createSheetSisdat() {
    const sheet = this._workbook.addWorksheet('Calidad Servicio Técnico');

    let font = { bold: true, color: { argb: '969696' } };
    const agenciaRegulacion = sheet.getCell('A2');
    agenciaRegulacion.font = {
      bold: true,
      color: { argb: '000000' },
      size: 15,
    };
    agenciaRegulacion.value =
      'AGENCIA DE REGULACIÓN Y CONTROL DE ELECTRICIDAD - ARCONEL -';

    const sisdat = sheet.getCell('A3');
    sisdat.font = font;
    sisdat.value = 'SISDAT Sistematización de Datos del Sector Eléctrico';

    const agente = sheet.getCell('A4');
    agente.font = font;
    agente.value = 'AGENTE: E.E. AMBATO';

    const formulario = sheet.getCell('A5');
    formulario.font = font;
    formulario.value = 'Formulario CAL-060*';

    const calidadServicio = sheet.getCell('A6');
    calidadServicio.font = { bold: true, color: { argb: 'ffffff' } };
    calidadServicio.value = 'CALIDAD DEL SERVICIO TÉCNICO';

    //Estilo blanco excel
    const abecedario = ABECEDARIO;
    for (let i = 0; i < abecedario.length; i++) {
      for (let j = 0; j < 12; j++) {
        sheet.getCell(abecedario[i] + j).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'ffffff' },
          bgColor: { argb: 'ffffff' },
        };
      }
    }
    for (let i = 0; i < abecedario.length; i++) {
      sheet.getCell(abecedario[i] + '6').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '143e78' },
        bgColor: { argb: '143e78' },
      };
    }

    const anioVal = sheet.getCell('B8');
    anioVal.font = font;
    anioVal.value = '2021';
    anioVal.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const mesVal = sheet.getCell('E8');
    mesVal.font = font;
    mesVal.value = 'Jul';
    mesVal.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    font = { bold: true, color: { argb: '000000' } };

    const anio = sheet.getCell('A8');
    anio.font = font;
    anio.value = 'Año';
    anio.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    anio.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const mes = sheet.getCell('D8');
    mes.font = font;
    mes.value = 'Mes';
    mes.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    mes.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const total = sheet.getCell('D10');
    total.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    total.value = 'Total Red';
    total.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const totalVal = sheet.getCell('E10');
    totalVal.font = font;
    totalVal.value = '448449,0';
    totalVal.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const fFormula = sheet.getCell('F10');
    fFormula.font = font;
    fFormula.value = ' ';
    fFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const gFormula = sheet.getCell('G10');
    gFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    gFormula.value = '-';
    gFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const hFormula = sheet.getCell('H10');
    hFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    hFormula.value = '-';
    hFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const iFormula = sheet.getCell('I10');
    iFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    iFormula.value = '0,2';
    iFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const jFormula = sheet.getCell('J10');
    jFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    jFormula.value = '0,3';
    jFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const kFormula = sheet.getCell('K10');
    kFormula.font = font;
    kFormula.value = '89';
    kFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const lFormula = sheet.getCell('L10');
    lFormula.font = font;
    lFormula.value = '217';
    lFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const mFormula = sheet.getCell('M10');
    mFormula.font = font;
    mFormula.value = '0,0';
    mFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const nFormula = sheet.getCell('N10');
    nFormula.font = font;
    nFormula.value = '0,0';
    nFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const oFormula = sheet.getCell('O10');
    oFormula.font = font;
    oFormula.value = '0,0';
    oFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const pFormula = sheet.getCell('P10');
    pFormula.font = font;
    pFormula.value = '0,0';
    pFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const qFormula = sheet.getCell('Q10');
    qFormula.font = font;
    qFormula.value = '0,0';
    qFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const rFormula = sheet.getCell('R10');
    rFormula.font = font;
    rFormula.value = '0,0';
    rFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const sFormula = sheet.getCell('S10');
    sFormula.font = font;
    sFormula.value = '0,1';
    sFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const tFormula = sheet.getCell('T10');
    tFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    tFormula.value = '-';
    tFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const uFormula = sheet.getCell('U10');
    uFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    uFormula.value = '0,2';
    uFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    const vFormula = sheet.getCell('V10');
    vFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    vFormula.value = '-';
    vFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const wFormula = sheet.getCell('W10');
    wFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    wFormula.value = '0,2';
    wFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const xFormula = sheet.getCell('X10');
    xFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    xFormula.value = '-';
    xFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const yFormula = sheet.getCell('Y10');
    yFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    yFormula.value = '0,2';
    yFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const zFormula = sheet.getCell('Z10');
    zFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    zFormula.value = '-';
    zFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const aaFormula = sheet.getCell('AA10');
    aaFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    aaFormula.value = '-';
    aaFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const abFormula = sheet.getCell('AB10');
    abFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    abFormula.value = '-';
    abFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const acFormula = sheet.getCell('AC10');
    acFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    acFormula.value = '-';
    acFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const adFormula = sheet.getCell('AD10');
    adFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    adFormula.value = '-';
    adFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const aeFormula = sheet.getCell('AE10');
    aeFormula.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '99ccff' },
      bgColor: { argb: '99ccff' },
    };
    aeFormula.value = '-';
    aeFormula.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    //Encabezados
    sheet.mergeCells('A12:A15');
    const fila = sheet.getCell('A12');
    fila.value='Fila';
    fila.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    fila.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    fila.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('B12:B15')
    const subestacion = sheet.getCell('B12');
    subestacion.value='Subestación';
    subestacion.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    subestacion.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    subestacion.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('C12:C15')
    const alimentador = sheet.getCell('C12');
    alimentador.value='Alimentador';
    alimentador.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    alimentador.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    alimentador.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('D12:D15')
    const tipo = sheet.getCell('D12');
    tipo.value='Tipo';
    tipo.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    tipo.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    tipo.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('E12:E15')
    const piKVA = sheet.getCell('E12');
    piKVA.value='Potencia Instalada (KVA)';
    piKVA.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    piKVA.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    piKVA.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };

    sheet.mergeCells('F12:F15')
    const ensKWH = sheet.getCell('F12');
    ensKWH.value='Energía no Suministrada (kWh)';
    ensKWH.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    ensKWH.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    ensKWH.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };

    sheet.mergeCells('G12:H13')
    const indiceMensualFalTal = sheet.getCell('G12');
    indiceMensualFalTal.value='Indice Mensual';
    indiceMensualFalTal.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    indiceMensualFalTal.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    indiceMensualFalTal.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };

    sheet.mergeCells('I12:J13')
    const indiceMensualTTIK_FMIK = sheet.getCell('I12');
    indiceMensualTTIK_FMIK.value='Indice Mensual';
    indiceMensualTTIK_FMIK.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    indiceMensualTTIK_FMIK.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    indiceMensualTTIK_FMIK.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('G14:G15')
    const falIM = sheet.getCell('G14');
    falIM.value='FAL';
    falIM.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    falIM.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    falIM.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('H14:H15')
    const talIM = sheet.getCell('H14');
    talIM.value='TAL';
    talIM.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    talIM.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    talIM.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('I14:I15')
    const fmikIM = sheet.getCell('I14');
    fmikIM.value='FMIK';
    fmikIM.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    fmikIM.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    fmikIM.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('J14:J15')
    const ttikIM = sheet.getCell('J14');
    ttikIM.value='TTIK';
    ttikIM.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    ttikIM.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    ttikIM.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('K12:R12')
    const numeroInterrupciones = sheet.getCell('K12');
    numeroInterrupciones.value='NÚMERO DE INTERRUPCIONES';
    numeroInterrupciones.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    numeroInterrupciones.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    numeroInterrupciones.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('K13:L13')
    const niIternas = sheet.getCell('K13');
    niIternas.value='Internas';
    niIternas.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    niIternas.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    niIternas.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('M13:R13')
    const niExternas = sheet.getCell('M13');
    niExternas.value='Externas';
    niExternas.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    niExternas.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    niExternas.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('K14:K15')
    const inteProgramadas = sheet.getCell('K14');
    inteProgramadas.value='Programadas';
    inteProgramadas.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    inteProgramadas.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    inteProgramadas.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };

    sheet.mergeCells('L14:L15')
    const inteNoProgramadas = sheet.getCell('L14');
    inteNoProgramadas.value='No Programadas';
    inteNoProgramadas.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    inteNoProgramadas.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    inteNoProgramadas.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('M14:M15')
    const exteOtraDistri = sheet.getCell('M14');
    exteOtraDistri.value='Otra distribuidora';
    exteOtraDistri.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    exteOtraDistri.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    exteOtraDistri.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('N14:N15')
    const exteTransmisor = sheet.getCell('N14');
    exteTransmisor.value='Transmisor';
    exteTransmisor.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    exteTransmisor.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    exteTransmisor.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('O14:O15')
    const exteGenerador = sheet.getCell('O14');
    exteGenerador.value='Generador';
    exteGenerador.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    exteGenerador.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    exteGenerador.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('P14:P15')
    const exteResCarga = sheet.getCell('P14');
    exteResCarga.value='Restricción de carga';
    exteResCarga.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    exteResCarga.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    exteResCarga.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('Q14:Q15')
    const exteBajaFrec = sheet.getCell('Q14');
    exteBajaFrec.value='Baja frecuencia';
    exteBajaFrec.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    exteBajaFrec.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    exteBajaFrec.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('R14:R15')
    const exteOtras = sheet.getCell('R14');
    exteOtras.value='Otras';
    exteOtras.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    exteOtras.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    exteOtras.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('S12:AD12')
    const desgloseIndicadores = sheet.getCell('S12');
    desgloseIndicadores.value='DESGLOSE DE LOS INDICADORES';
    desgloseIndicadores.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desgloseIndicadores.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desgloseIndicadores.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('S13:Z13')
    const desIndInternos = sheet.getCell('S13');
    desIndInternos.value='Internos';
    desIndInternos.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndInternos.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndInternos.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('AA13:AD13')
    const desIndExternos = sheet.getCell('AA13');
    desIndExternos.value='Externos';
    desIndExternos.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndExternos.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndExternos.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('S14:V14')
    const desIndIntProgramados = sheet.getCell('S14');
    desIndIntProgramados.value='Programadas';
    desIndIntProgramados.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndIntProgramados.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndIntProgramados.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('W14:Z14')
    const desIndIntNoProgramados = sheet.getCell('W14');
    desIndIntNoProgramados.value='No Programadas';
    desIndIntNoProgramados.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndIntNoProgramados.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndIntNoProgramados.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('AA14:AD14')
    const desIndExtTransmisor = sheet.getCell('AA14');
    desIndExtTransmisor.value='Transmisor';
    desIndExtTransmisor.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndExtTransmisor.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndExtTransmisor.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('AE12:AE15')
    const observacion = sheet.getCell('AE12');
    observacion.value='Observaciones';
    observacion.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    observacion.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    observacion.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntProFMIK = sheet.getCell('S15');
    desIndIntProFMIK.value='FMIK';
    desIndIntProFMIK.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndIntProFMIK.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndIntProFMIK.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntProFAL = sheet.getCell('T15');
    desIndIntProFAL.value='FAL';
    desIndIntProFAL.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndIntProFAL.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndIntProFAL.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntProTTIK = sheet.getCell('U15');
    desIndIntProTTIK.value='TTIK';
    desIndIntProTTIK.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndIntProTTIK.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndIntProTTIK.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntProTAL = sheet.getCell('V15');
    desIndIntProTAL.value='TAL';
    desIndIntProTAL.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndIntProTAL.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndIntProTAL.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntNProFMIK = sheet.getCell('W15');
    desIndIntNProFMIK.value='FMIK';
    desIndIntNProFMIK.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndIntNProFMIK.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndIntNProFMIK.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntNProFAL = sheet.getCell('X15');
    desIndIntNProFAL.value='FAL';
    desIndIntNProFAL.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndIntNProFAL.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndIntNProFAL.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntNProTTIK = sheet.getCell('Y15');
    desIndIntNProTTIK.value='TTIK';
    desIndIntNProTTIK.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndIntNProTTIK.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndIntNProTTIK.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntNProTAL = sheet.getCell('Z15');
    desIndIntNProTAL.value='TAL';
    desIndIntNProTAL.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndIntNProTAL.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndIntNProTAL.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndExtTransFMIK = sheet.getCell('AA15');
    desIndExtTransFMIK.value='FMIK';
    desIndExtTransFMIK.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndExtTransFMIK.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndExtTransFMIK.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndExtTransFAL = sheet.getCell('AB15');
    desIndExtTransFAL.value='FAL';
    desIndExtTransFAL.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndExtTransFAL.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndExtTransFAL.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndExtTransTTIK = sheet.getCell('AC15');
    desIndExtTransTTIK.value='TTIK';
    desIndExtTransTTIK.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndExtTransTTIK.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndExtTransTTIK.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndExtTransTAL = sheet.getCell('AD15');
    desIndExtTransTAL.value='TAL';
    desIndExtTransTAL.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    desIndExtTransTAL.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd0d8e4' },
      bgColor: { argb: 'd0d8e4' },
    };
    desIndExtTransTAL.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };




  }


  
}
