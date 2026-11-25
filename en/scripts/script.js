const CH=[
["Das Notlager einrichten","Dein Raumschiff ist auf dem Mond Kallisto-9 zerschellt. Du, Kai, Weltraumnomade, findest im Wrack den Bordcomputer Bit. Gemeinsam legt ihr ein Verzeichnis aller Mondbewohner an.","bit"],
["Daten sammeln","Bit läuft wieder. Während du Daten einträgst, nähert sich eine Gestalt im Raumanzug.","bit"],
["Erste Erkundung","Mira führt dich über die Oberfläche. Wer lebt hier, und was liegt herum? Du suchst einen Weg nach Hause.","mira"],
["Handel und Tausch","Im Eismarkt regiert der Händler Tobo. Er besitzt die Fusionszelle, die du für den Heimflug brauchst.","tobo"],
["Zahlen und Vorräte","Der Sauerstoff wird knapp. Zeb verkauft die letzten Tanks, du brauchst den Überblick.","zeb"],
["Feinschliff am Funkgerät","Mira hilft dir, das Funkgerät aufzumöbeln. Mit ihm erreichst du Oda, die Pilotin im Raumhafen.","mira"],
["Die Siedlung durchschauen","Im Raumhafen triffst du Oda. Sie besitzt das Schiff Aurora, doch es fehlt der Antrieb.","oda"],
["Ein Schiff für die Heimreise","Mit der Fusionszelle im Gepäck machst du die Aurora startklar. Du baust die Schiffsdaten mit sauberen Beziehungen auf.","oda"],
["Zugang für die Crew","Mira repariert die Aurora. Damit nichts schiefgeht, bekommt jeder nur die Rechte, die er braucht.","mira"],
["Startfreigabe","Die Aurora steht auf der Rampe, und über dem Horizont leuchtet die Erde. Ein letzter Check, dann geht es heim.","oda"]];
const T=[
["Lege eine neue Datenbank namens <b>mondnomade</b> an.",/^create database (if not exists )?mondnomade$/],
["Wähle die Datenbank <b>mondnomade</b> zur Benutzung aus.",/^use mondnomade$/],
["Erstelle die Tabelle <b>mond</b> mit <b>id</b> (INT, Primärschlüssel) und <b>name</b> (VARCHAR(50)).",/^create table mond ?\(.*primary key.*varchar/],
["Erstelle die Tabelle <b>person</b> mit id (Primärschlüssel), name, beruf, mond_id und credits.",/^(?=.*primary key)create table person ?\(.*beruf.*credits/],
["Bit: Wir brauchen auch eine Tabelle für Gegenstände. Erstelle <b>gegenstand</b> mit id (Primärschlüssel), name, typ, wert und besitzer_id.",/^(?=.*primary key)create table gegenstand ?\(.*typ.*wert.*besitzer_id/,"bit","Kai, ich bin Bit, der Bordcomputer. Mein Gehäuse ist hin, aber die Speicher laufen. Bauen wir ein Inventar auf.","Inventar steht. Jetzt wissen wir wenigstens, was uns noch bleibt."],
["Füge der Tabelle <b>person</b> die Spalte <b>sauerstoff</b> (INT) hinzu.",/^alter table person add (column )?sauerstoff int/],
["Bit: Prüfe, ob alle Tabellen angelegt sind. Zeige sie an (SHOW TABLES).",/^show tables$/,"bit","Systemcheck. Zeig mir, was wir bisher gebaut haben.","Drei Tabellen. Gut. Jetzt brauche ich Daten, sonst bin ich nur ein sprechender Schrotthaufen."],
["Trage in <b>mond</b> den Datensatz (1, 'Kallisto-9') ein.",/^insert into mond.*values ?\(1,'kallisto-9'\)/],
["Trage dich selbst in <b>person</b> ein: (1, 'Kai', 'Nomade', 1, 100). Nenne die Spalten ausdrücklich.",/^insert into person ?\(.*\) ?values ?\(1,'kai','nomade',1,100\)/],
["Mira taucht am Wrack auf. Trage sie in <b>person</b> ein: (2, 'Mira', 'Mechanikerin', 1, 250).",/^insert into person ?(\(.*\) ?)?values ?\(2,'mira','mechanikerin',1,250\)/,"mira","He, du da! Ich bin Mira, Mechanikerin aus der Kratersiedlung. Du siehst aus, als bräuchtest du Hilfe.","Willkommen auf Kallisto-9. Ich helfe dir, wo ich kann."],
["Füge mit <u>einem</u> INSERT drei Zeilen in die Tabelle <b>gegenstand</b> (id, name, typ, wert, besitzer_id) ein.",/^insert into gegenstand.*values ?\(.*\),\(.*\),\(.*\)/],
["Du hilfst beim Reparieren und bekommst 50 Credits. Erhöhe die credits von Kai um 50.",/^update person set credits=credits ?\+ ?50 where name='kai'$/],
["Mira überlässt dir ihr Funkgerät. Setze besitzer_id des Funkgeräts auf 1 (Kai).",/^update gegenstand set besitzer_id=1 where name='funkgerät'$/,"mira","Nimm mein altes Funkgerät. Vielleicht erreichst du damit jemanden.","Es knistert noch, aber es funktioniert. Danke, Mira!"],
["Der Eiskristall ist geschmolzen. Lösche ihn aus <b>gegenstand</b>.",/^delete from gegenstand where name='eiskristall'$/],
["Zeige alle Daten der Tabelle <b>person</b>.",/^select \* from person$/],
["Zeige nur Name und Beruf aller Personen.",/^select (name,beruf|beruf,name) from person$/],
["Mira: Was liegt hier herum? Zeige nur Gegenstände vom Typ 'Technik'.",/^select \* from gegenstand where typ='technik'$/,"mira","Technik ist mein Fachgebiet. Mal sehen, was es hier gibt.","Fusionszelle, Funkgerät, Navikarte. Die Fusionszelle ist der Schlüssel zum Heimflug."],
["Finde alle Personen mit dem Beruf 'Händler'.",/^select \* from person where beruf='händler'$/],
["Sortiere alle Personen nach credits absteigend.",/^select \* from person order by credits desc$/],
["Mira: Wem gehört die Fusionszelle? Zeige die besitzer_id des Gegenstands 'Fusionszelle'.",/^select besitzer_id from gegenstand where name='fusionszelle'$/,"mira","Ohne Fusionszelle fliegt hier nichts. Finde heraus, wem sie gehört.","Nummer 3: Tobo, der Händler im Eismarkt. Er verhandelt hart, aber fair."],
["Welche verschiedenen Berufe gibt es? Keine Doppelten.",/^select distinct beruf from person$/],
["Finde Personen mit credits von 100 bis 500.",/^select \* from person where credits between 100 and 500$/],
["Finde Personen, deren Name mit 'M' beginnt.",/^select \* from person where name like 'm%'$/],
["Tobo: Zeig mir, was du suchst. Finde Technik-Gegenstände mit einem Wert über 100 (AND).",/^select \* from gegenstand where typ='technik' and wert>100$/,"tobo","Ein Fremder im Eismarkt! Ich bin Tobo. Ich handle mit allem, was etwas wert ist.","Genau mein Sortiment. Die Fusionszelle ist mein Prunkstück."],
["Finde Piloten und Mechaniker (Pilotin, Mechanikerin) mit IN.",/^select \* from person where beruf in ?\(('pilotin','mechanikerin'|'mechanikerin','pilotin')\)$/],
["Welche Gegenstände gehören niemandem (besitzer_id fehlt)?",/^select \* from gegenstand where besitzer_id is null$/],
["Zeige Personenname und Gegenstandsname per JOIN (gegenstand.besitzer_id = person.id).",/^select .* from person( as)? \w+ (inner )?join gegenstand( as)? \w+ on /],
["Tobo überlässt dir die Fusionszelle als Dank für deine Hilfe am Stand. Setze besitzer_id der Fusionszelle auf 1.",/^update gegenstand set besitzer_id=1 where name='fusionszelle'$/,"tobo","Du packst gut an, Nomade. Die Fusionszelle gehört dir.","Abgemacht! Pass gut darauf auf. Ohne sie fliegt kein Schiff."],
["Wie viele Personen gibt es?",/^select count ?\(\*\) from person$/],
["Wie hoch ist der Gesamtwert aller Gegenstände?",/^select sum ?\(wert\) from gegenstand$/],
["Zeb: Wie viel ist alles wert? Zeige je besitzer_id die Summe der Werte.",/^select besitzer_id,sum ?\(wert\) from gegenstand group by besitzer_id$/,"zeb","Sauerstoff wird knapp, Kai. Ich bin Zeb und verkaufe die letzten Tanks. Rechnen wir erst mal.","Dein Besitz ist ziemlich wertvoll geworden."],
["Berechne die durchschnittlichen credits.",/^select avg ?\(credits\) from person$/],
["Bestimme den kleinsten und größten Gegenstandswert in einer Abfrage.",/^select (min ?\(wert\),max ?\(wert\)|max ?\(wert\),min ?\(wert\)) from gegenstand$/],
["Zeige je typ die Anzahl, aber nur Typen mit mehr als einem Gegenstand (GROUP BY, HAVING).",/^select typ,count ?\(\*\) from gegenstand group by typ having count ?\(\*\)>1$/],
["Zeb verkauft dir den Sauerstofftank für 80 Credits. Ziehe Kai 80 credits ab.",/^update person set credits=credits ?- ?80 where name='kai'$/,"zeb","80 Credits, dann gehört der Tank dir.","Gut geatmet ist halb gewonnen. Viel Glück!"],
["Gib alle Namen in Großbuchstaben aus.",/^select upper ?\(name\) from person$/],
["Zeige Name und Namenslänge (LENGTH).",/^select name,(char_)?length ?\(name\) from person$/],
["Mira: Beschrifte die Funkkanäle. Zeige alle Namen in Kleinbuchstaben (LOWER).",/^select lower ?\(name\) from person$/,"mira","Das Funkgerät braucht Kanalnamen, alles klein geschrieben.","Die Kanäle sind eingestellt. Jetzt muss nur noch jemand zuhören."],
["Zeige Name und credits geteilt durch 3, gerundet auf eine Stelle (ROUND).",/^select name,round ?\(credits\/3,1\) from person$/],
["Verbinde Name, ' - ' und Beruf zu einem Text (CONCAT).",/^select concat ?\(name,' - ',beruf\) from person$/],
["Zeige Gegenstandsname und besitzer_id, fehlende Werte als 0 (COALESCE).",/^select name,(coalesce|ifnull) ?\(besitzer_id,0\) from gegenstand$/],
["Sende einen Notruf an Oda: Erzeuge mit CONCAT den Text 'Notruf von ' plus Name für die Person mit id 1.",/^select concat ?\('notruf von ',name\) from person where id=1$/,"mira","Los, funk Oda an. Sie ist Pilotin im Raumhafen.","Hier Oda, ich höre dich! Komm zum Raumhafen, Kai."],
["Wer hat mehr credits als der Durchschnitt? Nutze eine Unterabfrage.",/credits>\(select avg ?\(credits\) from person\)$/],
["Zeige alle Personen mit ihren Gegenständen, auch Personen ohne Gegenstand (LEFT JOIN).",/^select .* from person( as)? \w+ left (outer )?join gegenstand( as)? \w+ on /],
["Zeige Personenname und Mondname (JOIN mit mond über mond_id).",/^select .* from person( as)? \w+ (inner )?join mond( as)? \w+ on /],
["Oda: Wer lebt auf Europa-Nova? Zeige die Namen der Personen vom Mond 'Europa-Nova' (JOIN).",/^select .* from person( as)? \w+ (inner )?join mond( as)? \w+ on .* where .*'europa-nova'$/,"oda","Ich bin Oda, Pilotin. Seit dem Absturz sitzen wir alle fest.","Nur Tobo und ich. Der Rest der Siedlung wohnt auf Kallisto-9."],
["Zähle die Gegenstände pro Person (JOIN und GROUP BY).",/^select .*count ?\(.*from person.*join gegenstand.* group by /],
["Finde Personen, die mindestens einen Gegenstand besitzen (EXISTS).",/^select .* from person.* where exists ?\(select .* from gegenstand .*\)$/],
["Oda: Welche Gegenstände sind wertvoller als Kais teuerster Besitz? Nutze eine Unterabfrage.",/^select .* from gegenstand where wert>\(select max ?\(wert\) from gegenstand where besitzer_id=1\)$/,"oda","Mein Schiff Aurora braucht einen neuen Antrieb. Was ist mehr wert als dein bester Besitz?","Die Fusionszelle schlägt alles. Mit ihr bringen wir die Aurora zum Fliegen!"],
["Erstelle <b>schiff</b> (id PK, name, pilot_id) mit Fremdschlüssel pilot_id auf person(id).",/^create table schiff ?\(.*foreign key ?\(pilot_id\) references person ?\(id\)/],
["Trage Odas Schiff in <b>schiff</b> ein: (1, 'Aurora', 4).",/^insert into schiff ?(\(.*\) ?)?values ?\(1,'aurora',4\)/,"oda","Das ist die Aurora. Alt, aber zuverlässig.","Sie ist eingetragen. Jetzt brauchen wir die Fusionszelle an Bord."],
["Erstelle <b>ladung</b> (id, schiff_id, gegenstand_id). Beim Löschen eines Schiffs sollen die Ladungen mitgelöscht werden (ON DELETE CASCADE).",/^create table ladung ?\(.*references schiff ?\(id\) on delete cascade/],
["Verlade die Fusionszelle (id 3) auf die Aurora: Füge in <b>ladung</b> (1, 1, 3) ein.",/^insert into ladung ?(\(.*\) ?)?values ?\(1,1,3\)/,"oda","Verlade die Zelle, ich prüfe den Antrieb.","Die Zelle sitzt, der Antrieb brummt. Wir sind fast startklar."],
["Erstelle <b>crew</b> (id, schiff_id, person_id). Wird eine Person gelöscht, wird person_id auf NULL gesetzt (ON DELETE SET NULL).",/^create table crew ?\(.*references person ?\(id\) on delete set null/],
["Erstelle <b>logbuch</b> (id, schiff_id, eintrag). Ändert sich die Schiff-id, soll sie mitgeändert werden (ON UPDATE CASCADE).",/^create table logbuch ?\(.*references schiff ?\(id\) on update cascade/],
["Ergänze bei <b>ladung</b> nachträglich den Constraint fk_gegenstand: gegenstand_id verweist auf gegenstand(id) mit ON DELETE RESTRICT.",/^alter table ladung add constraint \w+ foreign key ?\(gegenstand_id\) references gegenstand ?\(id\) on delete restrict/],
["Erstelle den Benutzer 'kai'@'localhost' mit dem Passwort 'heim123'.",/^create user 'kai'@'localhost' identified by '.+'$/],
["Mira soll an der Aurora arbeiten, aber nicht überall Zugriff haben. Erstelle den Benutzer 'mira'@'localhost' mit Passwort 'funk456'.",/^create user 'mira'@'localhost' identified by '.+'$/,"mira","Ich repariere die Aurora, aber bitte nur mit den Rechten, die ich dafür brauche.","Gutes Prinzip: so wenig Rechte wie nötig."],
["Erlaube kai nur SELECT auf mondnomade.person.",/^grant select on mondnomade\.person to 'kai'@'localhost'$/],
["Erlaube kai SELECT und INSERT auf mondnomade.gegenstand.",/^grant select,insert on mondnomade\.gegenstand to 'kai'@'localhost'$/],
["Gib mira SELECT und UPDATE auf mondnomade.schiff.",/^grant select,update on mondnomade\.schiff to 'mira'@'localhost'$/,"mira","Ich muss den Schiffsstatus lesen und anpassen können.","Perfekt. Jetzt kann ich die Systeme warten, ohne irgendwo Unfug anzustellen."],
["Entziehe kai das INSERT-Recht auf mondnomade.gegenstand wieder.",/^revoke insert on mondnomade\.gegenstand from 'kai'@'localhost'$/],
["Gib kai alle Rechte auf die ganze Datenbank mondnomade.",/^grant all( privileges)? on mondnomade\.\* to 'kai'@'localhost'( with grant option)?$/],
["Erstelle die View <b>reiche</b> mit allen Personen, die mehr als 200 credits haben.",/^create view reiche as select \* from person where credits>200$/],
["Frage die View <b>reiche</b> vollständig ab.",/^select \* from reiche$/],
["Bit: Lege die View <b>startbereit</b> an: Schiffsname und Pilotenname per JOIN von schiff und person.",/^create view startbereit as select .* from schiff( as)? \w+ (inner )?join person( as)? \w+ on /,"bit","Letzter Check. Ich baue dir eine Übersicht aller startbereiten Schiffe.","Übersicht bereit. Ein Blick genügt."],
["Erstelle oder ersetze die View <b>besitzer</b>: Personenname und Gegenstandsname per JOIN.",/^create or replace view besitzer as select .* from person( as)? \w+ (inner )?join gegenstand( as)? \w+ on /],
["Lösche die View <b>reiche</b>, sie wird nicht mehr gebraucht.",/^drop view( if exists)? reiche$/],
["Bit: Rufe die View <b>startbereit</b> ab.",/^select \* from startbereit$/,"bit","Frag die Übersicht ab, Kai.","Aurora, Pilotin Oda. Alles grün! Es fehlt nur noch das Ziel."],
["Letzte Aufgabe: Setze bei <b>schiff</b> die Spalte ziel auf 'Erde' für den Piloten mit pilot_id = 1.",/^update schiff set ziel='erde' where pilot_id=1$/,"oda","Alle sind an Bord, die Aurora zittert vor Startlust. Programmiere das Ziel!","Ziel Erde gesetzt. Abflug in drei, zwei, eins!"]
];

// Kanonische SQL-Befehle je Aufgabe, um den exakten Datenbankzustand bis zu Aufgabe `step` aufzubauen
const STEP_SQL = [
  [], // 0: CREATE DATABASE mondnomade
  [], // 1: USE mondnomade
  ["CREATE TABLE mond(id INT, name STRING);"], // 2
  ["CREATE TABLE person(id INT, name STRING, beruf STRING, mond_id INT, credits INT);"], // 3
  ["CREATE TABLE gegenstand(id INT, name STRING, typ STRING, wert INT, besitzer_id INT);"], // 4
  ["ALTER TABLE person ADD COLUMN sauerstoff INT;"], // 5
  [], // 6: SHOW TABLES
  ["INSERT INTO mond VALUES (1,'Kallisto-9');"], // 7
  ["INSERT INTO person(id,name,beruf,mond_id,credits) VALUES (1,'Kai','Nomade',1,100);"], // 8
  ["INSERT INTO person(id,name,beruf,mond_id,credits) VALUES (2,'Mira','Mechanikerin',1,250);"], // 9
  [
    // 3 Gegenstände laut Aufgabe 11 + zusätzliche Siedlungsdaten, die ab Kapitel 3 abgefragt werden
    "INSERT INTO gegenstand VALUES (1,'Raumanzug','Ausrüstung',300,1),(2,'Funkgerät','Technik',150,2),(3,'Fusionszelle','Technik',500,3);",
    "INSERT INTO gegenstand VALUES (4,'Sauerstofftank','Ausrüstung',80,5),(5,'Navikarte','Technik',120,4),(6,'Eiskristall','Rohstoff',40,NULL);",
    "INSERT INTO mond VALUES (2,'Europa-Nova');",
    "INSERT INTO person VALUES (3,'Tobo','Händler',2,900,100),(4,'Oda','Pilotin',2,400,100),(5,'Zeb','Händler',1,50,100);"
  ], // 10
  ["UPDATE person SET credits = credits + 50 WHERE name='Kai';"], // 11
  ["UPDATE gegenstand SET besitzer_id = 1 WHERE name='Funkgerät';"], // 12
  ["DELETE FROM gegenstand WHERE name='Eiskristall';"], // 13
  [], [], [], [], [], [], [], [], [], [], [], [], [], // 14-26: SELECTs
  ["UPDATE gegenstand SET besitzer_id = 1 WHERE name='Fusionszelle';"], // 27
  [], [], [], [], [], [], // 28-33: SELECTs
  ["UPDATE person SET credits = credits - 80 WHERE name='Kai';"], // 34
  [], [], [], [], [], [], [], [], [], [], [], [], [], [], // 35-48: SELECTs
  ["CREATE TABLE schiff(id INT, name STRING, pilot_id INT, ziel STRING);"], // 49
  ["INSERT INTO schiff(id,name,pilot_id) VALUES (1,'Aurora',4);"], // 50
  ["CREATE TABLE ladung(id INT, schiff_id INT, gegenstand_id INT);"], // 51
  ["INSERT INTO ladung(id,schiff_id,gegenstand_id) VALUES (1,1,3);"], // 52
  ["CREATE TABLE crew(id INT, schiff_id INT, person_id INT);"], // 53
  ["CREATE TABLE logbuch(id INT, schiff_id INT, eintrag STRING);"], // 54
  [], // 55: ALTER TABLE ladung ADD CONSTRAINT
  [], [], [], [], [], [], [], // 56-62: CREATE USER / GRANT / REVOKE
  ["DROP VIEW IF EXISTS reiche; CREATE VIEW reiche AS SELECT * FROM person WHERE credits > 200;"], // 63
  [], // 64: SELECT * FROM reiche
  ["DROP VIEW IF EXISTS startbereit; CREATE VIEW startbereit AS SELECT s.name AS schiff, p.name AS pilot FROM schiff s JOIN person p ON s.pilot_id = p.id;"], // 65
  ["DROP VIEW IF EXISTS besitzer; CREATE VIEW besitzer AS SELECT p.name AS person, g.name AS gegenstand FROM person p JOIN gegenstand g ON g.besitzer_id = p.id;"], // 66
  ["DROP VIEW IF EXISTS reiche;"], // 67
  [], // 68: SELECT * FROM startbereit
  ["UPDATE schiff SET ziel='Erde' WHERE pilot_id=1;"] // 69
];

function rebuildDB(step){
 if(!window.alasql) return;
 try{
  const views = ["reiche","startbereit","besitzer"];
  views.forEach(v => { try{ alasql("DROP VIEW IF EXISTS " + v); }catch(e){} });
  const tables = ["logbuch","crew","ladung","schiff","gegenstand","person","mond"];
  tables.forEach(t => { try{ alasql("DROP TABLE IF EXISTS " + t); }catch(e){} });

  const limit = Math.min(Math.max(0, step), STEP_SQL.length);
  for(let s = 0; s < limit; s++){
   const stmts = STEP_SQL[s] || [];
   for(const sql of stmts){
    try{ alasql(sql); }catch(e){}
   }
  }
 }catch(e){console.error(e)}
}

let i=0;try{i=+localStorage.getItem("mondsql")||0}catch(e){}
rebuildDB(i);

const $=id=>document.getElementById(id);
const nm=s=>s.trim().replace(/;+\s*$/,"").replace(/\s+/g," ").replace(/"/g,"'").toLowerCase().replace(/\s*,\s*/g,",").replace(/\(\s+/g,"(").replace(/\s+\)/g,")").replace(/\s*(=|<|>)\s*/g,"$1");
const esc=s=>String(s??"NULL").replace(/[&<]/g,c=>c=="&"?"&amp;":"&lt;");
function save(){try{localStorage.setItem("mondsql",i)}catch(e){}}
const note=t=>{$("im").textContent=t};
async function ex(){
 const j=JSON.stringify({spiel:"sql-mond",version:1,aufgabe:i,gespeichert:new Date().toISOString()},null,2);
 let d=null;try{d=await claude.use("downloads")}catch(e){}
 if(d){try{await d.save({filename:"sql-mond-spielstand.json",data:j});note("Spielstand exportiert.");return}catch(e){if(e&&e.code=="declined"){note("Export abgebrochen.");return}}}
 $("io").style.display="block";$("it").value=j;note("Direkter Download nicht verfügbar. Kopiere den Text und speichere ihn als .json-Datei.");
}
function ld(t){
 try{const o=JSON.parse(t),n=o&&o.spiel=="sql-mond"?Number(o.aufgabe):NaN;
  if(!Number.isInteger(n)||n<0||n>70)throw 0;
  i=n;save();rebuildDB(i);clearSelectView();draw();note("Spielstand geladen: Aufgabe "+Math.min(i+1,70)+" von 70.")}
 catch(e){note("Ungültiger Spielstand. Die Datei muss ein SQL-Mond-Export sein.")}
}
function im(f){const r=new FileReader();r.onload=()=>ld(r.result);r.onerror=()=>note("Datei konnte nicht gelesen werden.");if(f.files[0])r.readAsText(f.files[0]);f.value=""}
function rs(){i=0;save();rebuildDB(0);clearSelectView();draw()}
const NM={bit:"Bit",mira:"Mira",tobo:"Tobo",oda:"Oda",zeb:"Zeb"};
const PC={kai:["#f59e0b",'<path d="M-6-16l-4-10" stroke="#e5e7eb" stroke-width="2"/>'],mira:["#34d399",'<rect x="14" y="22" width="4" height="24" fill="#9ca3af" transform="rotate(20 16 34)"/>'],tobo:["#a78bfa",'<rect x="-24" y="12" width="12" height="28" rx="4" fill="#6d28d9"/>'],oda:["#60a5fa",'<rect x="-9" y="-21" width="18" height="6" rx="2" fill="#1d4ed8"/>'],zeb:["#f87171",'<rect x="-22" y="10" width="9" height="30" rx="4" fill="#e5e7eb"/>']};
function sp(k,x,f){const t=`translate(${x} 70)${f?" scale(-1 1)":""}`;
 if(k=="bit")return `<g transform="${t}"><path d="M0-8v-12" stroke="#9ca3af" stroke-width="2"/><circle cy="-22" r="3" fill="#6ee7d8"/><rect x="-16" y="-8" width="32" height="30" rx="6" fill="#9ca3af"/><circle cx="-6" cy="4" r="4" fill="#0b1020"/><circle cx="6" cy="4" r="4" fill="#0b1020"/><circle cx="-5" cy="3" r="1.5" fill="#6ee7d8"/><circle cx="7" cy="3" r="1.5" fill="#6ee7d8"/><rect x="-10" y="24" width="20" height="6" rx="3" fill="#6b7280"/><rect x="-12" y="31" width="24" height="3" fill="#6ee7d8" opacity=".5"/></g>`;
 const [c,a]=PC[k];
 return `<g transform="${t}"><rect x="-10" y="40" width="8" height="22" rx="3" fill="#1f2937"/><rect x="2" y="40" width="8" height="22" rx="3" fill="#1f2937"/>${a.includes("rotate")?"":a}<rect x="-14" y="10" width="28" height="34" rx="8" fill="${c}"/>${a.includes("rotate")?a:""}<circle r="16" fill="#e5e7eb"/><ellipse cx="3" cy="1" rx="10" ry="8" fill="#0b2b3a"/><ellipse cx="6" cy="-2" rx="3" ry="2" fill="#7dd3fc"/>${k=="kai"||k=="oda"?a:""}</g>`}
const PR={wreck:'<g transform="rotate(-12 200 112)"><path d="M160 118l20-36h50l12 36z" fill="#475569"/><rect x="190" y="92" width="14" height="10" fill="#7dd3fc"/><path d="M168 112l-14 8 18 2z" fill="#f97316"/></g>',rocks:'<path d="M150 118l10-18 14 6 8 12zM230 118l8-24 16 10 4 14z" fill="#4b5563"/>',dome:'<path d="M150 118a50 50 0 0 1 100 0z" fill="#94a3b8"/><path d="M162 118a38 38 0 0 1 76 0z" fill="#7dd3fc" opacity=".35"/><rect x="190" y="100" width="20" height="18" rx="3" fill="#334155"/>',tower:'<path d="M280 118l8-60 8 60z" fill="#64748b"/><circle cx="288" cy="56" r="4" fill="#6ee7d8"/><path d="M276 62q12-14 24 0" stroke="#6ee7d8" fill="none"/>',rocket:'<path d="M196 118V62Q196 40 212 24Q228 40 228 62V118z" fill="#e5e7eb"/><circle cx="212" cy="58" r="7" fill="#38bdf8"/><path d="M196 100l-14 18h14zM228 100l14 18h-14z" fill="#f87171"/>'};
const PB=[["wreck"],["wreck"],["rocks"],["dome"],["dome"],["tower"],["dome","tower"],["rocket"],["rocket","tower"],["rocket"]];
function scene(c,who){let s='<svg viewBox="0 0 400 150" style="width:100%;border-radius:12px;display:block"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050816"/><stop offset="1" stop-color="#25306b"/></linearGradient></defs><rect width="400" height="150" fill="url(#g)"/>';
 for(let n=0;n<34;n++)s+=`<circle cx="${(n*97)%400}" cy="${(n*53)%100}" r="${n%3?0.8:1.4}" fill="#fff" opacity=".${5+n%4}"/>`;
 const r=10+c*1.6;
 s+=`<circle cx="350" cy="30" r="${r+5}" fill="#3b82f6" opacity=".2"/><circle cx="350" cy="30" r="${r}" fill="#2f6fd6"/><ellipse cx="${350-r*.3}" cy="${30-r*.2}" rx="${r*.4}" ry="${r*.25}" fill="#4ade80"/><path d="M0 118Q100 108 200 116T400 114V150H0z" fill="#6b7280"/><ellipse cx="60" cy="136" rx="14" ry="3" fill="#4b5563"/><ellipse cx="260" cy="140" rx="20" ry="4" fill="#4b5563"/>`;
 PB[c].forEach(k=>s+=PR[k]);
 return s+sp("kai",70,0)+sp(who,330,1)+"</svg>"}
const bub=(w,t)=>"<div class='bub'><b>"+NM[w]+":</b> "+t+"</div>";

function renderTableHtml(res){
 if(!Array.isArray(res)) return "<p class='affected-info'>✓ Abfrage ausgeführt.</p>";
 if(res.length === 0) return "<p class='affected-info'>0 Zeilen zurückgegeben (leeres Ergebnis).</p>";
 if(typeof res[0] !== "object") return "<p class='affected-info'>"+esc(res.join(", "))+"</p>";
 const keys = Object.keys(res[0]);
 return "<div class='res'><table><tr>"+
  keys.map(x=>"<th>"+esc(x)+"</th>").join("")+
  "</tr>"+
  res.map(o=>"<tr>"+keys.map(x=>"<td>"+esc(o[x])+"</td>").join("")+"</tr>").join("")+
  "</table></div>";
}

function clearSelectView(){
 $("select-view").style.display="none";
 $("select-query-label").textContent="";
 $("select-out").innerHTML="";
}

function executeSelectPreview(rawQuery){
 const cleanedQuery = rawQuery.trim().replace(/;+\s*$/,"");
 if(!/^(select|with|show)\s/i.test(cleanedQuery)) return false;
 $("select-view").style.display="block";
 $("select-query-label").textContent=cleanedQuery+";";
 if(!window.alasql){
  $("select-out").innerHTML="<p style='color:var(--er);margin:6px 0 0'>SQL-Engine noch nicht geladen.</p>";
  return true;
 }
 try{
  const res = alasql(cleanedQuery);
  $("select-out").innerHTML = renderTableHtml(res);
 }catch(e){
  $("select-out").innerHTML = "<p style='color:var(--er);margin:6px 0 0'>SQL-Fehler: "+esc(e.message||e)+"</p>";
 }
 return true;
}

function draw(){
 $("pb").style.width=i*100/70+"%";
 if(i>=70){$("ch").textContent="Geschafft";$("nr").textContent="70 / 70";
  $("app").innerHTML=scene(9,"oda")+"<div class='card story'><h2>🌍 Willkommen zu Hause!</h2><p>Die Aurora hebt ab. Die Fusionszelle summt, Bit zählt den Countdown, und hinter euch schrumpft Kallisto-9 zu einem grauen Punkt. Mira, Tobo und Zeb winken am Raumhafen. Du hast eine Datenbank gebaut, gefüllt, abgefragt, abgesichert und mit Views versehen. Kai, der Weltraumnomade, ist zurück auf der Erde.</p></div>";return}
 const c=Math.floor(i/7),t=T[i],w=t[2]||CH[c][2];
 $("ch").textContent="Kapitel "+(c+1)+": "+CH[c][0];$("nr").textContent="Aufgabe "+(i+1)+" / 70";
 $("app").innerHTML=scene(c,w)+(i%7==0?"<div class='card story'>"+CH[c][1]+"</div>":"")+(t[3]?bub(w,t[3]):"")+"<div class='card task'><b>Aufgabe "+(i+1)+":</b> "+t[0]+"</div><textarea id='q' spellcheck='false' placeholder='SQL hier eingeben …'></textarea><div><button onclick='go()'>Ausführen</button></div><div id='msg' class='card' style='display:none'></div>";
}
function say(h,k){const m=$("msg");m.style.display="block";m.className="card "+k;m.innerHTML=h}
function go(){
 const raw=$("q").value,s=nm(raw);
 if(!s){say("Gib zuerst eine Anweisung ein.","er");return}

 // Jede SELECT- (oder SHOW-/WITH-)Abfrage beim Klick auf "Ausführen" sofort im dauerhaften Bereich anzeigen
 const isSelectQuery = executeSelectPreview(raw);

 if(!T[i][1].test(s)){
  const hint = isSelectQuery
   ? "Deine SELECT-Ausgabe siehst du unten. Für die aktuelle Aufgabe passt die Anweisung aber noch nicht ganz – prüfe Tabellen, Spalten und Schlüsselwörter."
   : "Das passt noch nicht ganz zur Aufgabe. Prüfe Tabellen, Spalten und Schlüsselwörter und versuche es noch einmal.";
  say(hint,"er");
  return;
 }

 // DB auf aktuellen Aufgabenstand synchronisieren, damit genau die Aktion des Spielers angewendet wird
 rebuildDB(i);

 let out="";
 if(window.alasql){
  try{
   const cleanedQuery = raw.trim().replace(/;+\s*$/,"");
   // Falls der Spieler bei Aufgabe 11 (3 Gegenstände einfügen) eigene Werte nutzt, zuerst seine Abfrage ausführen
   // und fehlende Siedlungsdaten für spätere Kapitel ergänzen, sofern es kein SELECT ist
   const res = alasql(cleanedQuery);
   
   if(i === 10){
    // Sicherstellen, dass die übrigen Siedlungs- und Gegenstandsdaten für die Folgeaufgaben vorhanden sind,
    // ohne die vom Spieler eingefügten Zeilen zu überschreiben
    try{ alasql("INSERT INTO mond VALUES (2,'Europa-Nova');"); }catch(e){}
    try{ alasql("INSERT INTO person VALUES (3,'Tobo','Händler',2,900,100),(4,'Oda','Pilotin',2,400,100),(5,'Zeb','Händler',1,50,100);"); }catch(e){}
    const existingIds = new Set((alasql("SELECT id FROM gegenstand")||[]).map(r=>r.id));
    const defaults = [
     [1,"Raumanzug","Ausrüstung",300,1],
     [2,"Funkgerät","Technik",150,2],
     [3,"Fusionszelle","Technik",500,3],
     [4,"Sauerstofftank","Ausrüstung",80,5],
     [5,"Navikarte","Technik",120,4],
     [6,"Eiskristall","Rohstoff",40,null]
    ];
    for(const [id,name,typ,wert,bid] of defaults){
     if(!existingIds.has(id)){
      alasql("INSERT INTO gegenstand VALUES (?,?,?,?,?)",[id,name,typ,wert,bid]);
     }
    }
   }

   if(isSelectQuery){
    // Vorschau unten aktualisieren (falls sich durch den Befehl etwas ergeben hat)
    executeSelectPreview(raw);
   }

   if(Array.isArray(res)){
    if(res.length > 0 && typeof res[0] === "object"){
     const keys = Object.keys(res[0]);
     out = "<div class='res'><table><tr>"+keys.map(x=>"<th>"+esc(x)+"</th>").join("")+"</tr>"+res.map(o=>"<tr>"+keys.map(x=>"<td>"+esc(o[x])+"</td>").join("")+"</tr>").join("")+"</table></div>";
    } else {
     out = "<p class='affected-info'>Anfrage erfolgreich ausgeführt (0 Zeilen zurückgegeben / leeres Ergebnis).</p>";
    }
   } else if (typeof res === "number") {
    out = "<p class='affected-info'>✓ Anweisung erfolgreich ausgeführt (" + res + " Zeile(n) betroffen).</p>";
   } else {
    out = "<p class='affected-info'>✓ Anweisung erfolgreich ausgeführt.</p>";
   }
  }catch(e){
   // Fallback auf kanonischen Zustand nach Abschluss von Aufgabe i, falls die SQL-Syntax (z. B. CREATE VIEW/USER/GRANT)
   // von AlaSQL nicht direkt unterstützt wird
   rebuildDB(i + 1);
   out = "<p class='affected-info'>✓ Anweisung syntaktisch akzeptiert.</p>";
  }
 }
 say("✓ Richtig!"+(T[i][4]?bub(T[i][2],T[i][4]):"")+out+"<br/><button onclick='nx()'>Weiter</button>","ok");
}
function nx(){i++;save();rebuildDB(i);draw()}
draw();
