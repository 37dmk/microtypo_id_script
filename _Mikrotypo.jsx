﻿var myDialog;
with(myDialog = app.dialogs.add({name:"Mikrotypografie"})){
    with(dialogColumns.add()){
        with(dialogRows.add()){
            staticTexts.add({staticLabel:"Dieses Script ändert nur freigegebene Ebenen und Objekte"});
            staticTexts.add({staticLabel:" "});
            }
        with (dialogRows.add()) {
            with(dialogColumns.add()){
                with(borderPanels.add()){
                    staticTexts.add({staticLabel:"Änderungen:"});
                    with(dialogColumns.add()){
                        var strichlaengen = checkboxControls.add({staticLabel:"Strichlängen", checkedState:true});
                        var wortabstand = checkboxControls.add({staticLabel:"Doppelte Wortabstände löschen", checkedState:true});
                        staticTexts.add({staticLabel:"_____________________________________________"});
                        staticTexts.add({staticLabel:" "});
                        
                        
                        var lol = "37";
                        alert("hello indesign");
                        
                        
                        var anfuehrung = enablingGroups.add({staticLabel:"Anführungszeichen", checkedState:true});
                        with(anfuehrung){
                            with(anfuehrungsButtons = radiobuttonGroups.add()){
                                var schweiz = radiobuttonControls.add({staticLabel:"schweizer/französische Guillemets", checkedState:true});
                                var deutsch = radiobuttonControls.add({staticLabel:"deutsche Guillemets"});
                                var englisch = radiobuttonControls.add({staticLabel:"englische Apostroph"});
                                }
                            }
                        
                        
                        
                        staticTexts.add({staticLabel:"_____________________________________________"});
                        staticTexts.add({staticLabel:" "});
                        var abstaende = enablingGroups.add({staticLabel:"Abstände", checkedState:true});
                        with(abstaende){
                            with(dialogColumns.add()){
                                var daten = checkboxControls.add({staticLabel:"Nummerisches Datum einbeziehen", checkedState:true});
                                with(abstandButtons = radiobuttonGroups.add()){
                                var schweizabstand = radiobuttonControls.add({staticLabel:"schweizer Interpunktionsabstände", checkedState:true});
                                var franzabstand = radiobuttonControls.add({staticLabel:"französische Interpunktionsabstände"});
                                }
                                }
                            }
                        staticTexts.add({staticLabel:"_____________________________________________"});
                        staticTexts.add({staticLabel:" "});
                        var zahlentrennung = enablingGroups.add({staticLabel:"Zahlentrennung", checkedState:true});
                        with(zahlentrennung){
                            with(dialogColumns.add()){
                                with(zahlentrennungButtons = radiobuttonGroups.add()){
                                var achteleviert = radiobuttonControls.add({staticLabel:"10 000           ", checkedState:true});
                                var apostroph = radiobuttonControls.add({staticLabel:"10’000"});
                                }
                                }
                            }
                        staticTexts.add({staticLabel:"_____________________________________________"});
                        staticTexts.add({staticLabel:" "});
                        var zeichensetzung = enablingGroups.add({staticLabel:"Zeichensetzung", checkedState:true});
                        with(zeichensetzung){
                            with(dialogColumns.add()){
                                var otf_hochgestellt = checkboxControls.add({staticLabel:"OTF hochgestellt", checkedState:true});
                                var otf_tiefgestellt = checkboxControls.add({staticLabel:"OTF tiefgestellt", checkedState:false});
                                var register_hochgestellt = checkboxControls.add({staticLabel:"'registered' hochgestellt", checkedState:true});
                                var copyright_hochgestellt = checkboxControls.add({staticLabel:"'copyright' hochgestellt", checkedState:true});
                                }
                            }
                        }
                    } // ende dialogColums
                } // ende border Panel
            } // ende Column
        } // ende Row
    }

myReturn = myDialog.show();
if (myReturn == true){
    var checkedCategories = new Array();
    if (anfuehrung.checkedState) {checkedCategories.push("Anführungszeichen")}
    if (strichlaengen.checkedState) {checkedCategories.push("Strichlängen")};
    if (abstaende.checkedState) {checkedCategories.push("Abstände")};
    if (zahlentrennung.checkedState) {checkedCategories.push("Zahlentrennung")};
    if (zeichensetzung.checkedState) {checkedCategories.push("Zeichensetzung")};
    if (wortabstand.checkedState) {checkedCategories.push("Doppelte Wortabstände")};
    var str = checkedCategories.join(", ");
    if (checkedCategories.length == 0) {
        alert("Bitte wählen Sie eine Änderung aus");
        }
    }
    else {
        myDialog.destroy()
        alert("Keine Änderungen vorgenommen");
        exit();
        }
    
var myDocument = app.documents.item(0);
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;
app.findChangeGrepOptions.includeFootnotes = false;
app.findChangeGrepOptions.includeHiddenLayers = false;
app.findChangeGrepOptions.includeLockedLayersForFind = false;
app.findChangeGrepOptions.includeLockedStoriesForFind = false;
app.findChangeGrepOptions.includeMasterPages = false;

if (zahlentrennung.checkedState) {
    if (achteleviert.checkedState){
    app.findGrepPreferences.findWhat = "(?<=\\d)'(?=\\d)";
    app.changeGrepPreferences.changeTo = "~<";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<!\\d\\d)~<(?=\\d\\d\\d )";
    app.changeGrepPreferences.changeTo = ".-.-.-.*-ç.-.-.";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = ".-.-.-.*-ç.-.-.";
    app.changeGrepPreferences.changeTo = "";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    }
    if (apostroph.checkedState){
    app.findGrepPreferences.findWhat = "(?<=\\d)'(?=\\d)|(?<=\\d)~<(?=\\d)";
    app.changeGrepPreferences.changeTo = "~|’~|";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<!\\d\\d)~<(?=\\d\\d\\d )";
    app.changeGrepPreferences.changeTo = ".-.-.-.*-ç.-.-.";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = ".-.-.-.*-ç.-.-.";
    app.changeGrepPreferences.changeTo = "";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    }
}


if (anfuehrung.checkedState) {
    if (schweiz.checkedState){
    app.findGrepPreferences.findWhat = "\"(?![ ]|\\r|\\n|\\t|[.]|[,]|[;]|[:]|[!]|[?]|-|[)]|]|~S|~|)";
    app.changeGrepPreferences.changeTo = "«~|";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<![ ]|[(]|[[]|~S|~||\\n|\\r)\"(?!~|)";
    app.changeGrepPreferences.changeTo = "~|»";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "«~|(?!.)";
    app.changeGrepPreferences.changeTo = "~|»";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<![\\l\\u])'(?! |\\r|\\n|\\t|\\.|\\,|\\;|\\:|\\!|\\?|-|\\(|\\[|~S|~|)";
    app.changeGrepPreferences.changeTo = "‹~|";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<![ ]|\\r|\\n|\\t|[.]|[,]|[;]|[:]|[!]|[?]|-|[(]|[[]|~S|~|)'(?!\\l|\\u|~|)";
    app.changeGrepPreferences.changeTo = "~|›";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=[\\l\\u])'(?=\\l|\\u)";
    app.changeGrepPreferences.changeTo = "’";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    }
    if (deutsch.checkedState){
    app.findGrepPreferences.findWhat = "\"(?![ ]|\\r|\\n|\\t|[.]|[,]|[;]|[:]|[!]|[?]|-|[)]|]|~S|~|)";
    app.changeGrepPreferences.changeTo = "»";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<![ ]|[(]|[[]|~S|~||\\n|\\r)\"(?!\\l|\\u)";
    app.changeGrepPreferences.changeTo = "«";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "»(?!.)";
    app.changeGrepPreferences.changeTo = "«";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<![\\l\\u])'(?! |\\r|\\n|\\t|\\.|\\,|\\;|\\:|\\!|\\?|-|\\(|\\[|~S|~|)";
    app.changeGrepPreferences.changeTo = "›";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<![ ]|\\r|\\n|\\t|[.]|[,]|[;]|[:]|[!]|[?]|-|[(]|[[]|~S|~|)'(?!\\l|\\u|~|)";
    app.changeGrepPreferences.changeTo = "‹";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=[\\l\\u])'(?=\\l|\\u)";
    app.changeGrepPreferences.changeTo = "’";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    }
    if (englisch.checkedState){
    app.findGrepPreferences.findWhat = "\"(?![ ]|\\r|\\n|\\t|[.]|[,]|[;]|[:]|[!]|[?]|-|[)]|]|~S|~|)";
    app.changeGrepPreferences.changeTo = "“";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<![ ]|[(]|[[]|~S|~||\\n|\\r)\"(?!\\l|\\u)";
    app.changeGrepPreferences.changeTo = "”";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "“(?!.)";
    app.changeGrepPreferences.changeTo = "”";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<![\\l\\u])'(?! |\\r|\\n|\\t|\\.|\\,|\\;|\\:|\\!|\\?|-|\\(|\\[|~S|~|)";
    app.changeGrepPreferences.changeTo = "‘";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<![ ]|\\r|\\n|\\t|[.]|[,]|[;]|[:]|[!]|[?]|-|[(]|[[]|~S|~|)'(?!\\l|\\u|~|)";
    app.changeGrepPreferences.changeTo = "’";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=[\\l\\u])'(?=\\l|\\u)";
    app.changeGrepPreferences.changeTo = "’";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    }
}
if (apostroph.checkedState){
    app.findGrepPreferences.findWhat = "(?<=\\d)~|’~|(?=\\d)";
    app.changeGrepPreferences.changeTo = "’";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    }

if (strichlaengen.checkedState) {
    app.findGrepPreferences.findWhat = "(?<=\\d) - (?=\\d)|(?<=\\d[.]) - (?=\\d)|(?<=\\d[.])-(?=\\d)";
    app.changeGrepPreferences.changeTo = "~|~=~|";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=\\d)~=(?=\\d)";
    app.changeGrepPreferences.changeTo = "~|~=~|";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=\\d)-(?=\\d)";
    app.changeGrepPreferences.changeTo = "~|-~|";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = " - ";
    app.changeGrepPreferences.changeTo = "~S~= ";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = " ~= ";
    app.changeGrepPreferences.changeTo = "~S~= ";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=\\d[.])-";
    app.changeGrepPreferences.changeTo = "~=";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    }

if (zeichensetzung.checkedState) {
    if (schweiz.checkedState){
    app.findTextPreferences.findWhat = "ß";
    app.changeTextPreferences.changeTo = "ss";
    myDocument.changeText();
    app.findTextPreferences = NothingEnum.nothing;
    app.changeTextPreferences = NothingEnum.nothing;
    }
    app.findGrepPreferences.findWhat = " x |(?<=\\d)x(?=\\d)";
    app.changeGrepPreferences.changeTo = "~%×~%";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "~<x~<";
    app.changeGrepPreferences.changeTo = "~%×~%";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "1/2";
    app.changeGrepPreferences.changeTo = "½";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "1/4";
    app.changeGrepPreferences.changeTo = "¼";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "3/4";
    app.changeGrepPreferences.changeTo = "¾";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "[.][.][.]";
    app.changeGrepPreferences.changeTo = "…";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    if (englisch.checkedState){
        if (otf_hochgestellt.checkedState){
            app.findGrepPreferences.findWhat = "(?<=\\d)st|(?<=\\d)nd|(?<=\\d)rd|(?<=\\d)th";
            app.changeGrepPreferences.position = Position.otSuperscript;
            myDocument.changeGrep();
            app.findGrepPreferences = NothingEnum.nothing;
            app.changeGrepPreferences = NothingEnum.nothing;
            }
        else {
            app.findGrepPreferences.findWhat = "(?<=\\d)st|(?<=\\d)nd|(?<=\\d)rd|(?<=\\d)th";
            app.changeGrepPreferences.position = Position.superscript;
            myDocument.changeGrep();
            app.findGrepPreferences = NothingEnum.nothing;
            app.changeGrepPreferences = NothingEnum.nothing;
            }
        }
    if (franzabstand.checkedState){
        if (otf_hochgestellt.checkedState){
            app.findGrepPreferences.findWhat = "(?<=\\d)er|(?<=\\d)ème";
            app.changeGrepPreferences.position = Position.otSuperscript;
            myDocument.changeGrep();
            app.findGrepPreferences = NothingEnum.nothing;
            app.changeGrepPreferences = NothingEnum.nothing;
            }
        else {
            app.findGrepPreferences.findWhat = "(?<=\\d)er|(?<=\\d)ème";
            app.changeGrepPreferences.position = Position.superscript;
            myDocument.changeGrep();
            app.findGrepPreferences = NothingEnum.nothing;
            app.changeGrepPreferences = NothingEnum.nothing;
            }
        }
    if (otf_tiefgestellt.checkedState){
        app.findGrepPreferences.findWhat = "(?<=H)2(?=O)|(?<=H)12(?=O)|(?<=O)2|(?<=O)4|(?<=O)6|(?<=C)6";
        app.changeGrepPreferences.position = Position.otSubscript;
        myDocument.changeGrep();
        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;
        }
    else {
        app.findGrepPreferences.findWhat = "(?<=H)2(?=O)|(?<=H)12(?=O)|(?<=O)2|(?<=O)4|(?<=O)6|(?<=C)6";
        app.changeGrepPreferences.position = Position.subscript;
        myDocument.changeGrep();
        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;
        }
    if (otf_hochgestellt.checkedState){
        app.findGrepPreferences.findWhat = "(?<=m)2|(?<=m)3";
        app.changeGrepPreferences.position = Position.otSuperscript;
        myDocument.changeGrep();
        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;
        }
    else {
        app.findGrepPreferences.findWhat = "(?<=m)2|(?<=m)3";
        app.changeGrepPreferences.position = Position.superscript;
        myDocument.changeGrep();
        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;
        }
    if (register_hochgestellt.checkedState){
        app.findGrepPreferences.findWhat = "~r";
        app.changeGrepPreferences.changeTo = "~|~r";
        app.changeGrepPreferences.position = Position.superscript;
        myDocument.changeGrep();
        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;
        }
    if (copyright_hochgestellt.checkedState){
        app.findGrepPreferences.findWhat = "~2";
        app.changeGrepPreferences.changeTo = "~|~2";
        app.changeGrepPreferences.position = Position.superscript;
        myDocument.changeGrep();
        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;
        }
}

if (abstaende.checkedState) {
    app.findGrepPreferences.findWhat = "(?<=\\d) %|(?<=\\d)%";
    app.changeGrepPreferences.changeTo = "~|%";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=\\d) (?=m|dm|km|cm|kg)";
    app.changeGrepPreferences.changeTo = "~%";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=\\d)°(?=C)|(?<=\\d) °(?=C)|(?<=\\d)° (?=C)|(?<=\\d) ° (?=C)";
    app.changeGrepPreferences.changeTo = "~S°~|";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=\\d)°(?=[ ])";
    app.changeGrepPreferences.changeTo = "~|°";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "[*](?=\\d)|[*] (?=\\d)";
    app.changeGrepPreferences.changeTo = "*~|";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "[†](?=\\d)|[†] (?=\\d)";
    app.changeGrepPreferences.changeTo = "†~|";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    if(daten.checkedState){
        app.findGrepPreferences.findWhat = "(?<=\\d)[.] (?=\\d)|(?<=\\d)[.](?=\\d\\d[.])|(?<=\\d)[.](?=\\d[.])|(?<=\\d)[.](?=\\d\\d\\d\\d)";
        app.changeGrepPreferences.changeTo = ".~%";
        myDocument.changeGrep();
    }
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=\\d[.]) (?=Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember|Jahr|Liga|Platz|Rang|Preis|Mannschaft|Jh[.]|Jt[.]|Lebensjahr)";
    app.changeGrepPreferences.changeTo = "~%";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=\\d)[.](?=Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember|Jahr|Liga|Platz|Rang|Mannschaft|Jh[.]|Jt[.]|Lebensjahr)";
    app.changeGrepPreferences.changeTo = ".~%";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=Janua)r(?=\\d)";
    app.changeGrepPreferences.changeTo = "r~S";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=Februa)r(?=\\d)";
    app.changeGrepPreferences.changeTo = "r~S";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=Mär)z(?=\\d)";
    app.changeGrepPreferences.changeTo = "z~S";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=Apri)l(?=\\d)";
    app.changeGrepPreferences.changeTo = "l~S";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=Ma)i(?=\\d)";
    app.changeGrepPreferences.changeTo = "i~S";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=Jun)i(?=\\d)";
    app.changeGrepPreferences.changeTo = "i~S";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=Jul)i(?=\\d)";
    app.changeGrepPreferences.changeTo = "i~S";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=Augus)t(?=\\d)";
    app.changeGrepPreferences.changeTo = "t~S";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=Septembe)r(?=\\d)";
    app.changeGrepPreferences.changeTo = "r~S";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=Oktobe)r(?=\\d)";
    app.changeGrepPreferences.changeTo = "r~S";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=Novembe)r(?=\\d)";
    app.changeGrepPreferences.changeTo = "r~S";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=Dezembe)r(?=\\d)";
    app.changeGrepPreferences.changeTo = "r~S";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=Dr[.]) |(?<=med[.]) |(?<=Med[.]) |(?<=phil[.]) |(?<=lic[.]) |(?<=jur[.]) |(?<=iur[.]) |(?<=rer[.]) |(?<=pol[.]) |(?<=Prof[.]) |(?<=St[.]) |(?<=Dipl[.]) |(?<=dipl[.]) |(?<=Nr[.]) |(?<=Fr[.]) |(?<=str[.]) |(?<=Ing[.]) |(?<=vet[.]) |(?<=Stv[.]) ";
    app.changeGrepPreferences.changeTo = "~%";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=Jh[.]) |(?<=Jt[.]) ";
    app.changeGrepPreferences.changeTo = "~%";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=bzw[.]) ";
    app.changeGrepPreferences.changeTo = "~%";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=ca[.]) ";
    app.changeGrepPreferences.changeTo = "~%";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=u[.]|U[.]n[.]|v[.]|z[.]|Z[.]|d[.]|D[.]) (?=a[.]|Chr[.]|B[.]|h[.])";
    app.changeGrepPreferences.changeTo = "~<";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=u[.]~<a[.]|U[.]~<a[.]|v[.]~<Chr[.]|n[.]~<Chr[.]|z[.]~<B[.]|Z[.]~<B[.]|d[.]~<h[.]|D[.]~<h[.]) ";
    app.changeGrepPreferences.changeTo = "~%";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    if (schweizabstand.checkedState){
    app.findGrepPreferences.findWhat = "(?<=.)[!]";
    app.changeGrepPreferences.changeTo = "~|!";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=.)[?]";
    app.changeGrepPreferences.changeTo = "~|?";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=.)[:]";
    app.changeGrepPreferences.changeTo = "~|:";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=.)[;]";
    app.changeGrepPreferences.changeTo = "~|;";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    }
    if (franzabstand.checkedState){
    app.findGrepPreferences.findWhat = "(?<=.)[!]";
    app.changeGrepPreferences.changeTo = "~%!";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=.)[?]";
    app.changeGrepPreferences.changeTo = "~%?";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=.)[:]";
    app.changeGrepPreferences.changeTo = "~%:";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=.)[;]";
    app.changeGrepPreferences.changeTo = "~%;";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    }
    app.findGrepPreferences.findWhat = "(?<=\\d)[:](?=\\d)";
    app.changeGrepPreferences.changeTo = "~|:~|";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = " […]";
    app.changeGrepPreferences.changeTo = "~S…";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<=[\\l\\u]|\\d)[…]";
    app.changeGrepPreferences.changeTo = "~|…";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<!~|)[/](?!~|)";
    app.changeGrepPreferences.changeTo = "~|/~|";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "(?<!~|)[\](?!~|)";
    app.changeGrepPreferences.changeTo = "~|\~|";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "[(]";
    app.changeGrepPreferences.changeTo = "(~|";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "[)]";
    app.changeGrepPreferences.changeTo = "~|)";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = "~|~|";
    app.changeGrepPreferences.changeTo = "~|";
    var i=0
    do
    {
    myDocument.changeGrep();
    i++;
    }
    while (i<=10);
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    }

if (wortabstand.checkedState) {
    app.findGrepPreferences.findWhat = "    (?=[\\l\\u])|    (?=\\d)|    (?=[…])|    (?=[(])|    (?=\")|    (?=')|    (?=[*])|    (?=[†]|    (?=[|]))";
    app.changeGrepPreferences.changeTo = "\\t";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    app.findChangeTextOptions.caseSensitive = false;
    app.findChangeTextOptions.wholeWord = false;
    app.findTextPreferences.findWhat = "  ";
    app.changeTextPreferences.changeTo = " ";
    var i=0
    do
    {
    myDocument.changeText();
    i++;
    }
    while (i<=30);
    app.findTextPreferences = NothingEnum.nothing;
    app.changeTextPreferences = NothingEnum.nothing;
    app.findGrepPreferences.findWhat = " (?=\\t)|(?<=\\t) ";
    app.changeGrepPreferences.changeTo = "";
    myDocument.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    }

alert("Änderungen vorgenommen" + "\r" + str);
