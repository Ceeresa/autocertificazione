---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: index
title: "Autocertificazione"
additional_scripts:
    - https://unpkg.com/pdf-lib@1.11.0
    - https://unpkg.com/downloadjs@1.4.7
    - https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js
    - ./js/script.js
---
<div class="d-print-none">
    <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h3>Genera velocemente la tua autocertificazione</h3>
        <h4><small class="text-muted text-right">da mobile e pronta da stampare</small></h4>
        <div class="justify-content-center alert alert-success">L'autocertificazione è generata direttamente nel <b>tuo</b> browser e i <b>tuoi</b> dati non escono dal <b>tuo</b> dispositivo</div>
    </div>
    <div class="row justify-content-center justify-content-sm-center mb-3">
        <div class="col-md-auto col-6 text-center">
            <button type="button" class="btn btn-block btn-primary mt-2" data-toggle="modal" data-target="#autocertEditModal">
                <i class="fa fa-pencil"></i> Compila
            </button>
        </div>
        <div class="col-md-auto col-6 text-center">
            <button type="button" class="btn btn-block btn-primary cleanup-button mt-2" data-toggle="tooltip" data-container="body" data-placement="top" title="Se ti trovi in un Internet Cafè o Internet Point premi questo tasto per cancellare i tuoi dati">
                <i class="fa fa-eraser"></i> Ripulisci
            </button>
        </div>
        <div class="col-md-auto col-6 text-center">
            <button type="button" class="btn btn-block btn-primary fast-download-button mt-2" title="Download">
                <i class="fa fa-download"></i> Download
            </button>
        </div>
        <div class="col-md-auto col-6 text-center">
            <button type="button" class="btn btn-block btn-primary fast-print-button mt-2" title="Print">
                <i class="fa fa-print"></i> Stampa
            </button>
        </div>
    </div>
    <div class="text-right">
      <a class="d-sm-none" href="whatsapp://send?text=Ti%20suggerisco%20questo%20sito%20per%20compilare%20velocemente%20l'autocertificazione%20e%20stamparla%20anche%20da%20mobile%20https://covidcert.it" data-action="share/whatsapp/share" target="_blank"> <i class="fa fa-whatsapp"></i> Consigliaci su Whatsapp</a>
    </div>
</div>   
<div class="row justify-content-center pdf-container">
    <div class="col-md-12 text-center">
        <canvas class="img-fluid rounded shadow-lg" id="the-canvas" onclick="openModal()" height="2947" width="2085"></canvas>
    </div>
</div>

<!-- Modal -->
<div class="modal fade d-print-none" id="autocertEditModal" tabindex="-1" role="dialog" aria-labelledby="autocertEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <form id="autocertificazione" novalidate>
                <div class="modal-header py-1">
                    <h5 class="modal-title small" id="autocertEditModalLabel">Autocertificazione spostamenti COVID</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="nome">Nome</label>
                                <input type="text" class="form-control" id="nome" name="nome" autocomplete="given-name">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="cognome">Cognome</label>
                                <input type="text" class="form-control" id="cognome" name="cognome" autocomplete="family-name">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="utenzaTelefonica">Utenza telefonica</label>
                                <input type="text" class="form-control" id="utenzaTelefonica" name="utenzaTelefonica" autocomplete="tel">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="luogoDiNascita">Luogo di nascita</label>
                                <input type="text" class="form-control" id="luogoDiNascita" name="luogoDiNascita" autocomplete="address-level2">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="provinciaDiNascita">Provincia di nascita</label>
                                <input type="text" class="form-control" id="provinciaDiNascita" name="provinciaDiNascita" autocomplete="address-level1">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="dataNascita">Data di nascita</label>
                                <input type="date" class="form-control" id="dataNascita" name="dataNascita" autocomplete="bday">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="mezzo">Documento di riconoscimento</label>
                                <input type="text" class="form-control" id="mezzo" name="mezzo">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="numeroMezzo">Numero documento</label>
                                <input type="text" class="form-control" id="numeroMezzo" name="numeroMezzo" spellcheck="false" autocapitalize="characters">
                                <!--
                                `spellcheck` is HTML5 standard for disabling autocorrection, `autocorrect="off"` should be used in iOS but is not a standard attribute,
                                `autocapitalize` is for enabling caps lock in most virtual keyboards
                                -->
                            </div>
                            <div class="form-group col-md-4">
                                <label for="mezzoRilasciatoDa">Documento rilasciato da</label>
                                <input type="text" class="form-control" id="mezzoRilasciatoDa" name="mezzoRilasciatoDa">
                            </div>
                        </div>
                        <div class="form-row justify-content-end">
                            <div class="form-group col-md-4">
                                <label for="inDataDocumento">Documento rilasciato in data</label>
                                <input type="date" class="form-control" id="inDataDocumento" name="inDataDocumento">
                            </div>
                        </div>
                        <hr>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="luogoResidenza">Luogo residenza</label>
                                <input type="text" class="form-control" id="luogoResidenza" name="luogoResidenza" autocomplete="address-level2">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="provinciaResidenza">Provincia residenza</label>
                                <input type="text" class="form-control" id="provinciaResidenza" name="provinciaResidenza" autocomplete="address-level1">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="viaResidenza">Via residenza</label>
                                <input type="text" class="form-control" id="viaResidenza" name="viaResidenza" maxlength="40" autocomplete="address-line1">
                            </div>
                        </div>
                        <div class="form-row">
                            <button type="button" class="btn btn-primary btn-sm" id="copy-from-residenza">Copia da residenza</button>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="luogoDomicilio">Luogo domicilio</label>
                                <input type="text" class="form-control" id="luogoDomicilio" name="luogoDomicilio" autocomplete="address-level2">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="provinciaDomicilio">Provincia domicilio</label>
                                <input type="text" class="form-control" id="provinciaDomicilio" name="provinciaDomicilio" maxlength="100" autocomplete="address-level1">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="viaDomicilio">Via domicilio</label>
                                <input type="text" class="form-control" id="viaDomicilio" name="viaDomicilio" maxlength="40" autocomplete="address-line1">
                            </div>
                        </div>
                        <hr>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="indirizzoInizioSpostamento">Indirizzo inizio spostamento</label>
                                <input type="text" class="form-control" id="indirizzoInizioSpostamento" name="indirizzoInizioSpostamento" maxlength="100" autocomplete="address-line1">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="indirizzoDestinazioneSpostamento">Indirizzo destinazione spostamento</label>
                                <input type="text" class="form-control" id="indirizzoDestinazioneSpostamento" name="indirizzoDestinazioneSpostamento" maxlength="100" autocomplete="address-line1">
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
                                <textarea class="form-control" id="dettaglioMotivazioneSpostamento" name="dettaglioMotivazioneSpostamento" maxlength="100"></textarea>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="dichiarazioniAggiuntive">Dichiarazioni aggiuntive</label>
                                <textarea class="form-control" id="dichiarazioniAggiuntive" name="dichiarazioniAggiuntive"  maxlength="100"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary mt-2" id="salva-modifiche"><i class="fa fa-pencil"></i> Salva Modifiche</button>
                    <button type="button" class="btn btn-primary download-button mt-2" id="download"><i class="fa fa-download"></i> Download</button>
                    <button type="button" class="btn btn-primary print-button mt-2" id="stampa"><i class="fa fa-print"></i> Stampa</button>
                    <button type="button" class="btn btn-primary cleanup-button mt-2"><i class="fa fa-eraser"></i> Ripulisci</button>
                    <button type="button" class="btn btn-secondary mt-2" data-dismiss="modal"><i class="fa fa-window-close"></i> Annulla</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Spinner stuff -->
<div id="spinner" class="d-print-none">
    <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
    </div>
</div>
<div id="spinner-backdrop" class="d-print-none"></div>