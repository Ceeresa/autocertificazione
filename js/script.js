const { PDFDocument } = PDFLib
const LOCAL_STORAGE_NAME = "autocertificazione-data"

$(function() {
  localStorage.lastname;
  const formData = localStorage.getItem(LOCAL_STORAGE_NAME);

  if (formData) {
    try {
      populate($("#autocertificazione"), JSON.parse(formData));
    } catch (e) {
      console.log("Error while parsing the data", e)
    }
  }
});

/**
 * Populate a form with the given data.
 * @param {jQuery object} frm The form to populate.
 * @param {Object} data The data to use to populate the form.
 */
function populate(form, data) {
  $.each(data, function(key, value) {  
      var ctrl = $('[name='+key+']', form);  
      switch(ctrl.prop("type")) { 
          case "radio": case "checkbox":   
              ctrl.each(function() {
                  if($(this).attr('value') == value) $(this).attr("checked",value);
              });   
              break;  
          default:
              ctrl.val(value); 
      }  
  });  
}

/**
 * Get the form data in a 'key': 'value' format.
 * @param {jQuery object} $form The form from which retrieve the data.
 */
function getFormData($form){
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}

$( "#autocertificazione" ).submit(function( event ) {
  event.preventDefault();
  event.stopPropagation();

  if (this.checkValidity() === true) {
    const data = getFormData($(this))
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(data));
    fillForm(data)
  }
  
  this.classList.add('was-validated');
});

/**
 * Fill the PDF form with the given data and download the file.
 * @param {Object} data The data to use to fill the PDF form.
 */
async function fillForm(data) {
  console.log('data received', data)
  // Fetch the PDF with form fields
  const formUrl = './data/modello_autodichiarazione_editabile_ottobre_2020.pdf'
  const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

  // Load a PDF with form fields
  const pdfDoc = await PDFDocument.load(formPdfBytes)

  // Get the form containing all the fields
  const form = pdfDoc.getForm()

  form
  .getFields()
  .forEach((field) => {
    const type = field.constructor.name
    const name = field.getName()
    //console.log(`${type}: ${name}`)
  });

  // Some operation on the date fields
  const annoNascita = data.dataNascita.substring(0, 4)
  const meseNascita = data.dataNascita.substr(5, 2)
  const giornoNascita = data.dataNascita.substr(8, 2)

  const annoDocumento = data.inDataDocumento.substring(0, 4)
  const meseDocumento = data.inDataDocumento.substr(5, 2)
  const giornoDocumento = data.inDataDocumento.substr(8, 2)
  

  // Get all fields in the PDF by their names
  const ilSottoscrittoField = form.getTextField('Il sottoscritto')
  const residenteInField = form.getTextField('residente in')
  const domiciliatoInField = form.getTextField('e domiciliato in')
  const identificatoAMezzoField = form.getTextField('identificato a mezzo')
  const nrField = form.getTextField('nr')
  const rilasciatoDaField = form.getTextField('rilasciato da')
  const utenzaTelefonicaField = form.getTextField('utenza telefonica')
  const natoGiornoField = form.getTextField('nato giorno')
  const natoMeseField = form.getTextField('nato mese')
  const natoAnnoField = form.getTextField('nato anno')
  const luogoNascitaField = form.getTextField('luogo di nascita')
  const provinciaNascitaField = form.getTextField('provincia di nascita')
  const provinciaResidenzaField = form.getTextField('provincia residenza')
  const provinciaDomicilioField = form.getTextField('provincia domicilio')
  const viaDomicilioField = form.getTextField('via domicilio')
  const viaResidenzaField = form.getTextField('via residenza')
  const giornoDocumentoField = form.getTextField('giorno documento')
  const meseDocumentoField = form.getTextField('mese documento')
  const annoDocumentoField = form.getTextField('anno documento')
  const dataOraELuogoField = form.getTextField('data, ora e luogo')
  const group7Field = form.getRadioGroup('Group7')
  const testo1Field = form.getTextField('Testo1')
  const testo2Field = form.getTextField('Testo2')
  const testo3Field = form.getTextField('Testo3')
  const testo4Field = form.getTextField('Testo4')

  // Fill in the basic info fields
  ilSottoscrittoField.setText(data.nome + ' ' + data.cognome)
  residenteInField.setText(data.luogoResidenza)
  domiciliatoInField.setText(data.luogoDomicilio)
  identificatoAMezzoField.setText(data.mezzo)
  nrField.setText(data.numeroMezzo)
  rilasciatoDaField.setText(data.mezzoRilasciatoDa)
  utenzaTelefonicaField.setText(data.utenzaTelefonica)
  natoGiornoField.setText(giornoNascita)
  natoMeseField.setText(meseNascita)
  natoAnnoField.setText(annoNascita)
  luogoNascitaField.setText(data.luogoDiNascita)
  provinciaNascitaField.setText(data.provinciaDiNascita)
  provinciaResidenzaField.setText(data.provinciaResidenza)
  provinciaDomicilioField.setText(data.provinciaDomicilio)
  viaDomicilioField.setText(data.viaDomicilio)
  viaResidenzaField.setText(data.viaResidenza)
  giornoDocumentoField.setText(giornoDocumento)
  meseDocumentoField.setText(meseDocumento)
  annoDocumentoField.setText(annoDocumento)
  group7Field.select(data.motivazioneSpostamento)
  testo1Field.setText(data.dettaglioMotivazioneSpostamento)
  testo2Field.setText(data.indirizzoInizioSpostamento)
  testo3Field.setText(data.indirizzoDestinazioneSpostamento)
  testo4Field.setText(data.dichiarazioniAggiuntive)

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  // Trigger the browser to download the PDF document
  download(pdfBytes, "autocertificazione.pdf", "application/pdf");
}