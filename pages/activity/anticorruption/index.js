import axios from "../../../http";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";
import {Montserrat} from "next/font/google";
import Head from "next/head";
import dayjs from "dayjs";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
});

const page = () => {
    const {t} = useTranslation("index");
    const {locale} = useRouter();
    const htmlText = t("page-titles.activity.anticorruption-text.text");
    const [anticorruption, setanticorruption] = useState([]);

    const getanticorruption = async () => {
        const response = await axios.get(
            `/${locale}/api/activity/activityPostBySubmenuSlug/?submenu_slug=/activity/anticorruption`
        );
        const anticorruption = response.data.results;
        setanticorruption(anticorruption);
    };

    useEffect(() => {
        getanticorruption();
    }, []);

    return (
        <div>
            <Head>
                <title>{t("page-titles.activity.anticorruption")}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <meta
                    name="description"
                    content={t("page-titles.activity.anticorruption")}
                />
                <meta
                    property="og:title"
                    content={t("page-titles.activity.anticorruption")}
                    key="title"
                />
                <meta name="title" content={t("page-titles.activity.anticorruption")}/>
                <meta property="og:type" content="website"/>
                <meta
                    property="og:url"
                    content="https://gis.uz/activity/anticorruption"
                />
                <meta property="og:title" content="Oʻzkomnazorat"/>
                <meta
                    property="og:description"
                    content={t("page-titles.activity.anticorruption")}
                />
                <meta
                    property="twitter:url"
                    content="https://gis.uz/activity/anticorruption"
                />
                <meta
                    property="twitter:title"
                    content={`Oʻzkomnazorat - ${t(
                        "page-titles.activity.anticorruption"
                    )}`}
                />
                <meta
                    property="twitter:description"
                    content={t("page-titles.activity.anticorruption")}
                />
                <meta
                    property="og:title"
                    content={t("page-titles.activity.anticorruption")}
                    key="title"
                />
            </Head>
            <div className="container">
                <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
                    <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px]">
                        <h3
                            className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
                        >
                            {t("page-titles.activity.anticorruption")}
                        </h3>
                        <div>
                            <section>
                                <h2 className="main-title text-[#A2A0B3]">
                                    {t("page-titles.activity.anticorruption-text.main-title")}
                                </h2>
                                <h3 className="request text-[#A2A0B3]">
                                    {t("page-titles.activity.anticorruption-text.request")}
                                </h3>

                                <h4 className="title-header-footer text-[#A2A0B3]">
                                    {t("page-titles.activity.anticorruption-text.title-header")}
                                </h4>
                                <p
                                    className="pr-[10px] desc-html leading-[38px] w-full text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-roboto break-words"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            locale === "uz"
                                                ? "Axborotlashtirish va telekommunikatsiyalar sohasida nazorat inspeksiyasi aloqa, axborotlashtirish va telekommunikatsiya texnologiyalari, davriy bosma nashrlarni tarqatish sohasida koʻrsatilayotgan xizmatlarning sifatli taqdim etilishi va isteʼmolchilar huquqlarini himoya qilish, sohada qonun hujjatlari, normativ hujjatlar va davlat standartlari talablariga rioya qilinishi, “Elektron hukumat” tizimida infratuzilmani rivojlantirish va axborot-kommunikatsiya texnologiyalaridan samarali foydalanish, elektron davlat xizmatlarini koʻrsatish samaradorligi, telekommunikatsiya infratuzilmasini rivojlantirish boʻyicha davlat nazoratini amalga oshiruvchi vakolatli organ hisoblanadi. “Oʻzkomnazorat” Inspeksiyasining bugungi kundagi faoliyati aholi va tadbirkorlarga koʻrsatilayotgan telekommunikatsiya xizmatlarni sifatini yaxshilash, sohada faoliyat yuritayotgan tadbirkorlik subyektlarini qoʻllab-quvvatlash, soha rivojlanishi uchun qulay sharoitlar yaratish va sohada qonun hujjatlari, normativ hujjatlar va davlat standartlari talablariga rioya qilinishini taʼminlashga qaratilmoqda. <br><br> Maʼlumki, mamlakatimizda korrupsiyaga qarshi kurashishga jiddiy eʼtibor qaratilib, ushbu illatni tag-tomiri bilan yoʻq qilishga qaratilgan tadbirlar amaliyotga tatbiq etilmoqda. Sohada davlat nazoratini amalga oshirishda zimmamizga yuklangan masʼuliyatni yaxshi anglaymiz va oʻz navbatida, “Oʻzkomnazorat” Inspeksiyasida korrupsiyaga qarshi kurashish tizimi\"ni samarali amalga oshirish, korrupsion harakatlarning har qanday shakl va koʻrinishlariga nisbatan jamoada keskin murosasizlikni shakllantirish uchun bor kuch va imkoniyatimizni safarbar etamiz. Mamlakatimizda Korrupsiyaga qarshi kurashish sohasida qabul qilingan qonunchilik hujjatlari ijrosini taʼminlash maqsadida “Oʻzkomnazorat” Inspeksiyasida: <br>“Komplayens nazorat” tizimi joriy etilib, mazkur ishlarni muvofiqlashtiruvchi Korrupsiyaga qarshi ichki nazorat boʻlimi tashkil etildi; <br>sohaga oid qator ichki normativ hujjatlar va tartib-qoidalar qabul qilindi va amaliyotga joriy etildi; <br>korrupsiyaviy xavf-xatarlarni aniqlash, baholash va ularni kamaytirish boʻyicha chora-tadbirlar belgilandi; <br>korrupsiyaga qarshi kurashish ishlarini samaradorligini reyting baholash tizimi “E-Antikor” joriy etish yuzasidan Nazorat rejasi tasdiqlandi; <br>sohada vakolatli boʻlgan davlat organlari bilan hamkorlik yoʻlga qoʻyildi; <br>xodimlarning korrupsiyaga qarshi kurashish yoʻnalishida huquqiy ongi va huquqiy madaniyatini yuksaltirishga qaratilgan oʻquv kurslari tashkil etildi, ushbu illatga nisbatan murosasiz munosabatni shakllantirishga qaratilgan seminar va targʻibot tadbirlari muntazam oʻtkazib kelinmoqda. <br><br>Korrupsiyaga qarshi yoʻlga qoʻyilgan tizimning asosiy vazifasi inspeksiyada korrupsiya holatlarining yuzaga kelish sabablari va shart-sharoitlarini aniqlash, ularni bartaraf etishning taʼsirchan choralarini ishlab chiqish, xodimlar oʻrtasida tushuntirish ishlarini olib borish, korrupsiya xavfi mavjud boʻlgan hollarda maslahat berish va qoʻllab-quvvatlashdan iborat. “Oʻzkomnazorat” Inspeksiyasida korrupsiyaga qarshi qabul qilingan normativ hujjatlar, tartib-qoidalar, belgilangan vazifa va funksiyalarni toʻgʻri bajarilishi uchun asos boʻlib xizmat qilib kelmoqda. Oʻz navbatida, “Oʻzkomnazorat” Inspeksiyasining har bir rahbar va xodimi oʻz funksional vazifalarini halollik, fidoiylik va sadoqat bilan bajarishi, lavozim vazifalarini xolisona va begʻaraz bajarishda unga salbiy taʼsir koʻrsatadigan yoki taʼsir koʻrsatishi mumkin boʻlgan shaxsiy manfaatdorlik holatlariga yoʻl qoʻymasligi, faoliyatning ochiqligi va shaffofligini taʼminlashi zarur. Fursatdan foydalanib, hamkasblarimiz, hamkorlarimiz va yurtdoshlarimizni korrupsiyaga qarshi talablarga ogʻishmay rioya qilishga, har qanday ehtimoliy qonunbuzarliklar haqida Inspeksiyaning korrupsiyaga qarshi kurashish boʻyicha maxsus “Ishonch telefoni”ga (71 202-20-19) xabar berishga va savollar bilan murojaat qilishga chorlaymiz. Biz roʻy berishi mumkin boʻlgan korrupsiyaviy holatlar, unga olib kelgan va olib kelishi mumkin boʻlgan har qanday harakat (harakatsizlik)lar haqida oʻz vaqtida maʼlumot olishdan manfaatdormiz. “Oʻzkomnazorat” Inspeksiyasi korrupsiyaviy holatlar boʻyicha xabar bergan arizachilarga hamda taqdim etilgan maʼlumotlarga nisbatan maxfiylik tamoyillariga rioya etilishini kafolatlaydi. Korrupsiyaga qarshi kurashish barchamizning umumiy ishimiz va shiorimizga aylanishi lozim. Bu ishda barchani hamjihatlikka chaqiramiz.\n"
                                                : locale === "ru" ? "Контрольная проверка в сфере информатизации и телекоммуникаций, качества оказания услуг в сфере связи, информационных и телекоммуникационных технологий, распространения периодических изданий и защиты прав потребителей, соблюдения требований законов, нормативных документов и государственных стандартов в области, развитие инфраструктуры в системе «Elektron hukumat» является уполномоченным органом, осуществляющим государственный контроль за эффективным использованием информационно-коммуникационных технологий, эффективностью предоставления электронных государственных услуг, развитием телекоммуникационной инфраструктуры. Сегодняшняя деятельность Инспекции «Узкомнозорат» направлена на повышение качества телекоммуникационных услуг, предоставляемых населению и предпринимателям, поддержку субъектов хозяйствования, работающих в сфере, создание благоприятных условий для развития отрасли, обеспечение соблюдения требований законодательства, нормативные документы и государственные стандарты в отрасли. <br><br>Известно, что борьбе с коррупцией в нашей стране уделяется серьезное внимание, реализуются меры, направленные на искоренение этого зла. Мы понимаем возложенную на нас ответственность при осуществлении государственного контроля на местах, и в свою очередь мобилизуем все свои силы и возможности для эффективного внедрения системы противодействия коррупции в Инспекции «Узкомнозорат», для формирования сильной нетерпимости в обществе. против любых форм и проявлений коррупционных действий. В целях обеспечения реализации законодательных документов, принятых в сфере противодействия коррупции в нашей стране, в Инспекции «Узкомнозорат»: <br>внедрена система «Комплаенс-контроль», а также создан отдел внутреннего антикоррупционного контроля для координации этой деятельности; <br>принят и внедрен в практику ряд внутренних нормативных документов и процедур, связанных с данной сферой; <br>приняты меры по выявлению, оценке и снижению коррупционных рисков; <br>в связи с внедрением системы оценки эффективности антикоррупционной деятельности «E-Antikor» разработан и утвержден соответствующий план; <br>налажено сотрудничество с компетентными в данной сфере государственными органами; организованы обучающие курсы, направленные на повышение правовой грамотности и правовой культуры сотрудников по направлению борьбы с коррупцией, регулярно проводятся семинары и пропагандистские мероприятия, направленные на формирование бескомпромиссного отношения к этому злу. <br><br>Основной задачей системы противодействия коррупции является определение причин и условий возникновения коррупции в проверке, разработка эффективных мер по их устранению, проведение разъяснительной работы среди сотрудников, предоставление консультаций и поддержки в случаях возникновения коррупционных рисков. Принятые нормативные документы, процедуры по борьбе с коррупцией, а также установленные задачи и функции служат основой надлежащего функционирования Инспекции «Узкомнозорат». С другой стороны, каждый руководитель и сотрудник Инспекции «Узкомнозорат» должен честно, самоотверженно и лояльно выполнять свои функциональные задачи, избегать личных интересов, которые могут или могут оказать на них негативное влияние, а также обеспечивать открытость и прозрачность своей деятельности. Пользуясь этой возможностью, мы призываем наших коллег, партнеров и соотечественников строго соблюдать антикоррупционные требования, сообщать о возможных нарушениях на специальную антикоррупционную горячую линию Инспекции (71 202-20-19) и задавать вопросы. Мы заинтересованы в получении своевременной информации о возможных коррупционных ситуациях, любых действиях (бездействии), которые к ней привели и могут к этому привести. Инспекция «Узкомнозорат» гарантирует соблюдение принципов конфиденциальности в отношении заявителей, сообщающих о коррупционных делах и предоставленной информации. Борьба с коррупцией должна стать нашей общей работой и девизом. Мы призываем всех к сотрудничеству в этой работе."
                                                    : locale === "uzb"
                                                        ? "Ахборотлаштириш ва телекоммуникациялар соҳасида назорат инспекцияси алоқа, ахборотлаштириш ва телекоммуникация технологиялари, даврий босма нашрларни тарқатиш соҳасида кўрсатилаётган хизматларнинг сифатли тақдим этилиши ва истеъмолчилар ҳуқуқларини ҳимоя қилиш, соҳада қонун ҳужжатлари, норматив ҳужжатлар ва давлат стандартлари талабларига риоя қилиниши, “Электрон ҳукумат” тизимида инфратузилмани ривожлантириш ва ахборот-коммуникация технологияларидан самарали фойдаланиш, электрон давлат хизматларини кўрсатиш самарадорлиги, телекоммуникация инфратузилмасини ривожлантириш бўйича давлат назоратини амалга оширувчи ваколатли орган ҳисобланади. “Ўзкомназорат” Инспекциясининг бугунги кундаги фаолияти аҳоли ва тадбиркорларга кўрсатилаётган телекоммуникация хизматларни сифатини яхшилаш, соҳада фаолият юритаётган тадбиркорлик субъектларини қўллаб-қувватлаш, соҳа ривожланиши учун қулай шароитлар яратиш ва соҳада қонун ҳужжатлари, норматив ҳужжатлар ва давлат стандартлари талабларига риоя қилинишини таъминлашга қаратилмоқда. <br><br>Маълумки, мамлакатимизда коррупцияга қарши курашишга жиддий эътибор қаратилиб, ушбу иллатни таг-томири билан йўқ қилишга қаратилган тадбирлар амалиётга татбиқ этилмоқда. Соҳада давлат назоратини амалга оширишда зиммамизга юкланган масъулиятни яхши англаймиз ва ўз навбатида, “Ўзкомназорат” Инспекциясида коррупцияга қарши курашиш тизими\"ни самарали амалга ошириш, коррупсион ҳаракатларнинг ҳар қандай шакл ва кўринишларига нисбатан жамоада кескин муросасизликни шакллантириш учун бор куч ва имкониятимизни сафарбар этамиз. Мамлакатимизда Коррупцияга қарши курашиш соҳасида қабул қилинган қонунчилик ҳужжатлари ижросини таъминлаш мақсадида “Ўзкомназорат” Инспекциясида: <br>“Комплаенс назорат” тизими жорий этилиб, мазкур ишларни мувофиқлаштирувчи Коррупцияга қарши ички назорат бўлими ташкил этилди; <br>соҳага оид қатор ички норматив ҳужжатлар ва тартиб-қоидалар қабул қилинди ва амалиётга жорий этилди; <br>коррупсиявий хавф-хатарларни аниқлаш, баҳолаш ва уларни камайтириш бўйича чора-тадбирлар белгиланди; <br>коррупцияга қарши курашиш ишларини самарадорлигини рейтинг баҳолаш тизими “E-Antikor” жорий этиш юзасидан Назорат режаси тасдиқланди; <br>соҳада ваколатли бўлган давлат органлари билан ҳамкорлик йўлга қўйилди ходимларнинг коррупцияга қарши курашиш йўналишида ҳуқуқий онги ва ҳуқуқий маданиятини юксалтиришга қаратилган ўқув курслари ташкил этилди, ушбу иллатга нисбатан муросасиз муносабатни шакллантиришга қаратилган семинар ва тарғибот тадбирлари мунтазам ўтказиб келинмоқда. <br><br>Коррупцияга қарши йўлга қўйилган тизимнинг асосий вазифаси инспекцияда коррупция ҳолатларининг юзага келиш сабаблари ва шарт-шароитларини аниқлаш, уларни бартараф этишнинг таъсирчан чораларини ишлаб чиқиш, ходимлар ўртасида тушунтириш ишларини олиб бориш, коррупция хавфи мавжуд бўлган ҳолларда маслаҳат бериш ва қўллаб-қувватлашдан иборат. “Ўзкомназорат” Инспекциясида коррупцияга қарши қабул қилинган норматив ҳужжатлар, тартиб-қоидалар, белгиланган вазифа ва функцияларни тўғри бажарилиши учун асос бўлиб хизмат қилиб келмоқда. Ўз навбатида, “Ўзкомназорат” Инспекциясининг ҳар бир раҳбар ва ходими ўз функционал вазифаларини ҳалоллик, фидоийлик ва садоқат билан бажариши, лавозим вазифаларини холисона ва беғараз бажаришда унга салбий таъсир кўрсатадиган ёки таъсир кўрсатиши мумкин бўлган шахсий манфаатдорлик ҳолатларига йўл қўймаслиги, фаолиятнинг очиқлиги ва шаффофлигини таъминлаши зарур. Фурсатдан фойдаланиб, ҳамкасбларимиз, ҳамкорларимиз ва юртдошларимизни коррупцияга қарши талабларга оғишмай риоя қилишга, ҳар қандай эҳтимолий қонунбузарликлар ҳақида Инспекциянинг коррупцияга қарши курашиш бўйича махсус “Ишонч телефони”га (71 202-20-19) хабар беришга ва саволлар билан мурожаат қилишга чорлаймиз. Биз рўй бериши мумкин бўлган коррупсиявий ҳолатлар, унга олиб келган ва олиб келиши мумкин бўлган ҳар қандай ҳаракат (ҳаракатсизлик)лар ҳақида ўз вақтида маълумот олишдан манфаатдормиз. “Ўзкомназорат” Инспекцияси коррупсиявий ҳолатлар бўйича хабар берган аризачиларга ҳамда тақдим этилган маълумотларга нисбатан махфийлик тамойилларига риоя этилишини кафолатлайди. Коррупцияга қарши курашиш барчамизнинг умумий ишимиз ва шиоримизга айланиши лозим. Бу ишда барчани ҳамжиҳатликка чақирамиз.\n"
                                                        : "Axborotlashtirish va telekommunikatsiyalar sohasida nazorat inspeksiyasi aloqa, axborotlashtirish va telekommunikatsiya texnologiyalari, davriy bosma nashrlarni tarqatish sohasida koʻrsatilayotgan xizmatlarning sifatli taqdim etilishi va isteʼmolchilar huquqlarini himoya qilish, sohada qonun hujjatlari, normativ hujjatlar va davlat standartlari talablariga rioya qilinishi, “Elektron hukumat” tizimida infratuzilmani rivojlantirish va axborot-kommunikatsiya texnologiyalaridan samarali foydalanish, elektron davlat xizmatlarini koʻrsatish samaradorligi, telekommunikatsiya infratuzilmasini rivojlantirish boʻyicha davlat nazoratini amalga oshiruvchi vakolatli organ hisoblanadi. “Oʻzkomnazorat” Inspeksiyasining bugungi kundagi faoliyati aholi va tadbirkorlarga koʻrsatilayotgan telekommunikatsiya xizmatlarni sifatini yaxshilash, sohada faoliyat yuritayotgan tadbirkorlik subyektlarini qoʻllab-quvvatlash, soha rivojlanishi uchun qulay sharoitlar yaratish va sohada qonun hujjatlari, normativ hujjatlar va davlat standartlari talablariga rioya qilinishini taʼminlashga qaratilmoqda. <br><br> Maʼlumki, mamlakatimizda korrupsiyaga qarshi kurashishga jiddiy eʼtibor qaratilib, ushbu illatni tag-tomiri bilan yoʻq qilishga qaratilgan tadbirlar amaliyotga tatbiq etilmoqda. Sohada davlat nazoratini amalga oshirishda zimmamizga yuklangan masʼuliyatni yaxshi anglaymiz va oʻz navbatida, “Oʻzkomnazorat” Inspeksiyasida korrupsiyaga qarshi kurashish tizimi\"ni samarali amalga oshirish, korrupsion harakatlarning har qanday shakl va koʻrinishlariga nisbatan jamoada keskin murosasizlikni shakllantirish uchun bor kuch va imkoniyatimizni safarbar etamiz. Mamlakatimizda Korrupsiyaga qarshi kurashish sohasida qabul qilingan qonunchilik hujjatlari ijrosini taʼminlash maqsadida “Oʻzkomnazorat” Inspeksiyasida: <br>“Komplayens nazorat” tizimi joriy etilib, mazkur ishlarni muvofiqlashtiruvchi Korrupsiyaga qarshi ichki nazorat boʻlimi tashkil etildi; <br>sohaga oid qator ichki normativ hujjatlar va tartib-qoidalar qabul qilindi va amaliyotga joriy etildi; <br>korrupsiyaviy xavf-xatarlarni aniqlash, baholash va ularni kamaytirish boʻyicha chora-tadbirlar belgilandi; <br>korrupsiyaga qarshi kurashish ishlarini samaradorligini reyting baholash tizimi “E-Antikor” joriy etish yuzasidan Nazorat rejasi tasdiqlandi; <br>sohada vakolatli boʻlgan davlat organlari bilan hamkorlik yoʻlga qoʻyildi; <br>xodimlarning korrupsiyaga qarshi kurashish yoʻnalishida huquqiy ongi va huquqiy madaniyatini yuksaltirishga qaratilgan oʻquv kurslari tashkil etildi, ushbu illatga nisbatan murosasiz munosabatni shakllantirishga qaratilgan seminar va targʻibot tadbirlari muntazam oʻtkazib kelinmoqda. <br><br>Korrupsiyaga qarshi yoʻlga qoʻyilgan tizimning asosiy vazifasi inspeksiyada korrupsiya holatlarining yuzaga kelish sabablari va shart-sharoitlarini aniqlash, ularni bartaraf etishning taʼsirchan choralarini ishlab chiqish, xodimlar oʻrtasida tushuntirish ishlarini olib borish, korrupsiya xavfi mavjud boʻlgan hollarda maslahat berish va qoʻllab-quvvatlashdan iborat. “Oʻzkomnazorat” Inspeksiyasida korrupsiyaga qarshi qabul qilingan normativ hujjatlar, tartib-qoidalar, belgilangan vazifa va funksiyalarni toʻgʻri bajarilishi uchun asos boʻlib xizmat qilib kelmoqda. Oʻz navbatida, “Oʻzkomnazorat” Inspeksiyasining har bir rahbar va xodimi oʻz funksional vazifalarini halollik, fidoiylik va sadoqat bilan bajarishi, lavozim vazifalarini xolisona va begʻaraz bajarishda unga salbiy taʼsir koʻrsatadigan yoki taʼsir koʻrsatishi mumkin boʻlgan shaxsiy manfaatdorlik holatlariga yoʻl qoʻymasligi, faoliyatning ochiqligi va shaffofligini taʼminlashi zarur. Fursatdan foydalanib, hamkasblarimiz, hamkorlarimiz va yurtdoshlarimizni korrupsiyaga qarshi talablarga ogʻishmay rioya qilishga, har qanday ehtimoliy qonunbuzarliklar haqida Inspeksiyaning korrupsiyaga qarshi kurashish boʻyicha maxsus “Ishonch telefoni”ga (71 202-20-19) xabar berishga va savollar bilan murojaat qilishga chorlaymiz. Biz roʻy berishi mumkin boʻlgan korrupsiyaviy holatlar, unga olib kelgan va olib kelishi mumkin boʻlgan har qanday harakat (harakatsizlik)lar haqida oʻz vaqtida maʼlumot olishdan manfaatdormiz. “Oʻzkomnazorat” Inspeksiyasi korrupsiyaviy holatlar boʻyicha xabar bergan arizachilarga hamda taqdim etilgan maʼlumotlarga nisbatan maxfiylik tamoyillariga rioya etilishini kafolatlaydi. Korrupsiyaga qarshi kurashish barchamizning umumiy ishimiz va shiorimizga aylanishi lozim. Bu ishda barchani hamjihatlikka chaqiramiz.\n"
                                    }}
                                />

                                <div className="flex flex-col mb-[52px]">
                                    <p className="font-roboto text-[.5em] xl:text-[1em] xl:leading-[34px] whitespace-pre-line text-justify text-text_secondary">
                                        {t("page-titles.activity.anticorruption-text.respectfully")}
                                    </p>
                                    <p className="font-roboto text-[.5em] xl:text-[1em] xl:leading-[34px] whitespace-pre-line text-justify text-text_secondary">
                                        {t("page-titles.activity.anticorruption-text.footer-text")}
                                    </p>
                                </div>
                            </section>
                        </div>
                        <div className="flex flex-col mt-[20px] pr-[16px]">
                            {anticorruption.map((r) => (
                                <div key={r.id} className="gradientBox">
                                    <div className="bg-color border-[#3A2F7D] border-y-[2px] hover:bg-[#24224E] w-full">
                                        <p className="text-[1.12rem]  py-[16px] px-[8px]">
                                            <Link
                                                className="text-[#A2A0B3]"
                                                href={`/activity/anticorruption/${r.id}`}
                                            >
                                                {r.title}
                                            </Link>
                                        </p>
                                        <p className="flex items-end justify-end p-3 text-[18px] text-[#A2A0B3]">
                                            {dayjs(r.updated_at).format("DD.MM.YYYY")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Sidebar/>
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(
                locale,
                ["common", "index", "navbar"],
                i18nextConfig
            )),
        },
    };
}

export default page;
