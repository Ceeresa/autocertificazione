const { PDFDocument } = PDFLib

function getFormData($form){
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}

$( "#autocertificazione" ).submit(function( event ) {
  const data = getFormData($(this))
  fillForm(data)
  event.preventDefault();
});

async function fillForm(data) {
  console.log('data received', data)
  // Fetch the PDF with form fields
  const formUrl = './data/modello_autodichiarazione_editabile_ottobre_2020.pdf'
  const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

  // Fetch the Mario image
  const marioUrl = 'https://pdf-lib.js.org/assets/small_mario.png'
  const marioImageBytes = await fetch(marioUrl).then(res => res.arrayBuffer())

  // Fetch the emblem image
  const emblemUrl = 'https://pdf-lib.js.org/assets/mario_emblem.png'
  const emblemImageBytes = await fetch(emblemUrl).then(res => res.arrayBuffer())

  // Load a PDF with form fields
  const pdfDoc = await PDFDocument.load(formPdfBytes)

  // Embed the Mario and emblem images
  const marioImage = await pdfDoc.embedPng(marioImageBytes)
  const emblemImage = await pdfDoc.embedPng(emblemImageBytes)

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
  dataOraELuogoField.setText('Data ora e luogo')
  group7Field.select(data.motivazioneSpostamento)
  testo1Field.setText(data.dettaglioMotivazioneSpostamento)
  testo2Field.setText(data.indirizzoInizioSpostamento)
  testo3Field.setText(data.indirizzoDestinazioneSpostamento)
  testo4Field.setText(data.dichiarazioniAggiuntive)

  /*
  const nameField = form.getTextField('CharacterName 2')
  const ageField = form.getTextField('Age')
  const heightField = form.getTextField('Height')
  const weightField = form.getTextField('Weight')
  const eyesField = form.getTextField('Eyes')
  const skinField = form.getTextField('Skin')
  const hairField = form.getTextField('Hair')

  const alliesField = form.getTextField('Allies')
  const factionField = form.getTextField('FactionName')
  const backstoryField = form.getTextField('Backstory')
  const traitsField = form.getTextField('Feat+Traits')
  const treasureField = form.getTextField('Treasure')

  const characterImageField = form.getButton('CHARACTER IMAGE')
  const factionImageField = form.getButton('Faction Symbol Image')

  // Fill in the basic info fields
  nameField.setText('Mario')
  ageField.setText('24 years')
  heightField.setText(`5' 1"`)
  weightField.setText('196 lbs')
  eyesField.setText('blue')
  skinField.setText('white')
  hairField.setText('brown')

  // Fill the character image field with our Mario image
  characterImageField.setImage(marioImage)

  // Fill in the allies field
  alliesField.setText(
    [
      `Allies:`,
      `  • Princess Daisy`,
      `  • Princess Peach`,
      `  • Rosalina`,
      `  • Geno`,
      `  • Luigi`,
      `  • Donkey Kong`,
      `  • Yoshi`,
      `  • Diddy Kong`,
      ``,
      `Organizations:`,
      `  • Italian Plumbers Association`,
    ].join('\n'),
  )

  // Fill in the faction name field
  factionField.setText(`Mario's Emblem`)

  // Fill the faction image field with our emblem image
  factionImageField.setImage(emblemImage)

  // Fill in the backstory field
  backstoryField.setText(
    `Mario is a fictional character in the Mario video game franchise, owned by Nintendo and created by Japanese video game designer Shigeru Miyamoto. Serving as the company's mascot and the eponymous protagonist of the series, Mario has appeared in over 200 video games since his creation. Depicted as a short, pudgy, Italian plumber who resides in the Mushroom Kingdom, his adventures generally center upon rescuing Princess Peach from the Koopa villain Bowser. His younger brother and sidekick is Luigi.`,
  )

  // Fill in the traits field
  traitsField.setText(
    [
      `Mario can use three basic three power-ups:`,
      `  • the Super Mushroom, which causes Mario to grow larger`,
      `  • the Fire Flower, which allows Mario to throw fireballs`,
      `  • the Starman, which gives Mario temporary invincibility`,
    ].join('\n'),
  )

  // Fill in the treasure field
  treasureField.setText(['• Gold coins', '• Treasure chests'].join('\n'))
  */

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  // Trigger the browser to download the PDF document
  download(pdfBytes, "autocertificazione.pdf", "application/pdf");
}