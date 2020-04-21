const axios = require('axios')
const sleep = require('sleep-promise');
const xlsx =require('xlsx')
const cheerio =require('cheerio')

const numbers = [
    '6474582283',
    '4038924215',
    '4038012751',
    '4188601227',
    '7803280955',
    '7808310607',
    '8678738116',
    '9056411097',
    '7786533276',
    '5142785631',
    '9056176642',
    '4164649974',
    '5067895961',
    '7095675672',
    '6044744858',
    '2047873721',
    '6049283723',
    '2502585608',
    '7097635152',
    '2894564709',
    '5148148598',
    '4034732933',
    '4163154299',
    '5066232323',
    '4508803020',
    '4168857095',
    '7056741000',
    '6049983980',
    '5196856256',
    '8195394160',
    '5143780249',
    '5066486679',
    '6474440058',
    '9058613502',
    '8192173335',
    '4168232963',
    '2892060065',
    '6043364988',
    '8673607384',
    '4168349020',
    '7787380377',
    '4507528282',
    '9026285277',
    '3067176518',
    '9024681711',
    '5877172278',
    '7057155589',
    '6048085680',
    '4165589444',
    '7803065885',
    '5145854912',
    '2509198155',
    '4164017999',
    '4165711590',
    '5142874392',
    '5065333432',
    '6132295959',
    '5147420557',
    '4028611400',
    '9053903532',
    '4033924151',
    '4189321136',
    '3067132375',
    '3066550702',
    '9053349195',
    '5064444689',
    '7055329921',
    '5147724914',
    '7097703659',
    '8194324228',
    '7095872949',
    '6474096888',
    '7097260715',
    '6473026097',
    '6136181854',
    '5149916111',
    '2042893033',
    '4319961400',
    '4033608077',
    '7809354600',
    '7094540139',
    '9053286978',
    '5142868324',
    '6047796768',
    '7783897408',
    '4188399959',
    '4167715954',
    '5149448543',
    '4168781399',
    '4165595353',
    '2269310828',
    '7807927356',
    '4506887498',
    '5149727531',
    '2269220985',
    '8676881957',
    '9028636243',
    '4039803070',
    '9026949699',
    '9029541737',
    '9023947442',
    '6046645814',
    '5146333034',
    '2895974365',
    '5149984999',
    '4503706176',
    '9052470530',
    '5194392525',
    '8194413209',
    '5149140863',
    '6478696627',
    '5147006280',
    '6138857365',
    '8196717857',
    '2263189805',
    '2049973967',
    '4189863270',
    '5147342612',
    '4188491819',
    '2502159256',
    '2047971995',
    '5816684737',
    '6477005484',
    '5067384061',
    '5142501802',
    '4503680488',
    '4167456061',
    '7097653734',
    '6473463929',
    '6472063730',
    '4169447048',
    '7803495936',
    '7809159529',
    '8676675600',
    '5146386158',
    '5148635765',
    '4032477835',
    '4189865455',
    '7054818198',
    '2266360182',
    '4032717765',
    '8079280016',
    '4188330657',
    '2892980115',
    '6475750043',
    '2504987643',
    '3065654815',
    '7782985073',
    '9059614686',
    '4167019771',
    '6132062859',
    '7053441348',
    '6136045638',
    '4032543930',
    '7095720793',
    '7054933948',
    '4038158185',
    '7782516457',
    '6472416652',
    '7057064743',
    '4506871510',
    '7603428100',
    '6139202469',
    '5145617205',
    '5149926094',
    '7057300011',
    '2899231381',
    '7787732903',
    '4502101296',
    '4247021234',
    '8197572864',
    '7806954877',
    '4166784838',
    '7802991169',
    '4168940047',
    '8193247072',
    '4185591527',
    '5149771590',
    '5149283616',
    '5197785930',
    '4034528222',
    '7807818560',
    '8193778633',
    '5195219569',
    '6473908000',
    '6137836647',
    '6479640253',
    '4038098015',
    '4168322647',
    '7094572601',
    '7057595286',
    '8193625049',
    '2045600727',
    '5142200801',
    '4166286270',
    '8196942848',
    '8076324817',
    '6047866173',
    '4188358572',
    '5142364931',
    '7168554155',
    '7052205325',
    '5878936408',
    '5143030310',
    '6479193959',
    '5196540550',
    '7804963149',
    '8192095386',
    '2509750683',
    '5879982423',
    '4166035359',
    '4035695333',
    '4037500538',
    '6048853462',
    '2896757366',
    '4165610049',
    '7092692102',
    '2507185393',
    '7168334687',
    '6046443333',
    '9024010400',
    '6043741172',
    '4079371111',
    '5145836077',
    '7097692783',
    '5149421189',
    '3069305595',
    '4505357048',
    '6474038696',
    '6137573113',
    '6475394287',
    '4167205558',
    '5147008477',
    '5195310251',
    '5145576915',
    '2504696123',
    '4504346536',
    '7808878019',
    '9056416999',
    '7808910689',
    '5145857272',
    '4039740312',
    '5062069119',
    '9055988622',
    '5065475842',
    '9024780350',
    '6043174413',
    '8195732224',
    '7787830793',
    '4319985656',
    '5193722046',
    '7097862716',
    '4165644012',
    '5145739604',
    '4039447574',
    '4168620425',
    '4186370863',
    '4168169197',
    '9028147775',
    '7809260405',
    '6132662029',
    '4182953371',
    '9023324655',
    '6472069655',
    '9027210816',
    '4033077521',
    '7057301748',
    '5067355753',
    '5145673599',
    '5148214540',
    '5879263612',
    '4037830246',
    '4188600391',
    '9028977917',
    '7788689189',
    '7097464930',
    '6475375823',
    '2047993655',
    '7789982512',
    '8195234692',
    '5147702321',
    '7053498300',
    '5148833389',
    '7805149502',
    '5196367888',
    '2265061084',
    '4182268741',
    '5069772772',
    '4038285700',
    '5064587662',
    '6132944694',
    '5149938769',
    '4168809182',
    '4163187591',
    '7056220828',
    '6042457362',
    '5063812933',
    '5146683244',
    '6473816008',
    '6472789306',
    '4377747682',
    '5147456278',
    '6132254845',
    '2892511624',
    '2046422775',
    '4036058037',
    '6044794899',
    '5142271001',
    '4189737744',
    '4034654088',
    '5148231782',
    '8196004498',
    '4385202732',
    '4379876232',
    '4168824188',
    '7809970597',
    '7808762020',
    '8198206420',
    '3062623599',
    '5799902792',
    '5068320256',
    '5199199103',
    '4039557694',
    '8195981015',
    '4167714213',
    '4036486252',
    '4033211952',
    '5147334976',
    '6132963563',
    '7808143807',
    '6473280740',
    '5066582554',
    '8077381062',
    '4169009178',
    '9027093034',
    '4188080875',
    '9023220139',
    '4163173003',
    '4168023033',
    '4039447663',
    '5193606300',
    '6132033217',
    '8198552315',
    '6477611317',
    '8193834437',
    '7095892398',
    '6472012190',
    '6047839616',
    '5148708148',
    '4508985217',
    '4188180091',
    '4169843104',
    '7808347072',
    '7805981170',
    '7809664609',
    '2045830336',
    '4166660035',
    '4167244485',
    '9028561922',
    '5066356842',
    '4035675301',
    '4168715568',
    '6472837480',
    '6043746077',
    '6136236293',
    '5145827672',
    '4033828795',
    '2892518405',
    '7807827410',
    '2052773148',
    '4188180138',
    '5149633307',
    '6047684639',
    '7802884452',
    '9025411328',
    '6137916799',
    '6477497518',
    '2045826988',
    '7097337273',
    '6047296119',
    '5142699342',
    '5148219891',
    '5146470999',
    '5196396623',
    '7802328695',
    '6138621625',
    '7053238943',
    '4037235174',
    '6476415807',
    '5149912098',
    '4389287373',
    '5143716466',
    '8196991901',
    '4508800637',
    '5145837920',
    '8679796324',
    '7788981985',
    '5064515816',
    '2395948852',
    '4035456044',
    '4387972472',
    '5144330313',
    '6045532744',
    '5147421291',
    '2502423735',
    '8195982072',
    '8197574536',
    '6136088954',
    '5199909767',
    '7052571155',
    '4075693153',
    '6472031648',
    '9735894044',
    '5149776886',
    '2503603410',
    '4509272227',
    '5145579179',
    '4506791088',
    '2266360112',
    '7097775030',
    '9058093348',
    '7803428485',
    '2049998297',
    '4505898444',
    '7804137703',
    '2892411092',
    '9058784594',
    '8194605001',
    '4032384222',
    '4168939314',
    '4165096374',
    '2893521278',
    '4168256266',
    '2508968056',
    '4169100158',
    '5146334882',
    '6478225323',
    '4506515740',
    '8076297889',
    '7056264150',
    '7809652833',
    '6474617349',
    '4168386097',
    '5818884505',
    '5876444108',
    '7804975566',
    '6048196764',
    '5068665586',
    '2366682022',
    '4032865530',
    '2043598731',
    '5815784822',
    '5148211379',
    '2508717177',
    '6473670836',
    '7802466133',
    '9027780656',
    '9056415921',
    '6475307273',
    '6475604555',
    '8674564224',
    '4097897258',
    '7098613717',
    '4034403753',
    '4162480228',
    '6479645812',
    '2042711407',
    '2508785260',
    '9022150044',
    '8195782341',
    '7788465872',
    '6479295149',
    '6477321635',
    '2262279999',
    '4375800372',
    '7057964134',
    '2049408578',
    '5066222000',
    '5143808103',
    '7809529066',
    '2506671515',
    '7806286683',
    '3062058921',
    '4502754901',
    '7097280970',
    '7096904422',
    '5068741247',
    '7085238032',
    '4188330303',
    '6477057443',
    '7783318877',
    '4188931101',
    '4038894282',
    '5067550244',
    '9024246122',
    '9054422493',
    '9026170103',
    '9054179640',
    '6476780937',
    '4163208607',
    '8199672420',
    '8198166526',
    '5195242654',
    '7057282765',
    '9023044737',
    '5067329119',
    '9058466318',
    '7809291363',
    '8077375080',
    '6472083430',
    '4186091278',
    '6478395810',
    '9024322166',
    '7097631708',
    '7034803607',
    '5062532462',
    '5878808600',
    '4189555911',
    '4186711570',
    '6479319139',
    '2267779538',
    '2049512387',
    '6478964545',
    '5197554628',
    '4504644655',
    '4187634364',
    '4163275320',
    '4185646027',
    '8193713266',
    '9054656940',
    '2895521594',
    '5149988093',
    '4186623483',
    '7096908320',
    '8196399088',
    '9059235501',
    '5146223820',
    '5069610057',
    '9056814915',
    '9027406411',
    '5143908719',
    '2509855684',
    '4163249010',
    '5147719435',
    '9023019805',
    '5194646376',
    '4185904750',
    '6479431320',
    '7808879513',
    '2042021526',
    '7097466381',
    '7096957302',
    '4189552539',
    '5149951313',
    '4166699056',
    '5192962105',
    '9054532747',
    '9028437378',
    '7028025690',
    '4164146192',
    '9057829298',
    '5193627731',
    '6472821229',
    '4168489466',
    '7804454297',
    '4506799589',
    '4188552358',
    '6043773570',
    '4163032826',
    '4034526775',
    '5196466124',
    '2893332055',
    '5142744777',
    '9022407989',
    '9023324634',
    '4168347877',
    '9022134299',
    '5152981431',
    '6475342944',
    '6136182527',
    '8676953571',
    '5146882385',
    '9059718631',
    '4182223129',
    '6132239584',
    '9059216253',
    '6137624610',
    '6479697575',
    '5195775857',
    '5193717800',
    '7809741418',
    '4037787481',
    '4169900471',
    '7096514427',
    '6043385659',
    '7096347834',
    '8192742196',
    '6472814309',
    '8194498422',
    '7805144607',
    '9025742855',
    '7096345531',
    '9052304959',
    '5816492143',
    '4165710000',
    '5148314911',
    '7055074530',
    '5068562875',
    '9022378293',
    '9055815154',
    '4037524420',
    '4182289197',
    '4163018615',
    '5149010939',
    '4188624314',
    '5198085408',
    '9026947497',
    '4186440299',
    '5875943732',
    '4033084172',
    '4185631170',
    '6044413065',
    '5145946671',
    '6138080946',
    '7806041033',
    '5062279864',
    '8192126824',
    '4033204234',
    '5148052559',
    '6047466938',
    '5195258600',
    '4168561610',
    '6046351830',
    '4036300303',
    '9023710656',
    '2508587160',
    '4163975550',
    '6474020635',
    '4169570647',
    '5148709290',
    '6048254441',
    '5132742110',
    '7788556431',
    '6477253448',
    '6043779015',
    '4167994489',
    '4189337190',
    '7787917456',
    '4189330280',
    '9054720160',
    '9025797500',
    '9056304548',
    '6047987789',
    '3068802519',
    '4382291447',
    '5145700839',
    '5149416508',
    '7783885373',
    '2363324749',
    '9022412528',
    '5146921101',
    '6047085293',
    '4503323834',
    '6046372860',
    '4166884085',
    '4187522797',
    '6137806552',
    '7097431177',
    '4165865500',
    '7803604747',
    '6043512454',
    '4805300488',
    '5149099373',
    '5148679179',
    '5193211219',
    '6479636252',
    '5875019382',
    '8198400406',
    '7054970121',
    '2269985686',
    '4164543423',
    '2042829944',
    '4505252716',
    '4507787917',
    '3062445096',
    '5199372017',
    '4162586309',
    '4165665126',
    '5192414623',
    '5195255299',
    '5145617643',
    '4509226869',
    '7805540187',
    '9057382823',
    '7805045589',
    '5142363732',
    '9544558976',
    '7806071910',
    '6048753436',
    '6132530029',
    '5147153936',
    '2045943955',
    '3062542212',
    '6045878338',
    '4039388433',
    '6474480818',
    '5068787082',
    '6478853162',
    '8195829358',
    '7057600256',
    '8193840056',
    '6605700627',
    '7788953050',
    '5148870627',
    '5142123975',
    '4168491900',
    '4168095564',
    '5195892266',
    '6045997751',
    '2262345286',
    '9022332428',
    '5193805165',
    '9025659009',
    '5195880036',
    '4036805002',
    '9025930398',
    '6474034027',
    '4169907794',
    '4188083496',
    '9024496192',
    '7094665276',
    '4039750975',
    '5146512486',
    '5144677816',
    '5143787682',
    '9055185780',
    '4189618977',
    '7802050300',
    '6137378777',
    '7094562021',
    '7092215229',
    '5065330036',
    '9027491627',
    '5142695436',
    '5819982926',
    '2892376496',
    '6477466286',
    '4185690270',
    '2899240516',
    '6048366686',
    '6475600509',
    '9054062200',
    '9058589200',
    '2043071982',
    '7097658717',
    '6476844281',
    '4502884083',
    '6474907941',
    '6476220821',
    '2044003482',
    '9025765002',
    '2505490644',
    '7168391880',
    '5194290499',
    '4037715180',
    '8676881840',
    '5066083585',
    '8197755591',
    '5197200120',
    '6045103386',
    '7809161953',
    '9182353887',
    '6133047931',
    '4036484808',
    '5873237327',
    '4166174606',
    '4164518482',
    '4163221529',
    '4182213230',
    '8194259209',
    '5196710653',
    '9419002424',
    '2048142205',
    '7788614453',
    '6132626358',
    '5148200168',
    '4166184092',
    '4504663177',
    '5142651755',
    '8198227993',
    '5069870061',
    '4503609380',
    '5194371922',
    '4035369319',
    '5199920080',
    '4384971064',
    '5146889630',
    '9024459830',
    '2049884883',
    '9056763589',
    '4189283672',
    '4506641451',
    '2508186860',
    '7096957010',
    '4033962027',
    '5819960065',
    '6476259205',
    '6473467060',
    '6476216531',
    '7809141836',
    '2393343473',
    '6043624176',
    '2042919485',
    '4188877777',
    '4036178581',
    '3068802611',
    '6045404277',
    '4162931173',
    '9052276623',
    '7097781301',
    '9055654540',
    '4162075266',
    '5064585741',
    '3066555500',
    '2506398645',
    '2892066721',
    '4168270995',
    '5063651214',
    '5192918805',
    '7053470487',
    '6474841594',
    '5147158802',
    '7097223176',
    '4035081906',
    '5193239516',
    '4168223321',
    '2049512713',
    '5142064121',
    '9022935120',
    '9054515554',
    '6477699161',
    '4505431600',
    '4186872526',
    '4036256141',
    '7094896843',
    '5147721583',
    '7803523314',
    '9057328439',
    '4169895297',
    '5065492008',
    '8196741151',
    '6047153955',
    '5144498075',
    '5198300216',
    '5066325546',
    '2897772131',
    '4502223388',
    '8194936039',
    '4038093706',
    '8196816934',
    '5199713809',
    '4162712782',
    '7809391186',
    '6472652119',
    '5147143344',
    '4165616724',
    '5142919279',
    '7092140480',
    '4182552004',
    '6048056780',
    '8193133219',
    '5067396414',
    '6477827820',
    '7097706695',
    '4189232432',
    '7802185832',
    '9059718857',
    '5148067521',
    '7059198800',
    '8199750740',
    '4188352401',
    '5144204962',
    '5197733146',
    '7808810747',
    '6479456222',
    '4508306875',
    '5145975828',
    '4163151413',
    '5195464535',
    '5144107539',
    '9027019915',
    '6477293942',
    '4038098063',
    '5148623563',
    '5196999366',
    '5149141489',
    '7058559424',
    '9024557637',
    '2045601364',
    '6132401751',
    '7057598983',
    '4162126733',
    '4168788914',
    '6042702204',
    '6472819598',
    '4188089349',
    '4372148827',
    '5062609192',
    '5062886000',
    '7806161843',
    '7783193078',
    '5148634466',
    '4168974865',
    '9419170708',
    '4038822016',
    '5149527933',
    '5067379531',
    '6476780443',
    '7084753650',
    '6053134802',
    '7097270598',
    '8194700271',
    '4185570810',
    '5146911815',
    '4168081301',
    '5878021869',
    '9052304757',
    '6132660046',
    '6479278187',
    '9024993619',
    '7096436830',
    '7053589026',
    '9052525880',
    '8252212000',
    '5147238083',
    '8195761988',
    '5063812743',
    '3127638450',
    '6472984645',
    '4162768457',
    '3066514823',
    '5196081032',
    '8086618721',
    '441733347007',
    '2049834327',
    '2893055272',
    '4506242228',
    '5194853319',
    '9024440147',
    '4185946117',
    '5148170835',
    '5067366212',
    '3065504283',
    '4162702292',
    '9028887613',
    '5144223347',
    '4169178118',
    '5196217555',
    '6043000072',
    '5144091288',
    '5148850403',
    '2267822993',
    '7802467507',
    '5149997952',
    '8195256777',
    '9059266319',
    '7058765185',
    '4164718019',
    '4188182628',
    '7094693032',
    '5142562179',
    '3062974192',
    '7057505756',
    '7802497399',
    '5143402705',
    '7788956505',
    '4189307370',
    '4165439490',
    '6138855415',
    '5199980021',
    '9024078528',
    '7092565696',
    '7786082106',
    '4188333145',
    '4187805492',
    '6477066787',
    '7784781991',
    '6137614111',
    '9053574778',
    '8194634312',
    '3063217301',
    '6048092065',
    '7807355970',
    '5065442040',
    '2507167733',
    '2896684140',
    '6048588353',
    '4503259324',
    '4182620863',
    '9052660855',
    '5147352130',

];
let filePath = './Results/411Directory.xlsx';
let valid=0
let counter=0
let allNumbers = [];
let validNumbers = [];
let invalidNumbers = [];
const workBook = xlsx.utils.book_new();
let allWorkSheet = xlsx.utils.json_to_sheet(allNumbers);
xlsx.utils.book_append_sheet(workBook, allWorkSheet, 'All Numbers');
let validWorkSheet = xlsx.utils.json_to_sheet(validNumbers);
xlsx.utils.book_append_sheet(workBook, validWorkSheet, 'Valid Numbers');
let invalidWorkSheet = xlsx.utils.json_to_sheet(invalidNumbers);
xlsx.utils.book_append_sheet(workBook, invalidWorkSheet, 'Invalid Numbers');

allWorkSheet["!cols"] = [{width:25}];
validWorkSheet["!cols"] = [{width:25}];
invalidWorkSheet["!cols"] = [{width:25}];

const getData = (number) => {
    axios.get(`https://www.411directoryassistance.ca/reverse-lookup/?reverseSearch=Business&pac=${number.slice(0, 3)}&pex=${number.substr(3, 3)}&pnum=${number.slice(number.length - 4)}&search.x=32&search.y=13`)
        .then(async response => {
            const html = response.data;
            const $ = cheerio.load(html);
            checkValidity($, number);
            if (counter % 100 == 0) {
                saveToFileDuringProcess();
            }
            if (counter === numbers.length) {
                console.log("\x1b[36m", `Please wait for 30 seconds...`);
                setTimeout(async () => {
                    console.log()
                    saveToFile();
                }, 30000);
            }
        }).catch(async error => {
            getData(number);
        });
}

const checkValidity = async ($, number) => {
    counter++
    let Store = new Object()
    let AllNumber=new Object()
    AllNumber.phone =number
    allNumbers.push(AllNumber);
    if ($('.listing-phone').find('div').eq(0).text().trim() !== "") {
        Store.name = $('.listing-desc').find('div').eq(0).find('a').find('span').text()
        Store.Address = $('.listing-desc').find('div').eq(1).find('div').eq(0).find('span').text()
        Store.City = $('.listing-desc').find('div').eq(1).find('div').eq(1).find('span').text()
        Store.phone = $('.listing-phone').find('div').eq(0).text().trim();
        console.log("\x1b[32m", `#${counter}: ${number} >> Valid - Total Valid: ${valid} out of ${counter}`);
        valid++
        validNumbers.push(Store)
        console.log(Store.name);
    }
    else {
        Store.Error = $('#content-biz').find('div').find('div').eq(0).text().replace(/\t/g, '')
            .replace(/\n/g, '').trim()
        Store.phone = number
        console.log("\x1b[31m", `#${counter}: ${number} >> Invalid - Total Valid: ${valid} out of ${counter}`);
        invalidNumbers.push(Store)
        return false;
    }

    return true;
}

const saveToFileDuringProcess = () => {
    console.log("\x1b[36m",'Saving the process...');
   
    xlsx.utils.sheet_add_json(allWorkSheet,allNumbers);
    xlsx.utils.sheet_add_json(validWorkSheet,validNumbers);
    xlsx.utils.sheet_add_json(invalidWorkSheet,invalidNumbers);
    return xlsx.writeFile(workBook, filePath);
}

const saveToFile = () => {
    console.log("\x1b[36m",'Saving to the file...');
    
    xlsx.utils.sheet_add_json(allWorkSheet,allNumbers);
    xlsx.utils.sheet_add_json(validWorkSheet,validNumbers);
    xlsx.utils.sheet_add_json(invalidWorkSheet,invalidNumbers);
    xlsx.writeFile(workBook, filePath);

    console.log("\x1b[36m",'Successfully saved. BYE!');
}

process.on('SIGINT', function() {
    console.log("\x1b[33m","Caught interrupt signal. Saving to the file...");
    saveToFile();
    process.exit();
});

const app = async _ => {
    console.log("\x1b[36m", 'Please give the script a few seconds to warm up... ;)');
    for (number of numbers) {
        await sleep(Math.floor((Math.random() * (10-5)) + 5) * 1000)
        getData(number);
    }
}
app();

