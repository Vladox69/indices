import { Injectable } from '@angular/core';
import * as fs from 'file-saver';
import { Alignment, Borders, Fill, ImagePosition, Workbook } from 'exceljs';
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

  async downloadExcelSisdat(titulo:any,hoja:any,datos:any) {
    this._workbook = new Workbook();
    await this.createSheetSisdat(hoja,datos);
    this._workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, titulo);
    });
  }

  private async createSheetSisdat(hoja:any,datos:any) {
    const sheet = this._workbook.addWorksheet(hoja);

    let font = { bold: true, color: { argb: '969696' } };
    let font15 ={ bold: true,color: { argb: '000000' },size: 15,};/** fuente negrita y tamaño 15 */
    let fontWhite={bold: true,color: { argb: 'FFFFFF' }};/**fuente con color blanco */
    let fillBlanco: Fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'ffffff' },bgColor: { argb: 'ffffff' },};/** fondo blanco de la celda */
    let fillAzul:Fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: '143e78' },bgColor: { argb: '143e78' },}; /** fondo azul de la celda */
    let fillGris:Fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'd0d8e4' },bgColor: { argb: 'd0d8e4' },}; /** fondo gris de la celda */
    let fillCeleste:Fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: '99ccff' },bgColor: { argb: '99ccff' },}; /** fondo celeste de la celda */
    let allBorder:Partial<Borders>={top: { style: 'thin' },left: { style: 'thin' },bottom: { style: 'thin' },right: { style: 'thin' },}; /** Borde tipo tabla */

    const agenciaRegulacion = sheet.getCell('A2');
    agenciaRegulacion.font = font15;
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
    calidadServicio.font = fontWhite;
    calidadServicio.value = 'CALIDAD DEL SERVICIO TÉCNICO';

    //Estilo blanco excel
    const abecedario = ABECEDARIO;
    for (let i = 0; i < abecedario.length; i++) {
      for (let j = 0; j < 12; j++) {
        sheet.getCell(abecedario[i] + j).fill = fillBlanco;
      }
    }
    for (let i = 0; i < abecedario.length; i++) {
      sheet.getCell(abecedario[i] + '6').fill = fillAzul;
    }

    const anioVal = sheet.getCell('B8');
    anioVal.font = font;
    anioVal.value = '2021';
    anioVal.border = allBorder;

    const mesVal = sheet.getCell('E8');
    mesVal.font = font;
    mesVal.value = 'Jul';
    mesVal.border = allBorder

    font = { bold: true, color: { argb: '000000' } };

    const anio = sheet.getCell('A8');
    anio.font = font;
    anio.value = 'Año';
    anio.fill = fillGris;
    anio.border = allBorder;

    const mes = sheet.getCell('D8');
    mes.font = font;
    mes.value = 'Mes';
    mes.fill = fillGris;
    mes.border = allBorder;

    const total = sheet.getCell('D10');
    total.fill = fillCeleste;
    total.value = 'Total Red';
    total.border = allBorder;

    const totalVal = sheet.getCell('E10');
    totalVal.font = font;
    totalVal.value = '448449,0';
    totalVal.border = allBorder;

    const fFormula = sheet.getCell('F10');
    fFormula.font = font;
    fFormula.value = ' ';
    fFormula.border = allBorder;

    const gFormula = sheet.getCell('G10');
    gFormula.fill = fillCeleste;
    gFormula.value = '-';
    gFormula.border = allBorder;

    const hFormula = sheet.getCell('H10');
    hFormula.fill = fillCeleste;
    hFormula.value = '-';
    hFormula.border = allBorder;

    const iFormula = sheet.getCell('I10');
    iFormula.fill = fillCeleste;
    iFormula.value = '0,2';
    iFormula.border = allBorder;

    const jFormula = sheet.getCell('J10');
    jFormula.fill = fillCeleste;
    jFormula.value = '0,3';
    jFormula.border = allBorder;

    const kFormula = sheet.getCell('K10');
    kFormula.font = font;
    kFormula.value = '89';
    kFormula.border = allBorder;

    const lFormula = sheet.getCell('L10');
    lFormula.font = font;
    lFormula.value = '217';
    lFormula.border = allBorder;

    const mFormula = sheet.getCell('M10');
    mFormula.font = font;
    mFormula.value = '0,0';
    mFormula.border = allBorder;

    const nFormula = sheet.getCell('N10');
    nFormula.font = font;
    nFormula.value = '0,0';
    nFormula.border = allBorder;

    const oFormula = sheet.getCell('O10');
    oFormula.font = font;
    oFormula.value = '0,0';
    oFormula.border = allBorder;

    const pFormula = sheet.getCell('P10');
    pFormula.font = font;
    pFormula.value = '0,0';
    pFormula.border = allBorder;

    const qFormula = sheet.getCell('Q10');
    qFormula.font = font;
    qFormula.value = '0,0';
    qFormula.border = allBorder;

    const rFormula = sheet.getCell('R10');
    rFormula.font = font;
    rFormula.value = '0,0';
    rFormula.border = allBorder;

    const sFormula = sheet.getCell('S10');
    sFormula.font = font;
    sFormula.value = '0,1';
    sFormula.border = allBorder;

    const tFormula = sheet.getCell('T10');
    tFormula.fill = fillCeleste;
    tFormula.value = '-';
    tFormula.border = allBorder;

    const uFormula = sheet.getCell('U10');
    uFormula.fill = fillCeleste;
    uFormula.value = '0,2';
    uFormula.border = allBorder;
    const vFormula = sheet.getCell('V10');
    vFormula.fill = fillCeleste;
    vFormula.value = '-';
    vFormula.border = allBorder;

    const wFormula = sheet.getCell('W10');
    wFormula.fill = fillCeleste;
    wFormula.value = '0,2';
    wFormula.border = allBorder;

    const xFormula = sheet.getCell('X10');
    xFormula.fill = fillCeleste;
    xFormula.value = '-';
    xFormula.border = allBorder;

    const yFormula = sheet.getCell('Y10');
    yFormula.fill = fillCeleste;
    yFormula.value = '0,2';
    yFormula.border = allBorder;

    const zFormula = sheet.getCell('Z10');
    zFormula.fill = fillCeleste;
    zFormula.value = '-';
    zFormula.border = allBorder;

    const aaFormula = sheet.getCell('AA10');
    aaFormula.fill = fillCeleste;
    aaFormula.value = '-';
    aaFormula.border = allBorder;

    const abFormula = sheet.getCell('AB10');
    abFormula.fill = fillCeleste;
    abFormula.value = '-';
    abFormula.border = allBorder;

    const acFormula = sheet.getCell('AC10');
    acFormula.fill = fillCeleste;
    acFormula.value = '-';
    acFormula.border = allBorder;

    const adFormula = sheet.getCell('AD10');
    adFormula.fill = fillCeleste;
    adFormula.value = '-';
    adFormula.border = allBorder;

    const aeFormula = sheet.getCell('AE10');
    aeFormula.fill = fillCeleste;
    aeFormula.value = '-';
    aeFormula.border = allBorder;

    //Encabezados
    sheet.mergeCells('A12:A15');
    const fila = sheet.getCell('A12');
    fila.value='Fila';
    fila.border = allBorder;
    fila.fill = fillGris;
    fila.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('B12:B15')
    const subestacion = sheet.getCell('B12');
    subestacion.value='Subestación';
    subestacion.border = allBorder;
    subestacion.fill = fillGris;
    subestacion.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('C12:C15')
    const alimentador = sheet.getCell('C12');
    alimentador.value='Alimentador';
    alimentador.border = allBorder;
    alimentador.fill = fillGris;
    alimentador.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('D12:D15')
    const tipo = sheet.getCell('D12');
    tipo.value='Tipo';
    tipo.border = allBorder;
    tipo.fill = fillGris;
    tipo.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('E12:E15')
    const piKVA = sheet.getCell('E12');
    piKVA.value='Potencia Instalada (KVA)';
    piKVA.border = allBorder;
    piKVA.fill = fillGris;
    piKVA.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };

    sheet.mergeCells('F12:F15')
    const ensKWH = sheet.getCell('F12');
    ensKWH.value='Energía no Suministrada (kWh)';
    ensKWH.border = allBorder;
    ensKWH.fill = fillGris;
    ensKWH.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };

    sheet.mergeCells('G12:H13')
    const indiceMensualFalTal = sheet.getCell('G12');
    indiceMensualFalTal.value='Indice Mensual';
    indiceMensualFalTal.border = allBorder;
    indiceMensualFalTal.fill = fillGris;
    indiceMensualFalTal.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };

    sheet.mergeCells('I12:J13')
    const indiceMensualTTIK_FMIK = sheet.getCell('I12');
    indiceMensualTTIK_FMIK.value='Indice Mensual';
    indiceMensualTTIK_FMIK.border = allBorder;
    indiceMensualTTIK_FMIK.fill = fillGris;
    indiceMensualTTIK_FMIK.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('G14:G15')
    const falIM = sheet.getCell('G14');
    falIM.value='FAL';
    falIM.border = allBorder;
    falIM.fill = fillGris;
    falIM.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('H14:H15')
    const talIM = sheet.getCell('H14');
    talIM.value='TAL';
    talIM.border = allBorder;
    talIM.fill = fillGris;
    talIM.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('I14:I15')
    const fmikIM = sheet.getCell('I14');
    fmikIM.value='FMIK';
    fmikIM.border = allBorder;
    fmikIM.fill = fillGris;
    fmikIM.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('J14:J15')
    const ttikIM = sheet.getCell('J14');
    ttikIM.value='TTIK';
    ttikIM.border = allBorder;
    ttikIM.fill = fillGris;
    ttikIM.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('K12:R12')
    const numeroInterrupciones = sheet.getCell('K12');
    numeroInterrupciones.value='NÚMERO DE INTERRUPCIONES';
    numeroInterrupciones.border = allBorder;
    numeroInterrupciones.fill = fillGris;
    numeroInterrupciones.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('K13:L13')
    const niIternas = sheet.getCell('K13');
    niIternas.value='Internas';
    niIternas.border = allBorder;
    niIternas.fill = fillGris;
    niIternas.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('M13:R13')
    const niExternas = sheet.getCell('M13');
    niExternas.value='Externas';
    niExternas.border = allBorder;
    niExternas.fill = fillGris;
    niExternas.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('K14:K15')
    const inteProgramadas = sheet.getCell('K14');
    inteProgramadas.value='Programadas';
    inteProgramadas.border = allBorder;
    inteProgramadas.fill = fillGris;
    inteProgramadas.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };

    sheet.mergeCells('L14:L15')
    const inteNoProgramadas = sheet.getCell('L14');
    inteNoProgramadas.value='No Programadas';
    inteNoProgramadas.border = allBorder;
    inteNoProgramadas.fill = fillGris;
    inteNoProgramadas.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('M14:M15')
    const exteOtraDistri = sheet.getCell('M14');
    exteOtraDistri.value='Otra distribuidora';
    exteOtraDistri.border = allBorder;
    exteOtraDistri.fill = fillGris;
    exteOtraDistri.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('N14:N15')
    const exteTransmisor = sheet.getCell('N14');
    exteTransmisor.value='Transmisor';
    exteTransmisor.border = allBorder;
    exteTransmisor.fill = fillGris;
    exteTransmisor.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('O14:O15')
    const exteGenerador = sheet.getCell('O14');
    exteGenerador.value='Generador';
    exteGenerador.border = allBorder;
    exteGenerador.fill = fillGris;
    exteGenerador.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('P14:P15')
    const exteResCarga = sheet.getCell('P14');
    exteResCarga.value='Restricción de carga';
    exteResCarga.border = allBorder;
    exteResCarga.fill = fillGris;
    exteResCarga.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('Q14:Q15')
    const exteBajaFrec = sheet.getCell('Q14');
    exteBajaFrec.value='Baja frecuencia';
    exteBajaFrec.border = allBorder;
    exteBajaFrec.fill = fillGris;
    exteBajaFrec.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('R14:R15')
    const exteOtras = sheet.getCell('R14');
    exteOtras.value='Otras';
    exteOtras.border = allBorder;
    exteOtras.fill = fillGris;
    exteOtras.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('S12:AD12')
    const desgloseIndicadores = sheet.getCell('S12');
    desgloseIndicadores.value='DESGLOSE DE LOS INDICADORES';
    desgloseIndicadores.border = allBorder;
    desgloseIndicadores.fill = fillGris;
    desgloseIndicadores.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('S13:Z13')
    const desIndInternos = sheet.getCell('S13');
    desIndInternos.value='Internos';
    desIndInternos.border = allBorder;
    desIndInternos.fill = fillGris;
    desIndInternos.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('AA13:AD13')
    const desIndExternos = sheet.getCell('AA13');
    desIndExternos.value='Externos';
    desIndExternos.border = allBorder;
    desIndExternos.fill = fillGris;
    desIndExternos.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('S14:V14')
    const desIndIntProgramados = sheet.getCell('S14');
    desIndIntProgramados.value='Programadas';
    desIndIntProgramados.border = allBorder;
    desIndIntProgramados.fill = fillGris;
    desIndIntProgramados.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('W14:Z14')
    const desIndIntNoProgramados = sheet.getCell('W14');
    desIndIntNoProgramados.value='No Programadas';
    desIndIntNoProgramados.border = allBorder;
    desIndIntNoProgramados.fill = fillGris;
    desIndIntNoProgramados.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('AA14:AD14')
    const desIndExtTransmisor = sheet.getCell('AA14');
    desIndExtTransmisor.value='Transmisor';
    desIndExtTransmisor.border = allBorder;
    desIndExtTransmisor.fill = fillGris;
    desIndExtTransmisor.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    sheet.mergeCells('AE12:AE15')
    const observacion = sheet.getCell('AE12');
    observacion.value='Observaciones';
    observacion.border = allBorder;
    observacion.fill = fillGris;
    observacion.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntProFMIK = sheet.getCell('S15');
    desIndIntProFMIK.value='FMIK';
    desIndIntProFMIK.border = allBorder;
    desIndIntProFMIK.fill = fillGris;
    desIndIntProFMIK.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntProFAL = sheet.getCell('T15');
    desIndIntProFAL.value='FAL';
    desIndIntProFAL.border = allBorder;
    desIndIntProFAL.fill = fillGris;
    desIndIntProFAL.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntProTTIK = sheet.getCell('U15');
    desIndIntProTTIK.value='TTIK';
    desIndIntProTTIK.border = allBorder;
    desIndIntProTTIK.fill = fillGris;
    desIndIntProTTIK.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntProTAL = sheet.getCell('V15');
    desIndIntProTAL.value='TAL';
    desIndIntProTAL.border = allBorder;
    desIndIntProTAL.fill = fillGris;
    desIndIntProTAL.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntNProFMIK = sheet.getCell('W15');
    desIndIntNProFMIK.value='FMIK';
    desIndIntNProFMIK.border = allBorder;
    desIndIntNProFMIK.fill = fillGris;
    desIndIntNProFMIK.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntNProFAL = sheet.getCell('X15');
    desIndIntNProFAL.value='FAL';
    desIndIntNProFAL.border = allBorder;
    desIndIntNProFAL.fill = fillGris;
    desIndIntNProFAL.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntNProTTIK = sheet.getCell('Y15');
    desIndIntNProTTIK.value='TTIK';
    desIndIntNProTTIK.border = allBorder;
    desIndIntNProTTIK.fill = fillGris;
    desIndIntNProTTIK.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndIntNProTAL = sheet.getCell('Z15');
    desIndIntNProTAL.value='TAL';
    desIndIntNProTAL.border = allBorder;
    desIndIntNProTAL.fill = fillGris;
    desIndIntNProTAL.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndExtTransFMIK = sheet.getCell('AA15');
    desIndExtTransFMIK.value='FMIK';
    desIndExtTransFMIK.border = allBorder;
    desIndExtTransFMIK.fill = fillGris;
    desIndExtTransFMIK.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndExtTransFAL = sheet.getCell('AB15');
    desIndExtTransFAL.value='FAL';
    desIndExtTransFAL.border = allBorder;
    desIndExtTransFAL.fill = fillGris;
    desIndExtTransFAL.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndExtTransTTIK = sheet.getCell('AC15');
    desIndExtTransTTIK.value='TTIK';
    desIndExtTransTTIK.border = allBorder;
    desIndExtTransTTIK.fill = fillGris;
    desIndExtTransTTIK.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };


    const desIndExtTransTAL = sheet.getCell('AD15');
    desIndExtTransTAL.value='TAL';
    desIndExtTransTAL.border = allBorder;
    desIndExtTransTAL.fill = fillGris;
    desIndExtTransTAL.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };

    for (let i = 0; i < datos.length; i++) {
      let dataRow = sheet.getRow(17 + i);
      dataRow.values = datos[i];
      for (let j = 0; j < 31; j++) {
        const rowStyle=sheet.getCell(abecedario[j]+(17+i));
        rowStyle.border = allBorder;        
      }
    }

    for (let i = 0; i < datos.length; i++) {
      const celesteCellG = sheet.getCell('G'+(17+i));
      celesteCellG.fill = fillCeleste;
      
      const celesteCellH = sheet.getCell('H'+(17+i));
      celesteCellH.fill = fillCeleste;

      const celesteCellI = sheet.getCell('I'+(17+i));
      celesteCellI.fill = fillCeleste;

      const celesteCellJ = sheet.getCell('J'+(17+i));
      celesteCellJ.fill = fillCeleste;
    }


  }

  async downloadExcelCal060(titulo:any,hoja:any,datos:any) {
    this._workbook = new Workbook();
    await this.createSheetCal060(hoja,datos);
    this._workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, titulo);
    });
  } 


  private async createSheetCal060(hoja:any,datos:any) {
    const sheet = this._workbook.addWorksheet(hoja);

    let font = { bold: true };/** fuente con negrita */
    let font15 ={ bold: true,color: { argb: '000000' },size: 15,};/** fuente negrita y tamaño 15 */
    let fontWhite={bold: true,color: { argb: 'FFFFFF' }};/**fuente con color blanco */
    let fillBlanco: Fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'ffffff' },bgColor: { argb: 'ffffff' },};/** fondo blanco de la celda */
    let fillAzul:Fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: '143e78' },bgColor: { argb: '143e78' },}; /** fondo azul de la celda */
    let allBorder:Partial<Borders>={top: { style: 'thin' },left: { style: 'thin' },bottom: { style: 'thin' },right: { style: 'thin' },}; /** Borde tipo tabla */
    let fillCeleste:Fill ={type: 'pattern',pattern: 'solid',fgColor: { argb: '8db4e2' },bgColor: { argb: '8db4e2' },};/**fondo celeste de la celda */
    let fillPiel:Fill ={type: 'pattern',pattern: 'solid',fgColor: { argb: 'fcd5b4' },bgColor: { argb: 'fcd5b4' },};/**fondo piel de la celda */
    let fillGris:Fill ={type: 'pattern',pattern: 'solid',fgColor: { argb: 'f2f2f2' },bgColor: { argb: 'f2f2f2' },};/**fondo piel de la celda */
    let fillAzulPalido:Fill ={type: 'pattern',pattern: 'solid',fgColor: { argb: 'daeef3' },bgColor: { argb: 'daeef3' },};/**fondo piel de la celda */
    let fillVerde:Fill ={type: 'pattern',pattern: 'solid',fgColor: { argb: 'c4d79b' },bgColor: { argb: 'c4d79b' },};
    let aligmentTitulos:Partial<Alignment>={ vertical: 'middle', horizontal: 'center',wrapText: true };

    const agenciaRegulacion = sheet.getCell('A1');
    agenciaRegulacion.font = font15;
    agenciaRegulacion.value ='AGENCIA DE REGULACIÓN Y CONTROL DE ELECTRICIDAD - ARCONEL -';

    const formCal060 = sheet.getCell('A3');
    formCal060.font = font;
    formCal060.value = 'FORMULARIO CAL 060 AMPLIADO';

    
    const agente = sheet.getCell('A4');
    agente.font = font;
    agente.value = 'AGENTE:';

    const agenteVal = sheet.getCell('D4');
    agenteVal.value = 'EE. AMBATO';


    const mes = sheet.getCell('A5');
    mes.font=font;
    mes.value = 'MES:';

    const mesVal = sheet.getCell('D5');
    mesVal.value = 'junio';

    
    const potenciaNominal = sheet.getCell('A6');
    potenciaNominal.font = font;
    potenciaNominal.value = 'Potencia Nominal Instalada Distribuidora (kVA).';

    const potenciaNominalVal = sheet.getCell('D6');
    potenciaNominalVal.value = '448449,00';

    const intSerElectronico = sheet.getCell('A7');
    intSerElectronico.font=fontWhite;
    intSerElectronico.value = 'INTERRUPCIONES DEL SERVICIO ELÉCTRICO';

    const totalRed = sheet.getCell('AM8');
    totalRed.value = 'TOTAL DE RED';

    const formulaAN = sheet.getCell('AN8');
    formulaAN.value = '0,000';

    const formulaAO = sheet.getCell('AO8');
    formulaAO.value = '0,000';

    

    const abecedario = ABECEDARIO;
    for (let i = 0; i < abecedario.length; i++) {
      sheet.getCell(abecedario[i] + '1').fill = fillBlanco;
      sheet.getCell(abecedario[i] + '2').fill =fillBlanco;
      sheet.getCell(abecedario[i] + '3').fill =fillBlanco;
      sheet.getCell(abecedario[i] + '4').fill = fillBlanco;
      sheet.getCell(abecedario[i] + '5').fill = fillBlanco;
      sheet.getCell(abecedario[i] + '6').fill = fillBlanco;
      sheet.getCell(abecedario[i] + '7').fill = fillAzul;
    }

    /** Primer segmento */
    sheet.mergeCells('A9:A11');
    const fila = sheet.getCell('A9');
    fila.value='Fila';
    fila.border = allBorder;
    fila.fill = fillCeleste;
    fila.alignment = aligmentTitulos;

    sheet.mergeCells('B9:B11');
    const distribuidora = sheet.getCell('B9');
    distribuidora.value='Distribuidora';
    distribuidora.border = allBorder;
    distribuidora.fill = fillCeleste;
    distribuidora.alignment = aligmentTitulos;

    sheet.mergeCells('C9:C11');
    const codInterrupcion = sheet.getCell('C9');
    codInterrupcion.value='Código de Interrupción';
    codInterrupcion.border = allBorder;
    codInterrupcion.fill = fillCeleste;
    codInterrupcion.alignment = aligmentTitulos;

    sheet.mergeCells('D9:D11');
    const indicadorMF = sheet.getCell('D9');
    indicadorMF.value='Indicador de Mantenimiento  o falla';
    indicadorMF.border = allBorder;
    indicadorMF.fill = fillCeleste;
    indicadorMF.alignment = aligmentTitulos;

    /** Segundo segmento */
    sheet.mergeCells('E9:M9');
    const ubiFalla = sheet.getCell('E9');
    ubiFalla.value='UBICACIÓN DE LA FALLA';
    ubiFalla.border = allBorder;
    ubiFalla.fill = fillPiel;
    ubiFalla.alignment = aligmentTitulos;

    sheet.mergeCells('E10:E11');
    const etapaFuncional = sheet.getCell('E10');
    etapaFuncional.value='Etapa funcional en la que se presentó la falla';
    etapaFuncional.border = allBorder;
    etapaFuncional.fill = fillPiel;
    etapaFuncional.alignment = aligmentTitulos;

    sheet.mergeCells('F10:F11');
    const instalacionEquipo = sheet.getCell('F10');
    instalacionEquipo.value='Instalación / Equipo donde se presentó la falla';
    instalacionEquipo.border = allBorder;
    instalacionEquipo.fill = fillPiel;
    instalacionEquipo.alignment = aligmentTitulos;

    sheet.mergeCells('G10:G11');
    const provincia = sheet.getCell('G10');
    provincia.value='Provincia';
    provincia.border = allBorder;
    provincia.fill = fillPiel;
    provincia.alignment = aligmentTitulos;

    sheet.mergeCells('H10:H11');
    const canton = sheet.getCell('H10');
    canton.value='Cantón';
    canton.border = allBorder;
    canton.fill = fillPiel;
    canton.alignment = aligmentTitulos;

    sheet.mergeCells('I10:I11');
    const sector = sheet.getCell('I10');
    sector.value='Sector';
    sector.border = allBorder;
    sector.fill = fillPiel;
    sector.alignment = aligmentTitulos;

    sheet.mergeCells('J10:J11');
    const ubiEstFalla = sheet.getCell('J10');
    ubiEstFalla.value='Ubicación Estimada de la Falla';
    ubiEstFalla.border = allBorder;
    ubiEstFalla.fill = fillPiel;
    ubiEstFalla.alignment = aligmentTitulos;

    sheet.mergeCells('K10:K11');
    const propiedad = sheet.getCell('K10');
    propiedad.value='Propiedad de la Instalación / Equipo donde se presentó la falla';
    propiedad.border = allBorder;
    propiedad.fill = fillPiel;
    propiedad.alignment = aligmentTitulos;

    sheet.mergeCells('L10:L11');
    const proteccion = sheet.getCell('L10');
    proteccion.value='Protección que Operó';
    proteccion.border = allBorder;
    proteccion.fill = fillPiel;
    proteccion.alignment = aligmentTitulos;

    sheet.mergeCells('M10:M11');
    const tipoProteccion = sheet.getCell('M10');
    tipoProteccion.value='Tipo de protección que actuó';
    tipoProteccion.border = allBorder;
    tipoProteccion.fill = fillPiel;
    tipoProteccion.alignment = aligmentTitulos;

    /** Tercer segmento */
    sheet.mergeCells('N9:R9');
    const ubiInte = sheet.getCell('N9');
    ubiInte.value='UBICACIÓN DE LA INTERRUPCIÓN DE SERVICIO ELÉCTRICO';
    ubiInte.border = allBorder;
    ubiInte.fill = fillGris;
    ubiInte.alignment = aligmentTitulos;

    sheet.mergeCells('N10:N11');
    const etaFunInte = sheet.getCell('N10');
    etaFunInte.value='Etapa funcional en la que se presentó la interrupción de servicio';
    etaFunInte.border = allBorder;
    etaFunInte.fill = fillGris;
    etaFunInte.alignment = aligmentTitulos;

    sheet.mergeCells('O10:O11');
    const instEquiInte = sheet.getCell('O10');
    instEquiInte.value='Instalación / Equipo donde se presentó la interrupción de servicio';
    instEquiInte.border = allBorder;
    instEquiInte.fill = fillGris;
    instEquiInte.alignment = aligmentTitulos;

    sheet.mergeCells('P10:P11');
    const provInte = sheet.getCell('P10');
    provInte.value='Provincia';
    provInte.border = allBorder;
    provInte.fill = fillGris;
    provInte.alignment = aligmentTitulos;

    sheet.mergeCells('Q10:Q11');
    const cantInte = sheet.getCell('Q10');
    cantInte.value='Cantón';
    cantInte.border = allBorder;
    cantInte.fill = fillGris;
    cantInte.alignment = aligmentTitulos;

    sheet.mergeCells('R10:R11');
    const sectInte = sheet.getCell('R10');
    sectInte.value='Sector';
    sectInte.border = allBorder;
    sectInte.fill = fillGris;
    sectInte.alignment = aligmentTitulos;

    /**Cuarto segmento */
    sheet.mergeCells('S9:W9');
    const detAli = sheet.getCell('S9');
    detAli.value='DETALLE DEL ALIMENTADOR AFECTADO';
    detAli.border = allBorder;
    detAli.fill = fillAzulPalido;
    detAli.alignment = aligmentTitulos;

    sheet.mergeCells('S10:S11');
    const linSubt = sheet.getCell('S10');
    linSubt.value='Línea de Subtransmisión';
    linSubt.border = allBorder;
    linSubt.fill = fillAzulPalido;
    linSubt.alignment = aligmentTitulos;

    sheet.mergeCells('T10:T11');
    const sbest = sheet.getCell('T10');
    sbest.value='Subestación';
    sbest.border = allBorder;
    sbest.fill = fillAzulPalido;
    sbest.alignment = aligmentTitulos;

    sheet.mergeCells('U10:U11');
    const aliPrim = sheet.getCell('U10');
    aliPrim.value='Alimentador primario';
    aliPrim.border = allBorder;
    aliPrim.fill = fillAzulPalido;
    aliPrim.alignment = aligmentTitulos;

    sheet.mergeCells('V10:V11');
    const tipAliPrim = sheet.getCell('V10');
    tipAliPrim.value='Tipo de Alimentador primario';
    tipAliPrim.border = allBorder;
    tipAliPrim.fill = fillAzulPalido;
    tipAliPrim.alignment = aligmentTitulos;

    sheet.mergeCells('W10:W11');
    const invTen = sheet.getCell('W10');
    invTen.value='Nivel de Tensión(kV)';
    invTen.border = allBorder;
    invTen.fill = fillAzulPalido;
    invTen.alignment = aligmentTitulos;

     /**Quinto segmento */
     sheet.mergeCells('X9:AM9');
     const profInte = sheet.getCell('X9');
     profInte.value='PROFUNDIDAD DE LA INTERRUPCIÓN DE SERVICIO';
     profInte.border = allBorder;
     profInte.fill = fillVerde;
     profInte.alignment = aligmentTitulos;

     sheet.mergeCells('X10:X11');
     const profNivInte = sheet.getCell('X10');
     profNivInte.value='Nivel de afectación de la interrupción a la Red';
     profNivInte.border = allBorder;
     profNivInte.fill = fillVerde;
     profNivInte.alignment = aligmentTitulos;

     sheet.mergeCells('Y10:Y11');
     const oriInte = sheet.getCell('Y10');
     oriInte.value='Origen de Interrupción';
     oriInte.border = allBorder;
     oriInte.fill = fillVerde;
     oriInte.alignment = aligmentTitulos;

     sheet.mergeCells('Z10:Z11');
     const cauInte = sheet.getCell('Z10');
     cauInte.value='Causa de Interrupción';
     cauInte.border = allBorder;
     cauInte.fill = fillVerde;
     cauInte.alignment = aligmentTitulos;

     sheet.mergeCells('AA10:AA11');
     const catInte = sheet.getCell('AA10');
     catInte.value='Catálogo de Interrupciones';
     catInte.border = allBorder;
     catInte.fill = fillVerde;
     catInte.alignment = aligmentTitulos;

     sheet.mergeCells('AB10:AB11');
     const descInte = sheet.getCell('AB10');
     descInte.value='Descripción de Interrupción';
     descInte.border = allBorder;
     descInte.fill = fillVerde;
     descInte.alignment = aligmentTitulos;

     sheet.mergeCells('AC10:AC11');
     const potNomInsAli = sheet.getCell('AC10');
     potNomInsAli.value='Potencia Nominal Instalada del Alimentador (kVA)';
     potNomInsAli.border = allBorder;
     potNomInsAli.fill = fillVerde;
     potNomInsAli.alignment = aligmentTitulos;

     sheet.mergeCells('AD10:AD11');
     const potNomFS = sheet.getCell('AD10');
     potNomFS.value='Potencia  Nominal Fuera de Servicio (kVA)';
     potNomFS.border = allBorder;
     potNomFS.fill = fillVerde;
     potNomFS.alignment = aligmentTitulos;

     sheet.mergeCells('AE10:AE11');
     const potNomFSMW = sheet.getCell('AE10');
     potNomFSMW.value='Potencia  Nominal Fuera de Servicio (MW)';
     potNomFSMW.border = allBorder;
     potNomFSMW.fill = fillVerde;
     potNomFSMW.alignment = aligmentTitulos;

     sheet.mergeCells('AF10:AF11');
     const carFueSer = sheet.getCell('AF10');
     carFueSer.value='Carga Fuera de Servicio (kVA)';
     carFueSer.border = allBorder;
     carFueSer.fill = fillVerde;
     carFueSer.alignment = aligmentTitulos;

     sheet.mergeCells('AG10:AG11');
     const eneNoSum = sheet.getCell('AG10');
     eneNoSum.value='Energía No Suminstrada (MWh)';
     eneNoSum.border = allBorder;
     eneNoSum.fill = fillVerde;
     eneNoSum.alignment = aligmentTitulos;

     sheet.mergeCells('AH10:AH11');
     const fecIniInte = sheet.getCell('AH10');
     fecIniInte.value='Fecha Inicio de Interrupción (dd:mm:ay)';
     fecIniInte.border = allBorder;
     fecIniInte.fill = fillVerde;
     fecIniInte.alignment = aligmentTitulos;

     sheet.mergeCells('AI10:AI11');
     const horaIniInte = sheet.getCell('AI10');
     horaIniInte.value='Hora Inicio de Interrupción (hh:mm)';
     horaIniInte.border = allBorder;
     horaIniInte.fill = fillVerde;
     horaIniInte.alignment = aligmentTitulos;

     sheet.mergeCells('AJ10:AJ11');
     const fecFinInte = sheet.getCell('AJ10');
     fecFinInte.value='Fecha Fin de Interrupción (dd:mm:ay)';
     fecFinInte.border = allBorder;
     fecFinInte.fill = fillVerde;
     fecFinInte.alignment = aligmentTitulos;

     sheet.mergeCells('AK10:AK11');
     const horaFinInte = sheet.getCell('AK10');
     horaFinInte.value='Hora Fin de Interrupción (hh:mm)';
     horaFinInte.border = allBorder;
     horaFinInte.fill = fillVerde;
     horaFinInte.alignment = aligmentTitulos;

     sheet.mergeCells('AL10:AL11');
     const durInte = sheet.getCell('AL10');
     durInte.value='Duración de Interrupción (Horas:minutos:segundos)';
     durInte.border = allBorder;
     durInte.fill = fillVerde;
     durInte.alignment = aligmentTitulos;

     sheet.mergeCells('AM10:AM11');
     const durInteHoras = sheet.getCell('AM10');
     durInteHoras.value='Duración de Interrupción (Horas)';
     durInteHoras.border = allBorder;
     durInteHoras.fill = fillVerde;
     durInteHoras.alignment = aligmentTitulos;

     /**Sexto segmento */
     sheet.mergeCells('AN9:AO10');
     const indices = sheet.getCell('AN9');
     indices.value='Índices';
     indices.border = allBorder;
     indices.fill = fillCeleste;
     indices.alignment = aligmentTitulos;

     const fmik = sheet.getCell('AN11');
     fmik.value='FMIK';
     fmik.border = allBorder;
     fmik.fill = fillCeleste;
     fmik.alignment = aligmentTitulos;

     const ttik = sheet.getCell('AO11');
     ttik.value='TTIK';
     ttik.border = allBorder;
     ttik.fill = fillCeleste;
     ttik.alignment = aligmentTitulos;

     sheet.mergeCells('AP9:AP11');
     const observacion = sheet.getCell('AP9');
     observacion.value='Observación';
     observacion.border = allBorder;
     observacion.fill = fillCeleste;
     observacion.alignment = aligmentTitulos;

     for (let i = 0; i < datos.length; i++) {
      let dataRow = sheet.getRow(12 + i);
      dataRow.values = datos[i];
      for (let j = 0; j < 42; j++) {
        const rowStyle=sheet.getCell(abecedario[j]+(12+i));
        rowStyle.border = allBorder;        
      }
    }

  }
  
}
