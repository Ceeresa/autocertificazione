const { PDFDocument } = PDFLib
const LOCAL_STORAGE_NAME = "autocertificazione-data"
const PDF_URL = './data/modello_autodichiarazione_editabile_ottobre_2020.pdf'
const MODAL_ID = "#autocertEditModal"
const FORM_ID = "#autocertificazione"
const SPINNER_ID = "#spinner"
const SPINNER_BACKDROP_ID = "#spinner-backdrop"


/* Global variables */
let pdfBytes = '';


/**
 * Init the application.
 */
function init(){
  showLoader();
  const formData = localStorage.getItem(LOCAL_STORAGE_NAME);
  let populated = false;
  let parsedData = {};
  if (formData) {
    try {
      parsedData = JSON.parse(formData);
      populate($(FORM_ID), parsedData);
      populated = true;
    } catch (e) {
      console.log("Error while parsing the data", e)
    }
  }

  if (populated) {
    // Reload the PDF using the new base64 data 
    (async function() {
      // Here generate the right PDF
      pdfBytes = await fillForm(parsedData);
      var blob = new Blob([pdfBytes], {type: "application/pdf"});
      var link = window.URL.createObjectURL(blob);
      loadPdfDocument(link, () => { hideLoader(); })
    })();
  } else {
    loadPdfDocument(PDF_URL, () => { hideLoader(); })
  }
}

/**
 * Print the PDF.
 */
function printPDF() {
  window.print();
}


/**
 * Download the PDF.
 */
function downloadFile() {
  // Trigger the browser to download the PDF document
  download(pdfBytes, "autocertificazione.pdf", "application/pdf");
}

/**
 * Show the loader.
 */
function showLoader() {
  $(SPINNER_ID).removeClass('d-none');
  $(SPINNER_BACKDROP_ID).removeClass('d-none');
}

/**
 * Hide the loader.
 */
function hideLoader() {
  $(SPINNER_ID).addClass('d-none');
  $(SPINNER_BACKDROP_ID).addClass('d-none');
}


$(function() {
  init();
});

$("#salva-modifiche").click(function(event) {
  showLoader();
  event.preventDefault();
  event.stopPropagation();

  const data = getFormData($(FORM_ID))
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(data));

  (async function() {
    pdfBytes = await fillForm(data)

    // Reload the PDF using the new base64 data 
    var blob = new Blob([pdfBytes], {type: "application/pdf"});
    var link = window.URL.createObjectURL(blob);

    // Load the PDF document in the preview
    loadPdfDocument(link, () => {
      // Close the modal
      $(MODAL_ID).modal('hide');
      hideLoader();
    });
  })();
});

$(".download-button").click(function(event) {
  showLoader();
  event.preventDefault();
  event.stopPropagation();

  const data = getFormData($(FORM_ID))
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(data));

  (async function() {
    pdfBytes = await fillForm(data)

    // Reload the PDF using the new base64 data 
    var blob = new Blob([pdfBytes], {type: "application/pdf"});
    var link = window.URL.createObjectURL(blob);
    loadPdfDocument(link, () => {
      // Close the modal
      $(MODAL_ID).modal('hide');
      hideLoader();
    });

    downloadFile();
  })();
});

$(".fast-download-button").click(function(event) {
  event.preventDefault();
  event.stopPropagation();

  downloadFile();
});

$(".fast-print-button").click(function(event) {
  event.preventDefault();
  event.stopPropagation();

  printPDF();
});

$(".print-button").click(function(event) {
  event.preventDefault();
  event.stopPropagation();

  const data = getFormData($("#autocertificazione"))
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(data));

  (async function() {
    pdfBytes = await fillForm(data)

    // Reload the PDF using the new base64 data 
    var blob = new Blob([pdfBytes], {type: "application/pdf"});
    var link = window.URL.createObjectURL(blob);
    loadPdfDocument(link, () => {
      // Close the modal
      $(MODAL_ID).modal('hide');
      hideLoader();
    });

    // Print the PDF
    printPDF();
  })();
});

$(".cleanup-button").click(function() {
  localStorage.removeItem(LOCAL_STORAGE_NAME);
  init();
  $(FORM_ID).trigger('reset');
});

$("#copy-from-residenza").click(function(){
  // Get the values from residenza
  const luogoResidenza = $("#luogoResidenza").val();
  const provinciaResidenza = $("#provinciaResidenza").val();
  const viaResidenza = $("#viaResidenza").val();

  // Set the domicilio
  $("#luogoDomicilio").val(luogoResidenza);
  $("#provinciaDomicilio").val(provinciaResidenza);
  $("#viaDomicilio").val(viaResidenza);
});

/**
 * Load the PDF document from the given url
 * @param {string} url The url from which load the PDF.
 * @param {function} callback The callback to call after the loading process end.
 */
function loadPdfDocument(url, callback) {
  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  var pdfjsLib = window['pdfjs-dist/build/pdf'];

  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js';

  // Asynchronous download of PDF
  var loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');
    
    // Fetch the first page
    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function(page) {
      console.log('Page loaded');
      
      var scale = 3.5; // TODO Understand if this one could be decreased without impacting on the print PDF quality
      var viewport = page.getViewport({scale: scale});

      // Prepare canvas using PDF page dimensions
      var canvas = document.getElementById('the-canvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
      renderTask.promise.then(function () {
        console.log('Page rendered');
        callback();
      });
    });
  }, function (reason) {
    // PDF loading error
    console.error(reason);
    callback();
  });
}

/**
 * Open the modal.
 */
function openModal(){
  $(MODAL_ID).modal('show');
}

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

/**
 * Fill the PDF form with the given data and download the file.
 * @param {Object} data The data to use to fill the PDF form.
 */
async function fillForm(data) {
  console.log('data received', data)
  // Fetch the PDF with form fields
  const formPdfBytes = await fetch(PDF_URL).then(res => res.arrayBuffer())

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
  return pdfBytes
}