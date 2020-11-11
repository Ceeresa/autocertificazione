---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: index
title: "Autocertificazione"
additional_scripts:
    - https://unpkg.com/pdf-lib@1.11.0
    - https://unpkg.com/downloadjs@1.4.7
    - https://printjs-4de6.kxcdn.com/print.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js
    - ./js/script.js
---
<div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
    <p class="lead">Genera velocemente la tua autocertificazione, anche da mobile.</p>
</div>
<div class="text-center mb-3">
    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#autocertEditModal">
        Compila
    </button>
    <button type="button" class="btn btn-success download-button">
        Download
    </button>
    <button type="button" class="btn btn-success print-button">
        Stampa
    </button>
    <button type="button" class="btn btn-success cleanup-button">
        Ripulisci
    </button>
</div>
<div class="row justify-content-center">
    <div class="col-md-12 text-center">
        <canvas class="img-fluid" id="the-canvas" onclick="openModal()"></canvas>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="autocertEditModal" tabindex="-1" role="dialog" aria-labelledby="autocertEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
        <form id="autocertificazione" novalidate>
        <div class="modal-header">
            <h5 class="modal-title" id="autocertEditModalLabel">Autocertificazione spostamenti COVID</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="container">
            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="nome">Nome</label>
                <input type="text" class="form-control" id="nome" name="nome">
                </div>
                <div class="form-group col-md-6">
                <label for="cognome">Cognome</label>
                <input type="text" class="form-control" id="cognome" name="cognome">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                <label for="luogoDiNascita">Luogo di nascita</label>
                <input type="text" class="form-control" id="luogoDiNascita" name="luogoDiNascita">
                </div>
                <div class="form-group col-md-4">
                <label for="provinciaDiNascita">Provincia di nascita</label>
                <input type="text" class="form-control" id="provinciaDiNascita" name="provinciaDiNascita">
                </div>
                <div class="form-group col-md-4">
                <label for="dataNascita">Data di nascita</label>
                <input type="date" class="form-control" id="dataNascita" name="dataNascita">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                <label for="luogoResidenza">Luogo residenza</label>
                <input type="text" class="form-control" id="luogoResidenza" name="luogoResidenza">
                </div>
                <div class="form-group col-md-4">
                <label for="provinciaResidenza">Provincia residenza</label>
                <input type="text" class="form-control" id="provinciaResidenza" name="provinciaResidenza">
                </div>
                <div class="form-group col-md-4">
                <label for="viaResidenza">Via residenza</label>
                <input type="text" class="form-control" id="viaResidenza" name="viaResidenza">
                </div>
            </div>
            <div class="form-row">
                <button type="button" class="btn btn-primary btn-sm" id="copy-from-residenza">Copia da residenza</button>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                <label for="luogoDomicilio">Luogo domicilio</label>
                <input type="text" class="form-control" id="luogoDomicilio" name="luogoDomicilio">
                </div>
                <div class="form-group col-md-4">
                <label for="provinciaDomicilio">Provincia domicilio</label>
                <input type="text" class="form-control" id="provinciaDomicilio" name="provinciaDomicilio">
                </div>
                <div class="form-group col-md-4">
                <label for="viaDomicilio">Via domicilio</label>
                <input type="text" class="form-control" id="viaDomicilio" name="viaDomicilio">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                <label for="mezzo">Mezzo</label>
                <input type="text" class="form-control" id="mezzo" name="mezzo">
                </div>
                <div class="form-group col-md-4">
                <label for="numeroMezzo">Numero mezzo</label>
                <input type="text" class="form-control" id="numeroMezzo" name="numeroMezzo">
                </div>
                <div class="form-group col-md-4">
                <label for="mezzoRilasciatoDa">Rilasciato da</label>
                <input type="text" class="form-control" id="mezzoRilasciatoDa" name="mezzoRilasciatoDa">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="inDataDocumento">In data</label>
                <input type="date" class="form-control" id="inDataDocumento" name="inDataDocumento">
                </div>
                <div class="form-group col-md-6">
                <label for="utenzaTelefonica">Utenza telefonica</label>
                <input type="text" class="form-control" id="utenzaTelefonica" name="utenzaTelefonica">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                <label for="motivazioneSpostamento">Motivazione spostamento</label>
                <select id="motivazioneSpostamento" name="motivazioneSpostamento" class="form-control">
                    <option value="Scelta1">comprovate esigenze lavorative</option>
                    <option value="Scelta2">motivi di salute</option>
                    <option value="Scelta3">altri motivi ammessi dalle vigenti normative</option>
                </select>
                </div>
                <div class="form-group col-md-8">
                <label for="dettaglioMotivazioneSpostamento">Dettaglio motivazione spostamento</label>
                <textarea class="form-control" id="dettaglioMotivazioneSpostamento" name="dettaglioMotivazioneSpostamento"></textarea>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="indirizzoInizioSpostamento">Indirizzo inizio spostamento</label>
                <input type="text" class="form-control" id="indirizzoInizioSpostamento" name="indirizzoInizioSpostamento">
                </div>
                <div class="form-group col-md-6">
                <label for="indirizzoDestinazioneSpostamento">Indirizzo destinazione spostamento</label>
                <input type="text" class="form-control" id="indirizzoDestinazioneSpostamento" name="indirizzoDestinazioneSpostamento">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="dichiarazioniAggiuntive">Dichiarazioni aggiuntive</label>
                <textarea class="form-control" id="dichiarazioniAggiuntive" name="dichiarazioniAggiuntive"></textarea>
                </div>
            </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="salva-modifiche">Salva Modifiche</button>
            <button type="button" class="btn btn-primary download-button" id="download">Download</button>
            <button type="button" class="btn btn-primary print-button" id="stampa">Stampa</button>
            <button type="button" class="btn btn-primary cleanup-button">Ripulisci</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
        </div>
        </form>
    </div>
    </div>
</div>