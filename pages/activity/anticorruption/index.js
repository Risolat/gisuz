import axios from "../../../http";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import dayjs from "dayjs";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = () => {
  const { t } = useTranslation("index");
  const { locale } = useRouter();
  const htmlText = t("page-titles.activity.anticorruption-text.text");
  const [title, setTitle] = useState();
  const [submenu, setSubmenu] = useState([]);
  const [anticorruption, setanticorruption] = useState([]);

  const getData = async () => {
    const response = await axios.get(`/${locale}/api/menu/`);

    const menuName = ["ACTIVITY"];

    const data = response.data.filter((category) =>
      menuName.includes(category.name)
    );

    const title = data.map((d) => {
      return d.title;
    });
    setTitle(title);
    setSubmenu(data[0].submenu);
  };

  const getanticorruption = async () => {
    const response = await axios.get(
      `/${locale}/api/activity/activityPostBySubmenuSlug/?submenu_slug=/activity/anticorruption`
    );
    const anticorruption = response.data.results;
    setanticorruption(anticorruption);
  };

  useEffect(() => {
    getData();
    getanticorruption();
  }, []);

  return (
    <div>
      <Head>
        <title>{t("page-titles.activity.anticorruption")}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={t("page-titles.activity.anticorruption")}
        />
        <meta
          property="og:title"
          content={t("page-titles.activity.anticorruption")}
          key="title"
        />
        <meta name="title" content={t("page-titles.activity.anticorruption")} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://gis.uz/activity/anticorruption"
        />
        <meta property="og:title" content="Oʻzkomnazorat" />
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
                        ? "Oʻzbekiston Respublikasi Axborotlashtirish va telekommunikatsiyalar sohasida nazorat boʻyicha davlat inspeksiyasi <strong>aloqa, axborotlashtirish va telekommunikatsiya texnologiyalari, davriy bosma nashrlarni tarqatish sohasida</strong> koʻrsatilayotgan xizmatlarning sifatli taqdim etilishi va <strong>isteʼmolchilar huquqlarini himoya qilish</strong>, sohada qonun hujjatlari, normativ hujjatlar va davlat standartlari <strong>talablariga rioya qilinishi</strong>, “Elektron hukumat” tizimida infratuzilmani <strong>rivojlantirish</strong> va axborot-kommunikatsiya texnologiyalaridan <strong>samarali foydalanish</strong>, elektron davlat xizmatlarini koʻrsatish <strong>samaradorligi</strong>, telekommunikatsiya infratuzilmasini rivojlantirish boʻyicha davlat nazoratini amalga oshiruvchi <strong>vakolatli organ</strong> hisoblanadi.\n<strong>“Oʻzkomnazorat”</strong> Davlat inspeksiyasining bugungi kundagi faoliyati aholi va tadbirkorlarga koʻrsatilayotgan telekommunikatsiya xizmatlari <strong>sifatini yaxshilash</strong>, sohada faoliyat yuritayotgan tadbirkorlik subyektlarini <strong>qoʻllab-quvvatlash</strong>, soha rivojlanishi uchun qulay sharoitlar yaratish va sohada qonun hujjatlari, normativ hujjatlar va davlat standartlari talablariga <strong>rioya qilinishini taʼminlashga</strong> qaratilmoqda.\nMaʼlumki, mamlakatimizda korrupsiyaga qarshi kurashishga jiddiy eʼtibor qaratilib, ushbu illatni tag-tomiri bilan yoʻq qilishga qaratilgan tadbirlar amaliyotga tatbiq etilmoqda.\nSohada davlat nazoratini amalga oshirishda zimmamizga yuklangan masʼuliyatni yaxshi anglaymiz va oʻz navbatida, <strong>“Oʻzkomnazorat”</strong> Davlat inspeksiyasida <strong>korrupsiyaga qarshi kurashish tizimini</strong> samarali amalga oshirish, korrupsion harakatlarning har qanday shakl va koʻrinishlariga nisbatan jamoada <strong>keskin murosasizlikni shakllantirish</strong> uchun bor kuch va imkoniyatimizni safarbar etamiz.\nMamlakatimizda Korrupsiyaga qarshi kurashish sohasida qabul qilingan qonunchilik hujjatlari ijrosini taʼminlash maqsadida <strong>“Oʻzkomnazorat”</strong> Davlat inspeksiyasida:\n<strong>“Komplayens nazorat”</strong> tizimi joriy etilib, mazkur ishlarni muvofiqlashtiruvchi Korrupsiyaga qarshi ichki nazorat boʻlimi tashkil etildi;\nsohaga oid qator ichki normativ hujjatlar va tartib-qoidalar qabul qilindi va <strong>amaliyotga joriy etildi</strong>;\nkorrupsiyaviy xavf-xatarlarni aniqlash, baholash va ularni kamaytirish boʻyicha <strong>chora-tadbirlar</strong> belgilandi;\nKorrupsiyaga qarshi kurashish ishlarini samaradorligini reyting baholash tizimi “E-Antikor” joriy etish yuzasidan 2022-2023-yillarga moʻljallangan <strong>Nazorat rejasi</strong> tasdiqlandi;\nSohada vakolatli boʻlgan davlat organlari bilan hamkorlik yoʻlga qoʻyildi;\nXodimlarning korrupsiyaga qarshi kurashish yoʻnalishida <strong>huquqiy ongi va huquqiy madaniyatini</strong> yuksaltirishga qaratilgan oʻquv kurslari tashkil etildi, ushbu illatga nisbatan murosasiz munosabatni shakllantirishga qaratilgan <strong>seminar va targʻibot tadbirlari</strong> muntazam oʻtkazib kelinmoqda.\nKorrupsiyaga qarshi yoʻlga qoʻyilgan tizimning asosiy vazifasi inspeksiyada korrupsiya holatlarining yuzaga kelish <strong>sabablari va shart-sharoitlarini aniqlash</strong>, ularni bartaraf etishning <strong>taʼsirchan choralarini</strong> ishlab chiqish, xodimlar oʻrtasida tushuntirish ishlarini olib borish, korrupsiya xavfi mavjud boʻlgan hollarda maslahat berish va qoʻllab-quvvatlashdan iborat.\n<strong>“Oʻzkomnazorat”</strong> Davlat inspeksiyasida korrupsiyaga qarshi qabul qilingan normativ hujjatlar, tartib-qoidalar, belgilangan vazifa va funksiyalarni toʻgʻri bajarilishi uchun asos boʻlib xizmat qilib kelmoqda.\nOʻz navbatida, <strong>“Oʻzkomnazorat”</strong> Davlat inspeksiyasining har bir rahbar va xodimi oʻz funksional vazifalarini <strong>halollik, fidoiylik va sadoqat</strong> bilan bajarishi, lavozim vazifalarini xolisona va begʻaraz bajarishda unga salbiy taʼsir koʻrsatadigan yoki taʼsir koʻrsatishi mumkin boʻlgan shaxsiy manfaatdorlik holatlariga <strong>yoʻl qoʻymasligi</strong>, faoliyatning <strong>ochiqligi va shaffofligini</strong> taʼminlashi zarur.\nFursatdan foydalanib, hamkasblarimiz, hamkorlarimiz va yurtdoshlarimizni korrupsiyaga qarshi talablarga ogʻishmay rioya qilishga, har qanday ehtimoliy qonunbuzarliklar haqida Davlat inspeksiyasining korrupsiyaga qarshi kurashish boʻyicha maxsus <strong>“ishonch telefoni”ga</strong> (71 202-20-19) xabar berishga va savollar bilan murojaat qilishga chorlaymiz.\nBiz roʻy berishi mumkin boʻlgan korrupsiyaviy holatlar, unga olib kelgan va olib kelishi mumkin boʻlgan har qanday harakat (harakatsizlik)lar haqida oʻz vaqtida maʼlumot olishdan manfaatdormiz. <strong>“Oʻzkomnazorat”</strong> Davlat inspeksiyasi korrupsiyaviy holatlar boʻyicha xabar bergan arizachilarga hamda taqdim etilgan maʼlumotlarga nisbatan maxfiylik tamoyillariga rioya etilishini kafolatlaydi.\nKorrupsiyaga qarshi kurashish barchamizning umumiy ishimiz va shiorimizga aylanishi lozim. Bu ishda barchani hamjihatlikka chaqiramiz.\n"
                        : locale === "ru"
                        ? "Государственная инспекция по контролю в сфере информатизации и телекоммуникаций Республики Узбекистан является уполномоченным государственным органом, осуществляющим функции по контролю за соблюдением актов законодательства в сфере связи, информатизации и телекоммуникационных технологий, качественным оказанием услуг в сфере распространения периодических печатных изданий и авторских прав, соблюдением требований законов, нормативных документов и государственных стандартов в сфере, развитием инфраструктуры и эффективным использованием информационно-коммуникационных технологий в системе «Электронное правительство», эффективностью предоставления электронных государственных услуг и развитием телекоммуникационной инфраструктуры.\nНа сегодняшний день деятельность Государственной инспекции «Узкомназорат» направлена на улучшение качества оказания телекоммуникационных услуг населению и предпринимателям, оказание поддержки хозяйствующим субъектам, осуществляющим деятельность в сфере, создание благоприятных условий для развития отрасли, обеспечение, выполнения требований, законов, нормативных документов и государственных стандартов.\nКак известно, в нашей стране уделяется серьёзное внимание борьбе с коррупцией, реализуются меры по искоренению этого зла на корню.\nМы прекрасно осознаём возложенную на нас ответственность при осуществлении государственного контроля в отрасли, и, в свою очередь, мы приложим все свои усилия и возможности на эффективное внедрение системы по противодействию коррупции в Государственной инспекции «Узкомназорат», на формирование в коллективе стойкой нетерпимости к любым формам и проявлениям коррупционных действий.\nВ целях обеспечения реализации законодательных документов, принятых в сфере противодействия коррупции в нашей стране, Государственной инспекцией «Узкомназорат»:\nВнедрена система «Комплаенс контроль», и в целях координации данных работ создан отдел внутреннего антикоррупционного контроля;\nпринят и введён в действие ряд внутренних нормативных документов и процедур, касающихся отрасли;\nопределены меры по выявлению, оценке и снижению коррупционных рисков;\nутверждён План контроля на 2022-2023 годы, в связи с внедрением системы оценки эффективности по противодействию коррупции «Е-Антикор»;\nНалажено сотрудничество с компетентными в данной области государственными органами;\nна регулярной основе организованы обучающие курсы, направленные на повышение правосознания и правовой культуры в направлении борьбы с коррупцией, регулярно проводятся семинары и пропагандистские акции, направленные на формирование бескомпромиссного отношения сотрудников.\nОсновной задачей системы противодействия коррупции является определение причин и условий возникновения коррупции в Государственной инспекции «Узкомназорат», разработка эффективных мер по их устранению, проведение разъяснительных работ среди сотрудников, оказание консультативной помощи и поддержки в случаях, когда есть риск коррупции.\nПринятые антикоррупционные нормативные документы и процедуры служат основой для выполнения возложенных на Государственную инспекцию «Узкомназорат» задач и функций.\nВ свою очередь, каждый руководитель и сотрудник Государственной инспекции должен выполнять свои функциональные обязанности честно, преданно и лояльно, при выполнении своих обязанностей должен избегать личных интересов, которые могут повлиять или оказать отрицательное влияние на объективное и беспристрастное их выполнение, и обеспечивать открытость и прозрачность деятельности.\nПользуясь случаем, призываем наших коллег, партнёров и соотечественников неукоснительно соблюдать антикоррупционные требования, сообщать о возможных нарушениях и задавать интересующие вас вопросы на номер телефона специальной антикоррупционной горячей линии Государственной инспекции (71 202-20-19).\nМы заинтересованы в своевременном информировании о любых возможных коррупционных ситуациях и действиях (бездействиях), которые могут привести к ней. Государственная инспекция «Узкомназорат» гарантирует соблюдение принципов конфиденциальности в отношении заявителей, сообщающих о фактах коррупции, и предоставленной информации.\nБорьба с коррупцией должна стать нашим общим делом и лозунгом. Мы призываем всех к сотрудничеству в этой работе."
                        : locale === "uzb"
                        ? "Ўзбекистон Республикаси Ахборотлаштириш ва телекоммуникациялар соҳасида назорат бўйича давлат инспекцияси <strong>алоқа, ахборотлаштириш ва телекоммуникация технологиялари, даврий босма нашрларни тарқатиш соҳасида</strong> кўрсатилаётган хизматларнинг сифатли тақдим этилиши ва <strong>истеъмолчилар ҳуқуқларини ҳимоя қилиш</strong>, соҳада қонун ҳужжатлари, норматив ҳужжатлар ва давлат стандартлари <strong>талабларига риоя қилиниши</strong>, “Электрон ҳукумат” тизимида инфратузилмани <strong>ривожлантириш</strong> ва ахборот-коммуникация технологияларидан <strong>самарали фойдаланиш</strong>, электрон давлат хизматларини кўрсатиш <strong>самарадорлиги</strong>, телекоммуникация инфратузилмасини ривожлантириш бўйича давлат назоратини амалга оширувчи <strong>ваколатли орган</strong> ҳисобланади.\n“Ўзкомназорат” Давлат инспекциясининг бугунги кундаги фаолияти аҳоли ва тадбиркорларга кўрсатилаётган телекоммуникация хизматлари <strong>сифатини яхшилаш</strong>, соҳада фаолият юритаётган тадбиркорлик субъектларини <strong>қўллаб-қувватлаш</strong>, соҳа ривожланиши учун қулай шароитлар яратиш ва соҳада қонун ҳужжатлари, норматив ҳужжатлар ва давлат стандартлари талабларига <strong>риоя қилинишини таъминлашга</strong> қаратилмоқда.\nМаълумки, мамлакатимизда коррупцияга қарши курашишга жиддий эътибор қаратилиб, ушбу иллатни таг-томири билан йўқ қилишга қаратилган тадбирлар амалиётга татбиқ этилмоқда.\nСоҳада давлат назоратини амалга оширишда зиммамизга юкланган масъулиятни яхши англаймиз ва ўз навбатида, “Ўзкомназорат” Давлат инспекциясида <strong>коррупцияга қарши курашиш тизимини</strong> самарали амалга ошириш, коррупцион ҳаракатларнинг ҳар қандай шакл ва кўринишларига нисбатан жамоада <strong>кескин муросасизликни шакллантириш</strong> учун бор куч ва имкониятимизни сафарбар этамиз.\nМамлакатимизда Коррупцияга қарши курашиш соҳасида қабул қилинган қонунчилик ҳужжатлари ижросини таъминлаш мақсадида “Ўзкомназорат” Давлат инспекциясида:\n<strong>“Комплаенс назорат”</strong> тизими жорий этилиб, мазкур ишларни мувофиқлаштирувчи Коррупцияга қарши ички назорат бўлими ташкил этилди;\nСоҳага оид қатор ички норматив ҳужжатлар ва тартиб-қоидалар қабул қилинди ва <strong>амалиётга жорий этилди</strong>;\nкоррупциявий хавф-хатарларни аниқлаш, баҳолаш ва уларни камайтириш бўйича <strong>чора-тадбирлар</strong> белгиланди;\nКоррупцияга қарши курашиш ишларини самарадорлигини рейтинг баҳолаш тизими “E-Antikor” жорий этиш юзасидан 2022-2023 йилларга мўлжалланган <strong>Назорат режаси</strong> тасдиқланди;\nСоҳада ваколатли бўлган давлат органлари билан ҳамкорлик йўлга қўйилди;\nходимларнинг коррупцияга қарши курашиш йўналишида <strong>ҳуқуқий онги ва ҳуқуқий маданиятини</strong> юксалтиришга қаратилган ўқув курслари ташкил этилди, ушбу иллатга нисбатан муросасиз муносабатни шакллантиришга қаратилган <strong>семинар ва тарғибот тадбирлари</strong> мунтазам ўтказиб келинмоқда.\nКоррупцияга қарши йўлга қўйилган тизимнинг асосий вазифаси инспекцияда коррупция ҳолатларининг юзага келиш <strong>сабаблари ва шарт-шароитларини аниқлаш</strong>, уларни бартараф этишнинг <strong>таъсирчан чораларини</strong> ишлаб чиқиш, ходимлар ўртасида тушунтириш ишларини олиб бориш, коррупция хавфи мавжуд бўлган ҳолларда маслаҳат бериш ва қўллаб-қувватлашдан иборат.\n“Ўзкомназорат” Давлат инспекциясида коррупцияга қарши қабул қилинган норматив ҳужжатлар, тартиб-қоидалар, белгиланган вазифа ва функцияларни тўғри бажарилиши учун асос бўлиб хизмат қилиб келмоқда.\nЎз навбатида, “Ўзкомназорат” Давлат инспекциясининг ҳар бир раҳбар ва ходими ўз функционал вазифаларини <strong>ҳалоллик, фидоийлик ва садоқат</strong> билан бажариши, лавозим вазифаларини холисона ва беғараз бажаришда унга салбий таъсир кўрсатадиган ёки таъсир кўрсатиши мумкин бўлган шахсий манфаатдорлик ҳолатларига <strong>йўл қўймаслиги</strong>, фаолиятнинг <strong>очиқлиги ва шаффофлигини</strong> таъминлаши зарур.\nФурсатдан фойдаланиб, ҳамкасбларимиз, ҳамкорларимиз ва юртдошларимизни коррупцияга қарши талабларга оғишмай риоя қилишга, ҳар қандай эҳтимолий қонунбузарликлар ҳақида Давлат инспекциясининг коррупцияга қарши курашиш бўйича махсус <strong>“ишонч телефони”га</strong>(71 202-20-19) хабар беришга ва саволлар билан мурожаат қилишга чорлаймиз.\nБиз рўй бериши мумкин бўлган коррупциявий ҳолатлар, унга олиб келган ва олиб келиши мумкин бўлган ҳар қандай ҳаракат (ҳаракатсизлик) лар ҳақида ўз вақтида маълумот олишдан манфаатдормиз. “Ўзкомназорат” Давлат инспекцияси коррупциявий ҳолатлар бўйича хабар берган аризачиларга ҳамда тақдим этилган маълумотларга нисбатан махфийлик тамойилларига риоя этилишини кафолатлайди.\nКоррупцияга қарши курашиш барчамизнинг умумий ишимиз ва шиоримизга айланиши лозим. Бу ишда барчани ҳамжиҳатликка чақирамиз.\n"
                        : "Oʻzbekiston Respublikasi Axborotlashtirish va telekommunikatsiyalar sohasida nazorat boʻyicha davlat inspeksiyasi <strong>aloqa, axborotlashtirish va telekommunikatsiya texnologiyalari, davriy bosma nashrlarni tarqatish sohasida</strong> koʻrsatilayotgan xizmatlarning sifatli taqdim etilishi va <strong>isteʼmolchilar huquqlarini himoya qilish</strong>, sohada qonun hujjatlari, normativ hujjatlar va davlat standartlari <strong>talablariga rioya qilinishi</strong>, “Elektron hukumat” tizimida infratuzilmani <strong>rivojlantirish</strong> va axborot-kommunikatsiya texnologiyalaridan <strong>samarali foydalanish</strong>, elektron davlat xizmatlarini koʻrsatish <strong>samaradorligi</strong>, telekommunikatsiya infratuzilmasini rivojlantirish boʻyicha davlat nazoratini amalga oshiruvchi <strong>vakolatli organ</strong> hisoblanadi.\n<strong>“Oʻzkomnazorat”</strong> Davlat inspeksiyasining bugungi kundagi faoliyati aholi va tadbirkorlarga koʻrsatilayotgan telekommunikatsiya xizmatlari <strong>sifatini yaxshilash</strong>, sohada faoliyat yuritayotgan tadbirkorlik subyektlarini <strong>qoʻllab-quvvatlash</strong>, soha rivojlanishi uchun qulay sharoitlar yaratish va sohada qonun hujjatlari, normativ hujjatlar va davlat standartlari talablariga <strong>rioya qilinishini taʼminlashga</strong> qaratilmoqda.\nMaʼlumki, mamlakatimizda korrupsiyaga qarshi kurashishga jiddiy eʼtibor qaratilib, ushbu illatni tag-tomiri bilan yoʻq qilishga qaratilgan tadbirlar amaliyotga tatbiq etilmoqda.\nSohada davlat nazoratini amalga oshirishda zimmamizga yuklangan masʼuliyatni yaxshi anglaymiz va oʻz navbatida, <strong>“Oʻzkomnazorat”</strong> Davlat inspeksiyasida <strong>korrupsiyaga qarshi kurashish tizimini</strong> samarali amalga oshirish, korrupsion harakatlarning har qanday shakl va koʻrinishlariga nisbatan jamoada <strong>keskin murosasizlikni shakllantirish</strong> uchun bor kuch va imkoniyatimizni safarbar etamiz.\nMamlakatimizda Korrupsiyaga qarshi kurashish sohasida qabul qilingan qonunchilik hujjatlari ijrosini taʼminlash maqsadida <strong>“Oʻzkomnazorat”</strong> Davlat inspeksiyasida:\n<strong>“Komplayens nazorat”</strong> tizimi joriy etilib, mazkur ishlarni muvofiqlashtiruvchi Korrupsiyaga qarshi ichki nazorat boʻlimi tashkil etildi;\nsohaga oid qator ichki normativ hujjatlar va tartib-qoidalar qabul qilindi va <strong>amaliyotga joriy etildi</strong>;\nkorrupsiyaviy xavf-xatarlarni aniqlash, baholash va ularni kamaytirish boʻyicha <strong>chora-tadbirlar</strong> belgilandi;\nKorrupsiyaga qarshi kurashish ishlarini samaradorligini reyting baholash tizimi “E-Antikor” joriy etish yuzasidan 2022-2023-yillarga moʻljallangan <strong>Nazorat rejasi</strong> tasdiqlandi;\nSohada vakolatli boʻlgan davlat organlari bilan hamkorlik yoʻlga qoʻyildi;\nXodimlarning korrupsiyaga qarshi kurashish yoʻnalishida <strong>huquqiy ongi va huquqiy madaniyatini</strong> yuksaltirishga qaratilgan oʻquv kurslari tashkil etildi, ushbu illatga nisbatan murosasiz munosabatni shakllantirishga qaratilgan <strong>seminar va targʻibot tadbirlari</strong> muntazam oʻtkazib kelinmoqda.\nKorrupsiyaga qarshi yoʻlga qoʻyilgan tizimning asosiy vazifasi inspeksiyada korrupsiya holatlarining yuzaga kelish <strong>sabablari va shart-sharoitlarini aniqlash</strong>, ularni bartaraf etishning <strong>taʼsirchan choralarini</strong> ishlab chiqish, xodimlar oʻrtasida tushuntirish ishlarini olib borish, korrupsiya xavfi mavjud boʻlgan hollarda maslahat berish va qoʻllab-quvvatlashdan iborat.\n<strong>“Oʻzkomnazorat”</strong> Davlat inspeksiyasida korrupsiyaga qarshi qabul qilingan normativ hujjatlar, tartib-qoidalar, belgilangan vazifa va funksiyalarni toʻgʻri bajarilishi uchun asos boʻlib xizmat qilib kelmoqda.\nOʻz navbatida, <strong>“Oʻzkomnazorat”</strong> Davlat inspeksiyasining har bir rahbar va xodimi oʻz funksional vazifalarini <strong>halollik, fidoiylik va sadoqat</strong> bilan bajarishi, lavozim vazifalarini xolisona va begʻaraz bajarishda unga salbiy taʼsir koʻrsatadigan yoki taʼsir koʻrsatishi mumkin boʻlgan shaxsiy manfaatdorlik holatlariga <strong>yoʻl qoʻymasligi</strong>, faoliyatning <strong>ochiqligi va shaffofligini</strong> taʼminlashi zarur.\nFursatdan foydalanib, hamkasblarimiz, hamkorlarimiz va yurtdoshlarimizni korrupsiyaga qarshi talablarga ogʻishmay rioya qilishga, har qanday ehtimoliy qonunbuzarliklar haqida Davlat inspeksiyasining korrupsiyaga qarshi kurashish boʻyicha maxsus <strong>“ishonch telefoni”ga</strong> (71 202-20-19) xabar berishga va savollar bilan murojaat qilishga chorlaymiz.\nBiz roʻy berishi mumkin boʻlgan korrupsiyaviy holatlar, unga olib kelgan va olib kelishi mumkin boʻlgan har qanday harakat (harakatsizlik)lar haqida oʻz vaqtida maʼlumot olishdan manfaatdormiz. <strong>“Oʻzkomnazorat”</strong> Davlat inspeksiyasi korrupsiyaviy holatlar boʻyicha xabar bergan arizachilarga hamda taqdim etilgan maʼlumotlarga nisbatan maxfiylik tamoyillariga rioya etilishini kafolatlaydi.\nKorrupsiyaga qarshi kurashish barchamizning umumiy ishimiz va shiorimizga aylanishi lozim. Bu ishda barchani hamjihatlikka chaqiramiz.\n",
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
                    <p className="flex items-end justify-end p-3 text-[18px] text-[#A2A0B3]">{dayjs(r.updated_at).format("DD.MM.YYYY")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0 py-[8px] bg-[#3A2F7D]">
            <p
              className={`${montserrat.variable} font-semibold font-montserrat mb-[24px] text-[1.12rem] px-[16px]`}
            >
              {title}
            </p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/activity/anticorruption" ? (
                    <div className="gradientBox  bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] mx-[3px] hover:bg-[#24224E] bg-[#171142] text-white"
                        href={`${
                          item.slug === "/activity/strategy" ||
                          item.slug == null
                            ? item.link
                            : item.slug
                        }`}
                        target={`${
                          item.slug === "/activity/strategy" ||
                          item.slug == null
                            ? "_blank"
                            : "_self"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </div>
                  ) : (
                    <div className="gradientBox bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] hover:bg-[#24224E] hover:text-white bg-[#3A2F7D] text-[#A2A0B3]"
                        locale={locale}
                        href={`${
                          item.slug === "/activity/strategy" ||
                          item.slug == null
                            ? item.link
                            : item.slug
                        }`}
                        target={`${
                          item.slug === "/activity/strategy" ||
                          item.slug == null
                            ? "_blank"
                            : "_self"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }) {
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
