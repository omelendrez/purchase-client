import HTTP from '../../components/lib/http-common'

const list = []
// list.push('#,Vendor Code,SUPPLIER NAME,Email Address,CONTACT #,CONTACT PERSON,Remarks,Address')
list.push('1,FLPV001,ABV Logistics,info@abvlogistics.com,572-4313; 526-5878,GLEN VALENCIANO,Rolling Cargo,Metro Manila Philippines')
list.push('2,FLPV002,Ace Print Master,info@aceprintmaster.com,8092569,KAT,Risograph,Metro Manila Philippines')
list.push('3,FLPV003,Alabang Country Club,info@alabangcountryclub.com,807-0338; loc. 164;169;137,JULIE,events,Metro Manila Philippines')
list.push('4,FLPV004,alpha diversified services,info@alphadiversifiedservices.com,359-1395/710-9606/994-0400 fax 951-4867,GEORGE MALIG,container van,Metro Manila Philippines')
list.push('5,FLPV005,Alpha Steel,info@alphasteel.com,735-5571,EVELYN DELA CRUZ,Filing Cabinets,Metro Manila Philippines')
list.push('6,FLPV006,AMTI,info@amti.com,718-7388 loc. 4202,JENNIFER JAYME,,Metro Manila Philippines')
list.push('7,FLPV007,Basic  Box,info@basicbox.com,825-7002, ,Boxes,Metro Manila Philippines')
list.push('8,FLPV008,Automatic Center (ATC),info@automaticcenteratc.com,772-3684; 807-1421,ELMA, ,Metro Manila Philippines')
list.push('9,FLPV009,Box maderush,info@boxmaderush.com,800-3627/09292936016,SAMM,Boxes,Metro Manila Philippines')
list.push('10,FLPV010,BPI MS,info@bpims.com,840-9000; 840-9416,SILVESTER ,car insurance,Metro Manila Philippines')
list.push('11,FLPV011,BPI Rental,info@bpirental.com,845-5757; 845-5906,DAISY PIMENTEL,car rental,Metro Manila Philippines')
list.push('12,FLPV012,bpims,info@bpims.com,502-4264,REGINA,car insurance,Metro Manila Philippines')
list.push('13,FLPV013,Classy Glassy,info@classyglassy.com,562-9653; 338-8615,CHARIE /TESSA,glass trophy,Metro Manila Philippines')
list.push('14,FLPV014,CTI,info@cti.com,524-0393-94;fax:400-4729-30,GIRLIE,Seagate sata,Metro Manila Philippines')
list.push('15,FLPV015,Clixlogic,info@clixlogic.com,951-9661; 932-1572,MARIE NAVARRO,,Metro Manila Philippines')
list.push('16,FLPV016,Daily Inquirer,info@dailyinquirer.com,897-8808 loc. 514/516; 8978425,GLORY IBAYAN,Newspaper ad,Metro Manila Philippines')
list.push('17,FLPV017,Data Computer Forms,info@datacomputerforms.com,718-1888; 531-1376,,Payslips,Metro Manila Philippines')
list.push('18,FLPV018,DDC,info@ddc.com, 928-4942/4354300 Telefax:738-2160,JEN/ARNOLD,,Metro Manila Philippines')
list.push('19,FLPV019,Delsan ,info@delsan.com,895-5783; Fax No.: 890-3079,JENNIFER,\'toner (FX 9, HP 2300)\',Metro Manila Philippines')
list.push('20,FLPV020,EDS Innoventions,graciella_lambojo@yahoo.com,913-8669 / 913-5787,REY/IYA,HR Software,Metro Manila Philippines')
list.push('21,FLPV021,Emma\'s flower shop ,info@emma\'sflowershop.com,809-1573,ROBERT PELATE,Spray flowers,Metro Manila Philippines')
list.push('22,FLPV022,Entom,info@entom.com,8091666;8091685;8500276,MAY MABIOG;CYNTHIA ALMA,pest control,Metro Manila Philippines')
list.push('23,FLPV023,Eclusively His,info@eclusivelyhis.com,807-6918,RICCY/TINA,male uniform,Metro Manila Philippines')
list.push('23,FLPV024,E-Plus Stationery,info@eplusstationery.com,241-0065; 241-0832,MYRNA,Office supplies/ms. Anna,Metro Manila Philippines')
list.push('24,FLPV025,ERR Kool,info@errkool.com,809-0597; 809-4896,REY TIAMSON,Aircon maintenance,Metro Manila Philippines')
list.push('25,FLPV026,Full Color,info@fullcolor.com,382-4438; 829-9073; 09196307426,ALDO OBUSAN,\'CO, OR, risograph\',Metro Manila Philippines')
list.push('26,FLPV027,FAMILIA,info@familia.com,820-0704/820-0744/383-4632FAX#:820-0756,MS. MYLA/LORIE,Housekeeping supplies,Metro Manila Philippines')
list.push('27,FLPV028,Gotuaco del Rosario,info@gotuacodelrosario.com,888-0001; 888-0010 loc. 830,TESS VILLAR,car insurance,Metro Manila Philippines')
list.push('28,FLPV029,Grand Pest Control,info@grandpestcontrol.com,852-4456; 512-8049,GIL CASTEL,monthly pest control,Metro Manila Philippines')
list.push('29,FLPV030,Gruppo,info@gruppo.com,455-3689/494-6956/358-1094,SHALIMAR,,Metro Manila Philippines')
list.push('30,FLPV031,Greenfuel,info@greenfuel.com,535-9080/994-3348,JUN,Conversion to LPG,Metro Manila Philippines')
list.push('31,FLPV032,Hot & Cold water dispenser repair,info@hot&coldwaterdispenserrepair.com,850-4822,LYLA,water dispenser repair,Metro Manila Philippines')
list.push('32,FLPV033,Infinite Service Center,info@infiniteservicecenter.com,556-5035/556-5037,MS. APRILE,Biometrics/door access system,Metro Manila Philippines')
list.push('32,FLPV034,Infinite Systems,info@infinitesystems.com,892-9073,MADEL MARTINEZ/CHERRY,Biometrics,Metro Manila Philippines')
list.push('33,FLPV035,J&d iworx,info@j&diworx.com,9228835435;Tefax:846-0966,LYSA,office equipments,Metro Manila Philippines')
list.push('34,FLPV036,Janrey,info@janrey.com,682-1614,NENA NARTATEZ,Filing Cabinets,Metro Manila Philippines')
list.push('35,FLPV037,JJED Phils.,info@jjedphils.com,534-3869; 535-0159,WALLY CASTRO,paper towels & bathroom tissue,Metro Manila Philippines')
list.push('36,FLPV038,JobsDB,info@jobsdb.com,914-8000,,internet job advertisement,Metro Manila Philippines')
list.push('37,FLPV039,Jobstreet,info@jobstreet.com,451-9999,MARIGOLD,internet job advertisement,Metro Manila Philippines')
list.push('38,FLPV040,L.A. Car Accessories and Tint Room ,info@lacaraccessoriesandtintroom.com,817-8617,,Auto tint / accessories,Metro Manila Philippines')
list.push('39,FLPV041,Landco,info@landco.com,836-5008,,,Metro Manila Philippines')
list.push('40,FLPV042,\'Leather One Auto Seats, Inc\',info@leatheroneautoseatsinc.com,556-0956,MARC FRIAS,Leather Seatcover,Metro Manila Philippines')
list.push('41,FLPV043,Ligalas Printing Press,info@ligalasprintingpress.com,5201376;09085429562,GRACE SANTOS;ALLAN,Printing Press,Metro Manila Philippines')
list.push('42,FLPV044,luxaire,info@luxaire.com,809-0597,TESS,Aircon maintenance,Metro Manila Philippines')
list.push('43,FLPV045,Manila Bulletin,info@manilabulletin.com,772-1901,BELLE LAYUGAN,job posting,Metro Manila Philippines')
list.push('44,FLPV046,meco technologies inc.,info@mecotechnologiesinc.com,8975724 fax 895-8067,CHARLIE,,Metro Manila Philippines')
list.push('45,FLPV047,Medicard Alabang,info@medicardalabang.com,840-4116,JENNIFER AMA,pre-employmenr medical,Metro Manila Philippines')
list.push('46,FLPV048,meralco,info@meralco.com, 1628888 ;16211,,,Metro Manila Philippines')
list.push('47,FLPV049,Metro Manila Carpet,info@metromanilacarpet.com,853-5292; 851-7506,WENG ; RACHELLE,carpet (3B),Metro Manila Philippines')
list.push('48,FLPV050,Mica Printing,info@micaprinting.com,805-1975,DEBBIE VALEMOR,PRS ,Metro Manila Philippines')
list.push('49,FLPV051,Mirof Resources Inc.,info@mirofresourcesinc.com,750-7269; 816-0484,JINKY MAYOL ; DENVIE SY,manpower provider,Metro Manila Philippines')
list.push('50,FLPV052,Microgenesis,info@microgenesis.com,750-7000loc.131,DINNA,laptop,Metro Manila Philippines')
list.push('51,FLPV053,Modern Business Methods,info@modernbusinessmethods.com,722-4437; 722-4227,WILS,Loeff\'s boxes,Metro Manila Philippines')
list.push('52,FLPV054,Newtrends,info@newtrends.com,894-2035 loc.306/0917-5228708,PAULA FRANCO,timex watch,Metro Manila Philippines')
list.push('53,FLPV055,Northgate,info@northgate.com, 724-4347/724-4387/724-4405 Fax: 721-5847,CARLOBALIDO,laptop,Metro Manila Philippines')
list.push('54,FLPV056,Office Master,info@officemaster.com,309-1291/242-1085,MHAILA,Office supplies,Metro Manila Philippines')
list.push('55,FLPV057,Office Warehouse,info@officewarehouse.com,8506854,GIBSON,\'laptop, Printer etc.\',Metro Manila Philippines')
list.push('56,FLPV058,Parque España,info@parqueespaña.com,850-5847; 850-5661,ANNE SALAZAR,hotel,Metro Manila Philippines')
list.push('57,FLPV059,Peron Water Station,info@peronwaterstation.com,09186485082,ALLAN,mineral water,Metro Manila Philippines')
list.push('58,FLPV060,PESO resources,info@pesoresources.com,927-9040; 928-1146;436-0048hr:436-0174,JACQ SOLIDUM,manpower provider,Metro Manila Philippines')
list.push('59,FLPV061,Phil. Daily Inquirer,info@phildailyinquirer.com,897-8808,CARLO,job posting,Metro Manila Philippines')
list.push('60,FLPV062,Philcopy,info@philcopy.com,899-8625/8998417,GRACE,kyocera toner,Metro Manila Philippines')
list.push('61,FLPV063,Philstar,info@philstar.com,527-7901 loc. 138;527-2385,MS. NONI,Newspaper ad,Metro Manila Philippines')
list.push('62,FLPV064,Pioneer Insurance,info@pioneerinsurance.com,817-1461,,cahier & collector\'s bond,Metro Manila Philippines')
list.push('63,FLPV065,pldt,info@pldt.com,177,,,Metro Manila Philippines')
list.push('64,FLPV066,PLDT,info@pldt.com,885-9860,ANTONIO CORONEL,telephone provider,Metro Manila Philippines')
list.push('65,FLPV067,prds(peso),info@prdspeso.com,9159881249,MAYLEE OLAGUER,mayoosias@yahoo.com,Metro Manila Philippines')
list.push('66,FLPV068,Printhub,info@printhub.com,519-5077,VALENTINE,\'PVC ID,Lace, Case\',Metro Manila Philippines')
list.push('67,FLPV069,Prodatanet,info@prodatanet.com,301-1040; 879-8455,CARRY,internet provider,Metro Manila Philippines')
list.push('68,FLPV070,Robert Dimacali (couturier),info@robertdimacalicouturier.com,987-5956; 890-9087,ROBERT DIMACALI,uniform,Metro Manila Philippines')
list.push('69,FLPV071,santillan glass & aluminum services,info@santillanglass&aluminumservices.com,049-5989/827-8662/09391831677/09167228226/09214939891,BRENNA SANTILLAN/ JONATHAN MASALING,,Metro Manila Philippines')
list.push('70,FLPV072,Silicon Valley,info@siliconvalley.com,807-9372; 806-9595,RIZZA,toner,Metro Manila Philippines')
list.push('71,FLPV073,smallvile,info@smallvile.com,474-7757/782-9060,MIJEL/JONNA/LEZYL,\'CCTV,Battery of laptop\',Metro Manila Philippines')
list.push('72,FLPV074,solar water,info@solarwater.com,510-2633/ 0920-2167753,MR. JUANCHO,repair of container van,Metro Manila Philippines')
list.push('73,FLPV075,southland graphics,info@southlandgraphics.com,782-7553,TESS,letterhead,Metro Manila Philippines')
list.push('74,FLPV076,St. Stoika Tailor Shop,info@ststoikatailorshop.com,507-4135,BOY MANANGAN,uniform,Metro Manila Philippines')
list.push('75,FLPV077,standard insurance co. inc,info@standardinsurancecoinc.com,772-6573 to 75,CRISTY,car insurance,Metro Manila Philippines')
list.push('76,FLPV078,Straceworks ,info@straceworks.com,408-4692,STEIN HENRY,calling cards,Metro Manila Philippines')
list.push('77,FLPV079,SUTECON,info@sutecon.com,bbbvn,ALLAN,pest control,Metro Manila Philippines')
list.push('78,FLPV080,Terminix,info@terminix.com,850-1645 loc.1201,KEVIN,pest control,Metro Manila Philippines')
list.push('79,FLPV081,timberpro8267201,info@timberpro.com,8267201;8200783fax#8267253;478-8028,DIANNE,pest control,Metro Manila Philippines')
list.push('80,FLPV082,\'TopBest Pest Services, Inc.\',info@topbestpestservicesinc.com,861-1921/775-9198/369-5260,MS. RITA/JOAN,pest control,Metro Manila Philippines')
list.push('80,FLPV083,Toyota Bicutan,info@toyotabicutan.com,777-9500loc.8077,MARCELINO GALIDO,insurance head,Metro Manila Philippines')
list.push('81,FLPV084,TQM,info@tqm.com,254-7911 to 15;254-8018;536-3242 fax#254-3530,\'MIDA,VINCE\',\'admin,technical\',Metro Manila Philippines')
list.push('82,FLPV085,tribeca,info@tribeca.com,842-8000,CINDY,condo units,Metro Manila Philippines')
list.push('83,FLPV086,TRIi,info@trii.com,230-8777/480-0777/230-8754 loc.511 fax:241-9807,CRIS DE LUNA,cyberoam,Metro Manila Philippines')
list.push('84,FLPV087,Trusteeclean,info@trusteeclean.com,346-4153,DINDO CLEOFAS,carpet & partition cleaning,Metro Manila Philippines')
list.push('85,FLPV088,V-craft,info@vcraft.com,920-0484; 928-6458,SUSAN SILVA,Sympathy Cards,Metro Manila Philippines')
list.push('86,FLPV089,Viscarpet,info@viscarpet.com,994-4241;517-6186;;09282435585; 09282474564 ,,,Metro Manila Philippines')
list.push('87,FLPV090,Winterpine  / R System,info@winterpinersystem.com,8073733 / 7723491,LARRY / MARLON,Auto tint / accessories,Metro Manila Philippines')
list.push('88,FLPV091,WWW Express (DHL),info@wwwexpressdhl.com,879-8888 dial 2,MELITON,courier,Metro Manila Philippines')
list.push('89,FLPV092,Zone guard,info@zoneguard.com,09178729939;6644792,NOY CINCO,pest control,Metro Manila Philippines')
list.push('90,FLPV093,Toyota Bicutan-car maintenance,info@toyotabicutancarmaintenance.com,777-9500 loc 8057/ fax 777-9484.,MARVY/ANJ,car maintenance,Metro Manila Philippines')

const importData = () => {
  for (let i = 0; i < list.length; i++) {
    const row = list[i].split(',')
    const item = {
      code: row[1],
      name: row[2],
      email: row[3],
      phone: row[4],
      contact: row[5],
      remarks: row[6],
      address: row[7],
      organization_id: 3
    }
    HTTP.post('vendors', item)
  }
}


export {
  importData as default
}
